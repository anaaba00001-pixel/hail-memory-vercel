import test from 'node:test';
import assert from 'node:assert/strict';
import planHandler from '../api/plan.js';

function request(body){return{method:'POST',headers:{'content-type':'application/json'},socket:{remoteAddress:`test-${Math.random()}`},body};}
function response(){return{statusCode:200,headers:{},setHeader(key,value){this.headers[key]=value;},end(data){this.data=data;}};}
async function call(body){const res=response();await planHandler(request(body),res);return{...res,json:JSON.parse(res.data)};}
function analysis(overrides={}){return{requested_categories:['cafe'],required_features:['quiet'],excluded_categories:['market'],excluded_features:[],unknown_requirements:[],is_specific_enough:true,summary:'مقهى هادئ من دون أسواق',...overrides};}
function mockAI(result,{fail=false}={}){
  globalThis.fetch=async url=>{
    if(String(url).includes('overpass-api'))return new Response(JSON.stringify({elements:[]}),{status:200});
    assert.match(String(url),/^https:\/\/api\.groq\.com\/openai\/v1\/responses$/);
    if(fail)return new Response('unavailable',{status:503});
    return new Response(JSON.stringify({output_text:JSON.stringify(result)}),{status:200});
  };
}

test.beforeEach(()=>{process.env.GROQ_API_KEY='test-key';});
test.after(()=>{delete process.env.GROQ_API_KEY;});

test('quiet coffee without markets returns only the cafe documented as quiet',async()=>{
  mockAI(analysis());
  const result=await call({budget:200,duration:4,people:2,intent:'أبي قهوة هادئة بدون أسواق'});
  assert.equal(result.statusCode,200);
  assert.equal(result.json.plan.insufficient_data,false);
  assert.deepEqual(result.json.plan.stops.map(stop=>stop.name),['HAO | هاو']);
});

test('unknown required quality returns no speculative recommendations',async()=>{
  mockAI(analysis({required_features:[],unknown_requirements:['جلسات رومانسية موثقة']}));
  const result=await call({budget:200,duration:4,people:2,intent:'أبي مقهى رومانسي'});
  assert.equal(result.statusCode,200);
  assert.equal(result.json.plan.insufficient_data,true);
  assert.equal(result.json.plan.stops.length,0);
  assert.match(result.json.plan.intro,/لا تتوفر لدينا معلومات موثقة/);
});

test('exclusions are applied before selection and no schedule fillers are added',async()=>{
  mockAI(analysis({requested_categories:['history'],required_features:[],excluded_categories:['market']}));
  const result=await call({budget:0,duration:2,people:1,intent:'أبي مكان تاريخي بدون أسواق'});
  assert.equal(result.statusCode,200);
  assert(result.json.plan.stops.length>0);
  assert(!result.json.plan.stops.some(stop=>['سوق برزان الشعبي','أبراج برزان','سوق المباخر اليدوية'].includes(stop.name)));
  assert(result.json.plan.stops.every(stop=>/تاريخي|قلعة|قصر|متحف|أثر/.test(`${stop.type} ${stop.name}`)));
});

test('AI connection failure shows an error instead of fallback recommendations',async()=>{
  mockAI(null,{fail:true});
  const result=await call({budget:200,duration:4,people:2,intent:'أبي قهوة هادئة'});
  assert.equal(result.statusCode,503);
  assert.match(result.json.error,/تعذّر الاتصال بخدمة الذكاء الاصطناعي/);
  assert(!('plan' in result.json));
});

test('missing AI configuration is explicit and does not run a heuristic fallback',async()=>{
  delete process.env.GROQ_API_KEY;
  let calls=0;globalThis.fetch=async()=>{calls++;throw new Error('must not call');};
  const result=await call({budget:200,duration:4,people:2,intent:'أبي قهوة هادئة'});
  assert.equal(result.statusCode,503);
  assert.match(result.json.error,/غير مهيأة/);
  assert.equal(calls,0);
});
