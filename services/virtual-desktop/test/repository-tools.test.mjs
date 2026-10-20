import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectRepository, validatePath, validateRepo } from '../repository-tools.mjs';
import { parseToolSelection, selectAgentTool } from '../agent-tools.mjs';

const community='christianhola/-meridian-showcase';
const agents='christianhola/meridian-agents-v2';
const wrap=x=>new Response(JSON.stringify(x),{status:200});
const tree={tree:[
  {type:'blob',path:'README.md'},
  {type:'blob',path:'src/App.tsx'},
  {type:'blob',path:'services/virtual-desktop/agent-tools.mjs'},
  {type:'blob',path:'.env'},
  {type:'blob',path:'private-keys/deploy.pem'},
  {type:'tree',path:'src'},
],truncated:false};
function githubFake(url,options){
  assert.equal(new URL(url).hostname,'api.github.com');
  assert.equal(options.method,'GET');
  assert.ok(url.includes('/repos/christianhola/'));
  if(url.includes('/git/trees/'))return Promise.resolve(wrap(tree));
  if(url.includes('/contents/README.md')){
    const value='# Meridian Showcase\\nReal repo read verified.';
    return Promise.resolve(wrap({type:'file',encoding:'base64',size:value.length,
      content:Buffer.from(value).toString('base64')}));
  }
  throw Error('Unexpected path: '+url);
}
const toolCall=(name,args)=>({
  choices:[{message:{tool_calls:[{id:'test-tool',type:'function',
    function:{name,arguments:JSON.stringify(args)}}]}}]
});

test('repository inspection lists real files and filters sensitive paths',async()=>{
  const out=await inspectRepository({tool:'list_repository_files',args:{repository:community},fetchImpl:githubFake});
  assert.equal(out.repository,community);
  assert.equal(out.count,3);
  assert.deepEqual(out.files,['README.md','src/App.tsx','services/virtual-desktop/agent-tools.mjs']);
  assert.equal(out.source,'https://github.com/'+community+'/tree/main');
  assert.equal(out.readonly,true);
});
test('repository read returns actual decoded contents with a grounded source',async()=>{
  const out=await inspectRepository({
    tool:'read_repository_file',args:{repository:community,path:'README.md'},fetchImpl:githubFake
  });
  assert.match(out.contents,/Real repo read verified/);
  assert.equal(out.source,'https://github.com/'+community+'/blob/main/README.md');
  assert.equal(out.readonly,true);
});
test('no model text or tool arguments can escape repository allowlist',async()=>{
  assert.throws(()=>validateRepo('christianhola/meridian-api'),/solo puede inspeccionar/);
  assert.throws(()=>validateRepo('someone-else/private'),/solo puede inspeccionar/);
  for(const path of ['../.env','/etc/passwd','src/../../.env','src/.env','private-keys/id.pem','lib\\\\secrets.txt','README.md?ref=other','src/']){
    assert.throws(()=>validatePath(path));
  }
  for(const repository of ['christianhola/meridian-api','attacker/data']){
    await assert.rejects(inspectRepository({tool:'list_repository_files',args:{repository},fetchImpl:githubFake}));
  }
  assert.throws(()=>validateRepo(agents),/solo puede inspeccionar/);
});
test('multi-step Coder reads GitHub file before reporting the result',async()=>{
  let calls=0;
  const modelFetch=async(_url,opts)=>{
    const body=JSON.parse(opts.body);
    assert.ok(body.tools.some(t=>t.function.name==='read_repository_file'));
    assert.equal(body.tool_choice,'required');
    if(calls++===0){
      assert.ok(body.messages.some(m=>m.content?.includes('Verified GitHub repository file listing')));
      return wrap(toolCall('read_repository_file',{repository:community,path:'README.md'}));
    }
    assert.ok(body.messages.some(m=>m.role==='tool' && m.content.includes('Real repo read verified')));
    assert.ok(body.messages.some(m=>m.role==='assistant' && m.tool_calls?.length===1));
    return wrap(toolCall('respond_to_user',{answer:'Leí el README real de Meridian. Contiene la descripción del proyecto.'}));
  };
  const result=await selectAgentTool({
    prompt:'Revisa mi repositorio en GitHub y dime qué contiene el README',
    agent:'Coder',apiKey:'test',modelFetch,repoFetch:githubFake
  });
  assert.equal(calls,2);
  assert.equal(result.kind,'answer');
  assert.match(result.text,/Leí el README/);
  assert.deepEqual(result.sources,[
    'https://github.com/'+community+'/tree/main',
    'https://github.com/'+community+'/blob/main/README.md',
  ]);
});
test('private meridian-agents-v2 prompts disclose lack of repo grant without fetching or inventing files',async()=>{
  const result=await selectAgentTool({
    prompt:'Revisa mi repositorio meridian-agents-v2 en GitHub',
    agent:'Coder',apiKey:'test',repoFetch:()=>{throw Error('Private repo must not be fetched');},
    modelFetch:()=>{throw Error('No model invocation needed when access is missing');}
  });
  assert.equal(result.kind,'answer');
  assert.match(result.text,/privado/);
  assert.match(result.text,/read:user/);
  assert.deepEqual(result.sources,[]);
});
test('agent cannot choose repo file tool with invalid path or unknown repo',()=>{
  const bad=toolCall('read_repository_file',{repository:community,path:'../../.env'});
  assert.equal(parseToolSelection(bad,'Revisa mi repo','Coder').kind,'repository_tool');
  // Path is validated again by the executor, never by untrusted model output.
  assert.throws(()=>validatePath('../../.env'));
  assert.throws(()=>parseToolSelection(
    toolCall('read_repository_file',{repository:'other/repo',path:'README.md'}),'Revisa mi repo','Coder'));
});
