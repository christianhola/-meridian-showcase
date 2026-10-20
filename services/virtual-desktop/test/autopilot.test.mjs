import test from 'node:test';
import assert from 'node:assert/strict';
import {MAX_AUTO_STEPS,validateLocalGoal,validateLocalDecision,runLocalAutonomy,stopLocalRun,publicRun} from '../autopilot.mjs';

const fakeImage='AAABBB';
const fakeScreenshot=()=>({encoded:fakeImage,width:1024,height:768});
const sampleRun=()=>({id:'run-1',agent:'Coder',status:'starting',step:0,history:[],message:'',startedAt:'now',finishedAt:null,cancelled:false,controller:new AbortController()});
const makeModel=(decisions,requests=[])=>async (url,options)=>{
  requests.push({url,body:JSON.parse(options.body)});
  const decision=decisions.shift() || {decision:'finish',scope:'local_safe',summary:'Terminé'};
  return {ok:true,json:async()=>({choices:[{message:{content:JSON.stringify(decision)}}]})};
};
const mockSandbox=()=>{const events=[];return {events,computerUse:{
  screenshot:{takeCompressed:async()=>({screenshot:'fake'})},
  mouse:{click:async(x,y)=>events.push({type:'click',x,y})},
  keyboard:{type:async(text)=>events.push({type:'type',text}),press:async(key)=>events.push({type:'key',key})}
}}};
const act=action=>({decision:'act',scope:'local_safe',summary:'Acción local',action});
const execute=({run=sampleRun(),sandbox=mockSandbox(),decisions=[],modelFetch}={})=>runLocalAutonomy({
  run,sandbox,task:'Escribe una nota de prueba en el editor',agent:'Coder',
  modelKey:'mock',modelFetch:modelFetch||makeModel(decisions),
  screenshotToJpeg:fakeScreenshot,sleep:async()=>{},clock:()=>10
}).then(()=>({run,sandbox}));
test('local goal accepts editor task and rejects account, network, destructive work',()=>{
 assert.equal(validateLocalGoal('Escribe una nota en Mousepad','Coder'),'Escribe una nota en Mousepad');
 for(const t of ['eliminar todos los archivos','Comprar algo','open Chrome','mi contraseña','send an email','instalar programas','abre el navegador']) {
  assert.throws(()=>validateLocalGoal(t,'Browser'),/supervisión/);
 }
 assert.throws(()=>validateLocalGoal('texto','Invalid'),/válida/);
});
test('decisions allow bounded GUI only and never shell or dangerous text',()=>{
 assert.deepEqual(validateLocalDecision(act({type:'click',x:1,y:2}),1024,768).action,{type:'click',x:1,y:2});
 assert.throws(()=>validateLocalDecision(act({type:'click',x:1024,y:2}),1024,768),/fuera/);
 assert.throws(()=>validateLocalDecision(act({type:'shell',command:'test'}),1024,768),/Solo/);
 assert.throws(()=>validateLocalDecision(act({type:'type',text:'password = 123'}),1024,768),/fuera/);
 assert.throws(()=>validateLocalDecision({decision:'act',scope:'unknown',action:{type:'key',key:'enter'}},1024,768),/certificó/);
});
test('agent performs multi-step local task without asking each click',async()=>{
 const requests=[];
 const choices=[act({type:'click',x:17,y:20}),act({type:'type',text:'Una nota'}),{decision:'finish',summary:'Terminado'}];
 const {run,sandbox}=await execute({decisions:choices,modelFetch:makeModel(choices,requests)});
 assert.equal(run.status,'finished');assert.equal(run.step,2);
 assert.deepEqual(sandbox.events,[{type:'click',x:17,y:20},{type:'type',text:'Una nota'}]);
 assert.equal(requests.length,3);
 assert.ok(!JSON.stringify(publicRun(run)).includes('Una nota'));
});
test('unsafe model choice blocks run before GUI interaction',async()=>{
 const {run,sandbox}=await execute({decisions:[act({type:'shell',command:'foo'})]});
 assert.equal(run.status,'error');assert.equal(sandbox.events.length,0);
});
test('operator cancellation prevents next step and exposes cancelled status',async()=>{
 const run=sampleRun();const sandbox=mockSandbox();
 let calls=0;
 const modelFetch=async()=>{calls++;stopLocalRun(run);return {ok:true,json:async()=>({choices:[{message:{content:JSON.stringify(act({type:'click',x:10,y:10}))}}]})}};
 await execute({run,sandbox,modelFetch});
 assert.equal(run.status,'cancelled');assert.deepEqual(sandbox.events,[]);assert.equal(calls,1);
});
test('maximum steps prevents infinite agent loops',async()=>{
 let n=0;
 const modelFetch=async()=>({ok:true,json:async()=>({choices:[{message:{content:JSON.stringify(act({type:'click',x:++n,y:10}))}}]})});
 const {run,sandbox}=await execute({modelFetch});
 assert.equal(run.status,'limit_reached');assert.equal(run.step,MAX_AUTO_STEPS);assert.equal(sandbox.events.length,MAX_AUTO_STEPS);
});
test('provider unavailable is not reported as success',async()=>{
 const {run}=await execute({modelFetch:async()=>({ok:false,status:429})});
 assert.equal(run.status,'error');assert.equal(run.step,0);
});
