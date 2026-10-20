import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { buildHandler } from '../server.mjs';

const ownerId='245952046';
const sandboxId='da9ec846-473e-4779-be41-5fe8d5daf785';
const origin='https://christianhola.github.io';
const callbackUrl='https://meridian-virtual-desktop-production.up.railway.app/auth/github/callback';
const returnUrl='https://christianhola.github.io/-meridian-showcase/agents/';
const json=async response=>response.json();

async function withServer(handler,task) {
  const server=createServer(handler).listen(0,'127.0.0.1');
  await new Promise(resolve=>server.once('listening',resolve));
  try { await task('http://127.0.0.1:'+server.address().port); }
  finally { await new Promise(resolve=>server.close(resolve)); }
}
function configured(overrides={}) {
  return buildHandler({
    accessToken:'L'.repeat(40),daytonaKey:'configured-daytona',sandboxId,
    getDaytona:async()=>({get:async()=>({id:sandboxId,state:'started',
      computerUse:{start:async()=>{}}})}),
    ownerOAuth:{
      clientId:'oauth-client',clientSecret:'oauth-secret',ownerId,
      callbackUrl,returnUrl,
      fetchImpl:async (url,options)=> {
        if (url.includes('access_token')) {
          assert.equal(options.body.includes('oauth-secret'),true);
          return new Response(JSON.stringify({access_token:'gho-test-private'}),{status:200});
        }
        if (url.endsWith('/user')) {
          assert.equal(options.headers.authorization,'Bearer gho-test-private');
          return new Response(JSON.stringify({id:ownerId}),{status:200});
        }
        throw Error('Unexpected GitHub endpoint');
      },
      ...overrides
    }
  });
}
test('OAuth disabled by default when provider credentials are missing',async()=>{
  await withServer(buildHandler({accessToken:'L'.repeat(40),daytonaKey:'k',sandboxId,getDaytona:async()=>({})}),
    async url=>{
      const config=await json(await fetch(url+'/auth/config'));
      assert.equal(config.configured,false);
      assert.equal((await fetch(url+'/auth/github/start')).status,503);
    });
});
test('owner GitHub login exchanges single-use ticket for hidden desktop session',async()=>{
  await withServer(configured(),async url=>{
    const config=await json(await fetch(url+'/auth/config'));
    assert.equal(config.configured,true);
    const start=await fetch(url+'/auth/github/start',{redirect:'manual'});
    assert.equal(start.status,302);
    const authorize=new URL(start.headers.get('location'));
    assert.equal(authorize.hostname,'github.com');
    assert.equal(authorize.searchParams.get('redirect_uri'),callbackUrl);
    const state=authorize.searchParams.get('state');
    assert.ok(state?.length >= 64);
    const callback=await fetch(url+'/auth/github/callback?code=good&state='+state,{redirect:'manual'});
    assert.equal(callback.status,302);
    assert.ok(callback.headers.get('location').startsWith(returnUrl+'#desktop_auth='));
    const ticket=callback.headers.get('location').split('#desktop_auth=')[1];
    assert.equal(ticket.length,64);
    // A stolen ticket cannot be exchanged cross-origin from another website.
    const wrongOrigin=await fetch(url+'/auth/exchange',{method:'POST',headers:{origin:'https://evil.example',
      'content-type':'application/json'},body:JSON.stringify({ticket})});
    assert.equal(wrongOrigin.status,403);
    const exchanged=await fetch(url+'/auth/exchange',{method:'POST',headers:{origin,
      'content-type':'application/json'},body:JSON.stringify({ticket})});
    assert.equal(exchanged.status,200);
    const data=await json(exchanged);
    assert.equal(data.accessToken.length,64);
    assert.ok(data.expiresAt);
    const replay=await fetch(url+'/auth/exchange',{method:'POST',headers:{origin,
      'content-type':'application/json'},body:JSON.stringify({ticket})});
    assert.equal(replay.status,401);
    const auth={authorization:'Bearer '+data.accessToken};
    assert.equal((await fetch(url+'/auth/session',{headers:auth})).status,200);
    assert.equal((await fetch(url+'/api/desktops',{method:'POST',headers:auth})).status,202);
    assert.equal((await fetch(url+'/api/desktops',{method:'POST',headers:{authorization:'Bearer forged'}})).status,401);
  });
});
test('GitHub OAuth trims pasted credentials in BOTH authorize URL and code exchange',async()=>{
  let exchanges=0;
  await withServer(configured({
    clientId:'  Ov23exampleID\\n'.replace('\\n','\n'),
    clientSecret:'  oauth-secret-with-padding\\n'.replace('\\n','\n'),
    ownerId:' '+ownerId+'\\n'.replace('\\n','\n'),
    fetchImpl:async (url,options)=>{
      if (url.includes('access_token')) {
        const data=JSON.parse(options.body);
        assert.equal(data.client_id,'Ov23exampleID');
        assert.equal(data.client_secret,'oauth-secret-with-padding');
        exchanges++;
        return new Response(JSON.stringify({access_token:'gho-verified'}),{status:200});
      }
      if (url.endsWith('/user')) {
        assert.equal(options.headers.authorization,'Bearer gho-verified');
        return new Response(JSON.stringify({id:ownerId}),{status:200});
      }
      throw Error('Unexpected URL');
    },
  }), async url=>{
    const config=await json(await fetch(url+'/auth/config'));
    assert.equal(config.configured,true);
    const start=await fetch(url+'/auth/github/start',{redirect:'manual'});
    assert.equal(start.status,302);
    const authorize=new URL(start.headers.get('location'));
    assert.equal(authorize.searchParams.get('client_id'),'Ov23exampleID');
    assert.doesNotMatch(start.headers.get('location'),/%0A|%0D|%20/);
    const state=authorize.searchParams.get('state');
    const callback=await fetch(url+'/auth/github/callback?code=ok&state='+state,{redirect:'manual'});
    assert.equal(callback.status,302);
    assert.match(callback.headers.get('location'),/#desktop_auth=/);
    assert.equal(exchanges,1);
  });
});
test('credentials with whitespace alone do not enable OAuth',async()=>{
  await withServer(configured({clientId:' \n ',clientSecret:' \n '}), async url=>{
    const config=await json(await fetch(url+'/auth/config'));
    assert.equal(config.configured,false);
    assert.equal((await fetch(url+'/auth/github/start')).status,503);
  });
});
test('another GitHub user cannot access owner computer',async()=>{
  await withServer(configured({fetchImpl:async url=>new Response(JSON.stringify(
    url.endsWith('/user')?{id:12345}:{access_token:'other-user-token'}),{status:200})}),async url=>{
    const start=await fetch(url+'/auth/github/start',{redirect:'manual'});
    const state=new URL(start.headers.get('location')).searchParams.get('state');
    const callback=await fetch(url+'/auth/github/callback?code=wrong&state='+state,{redirect:'manual'});
    assert.equal(callback.status,302);
    assert.match(callback.headers.get('location'),/desktop_auth_error=not_owner/);
    assert.equal((await fetch(url+'/api/desktops',{method:'POST',
      headers:{authorization:'Bearer other-user-token'}})).status,401);
  });
});
test('expired or replayed login states are rejected',async()=>{
  let time=1_000;
  await withServer(configured({now:()=>time}),async url=>{
    const start=await fetch(url+'/auth/github/start',{redirect:'manual'});
    const state=new URL(start.headers.get('location')).searchParams.get('state');
    time+=5*60_000+1;
    const callback=await fetch(url+'/auth/github/callback?code=good&state='+state,{redirect:'manual'});
    assert.match(callback.headers.get('location'),/desktop_auth_error=expired/);
    const replay=await fetch(url+'/auth/github/callback?code=good&state='+state,{redirect:'manual'});
    assert.match(replay.headers.get('location'),/desktop_auth_error=expired/);
  });
});
