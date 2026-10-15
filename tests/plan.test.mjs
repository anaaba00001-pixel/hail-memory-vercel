import test from 'node:test';
import assert from 'node:assert/strict';
import planHandler from '../api/plan.js';

function request(body){return{method:'POST',headers:{'content-type':'application/json'},socket:{remoteAddress:`test-${Math.random()}`},body};}
function response(){return{statusCode:200,headers:{},setHeader(key,value){this.headers[key]=value;},end(data){this.data=data;}};}
async function call(body){const res=response();await planHandler(request(body),res);return{...res,json:JSON.parse(res.data)};}

test('written intent produces a budget- and duration-safe fallback plan',async()=>{
  const oldKey=process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  globalThis.fetch=async()=>new Response(JSON.stringify({elements:[]}),{status:200});
  const result=await call({budget:100,duration:2,people:2,intent:'أبي مكان تاريخي هادئ للتصوير'});
  if(oldKey)process.env.OPENAI_API_KEY=oldKey;
  assert.equal(result.statusCode,200);
  assert.equal(result.json.plan.ai_generated,false);
  assert(result.json.plan.stops.length<=2);
  assert(result.json.plan.stops.reduce((sum,stop)=>sum+stop.estimated_cost,0)<=100);
  assert(result.json.plan.stops.reduce((sum,stop)=>sum+stop.duration_minutes,0)<=120);
});

test('AI ranking can select only catalog identifiers and is disclosed',async()=>{
  const oldKey=process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY='test-key';
  globalThis.fetch=async url=>String(url).includes('overpass-api')
    ? new Response(JSON.stringify({elements:[]}),{status:200})
    : new Response(JSON.stringify({output_text:JSON.stringify({title:'طلعة تراثية',intro:'اختيارات تناسب رغبتك.',matches:[{id:'place_0',reason:'قلعة تاريخية مناسبة لطلبك.'}]})}),{status:200});
  const result=await call({budget:100,duration:2,people:1,intent:'أبي قلعة وتاريخ'});
  if(oldKey)process.env.OPENAI_API_KEY=oldKey;else delete process.env.OPENAI_API_KEY;
  assert.equal(result.statusCode,200);
  assert.equal(result.json.plan.ai_generated,true);
  assert.equal(result.json.plan.stops[0].name,'قلعة أعيرف');
  assert.equal(result.json.plan.stops[0].reason,'قلعة تاريخية مناسبة لطلبك.');
});
