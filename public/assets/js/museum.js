import * as THREE from '../vendor/three.module.js';
import { GLTFLoader } from '../vendor/GLTFLoader.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { RoomEnvironment } from '../vendor/RoomEnvironment.js';
import { exhibits } from './exhibits.js';

const $=id=>document.getElementById(id),canvas=$('viewer');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let current=0,tour=null,ticket=0,controller=null,activeModel=null,scene,renderer,camera,controls,pedestal,ready=false;
const ar=new Intl.NumberFormat('ar-SA');let rotate=!reduced.matches,frameTime=0,fitDistance=5;
const status=$('model-status'),remote=$('online-viewer');
function tell(message){status.textContent=message;status.hidden=!message;}
function stopTour(){clearTimeout(tour);tour=null;$('tour').setAttribute('aria-pressed','false');$('tour').textContent='▷ جولة تلقائية';}
function scheduleTour(){if($('tour').getAttribute('aria-pressed')==='true'){clearTimeout(tour);tour=setTimeout(()=>select(current+1),12000);}}
function dispose(root){if(!root)return;const textures=new Set(),materials=new Set(),geometries=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m){materials.add(m);Object.values(m).forEach(t=>{if(t?.isTexture)textures.add(t);});}});textures.forEach(t=>{t.source?.data?.close?.();t.dispose();});materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());root.removeFromParent();}
function setup(){
 renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1,.01,100);camera.position.set(.35,.4,5);
 controls=new OrbitControls(camera,canvas);controls.enableDamping=true;controls.dampingFactor=.07;controls.enablePan=false;controls.autoRotate=rotate;controls.autoRotateSpeed=.7;controls.minPolarAngle=.1;controls.maxPolarAngle=Math.PI-.1;
 const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();scene.environment=pmrem.fromScene(room,.04).texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xffeddb,0x25483a,1.9));const key=new THREE.DirectionalLight(0xffe1ac,2.7);key.position.set(3,5,4);scene.add(key);const fill=new THREE.DirectionalLight(0xd3e7e4,1.7);fill.position.set(-3,1,-2);scene.add(fill);
 pedestal=new THREE.Group();const base=new THREE.Mesh(new THREE.CylinderGeometry(1.25,1.28,.14,96),new THREE.MeshStandardMaterial({color:0x1c2c25,metalness:.28,roughness:.4}));pedestal.add(base);const trim=new THREE.Mesh(new THREE.TorusGeometry(1.25,.008,8,100),new THREE.MeshStandardMaterial({color:0xb08b50,metalness:.7,roughness:.4}));trim.rotation.x=Math.PI/2;trim.position.y=.04;pedestal.add(trim);scene.add(pedestal);
 function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();if(activeModel)fit(false);}
 new ResizeObserver(resize).observe(canvas);resize();
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();ready=false;tell('توقف العرض ثلاثي الأبعاد. أعد تحميل الصفحة لاستعادته.');});
 function animate(t){requestAnimationFrame(animate);const dt=Math.min((t-frameTime)/1000,.05);frameTime=t;if(document.hidden||remote.hidden===false)return;controls.update(dt);renderer.render(scene,camera);}requestAnimationFrame(animate);ready=true;
}
function fit(reset=true){
 if(!activeModel)return;const box=new THREE.Box3().setFromObject(activeModel),size=box.getSize(new THREE.Vector3());
 const v=THREE.MathUtils.degToRad(camera.fov)/2,h=Math.atan(Math.tan(v)*camera.aspect);
 fitDistance=Math.max(size.y/(2*Math.tan(v)),size.x/(2*Math.tan(h)),size.z)*1.45+size.z/2;
 controls.minDistance=fitDistance*.45;controls.maxDistance=fitDistance*2.4;
 if(reset){controls.target.set(0,0,0);camera.position.set(fitDistance*.12,fitDistance*(exhibits[current].elevation??.32),fitDistance);controls.update();controls.saveState();}
 else if(camera.position.length()<fitDistance*.85){camera.position.setLength(fitDistance);controls.update();}
}
async function select(index){
 current=(index+exhibits.length)%exhibits.length;const item=exhibits[current],token=++ticket;controller?.abort();controller=null;clearTimeout(tour);
 $('retry-model').hidden=true;$('viewer-error').hidden=true;remote.replaceChildren();remote.hidden=true;
 if(activeModel){dispose(activeModel);activeModel=null;}if(pedestal)pedestal.visible=false;
 for(const key of ['title','subtitle','category','material','description','provenance'])$('item-'+key).textContent=item[key];
 $('position').textContent=`${String(current+1).padStart(2,'0')} / ${String(exhibits.length).padStart(2,'0')}`;
 $('item-number').textContent=`المقتنى ${String(current+1).padStart(2,'0')}`;$('item-count').textContent=`${ar.format(current+1)} من ${ar.format(exhibits.length)}`;
 $('model-credit').textContent='تصميم: '+item.author;$('model-source').href=item.source;$('model-license').href=item.licenseUrl;$('model-license').textContent=item.license;$('model-modifications').textContent=item.modifications;
 [...$('collection').children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)));
 $('announcement').textContent=`${item.title}، ${current+1} من ${exhibits.length}`;
 canvas.setAttribute('aria-label',`${item.title}. اسحب للدوران، واستخدم أزرار التقريب.`);
 $('rotation').hidden=!!item.embed;document.querySelector('.zoom-tools').hidden=!!item.embed;
 if(item.embed){
  canvas.hidden=true;remote.hidden=false;$('model-kind').textContent='عرض متصل • Sketchfab';
  tell('هذا المجسم معروض من Sketchfab. اضغط لفتحه هنا.');
  const open=document.createElement('button');open.className='primary online-open';open.textContent='عرض المجسم التفاعلي';
  open.onclick=()=>{remote.replaceChildren();const iframe=document.createElement('iframe');iframe.title=item.title+' — عرض تفاعلي من Sketchfab';iframe.src=`https://sketchfab.com/models/${item.embed}/embed?autostart=1&autospin=0.12&ui_infos=0&ui_watermark_link=1`;iframe.allow='autoplay; fullscreen; xr-spatial-tracking';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.onload=()=>{if(token===ticket)tell('');};remote.append(iframe);tell('جارٍ فتح العرض المتصل…');setTimeout(()=>{if(token===ticket&&!status.hidden)tell('إذا لم يظهر المجسم، افتح «صفحة النموذج» من رابط المصدر.');},18000);};
  remote.append(open);scheduleTour();return;
 }
 canvas.hidden=false;$('model-kind').textContent='مجسم GLB • اسحب للاستكشاف';
 if(!ready){tell('تعذّر تهيئة WebGL. جرّب متصفحًا حديثًا مع تفعيل تسريع الرسوم.');return;}
 tell(`جارٍ تحميل ${item.title}… ${(item.bytes/1048576).toFixed(1)} MB`);controller=new AbortController();
 try{
  const response=await fetch(item.file,{signal:controller.signal});if(!response.ok)throw new Error('HTTP '+response.status);
  const bytes=await response.arrayBuffer();if(token!==ticket)return;
  const gltf=await new GLTFLoader().parseAsync(bytes,new URL('../../',import.meta.url).href);
  if(token!==ticket){dispose(gltf.scene);return;}
  const model=gltf.scene;if(item.rotationY)model.rotation.y+=item.rotationY;model.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
  const max=Math.max(size.x,size.y,size.z);if(!Number.isFinite(max)||max<=0)throw new Error('Invalid model bounds');
  const scale=2.35/max;const group=new THREE.Group();model.position.sub(center);group.add(model);group.scale.setScalar(scale);scene.add(group);activeModel=group;
  pedestal.position.y=-size.y*scale/2-.09;pedestal.visible=true;fit(true);tell('');scheduleTour();
 }catch(error){if(error.name==='AbortError'||token!==ticket)return;console.error(error);tell('تعذّر تحميل المجسم. تأكد من وجود ملفه وتشغيل المشروع عبر خادم محلي.');$('retry-model').hidden=false;scheduleTour();}
}
exhibits.forEach((item,index)=>{const button=document.createElement('button');button.textContent=item.title+(item.embed?' · متصل':'');button.title=item.embed?'عرض إضافي يحتاج اتصالًا بالإنترنت':'مجسم مرفق بالمشروع';button.setAttribute('aria-pressed','false');button.onclick=()=>select(index);$('collection').append(button);});
try{setup();}catch(error){console.error(error);tell('هذا الجهاز لا يدعم العرض ثلاثي الأبعاد. تبقى النصوص والمصادر متاحة.');}
$('next').onclick=()=>select(current+1);$('previous').onclick=()=>select(current-1);$('retry-model').onclick=()=>select(current);
function zoom(factor){if(!ready||!activeModel)return;const offset=camera.position.clone().sub(controls.target);offset.setLength(THREE.MathUtils.clamp(offset.length()*factor,controls.minDistance,controls.maxDistance));camera.position.copy(controls.target).add(offset);controls.update();}
$('zoom-in').onclick=()=>zoom(.85);$('zoom-out').onclick=()=>zoom(1.18);$('reset').onclick=()=>fit(true);
function updateRotation(){if(controls)controls.autoRotate=rotate;$('rotation').textContent=rotate?'إيقاف الدوران':'تشغيل الدوران';$('rotation').setAttribute('aria-pressed',String(rotate));}
$('rotation').onclick=()=>{rotate=!rotate;updateRotation();};reduced.addEventListener('change',()=>{rotate=!reduced.matches;updateRotation();});updateRotation();
$('tour').onclick=()=>{if($('tour').getAttribute('aria-pressed')==='true')stopTour();else{$('tour').setAttribute('aria-pressed','true');$('tour').textContent='Ⅱ إيقاف الجولة';scheduleTour();}};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('announcement').textContent='ملء الشاشة غير متاح في هذا المتصفح.';}};
if(!document.fullscreenEnabled)$('fullscreen').hidden=true;
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'⛶ إنهاء ملء الشاشة':'⛶ ملء الشاشة';});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTour();});
document.addEventListener('keydown',event=>{if(/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;if(event.key==='ArrowLeft'){event.preventDefault();select(current+1);}if(event.key==='ArrowRight'){event.preventDefault();select(current-1);}if(event.key==='Escape')stopTour();});
canvas.addEventListener('keydown',event=>{if(!ready)return;const k=event.key.toLowerCase();if(k==='+'||k==='='){zoom(.85);event.preventDefault();}if(k==='-'){zoom(1.18);event.preventDefault();}if(k==='a'||k==='d'){camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),k==='a'?-.15:.15);controls.update();event.preventDefault();}});
async function community(){try{const r=await fetch('/api/exhibits');if(!r.ok)return;const data=await r.json();if(!data.items?.length)return;$('community-items').replaceChildren();for(const item of data.items){const card=document.createElement('article');card.className='community-card';if(item.has_image){const image=document.createElement('img');image.src='/api/image?id='+encodeURIComponent(item.id);image.alt=item.title;image.loading='lazy';card.append(image);}const h=document.createElement('h2');h.textContent=item.title;const p=document.createElement('p');p.textContent=item.body;const meta=document.createElement('p');meta.className='meta';meta.textContent=[item.place,item.source,item.contributor?'مساهمة: '+item.contributor:'مساهمة مجتمعية'].filter(Boolean).join(' · ');card.append(h,p,meta);$('community-items').append(card);}}catch{/* The server is not configured or not reachable. */}}
await select(0);community();
