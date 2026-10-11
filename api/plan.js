const suppliedRatings={'HAO | هاو':4.4,'مقهى بنشاي':4.4,'سوردز كافيه':4.2,'هاف مليون':4.1,'أجا بارك':4.2,'حديقة السلام':4.4,'حديقة الزيتون':4.3,'منتزه المغواة الترفيهي للاحتفالات':4.2,'متحف حائل الإقليمي':4.4,'مطعم التراثي':4.2,'مطاعم ومطابخ قيصر حائل للأكلات الشعبية':3.7,'مطعم فوال الماقد':3.8,'مطعم القلعة القديمة':4.1};
const catalog = [
  {name:'قلعة أعيرف',type:'قلعة تاريخية',area:'حائل — لبدة',cost:0,minutes:75,tags:['تاريخ وآثار','تصوير ومناظر جميلة','تجارب عائلية ممتعة'],description:'قلعة طينية مرتفعة تطل على المدينة وتتميز بأبراجها الدفاعية.',bestTime:'قبل الغروب'},
  {name:'قصر القشلة',type:'قصر تاريخي',area:'وسط حائل — المحطة',cost:0,minutes:75,tags:['تاريخ وآثار','تصوير ومناظر جميلة'],description:'مبنى تاريخي من عام 1941م يتميز بساحاته وأبراجه والعمارة النجدية.',bestTime:'الصباح أو العصر'},
  {name:'جبل أم سنمان ونقوش جبة',type:'فنون صخرية وتراث عالمي',area:'جُبّة — شمال غرب حائل',cost:0,minutes:150,tags:['تاريخ وآثار','طبيعة وتصوير','تصوير ومناظر جميلة'],description:'موقع للفنون الصخرية القديمة ضمن قائمة التراث العالمي لليونسكو.',bestTime:'الصباح الباكر'},
  {name:'مدينة فيد الأثرية',type:'مدينة أثرية',area:'فيد — جنوب شرق حائل',cost:0,minutes:120,tags:['تاريخ وآثار','تصوير ومناظر جميلة'],description:'مدينة تاريخية ارتبطت بطريق الحج القديم وتضم آثاراً ومعالم معمارية.',bestTime:'الصباح'},
  {name:'متحف حائل الإقليمي',type:'متحف',area:'مدينة حائل',cost:20,minutes:90,tags:['تاريخ وآثار','تجارب عائلية ممتعة'],description:'زيارة تعليمية للتعرف على تاريخ المنطقة وآثارها.',bestTime:'أثناء ساعات العمل'},
  {name:'سوق برزان الشعبي',type:'سوق شعبي',area:'حي برزان — مدينة حائل',cost:0,minutes:75,tags:['أسواق شعبية','تاريخ وآثار','أكل محلي'],description:'سوق تراثي للملابس الشعبية والتوابل والعطارة والمنتجات الحرفية.',bestTime:'العصر والمساء'},
  {name:'أبراج برزان',type:'معلم تاريخي وسوق',area:'منطقة برزان القديمة — حائل',cost:0,minutes:60,tags:['أسواق شعبية','تاريخ وآثار','تصوير ومناظر جميلة'],description:'بقايا تاريخية في قلب المنطقة التجارية القديمة تجمع التراث بالتسوق.',bestTime:'العصر'},
  {name:'سوق المباخر اليدوية',type:'سوق حرفي',area:'مدينة حائل',cost:0,minutes:60,tags:['أسواق شعبية','تاريخ وآثار'],description:'سوق للبحث عن المباخر اليدوية والمنتجات المحلية والتراثية.',bestTime:'المساء'},
  {name:'HAO | هاو',type:'مقهى',area:'طريق عقدة — حي صبابة، حائل',cost:35,minutes:60,tags:['قهوة ومقاهي','تجارب عائلية ممتعة'],description:'مقهى مناسب لجلسة هادئة أو لقاء الأصدقاء.',bestTime:'المساء'},
  {name:'مقهى بنشاي',type:'قهوة وشاي',area:'حي البحيرة — حائل',cost:30,minutes:60,tags:['قهوة ومقاهي'],description:'وجهة للقهوة والشاي والجلسات.',bestTime:'العصر والمساء'},
  {name:'سوردز كافيه',type:'مقهى',area:'المنتزه الغربي — حائل',cost:35,minutes:60,tags:['قهوة ومقاهي'],description:'خيار للمشروبات والقهوة ضمن المدينة.',bestTime:'المساء'},
  {name:'هاف مليون',type:'مقهى',area:'حي المطار — حائل',cost:25,minutes:45,tags:['قهوة ومقاهي'],description:'مقهى للمشروبات السريعة والقهوة بتكلفة اقتصادية نسبياً.',bestTime:'في أي وقت'},
  {name:'جبال أجا',type:'جبال وطبيعة',area:'غرب مدينة حائل',cost:0,minutes:150,tags:['طبيعة وتصوير','تصوير ومناظر جميلة'],description:'سلسلة جبلية ذات تضاريس صخرية مميزة للتنزه والتأمل والتصوير.',bestTime:'الصباح أو قبل الغروب'},
  {name:'منتزه مشار الوطني',type:'منتزه طبيعي',area:'شمال غرب مدينة حائل',cost:0,minutes:120,tags:['طبيعة وتصوير','تجارب عائلية ممتعة','تصوير ومناظر جميلة'],description:'منطقة طبيعية ذات أجواء جبلية للنزهات والتصوير والهواء الطلق.',bestTime:'العصر'},
  {name:'مطل جبل السمراء',type:'مطل وإطلالة',area:'شرق مدينة حائل',cost:0,minutes:75,tags:['طبيعة وتصوير','تصوير ومناظر جميلة','تجارب عائلية ممتعة'],description:'إطلالة بانورامية على حائل وموقع مميز لمشاهدة الغروب.',bestTime:'قبل الغروب'},
  {name:'النفود الكبير',type:'صحراء وكثبان رملية',area:'شمال منطقة حائل',cost:0,minutes:180,tags:['طبيعة وتصوير','تصوير ومناظر جميلة'],description:'كثبان رملية واسعة لمحبي الصحراء والتصوير، وتتطلب اختيار وصول آمن.',bestTime:'الصباح الباكر أو الشتاء'},
  {name:'أجا بارك',type:'ترفيه عائلي',area:'مدينة حائل',cost:50,minutes:150,tags:['تجارب عائلية ممتعة','أكل محلي'],description:'وجهة عائلية تضم ألعاباً ومطاعم ومقاهي.',bestTime:'المساء'},
  {name:'حديقة السلام',type:'حديقة عامة',area:'مدينة حائل',cost:0,minutes:90,tags:['تجارب عائلية ممتعة','طبيعة وتصوير'],description:'حديقة للمشي والجلوس مع العائلة.',bestTime:'العصر والمساء'},
  {name:'حديقة الزيتون',type:'حديقة عامة',area:'مدينة حائل',cost:0,minutes:90,tags:['تجارب عائلية ممتعة','طبيعة وتصوير'],description:'مساحات خضراء مناسبة للنزهات العائلية.',bestTime:'العصر'},
  {name:'منتزه المغواة الترفيهي للاحتفالات',type:'منتزه وفعاليات',area:'مدينة حائل',cost:0,minutes:120,tags:['تجارب عائلية ممتعة'],description:'موقع للمهرجانات والفعاليات الموسمية.',bestTime:'وقت الفعاليات والمساء'},
  {name:'مطعم التراثي',type:'مطعم عربي',area:'طريق الملك عبدالعزيز — حائل',cost:65,minutes:75,tags:['أكل محلي','تجارب عائلية ممتعة'],description:'مطعم عربي مناسب لإضافة تجربة طعام تراثية إلى الجولة.',bestTime:'الغداء أو العشاء'},
  {name:'مطاعم ومطابخ قيصر حائل للأكلات الشعبية',type:'أكلات شعبية',area:'حي الزهراء — حائل',cost:55,minutes:75,tags:['أكل محلي','تجارب عائلية ممتعة'],description:'مطعم ومطبخ للأكلات الشعبية المحلية.',bestTime:'الغداء أو العشاء'},
  {name:'مطعم فوال الماقد',type:'إفطار شعبي',area:'مدينة حائل',cost:25,minutes:50,tags:['أكل محلي'],description:'مطعم إفطار لتجربة الفول والأطباق الصباحية.',bestTime:'الصباح'},
  {name:'مطعم القلعة القديمة',type:'مطعم عائلي',area:'حي المنتزه الغربي — حائل',cost:60,minutes:75,tags:['أكل محلي','تجارب عائلية ممتعة'],description:'مطعم عائلي مناسب لإكمال جولة المدينة.',bestTime:'الغداء أو العشاء'}
].map(place=>({...place,rating:suppliedRatings[place.name]??4}));
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
  const live=await mapPlaces(),normalize=name=>name.toLowerCase().replace(/[|ـًٌٍَُِّْ'’\s-]/g,''),pool=catalog.filter(place=>place.rating>=4).map(local=>{const localName=normalize(local.name),match=live.find(place=>{const mapName=normalize(place.name);return mapName===localName||(Math.min(mapName.length,localName.length)>5&&(mapName.includes(localName)||localName.includes(mapName)));});return match?{...local,lat:match.lat,lon:match.lon,live:true}:local;});
  const availableMinutes=duration*60,maxStops=duration<=2?2:duration<=4?3:duration<=8?4:5;
  const ranked=pool.map((place,index)=>({...place,score:place.tags.filter(tag=>interests.includes(tag)).length*10+(place.cost*people<=budget?4:-20)+(place.live?3:0)+(index%3)})).sort((a,b)=>b.score-a.score);
  const selected=[];let total=0,used=0;
  for(const place of ranked){const cost=place.cost*people;if(selected.length>=maxStops||used+place.minutes>availableMinutes||total+cost>budget)continue;selected.push(place);total+=cost;used+=place.minutes;}
  for(const place of ranked.filter(x=>x.cost===0)){if(selected.length>=2||selected.some(x=>x.name===place.name)||used+place.minutes>availableMinutes)continue;selected.push(place);used+=place.minutes;}
  if(!selected.length)return send(res,422,{error:'الميزانية أو المدة لا تكفيان للاختيارات الحالية. جرّب زيادة المدة أو اختر الأسواق المجانية.'});
  const stops=selected.map(place=>({name:place.name,type:place.type,area:place.area,minimum_rating:place.rating,estimated_cost:place.cost*people,duration_minutes:place.minutes,lat:place.lat??null,lon:place.lon??null,best_time:place.bestTime||'تحقق قبل الزيارة',reason:place.description||`يناسب اهتمامك بـ${place.tags.find(tag=>interests.includes(tag))||'اكتشاف حائل'}${notes?'، مع مراعاة طلبك: '+notes:''}.`}));
  const title=interests.length>1?'جولة متنوعة على جوّك':'جولة '+interests[0];
  const mapped=pool.some(place=>place.live);return send(res,200,{plan:{title,intro:`رتبنا لك ${stops.length} وجهات مختارة ذات قيمة للزيارة، بتقييم ٤ فأعلى، تناسب ${people===1?'زيارتك':`مجموعة من ${people} أشخاص`} ضمن ميزانية ${budget} ريال ومدة ${duration} ساعات.`,estimated_total:total,stops,live:mapped,tip:'التقييمات والأسعار وأوقات العمل قد تتغير؛ افتح المكان في Google Maps وتحقق قبل الانطلاق.'}});
}
