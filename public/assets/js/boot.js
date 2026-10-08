'use strict';
(async()=>{
 const message=document.getElementById('model-status');
 if(location.protocol==='file:'){
  message.textContent='افتح رابط الموقع على Vercel، أو شغّل npm run dev من مجلد المشروع. فتح الملف بالنقر المزدوج لا يشغّل المتحف.';
  document.getElementById('viewer-error').hidden=true;
  return;
 }
 try{await import('./museum.js');}catch(error){console.error(error);message.textContent='تعذّر بدء المتحف. تأكد من فك ضغط المجلد كاملًا وتشغيله عبر خادم محلي، ثم أعد تحميل الصفحة.';}
})();
