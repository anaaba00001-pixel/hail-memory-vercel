const catalog = [
  {name:'مقهى سُيوف',type:'قهوة مختصة',area:'المنتزه الغربي — مدينة حائل',cost:35,minutes:60,tags:['قهوة ومقاهي','تجارب عائلية ممتعة']},
  {name:'محمصة ومقهى أندلس',type:'قهوة ومحمصة',area:'مدينة حائل',cost:40,minutes:60,tags:['قهوة ومقاهي','أكل محلي']},
  {name:'خطوة جمل',type:'قهوة مختصة',area:'مدينة حائل',cost:35,minutes:50,tags:['قهوة ومقاهي','تجارب عائلية ممتعة']},
  {name:'متحف حائل الإقليمي',type:'متحف',area:'مدينة حائل',cost:20,minutes:90,tags:['تاريخ وآثار','تجارب عائلية ممتعة']},
  {name:'متحف النايف الأثري',type:'متحف تراثي',area:'منطقة حائل',cost:25,minutes:75,tags:['تاريخ وآثار','طبيعة وتصوير']},
  {name:'متحف مدينة فيد الأثرية',type:'متحف وموقع أثري',area:'فيد — منطقة حائل',cost:30,minutes:120,tags:['تاريخ وآثار','طبيعة وتصوير']},
  {name:'سوق برزان الشعبي',type:'سوق شعبي',area:'حي برزان — مدينة حائل',cost:0,minutes:75,tags:['أسواق شعبية','تاريخ وآثار','أكل محلي']},
  {name:'سوق حائل الشعبي',type:'سوق شعبي',area:'حي برزان — مدينة حائل',cost:0,minutes:70,tags:['أسواق شعبية','أكل محلي','تجارب عائلية ممتعة']},
  {name:'سوق النساء الجديد',type:'سوق شعبي',area:'شمال سوق برزان — مدينة حائل',cost:0,minutes:60,tags:['أسواق شعبية','تجارب عائلية ممتعة']}
];
const buckets=new Map();
const send=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(data));};
const clean=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';

export default function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'طريقة الطلب غير مسموحة.'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(res,415,{error:'صيغة الطلب غير صحيحة.'});
  const address=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'local').split(',')[0].trim(),now=Date.now(),recent=(buckets.get(address)||[]).filter(t=>now-t<60000);if(recent.length>=30)return send(res,429,{error:'طلبات كثيرة. حاول بعد دقيقة.'});recent.push(now);buckets.set(address,recent);
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return send(res,400,{error:'صيغة الطلب غير صحيحة.'});}
  const budget=Number(body?.budget),people=Number(body?.people),duration=Number(body?.duration),interests=Array.isArray(body?.interests)?body.interests.map(x=>clean(x,40)).filter(Boolean).slice(0,6):[],notes=clean(body?.notes,240);
  if(!Number.isFinite(budget)||budget<0||budget>10000||!Number.isInteger(people)||people<1||people>20||![2,4,8,16].includes(duration)||!interests.length)return send(res,422,{error:'تحقق من الميزانية والمدة وعدد الأشخاص واختر اهتماماً واحداً على الأقل.'});
  const availableMinutes=duration*60,maxStops=duration<=2?2:duration<=4?3:duration<=8?4:5;
  const ranked=catalog.map((place,index)=>({...place,score:place.tags.filter(tag=>interests.includes(tag)).length*10+(place.cost*people<=budget?4:-20)+(index%3)})).sort((a,b)=>b.score-a.score);
  const selected=[];let total=0,used=0;
  for(const place of ranked){const cost=place.cost*people;if(selected.length>=maxStops||used+place.minutes>availableMinutes||total+cost>budget)continue;selected.push(place);total+=cost;used+=place.minutes;}
  for(const place of ranked.filter(x=>x.cost===0)){if(selected.length>=2||selected.some(x=>x.name===place.name)||used+place.minutes>availableMinutes)continue;selected.push(place);used+=place.minutes;}
  if(!selected.length)return send(res,422,{error:'الميزانية أو المدة لا تكفيان للاختيارات الحالية. جرّب زيادة المدة أو اختر الأسواق المجانية.'});
  const stops=selected.map(place=>({name:place.name,type:place.type,area:place.area,estimated_cost:place.cost*people,duration_minutes:place.minutes,reason:`يناسب اهتمامك بـ${place.tags.find(tag=>interests.includes(tag))||'اكتشاف حائل'}${notes?'، مع مراعاة طلبك: '+notes:''}.`}));
  const title=interests.length>1?'جولة متنوعة على جوّك':'جولة '+interests[0];
  return send(res,200,{plan:{title,intro:`رتبنا لك ${stops.length} محطات تناسب ${people===1?'زيارتك':`مجموعة من ${people} أشخاص`} ضمن ميزانية ${budget} ريال ومدة ${duration} ساعات.`,estimated_total:total,stops,tip:'الأسعار تقديرية وقد تتغير؛ تحقق من أوقات العمل والمسافات قبل الانطلاق.'}});
}
