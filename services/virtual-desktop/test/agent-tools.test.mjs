import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { parseToolSelection, publicAgentTools, selectAgentTool } from '../agent-tools.mjs';
import { buildHandler } from '../server.mjs';

const token='x'.repeat(40);
const sandboxId='da9ec846-473e-4779-be41-5fe8d5daf785';
const headers={'authorization':'Bearer '+token,'content-type':'application/json'};
const localTask='Abre Mousepad en sbmeridian y escribe una nota local de prueba.';
const answerCall=text=>({choices:[{message:{tool_calls:[{
  type:'function',function:{name:'respond_to_user',arguments:JSON.stringify({answer:text})}
}]}}]});
const desktopCall=purpose=>({choices:[{message:{tool_calls:[{
  type:'function',function:{name:'use_daytona_computer',arguments:JSON.stringify({purpose})}
}]}}]});
const fakeFetch=response=>async (_url,options)=>{
  const data=JSON.parse(options.body);
  assert.equal(data.tool_choice,'required');
  assert.deepEqual(data.tools.map(x=>x.function.name),['use_daytona_computer','list_repository_files','read_repository_file','respond_to_user']);
  return new Response(JSON.stringify(response),{status:200});
};
async function serve(handler,fn) {
  const server=createServer(handler).listen(0,'127.0.0.1');
  await new Promise(r=>server.once('listening',r));
  try {await fn('http://127.0.0.1:'+server.address().port);}
  finally {await new Promise(r=>server.close(r));}
}
test('registry exposes only the two declared tool schemas',()=>{
  assert.deepEqual(publicAgentTools().map(x=>x.name),['use_daytona_computer','list_repository_files','read_repository_file','respond_to_user']);
  for(const t of publicAgentTools()) assert.ok(t.description.length>20);
});
test('model selects an actual local desktop capability with unmodified user task',async()=>{
  const choice=await selectAgentTool({
    prompt:localTask,agent:'Coder',apiKey:'private-model-key',
    modelFetch:fakeFetch(desktopCall('Edit local text')),
  });
  assert.deepEqual(choice,{
    kind:'tool_call',tool:'desktop.run_local_task',
    arguments:{task:localTask,agent:'Coder'},requiresApproval:false,
  });
});
test('normal model response is not claimed to be a tool execution',async()=>{
  const choice=await selectAgentTool({
    prompt:'Explica qué es TypeScript',agent:'Architect',apiKey:'private-key',
    modelFetch:fakeFetch(answerCall('TypeScript añade tipos a JavaScript.')),
  });
  assert.deepEqual(choice,{kind:'answer',text:'TypeScript añade tipos a JavaScript.',modelUsed:true,sources:[]});
});
test('model cannot rewrite destructive user instruction into safe desktop task',()=>{
  const unsafe='Abre Mousepad y borra todos los archivos de la computadora';
  assert.throws(
    ()=>parseToolSelection(desktopCall('just open a local editor'),unsafe,'Coder'),
    e=>e.code===403,
  );
});
test('Spanish imperative forms cannot bypass local tool policy',()=>{
  for (const input of [
    'Abre Mousepad y borra todas las notas',
    'Abre Mousepad y elimina el documento anterior',
    'Abre el editor y sube todo a internet',
    'Abre Mousepad y publica mis archivos'
  ]) {
    assert.throws(
      ()=>parseToolSelection(desktopCall('just edit a local text'),input,'Coder'),
      e=>e.code===403,
    );
  }
});
test('unknown, malformed, duplicated, and non-tool responses cannot execute',()=>{
  const broken=[
    {choices:[{message:{content:'I will open the desktop now'}}]},
    {choices:[{message:{tool_calls:[{type:'function',function:{name:'run_terminal_command',arguments:'{}'}}]}}]},
    {choices:[{message:{tool_calls:[
      {type:'function',function:{name:'use_daytona_computer',arguments:'{"purpose":"ok"}'}},
      {type:'function',function:{name:'respond_to_user',arguments:'{"answer":"ok"}'}}
    ]}}]},
    {choices:[{message:{tool_calls:[{type:'function',function:{name:'use_daytona_computer',arguments:'{'}}]}}]},
    desktopCall('x').choices[0].message.tool_calls.map(x=>x),
  ];
  for(const response of broken) assert.throws(()=>parseToolSelection(response,localTask,'Coder'));
  assert.throws(
    ()=>parseToolSelection(answerCall(''),localTask,'Coder'),
    e=>e.code===502,
  );
});
test('authenticated endpoint exposes capabilities and chooses tools; anonymous access denied',async()=>{
  let touchesDaytona=0;
  const handler=buildHandler({
    getDaytona:async()=>{touchesDaytona++;throw Error('Sandbox should not be started at plan stage');},
    accessToken:token,daytonaKey:'configured',sandboxId,
    visionKey:'router-key',
    modelFetch:fakeFetch(desktopCall('local editor')),
  });
  await serve(handler,async url=>{
    const base=url+'/api/agents/plan';
    assert.equal((await fetch(base,{method:'POST',headers:{'content-type':'application/json'},
      body:JSON.stringify({agent:'Coder',prompt:localTask})})).status,401);
    const listing=await fetch(url+'/api/agents/tools',{headers});
    assert.equal(listing.status,200);
    const data=await listing.json();
    assert.deepEqual(data.tools.map(x=>x.name),['use_daytona_computer','list_repository_files','read_repository_file','respond_to_user']);
    const selected=await fetch(base,{method:'POST',headers,
      body:JSON.stringify({agent:'Coder',prompt:localTask})});
    assert.equal(selected.status,200);
    assert.equal((await selected.json()).tool,'desktop.run_local_task');
    assert.equal(touchesDaytona,0);
  });
});
