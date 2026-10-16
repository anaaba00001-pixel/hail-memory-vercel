import { tourismPlaces } from '../public/assets/js/tourism-data.js';

const suppliedRatings={'HAO | هاو':4.4,'مقهى بنشاي':4.4,'سوردز كافيه':4.2,'هاف مليون':4.1,'أجا بارك':4.2,'حديقة السلام':4.4,'حديقة الزيتون':4.3,'منتزه المغواة الترفيهي للاحتفالات':4.2,'متحف حائل الإقليمي':4.4,'مطعم التراثي':4.2,'مطاعم ومطابخ قيصر حائل للأكلات الشعبية':3.7,'مطعم فوال الماقد':3.8,'مطعم القلعة القديمة':4.1};
const legacyCatalog = [
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

const tourismKinds={
  'كافيه':{cost:35,minutes:60,tags:['قهوة ومقاهي'],categories:['cafe'],features:['coffee']},
  'فطور':{cost:30,minutes:60,tags:['أكل محلي'],categories:['restaurant'],features:['breakfast','local_food']},
  'عشاء':{cost:65,minutes:75,tags:['أكل محلي'],categories:['restaurant'],features:['local_food']},
  'متحف':{cost:0,minutes:90,tags:['تاريخ وآثار'],categories:['history','museum'],features:['heritage','educational','indoor']},
  'سوق شعبي':{cost:0,minutes:75,tags:['أسواق شعبية'],categories:['market'],features:['shopping','heritage']},
  'تصوير/تراث':{cost:0,minutes:90,tags:['تاريخ وآثار','تصوير ومناظر جميلة'],categories:['history'],features:['heritage','photography','outdoor']},
  'حديقة/منتزه':{cost:0,minutes:90,tags:['تجارب عائلية ممتعة'],categories:['family','park'],features:['children','outdoor','walking']},
  'هايكنج':{cost:0,minutes:150,tags:['طبيعة وتصوير'],categories:['nature'],features:['hiking','outdoor','photography']},
  'إطلالة':{cost:0,minutes:75,tags:['طبيعة وتصوير','تصوير ومناظر جميلة'],categories:['nature','viewpoint'],features:['outdoor','photography','panorama']},
  'ممشى':{cost:0,minutes:75,tags:['طبيعة وتصوير'],categories:['nature','park'],features:['walking','outdoor']},
  'وجهة حديثة':{cost:0,minutes:90,tags:['تجارب عائلية ممتعة'],categories:['family'],features:['outdoor','photography']}
};
const tourismCatalog=tourismPlaces.map(place=>{const kind=tourismKinds[place.category]||{cost:0,minutes:75,tags:[],categories:[],features:[]};return{name:place.name,type:place.type,area:place.area,cost:kind.cost,minutes:kind.minutes,tags:kind.tags,description:place.description,bestTime:place.notes,rating:null,mapUrl:place.mapUrl,verifiedAt:place.verifiedAt};});
const tourismNames=new Set(tourismCatalog.map(place=>place.name));
const catalog=[...tourismCatalog,...legacyCatalog.filter(place=>!tourismNames.has(place.name))];

// حقول المطابقة أدناه حقائق موثقة من وصف كل مكان، وليست استنتاجات وقت الطلب.
// غياب الصفة يعني أن معلوماتنا لا تكفي لإثباتها، ولذلك لا يطابق المكان طلباً يشترطها.
const placeEvidence={
  'قلعة أعيرف':{categories:['history'],features:['heritage','photography','panorama','outdoor']},
  'قصر القشلة':{categories:['history'],features:['heritage','photography']},
  'جبل أم سنمان ونقوش جبة':{categories:['history','nature'],features:['heritage','photography','outdoor']},
  'مدينة فيد الأثرية':{categories:['history'],features:['heritage','photography','outdoor']},
  'متحف حائل الإقليمي':{categories:['history','museum'],features:['heritage','educational','indoor','children']},
  'سوق برزان الشعبي':{categories:['market'],features:['shopping','heritage','local_food']},
  'أبراج برزان':{categories:['history','market'],features:['heritage','shopping','photography']},
  'سوق المباخر اليدوية':{categories:['market'],features:['shopping','heritage','handcrafts']},
  'HAO | هاو':{categories:['cafe'],features:['coffee','quiet','indoor']},
  'مقهى بنشاي':{categories:['cafe'],features:['coffee','tea']},
  'سوردز كافيه':{categories:['cafe'],features:['coffee']},
  'هاف مليون':{categories:['cafe'],features:['coffee','quick','budget_friendly']},
  'جبال أجا':{categories:['nature'],features:['outdoor','photography','hiking']},
  'منتزه مشار الوطني':{categories:['nature','park'],features:['outdoor','photography','children','picnic']},
  'مطل جبل السمراء':{categories:['nature','viewpoint'],features:['outdoor','photography','panorama','sunset','children']},
  'النفود الكبير':{categories:['nature'],features:['outdoor','photography','desert']},
  'أجا بارك':{categories:['family','park'],features:['children','games','restaurants','coffee']},
  'حديقة السلام':{categories:['family','park'],features:['children','outdoor','walking']},
  'حديقة الزيتون':{categories:['family','park'],features:['children','outdoor','picnic']},
  'منتزه المغواة الترفيهي للاحتفالات':{categories:['family','events'],features:['events','outdoor']},
  'مطعم التراثي':{categories:['restaurant'],features:['local_food','heritage','children']},
  'مطاعم ومطابخ قيصر حائل للأكلات الشعبية':{categories:['restaurant'],features:['local_food','children']},
  'مطعم فوال الماقد':{categories:['restaurant'],features:['local_food','breakfast','budget_friendly']},
  'مطعم القلعة القديمة':{categories:['restaurant'],features:['children']}
};
for(const place of tourismPlaces){const kind=tourismKinds[place.category];if(!kind)continue;const features=[...kind.features];if(/غروب/.test(`${place.description} ${place.activities} ${place.notes}`))features.push('sunset');if(/عائل|أطفال/.test(place.audience))features.push('children');placeEvidence[place.name]={categories:[...kind.categories],features:[...new Set(features)]};}
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

const categories=['cafe','restaurant','history','museum','market','nature','park','family','viewpoint','events'];
const features=['quiet','coffee','tea','heritage','photography','panorama','outdoor','educational','indoor','children','shopping','local_food','handcrafts','quick','budget_friendly','hiking','picnic','sunset','desert','games','restaurants','events','walking','breakfast'];
const constraintLabels={cafe:'مقهى',restaurant:'مطعم',history:'مكان تاريخي',museum:'متحف',market:'سوق',nature:'طبيعة',park:'منتزه',family:'عائلي',viewpoint:'مطل',events:'فعاليات',quiet:'هادئ',coffee:'قهوة',tea:'شاي',heritage:'تراث',photography:'تصوير',panorama:'إطلالة بانورامية',outdoor:'مكان خارجي',educational:'تعليمي',indoor:'مكان داخلي',children:'مناسب للأطفال',shopping:'تسوق',local_food:'أكل محلي',handcrafts:'حرف يدوية',quick:'زيارة سريعة',budget_friendly:'اقتصادي',hiking:'تنزه جبلي',picnic:'نزهة',sunset:'غروب',desert:'صحراء',games:'ألعاب',restaurants:'مطاعم',events:'فعاليات',walking:'مشي',breakfast:'فطور'};

async function understandIntent(intent){
  if(!process.env.GROQ_API_KEY)throw new Error('AI_NOT_CONFIGURED');
  const list=values=>({type:'array',items:{type:'string',enum:values}});
  const schema={type:'object',additionalProperties:false,properties:{requested_categories:list(categories),required_features:list(features),excluded_categories:list(categories),excluded_features:list(features),unknown_requirements:{type:'array',items:{type:'string'}},is_specific_enough:{type:'boolean'},summary:{type:'string'}},required:['requested_categories','required_features','excluded_categories','excluded_features','unknown_requirements','is_specific_enough','summary']};
  try{
    const response=await fetch('https://api.groq.com/openai/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'qwen/qwen3.8-27b',instructions:'حلل طلب زائر في حائل إلى قيود فقط، ولا ترشح أماكن. المطلوب الصريح مثل هادئ يوضع في required_features، والمنع مثل بدون أسواق يوضع في excluded_categories. لا تستنتج تفضيلات لم يذكرها. إذا احتوى الطلب شرطاً مهماً لا يمثله قاموس التصنيفات والصفات، ضعه نصاً في unknown_requirements. اعتبر الطلب محدداً إذا ذكر نوع مكان أو صفة مطلوبة مفهومة. اكتب summary عربية قصيرة أمينة للطلب.',input:intent,text:{format:{type:'json_schema',name:'hail_trip_constraints',strict:true,schema}}}),signal:AbortSignal.timeout(12000)});
    if(!response.ok)throw new Error(`OpenAI ${response.status}`);
    const data=await response.json();
    const raw=data.output_text||data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;
    return JSON.parse(raw);
  }catch(error){console.error('AI intent analysis failed',error.name);throw new Error('AI_UNAVAILABLE');}
}

function matchesConstraints(place,constraints){
  const evidence=placeEvidence[place.name];
  if(!evidence)return false;
  const placeCategories=evidence.categories||[],placeFeatures=evidence.features||[];
  if(constraints.requested_categories.length&&!constraints.requested_categories.some(value=>placeCategories.includes(value)))return false;
  if(constraints.required_features.some(value=>!placeFeatures.includes(value)))return false;
  if(constraints.excluded_categories.some(value=>placeCategories.includes(value)))return false;
  if(constraints.excluded_features.some(value=>placeFeatures.includes(value)))return false;
  return true;
}

export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return send(res,405,{error:'طريقة الطلب غير مسموحة.'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return send(res,415,{error:'صيغة الطلب غير صحيحة.'});
  const address=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'local').split(',')[0].trim(),now=Date.now(),recent=(buckets.get(address)||[]).filter(t=>now-t<60000);if(recent.length>=30)return send(res,429,{error:'طلبات كثيرة. حاول بعد دقيقة.'});recent.push(now);buckets.set(address,recent);
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return send(res,400,{error:'صيغة الطلب غير صحيحة.'});}
  const budget=Number(body?.budget),people=Number(body?.people),duration=Number(body?.duration),intent=clean(body?.intent??body?.notes,500);
  if(!Number.isFinite(budget)||budget<0||budget>10000||!Number.isInteger(people)||people<1||people>20||![2,4,8,16].includes(duration)||intent.length<3)return send(res,422,{error:'اكتب رغبتك وتحقق من الميزانية والمدة وعدد الأشخاص.'});
  let constraints;try{constraints=await understandIntent(intent);}catch(error){return send(res,503,{error:error.message==='AI_NOT_CONFIGURED'?'خدمة فهم الطلب غير مهيأة حالياً. حاول لاحقاً.':'تعذّر الاتصال بخدمة الذكاء الاصطناعي، لذلك لم نعرض اقتراحات قد لا تطابق طلبك. حاول مرة أخرى.'});}
  if(!constraints.is_specific_enough)return send(res,422,{error:'نحتاج وصفاً أوضح: اذكر نوع المكان أو الأجواء التي تريدها وما الذي لا تريده.'});
  if(constraints.unknown_requirements.length)return send(res,200,{plan:{title:'لا تتوفر معلومات كافية',intro:`لا تتوفر لدينا معلومات موثقة عن: ${constraints.unknown_requirements.join('، ')}. لذلك لم نعرض ترشيحات غير مؤكدة.`,estimated_total:0,stops:[],ai_generated:true,suggestion_source:'ai',insufficient_data:true,tip:'جرّب طلباً يعتمد على صفات موثقة مثل نوع المكان، الهدوء، الغروب، الأطفال، التصوير أو الأكل المحلي.'}});
  const live=await mapPlaces(),normalize=name=>name.toLowerCase().replace(/[|ـًٌٍَُِّْ'’\s-]/g,''),pool=catalog.map(local=>{const localName=normalize(local.name),match=live.find(place=>{const mapName=normalize(place.name);return mapName===localName||(Math.min(mapName.length,localName.length)>5&&(mapName.includes(localName)||localName.includes(mapName)));});return match?{...local,lat:match.lat,lon:match.lon,live:true}:local;});
  const availableMinutes=duration*60,maxStops=duration<=2?2:duration<=4?3:duration<=8?4:5;
  const matched=pool.filter(place=>matchesConstraints(place,constraints)&&place.cost*people<=budget&&place.minutes<=availableMinutes);
  const selected=[];let total=0,used=0;
  for(const place of matched){const cost=place.cost*people;if(selected.length>=maxStops||used+place.minutes>availableMinutes||total+cost>budget)continue;selected.push(place);total+=cost;used+=place.minutes;}
  if(!selected.length)return send(res,200,{plan:{title:'لا يوجد تطابق موثّق',intro:`لا تتوفر لدينا معلومات كافية لترشيح مكان يطابق «${clean(constraints.summary,180)}» ضمن الميزانية والمدة المحددتين.`,estimated_total:0,stops:[],ai_generated:true,suggestion_source:'ai',insufficient_data:true,tip:'لن نعرض مكاناً ما لم تكن صفاته المطلوبة موثقة في بياناتنا.'}});
  const requiredLabels=[...new Set([...constraints.requested_categories,...constraints.required_features])].map(value=>constraintLabels[value]||value);
  const stops=selected.map(place=>({name:place.name,type:place.type,area:place.area,minimum_rating:place.rating,estimated_cost:place.cost*people,duration_minutes:place.minutes,lat:place.lat??null,lon:place.lon??null,best_time:place.bestTime||'تحقق قبل الزيارة',reason:`يطابق طلبك بناءً على معلوماتنا الموثقة: ${requiredLabels.join('، ')}.`}));
  const mapped=pool.some(place=>place.live);return send(res,200,{plan:{title:'أماكن تطابق طلبك',intro:`وجدنا ${stops.length} ${stops.length===1?'مكاناً موثقاً':'أماكن موثقة'} تطابق طلبك دون إضافة اقتراحات غير مؤكدة.`,estimated_total:total,stops,live:mapped,ai_generated:true,suggestion_source:'ai',insufficient_data:false,tip:'التقييمات والأسعار وأوقات العمل قد تتغير؛ افتح المكان في Google Maps وتحقق قبل الانطلاق.'}});
}
