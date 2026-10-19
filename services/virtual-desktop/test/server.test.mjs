import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { buildHandler, validToken, sandboxCreateParams } from '../server.mjs';
const token='x'.repeat(40);
const start=async handler=>{const server=createServer(handler).listen(0);await new Promise(r=>server.once('listening',r));return{server,url:'http://127.0.0.1:'+server.address().port};};
test('credentials use exact match and minimum length',()=>{
 assert.equal(validToken(token,token),true);assert.equal(validToken('y'.repeat(40),token),false);assert.equal(validToken('x','x'),false);
});
test('unconfigured production never enables tools',async()=>{
 const {server,url}=await start(buildHandler({getDaytona:()=>{throw Error('should not run')},accessToken:token,daytonaKey:''}));
 try{assert.equal((await(await fetch(url+'/health')).json()).configured,false);assert.equal((await fetch(url+'/api/desktops',{method:'POST'})).status,503);}finally{server.close();}
});
test('provider is invoked, disallowed operations blocked and sandbox deleted',async()=>{
 const calls=[];
 const sandbox={computerUse:{start:async()=>calls.push('start'),screenshot:{takeCompressed:async()=>({screenshot:'ZGVtbw==',width:1280,height:800})},mouse:{click:async()=>calls.push('click')},keyboard:{type:async()=>calls.push('type'),press:async()=>calls.push('press')}},process:{executeCommand:async()=>({exitCode:0,result:'installed'})},delete:async()=>calls.push('delete')};
 const {server,url}=await start(buildHandler({getDaytona:async()=>({create:async()=>sandbox}),daytonaKey:'key',accessToken:token}));
 const headers={authorization:'Bearer '+token,'content-type':'application/json'};
 try{
  assert.equal((await fetch(url+'/api/desktops',{method:'POST'})).status,401);
  const response=await fetch(url+'/api/desktops',{method:'POST',headers});assert.equal(response.status,202);
  const {id}=await response.json();await new Promise(r=>setTimeout(r,50));assert.ok(calls.includes('start'));
  assert.equal((await(await fetch(url+'/api/desktops/'+id,{headers})).json()).status,'ready');
  const frame=await(await fetch(url+'/api/desktops/'+id+'/screenshot',{headers})).json();assert.equal(frame.width,1280);
  assert.equal((await fetch(url+'/api/desktops/'+id+'/action',{method:'POST',headers,body:JSON.stringify({type:'shell',command:'whoami'})})).status,400);
  assert.equal((await fetch(url+'/api/desktops/'+id+'/action',{method:'POST',headers,body:JSON.stringify({type:'click',x:3,y:3})})).status,200);
  assert.equal((await fetch(url+'/api/desktops/'+id,{method:'DELETE',headers})).status,200);assert.ok(calls.includes('delete'));
 } finally { server.close(); }
});

test('default snapshot follows Daytona region availability and cloud sessions are ephemeral', () => {
  const standard = sandboxCreateParams('abcdefgh-1234', '');
  assert.equal('snapshot' in standard, false);
  assert.equal(standard.name, 'meridian-abcdefgh');
  assert.equal(standard.public, false);
  assert.equal(standard.ephemeral, true);
  assert.equal(standard.ttlMinutes, 30);
  const custom = sandboxCreateParams('abcdefgh-1234', 'team-linux-desktop');
  assert.equal(custom.snapshot, 'team-linux-desktop');
});
