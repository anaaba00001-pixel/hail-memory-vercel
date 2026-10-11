const catalog = [
  ['مقهى سُيوف','قهوة مختصة','المنتزه الغربي — مدينة حائل',35],
  ['محمصة ومقهى أندلس','قهوة ومحمصة','مدينة حائل',40],
  ['خطوة جمل','قهوة مختصة','مدينة حائل',35],
  ['متحف حائل الإقليمي','متحف','مدينة حائل',20],
  ['متحف النايف الأثري','متحف تراثي','منطقة حائل',25],
  ['متحف مدينة فيد الأثرية','متحف وموقع أثري','فيد — منطقة حائل',30],
  ['سوق برزان الشعبي','سوق شعبي','حي برزان — مدينة حائل',0],
  ['سوق حائل الشعبي','سوق شعبي','حي برزان — مدينة حائل',0],
  ['سوق النساء الجديد','سوق شعبي','شمال سوق برزان — مدينة حائل',0]
].map(([name,type,area,estimated_cost])=>({name,type,area,estimated_cost}));
const requestBuckets=new Map();

const schema={type:'object',additionalProperties:false,required:['title','intro','estimated_total','stops','tip'],properties:{title:{type:'string'},intro:{type:'string'},estimated_total:{type:'number'},stops:{type:'array',minItems:2,maxItems:5,items:{type:'object',additionalProperties:false,required:['name','type','area','reason','estimated_cost','duration_minutes'],properties:{name:{type:'string'},type:{type:'string'},area:{type:'string'},reason:{type:'string'},estimated_cost:{type:'number'},duration_minutes:{type:'integer'}}}},tip:{type:'string'}}};
const send=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(data));};
const clean=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';

export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'طريقة الطلب غير مسموحة.'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(res,415,{error:'صيغة الطلب غير صحيحة.'});
  const address=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'local').split(',')[0].trim();const now=Date.now();const recent=(requestBuckets.get(address)||[]).filter(time=>now-time<15*60*1000);if(recent.length>=10)return send(res,429,{error:'وصلت للحد المؤقت للاقتراحات. حاول بعد قليل.'});recent.push(now);requestBuckets.set(address,recent);if(requestBuckets.size>1000)for(const [id,times] of requestBuckets)if(!times.some(time=>now-time<15*60*1000))requestBuckets.delete(id);
  const key=process.env.OPENAI_API_KEY;if(!key)return send(res,503,{error:'مخطط الذكاء الاصطناعي غير مهيأ بعد. أضف OPENAI_API_KEY في إعدادات Vercel.'});
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return send(res,400,{error:'صيغة الطلب غير صحيحة.'});}
  const budget=Number(body?.budget),people=Number(body?.people),duration=Number(body?.duration),interests=Array.isArray(body?.interests)?body.interests.map(x=>clean(x,40)).filter(Boolean).slice(0,6):[],notes=clean(body?.notes,240);
  if(!Number.isFinite(budget)||budget<0||budget>10000||!Number.isInteger(people)||people<1||people>20||![2,4,8,16].includes(duration)||!interests.length)return send(res,422,{error:'تحقق من الميزانية والمدة وعدد الأشخاص واختر اهتماماً واحداً على الأقل.'});
  const instructions='أنت مرشد محلي لمدينة حائل. أنشئ برنامج زيارة عربي سعودي ودود ومختصر. استخدم حصراً أسماء الأماكن وبياناتها من الكتالوج المرفق ولا تخترع مكاناً جديداً. احترم الميزانية الإجمالية لكل الأشخاص، واعتبر التكاليف تقديرية. نوّع المحطات بحسب رغبات الزائر، ولا تدّعِ معرفة أوقات العمل الحالية. أعد JSON مطابقاً للمخطط فقط.';
  const input=JSON.stringify({visitor:{budget_sar_total:budget,people,duration_hours:duration,interests,notes},available_places:catalog});
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-6-astra',instructions,input,text:{format:{type:'json_schema',name:'hail_trip_plan',strict:true,schema}}}),signal:AbortSignal.timeout(30000)});
    if(!response.ok){console.error('OpenAI request failed',response.status);return send(res,502,{error:'تعذّر إنشاء الاقتراح الآن. حاول مرة أخرى بعد قليل.'});}
    const result=await response.json();const raw=result.output_text||result.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!raw)throw new Error('Missing model output');const plan=JSON.parse(raw);
    const places=new Map(catalog.map(x=>[x.name,x]));if(!Array.isArray(plan.stops)||plan.stops.some(x=>!places.has(x.name)))throw new Error('Unknown place');plan.stops=plan.stops.map(stop=>({...stop,...places.get(stop.name),estimated_cost:places.get(stop.name).estimated_cost*people}));plan.estimated_total=plan.stops.reduce((sum,stop)=>sum+stop.estimated_cost,0);if(plan.estimated_total>budget)throw new Error('Plan exceeds budget');
    return send(res,200,{plan});
  }catch(error){console.error('Trip planner failed',error.name);return send(res,502,{error:'تعذّر إنشاء الاقتراح الآن. حاول مرة أخرى بعد قليل.'});}
}
