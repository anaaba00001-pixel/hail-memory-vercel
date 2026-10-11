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
let mapCache={expires:0,places:[]};
const send=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(data));};
const clean=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';

function classify(tags){
  if(tags.amenity==='cafe')return{type:'مقهى',cost:35,minutes:60,interests:['قهوة ومقاهي','تجارب عائلية ممتعة']};
  if(['restaurant','fast_food'].includes(tags.amenity))return{type:'مطعم',cost:60,minutes:75,interests:['أكل محلي','تجارب عائلية ممتعة']};
  if(tags.historic||tags.tourism==='museum')return{type:tags.tourism==='museum'?'متحف':'معلم تاريخي',cost:0,minutes:80,interests:['تاريخ وآثار','طبيعة وتصوير']};
  if(tags.shop)return{type:'تسوّق',cost:0,minutes:75,interests:['أسواق شعبية','تجارب عائلية ممتعة']};
  return{type:'طبيعة وترفيه',cost:0,minutes:75,interests:['طبيعة وتصوير','تجارب عائلية ممتعة']};
}

async function mapPlaces(){
  if(mapCache.expires>Date.now())return mapCache.places;
  const query='[out:json][timeout:12];(nwr(around:25000,27.5114,41.7208)["name"]["amenity"~"cafe|restaurant|fast_food"];nwr(around:25000,27.5114,41.7208)["name"]["tourism"~"museum|attraction"];nwr(around:25000,27.5114,41.7208)["name"]["historic"];nwr(around:25000,27.5114,41.7208)["name"]["shop"~"mall|department_store|gift|craft"];nwr(around:25000,27.5114,41.7208)["name"]["leisure"~"park|playground|amusement_park"];);out center tags 100;';
  try{
    const response=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','User-Agent':'HailMemory/2.0 (hail-memory-vercel)'},body:'data='+encodeURIComponent(query),signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error('Map service '+response.status);const data=await response.json(),seen=new Set();
    const places=(data.elements||[]).map(item=>{const tags=item.tags||{},name=clean(tags['name:ar']||tags.name,100),lat=Number(item.lat??item.center?.lat),lon=Number(item.lon??item.center?.lon);if(!name||!Number.isFinite(lat)||!Number.isFinite(lon)||seen.has(name))return null;seen.add(name);const kind=classify(tags);return{name,type:kind.type,area:clean(tags['addr:suburb']||tags['addr:district']||tags['addr:city']||'مدينة حائل',80),cost:kind.cost,minutes:kind.minutes,tags:kind.interests,lat,lon,live:true};}).filter(Boolean);
    if(places.length){mapCache={expires:Date.now()+6*60*60*1000,places};return places;}
  }catch(error){console.error('Live map lookup failed',error.name);}
  return[];
}

export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'طريقة الطلب غير مسموحة.'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(res,415,{error:'صيغة الطلب غير صحيحة.'});
  const address=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'local').split(',')[0].trim(),now=Date.now(),recent=(buckets.get(address)||[]).filter(t=>now-t<60000);if(recent.length>=30)return send(res,429,{error:'طلبات كثيرة. حاول بعد دقيقة.'});recent.push(now);buckets.set(address,recent);
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return send(res,400,{error:'صيغة الطلب غير صحيحة.'});}
  const budget=Number(body?.budget),people=Number(body?.people),duration=Number(body?.duration),interests=Array.isArray(body?.interests)?body.interests.map(x=>clean(x,40)).filter(Boolean).slice(0,6):[],notes=clean(body?.notes,240);
  if(!Number.isFinite(budget)||budget<0||budget>10000||!Number.isInteger(people)||people<1||people>20||![2,4,8,16].includes(duration)||!interests.length)return send(res,422,{error:'تحقق من الميزانية والمدة وعدد الأشخاص واختر اهتماماً واحداً على الأقل.'});
  const live=await mapPlaces(),pool=live.length?[...live,...catalog.filter(local=>!live.some(place=>place.name===local.name))]:catalog;
  const availableMinutes=duration*60,maxStops=duration<=2?2:duration<=4?3:duration<=8?4:5;
  const ranked=pool.map((place,index)=>({...place,score:place.tags.filter(tag=>interests.includes(tag)).length*10+(place.cost*people<=budget?4:-20)+(place.live?3:0)+(index%3)})).sort((a,b)=>b.score-a.score);
  const selected=[];let total=0,used=0;
  for(const place of ranked){const cost=place.cost*people;if(selected.length>=maxStops||used+place.minutes>availableMinutes||total+cost>budget)continue;selected.push(place);total+=cost;used+=place.minutes;}
  for(const place of ranked.filter(x=>x.cost===0)){if(selected.length>=2||selected.some(x=>x.name===place.name)||used+place.minutes>availableMinutes)continue;selected.push(place);used+=place.minutes;}
  if(!selected.length)return send(res,422,{error:'الميزانية أو المدة لا تكفيان للاختيارات الحالية. جرّب زيادة المدة أو اختر الأسواق المجانية.'});
  const stops=selected.map(place=>({name:place.name,type:place.type,area:place.area,estimated_cost:place.cost*people,duration_minutes:place.minutes,lat:place.lat??null,lon:place.lon??null,reason:`يناسب اهتمامك بـ${place.tags.find(tag=>interests.includes(tag))||'اكتشاف حائل'}${notes?'، مع مراعاة طلبك: '+notes:''}.`}));
  const title=interests.length>1?'جولة متنوعة على جوّك':'جولة '+interests[0];
  return send(res,200,{plan:{title,intro:`رتبنا لك ${stops.length} محطات تناسب ${people===1?'زيارتك':`مجموعة من ${people} أشخاص`} ضمن ميزانية ${budget} ريال ومدة ${duration} ساعات${live.length?' باستخدام بيانات خريطة حية':''}.`,estimated_total:total,stops,live:live.length>0,tip:'الأسعار وأوقات العمل تقديرية؛ افتح المكان في Google Maps وتحقق قبل الانطلاق.'}});
}
