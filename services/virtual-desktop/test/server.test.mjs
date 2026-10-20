import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { buildHandler, validToken, jpegDimensions } from '../server.mjs';

const token='x'.repeat(40);
const jpegFixture=Buffer.from([
  0xff,0xd8,0xff,0xe0,0x00,0x04,0x00,0x00,
  0xff,0xc0,0x00,0x11,0x08,0x03,0x20,0x05,0x00,
  0x03,0x01,0x11,0x00,0x02,0x11,0x00,0x03,0x11,0x00,
  0xff,0xd9
]).toString('base64');
const sandboxId='da9ec846-473e-4779-be41-5fe8d5daf785';
const headers={authorization:'Bearer '+token,'content-type':'application/json'};
const start=async handler=>{
  const server=createServer(handler).listen(0);
  await new Promise(resolve=>server.once('listening',resolve));
  return {server,url:'http://127.0.0.1:'+server.address().port};
};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function awaitReady(url,id) {
  for(let i=0;i<40;i++){
    const response=await fetch(url+'/api/desktops/'+id,{headers});
    const result=await response.json();
    if(result.status==='ready'||result.status==='error')return result;
    await sleep(10);
  }
  throw Error('desktop did not become ready');
}
function fakeProvider({initialState='archived',graphic=true}={}) {
  const calls=[];
  const sandbox={
    id:sandboxId, name:'sbmeridian', state:initialState,
    start:async()=>{calls.push('sandbox.start');sandbox.state='started';},
    delete:async()=>calls.push('delete'),
    stop:async()=>calls.push('stop'),
    computerUse:{
      start:async()=>{calls.push('computerUse.start');if(!graphic)throw Error('No desktop packages');},
      screenshot:{takeCompressed:async()=>({screenshot:jpegFixture})},
      mouse:{click:async()=>calls.push('click')},
      keyboard:{type:async()=>calls.push('type'),press:async()=>calls.push('press')}
    },
    process:{executeCommand:async()=>({exitCode:0,result:'installed'})}
  };
  const sdk={
    get:async id=>{calls.push('get:'+id);return sandbox;},
    create:async()=>{calls.push('create');throw Error('CREATE MUST NEVER BE CALLED');}
  };
  return {calls,sdk,sandbox};
}
const serverHandler=(data, opts={})=>buildHandler({getDaytona:async()=>data.sdk,daytonaKey:'key',accessToken:token,sandboxId,...opts});

test('only long constant-time credentials authenticate',()=>{
  assert.equal(validToken(token,token),true);
  assert.equal(validToken('y'.repeat(40),token),false);
  assert.equal(validToken('x','x'),false);
});
test('unconfigured service blocks desktop creation',async()=>{
  const data=fakeProvider();
  const {server,url}=await start(buildHandler({getDaytona:async()=>data.sdk,accessToken:token,daytonaKey:'key',sandboxId:''}));
  try {
    assert.equal((await(await fetch(url+'/health')).json()).configured,false);
    assert.equal((await fetch(url+'/api/desktops',{method:'POST',headers})).status,503);
    assert.deepEqual(data.calls,[]);
  }finally{server.close();}
});
test('archived existing sbmeridian is started, controlled and preserved',async()=>{
  const data=fakeProvider();
  const {server,url}=await start(serverHandler(data));
  try {
    assert.equal((await(await fetch(url+'/health')).json()).configured,true);
    assert.equal((await fetch(url+'/api/desktops',{method:'POST'})).status,401);
    const response=await fetch(url+'/api/desktops',{method:'POST',headers});
    assert.equal(response.status,202);
    const {id,reused}=await response.json();
    assert.equal(reused,true);
    const state=await awaitReady(url,id);
    assert.equal(state.status,'ready');
    assert.equal(state.sandboxId,sandboxId);
    assert.deepEqual(data.calls.slice(0,3),['get:'+sandboxId,'sandbox.start','computerUse.start']);
    const second=await fetch(url+'/api/desktops',{method:'POST',headers});
    assert.equal(second.status,409);
    const frame=await(await fetch(url+'/api/desktops/'+id+'/screenshot',{headers})).json();
    assert.equal(frame.width,1280);
    assert.equal(frame.height,800);
    const disallowed=await fetch(url+'/api/desktops/'+id+'/action',{method:'POST',headers,body:JSON.stringify({type:'shell',command:'uname -a'})});
    assert.equal(disallowed.status,400);
    const clicked=await fetch(url+'/api/desktops/'+id+'/action',{method:'POST',headers,body:JSON.stringify({type:'click',x:3,y:3})});
    assert.equal(clicked.status,200);
    assert.ok(data.calls.includes('click'));
    const badPoint=await fetch(url+'/api/desktops/'+id+'/action',{method:'POST',headers,body:JSON.stringify({type:'click',x:1300,y:3})});
    assert.equal(badPoint.status,400);
    const removed=await(await fetch(url+'/api/desktops/'+id,{method:'DELETE',headers})).json();
    assert.deepEqual(removed,{disconnected:true,preserved:true});
    assert.ok(!data.calls.includes('delete'));
    assert.ok(!data.calls.includes('stop'));
    assert.ok(!data.calls.includes('create'));
    assert.equal((await fetch(url+'/api/desktops/'+id,{headers})).status,404);
  }finally{server.close();}
});
test('started machine is not started a second time',async()=>{
  const data=fakeProvider({initialState:'started'});
  const {server,url}=await start(serverHandler(data));
  try {
    const {id}=await(await fetch(url+'/api/desktops',{method:'POST',headers})).json();
    assert.equal((await awaitReady(url,id)).status,'ready');
    assert.ok(!data.calls.includes('sandbox.start'));
    assert.ok(data.calls.includes('computerUse.start'));
  }finally{server.close();}
});
test('desktop setup failure surfaces error without touching existing machine lifecycle',async()=>{
  const data=fakeProvider({graphic:false});
  const {server,url}=await start(serverHandler(data));
  try {
    const {id}=await(await fetch(url+'/api/desktops',{method:'POST',headers})).json();
    const state=await awaitReady(url,id);
    assert.equal(state.status,'error');
    assert.match(state.message,/Computer Use/);
    const shot=await fetch(url+'/api/desktops/'+id+'/screenshot',{headers});
    assert.equal(shot.status,409);
    await fetch(url+'/api/desktops/'+id,{method:'DELETE',headers});
    assert.ok(!data.calls.includes('delete'));
    assert.ok(!data.calls.includes('stop'));
  }finally{server.close();}
});
test('unexpected sandbox UUID never starts a different computer',async()=>{
  const data=fakeProvider();
  data.sandbox.id='different-uuid';
  const {server,url}=await start(serverHandler(data));
  try {
    const {id}=await(await fetch(url+'/api/desktops',{method:'POST',headers})).json();
    const state=await awaitReady(url,id);
    assert.equal(state.status,'error');
    assert.ok(!data.calls.includes('sandbox.start'));
    assert.ok(!data.calls.includes('delete'));
  }finally{server.close();}
});

test('reads JPEG SOF dimensions and rejects malformed screenshots',()=>{
  assert.deepEqual(jpegDimensions(jpegFixture),{width:1280,height:800});
  assert.throws(()=>jpegDimensions(Buffer.from('not jpeg').toString('base64')),/JPEG inválida/);
});
