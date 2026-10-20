// Owner-only passwordless-to-the-chat access: GitHub login, never an operator key in the UI.
// GitHub OAuth stays on the Railway server. Browser receives an opaque short-lived session
// through a single-use fragment ticket; tickets and sessions live only in server memory.
import { randomBytes } from 'node:crypto';

const CALLBACK = 'https://meridian-virtual-desktop-production.up.railway.app/auth/github/callback';
const RETURN = 'https://christianhola.github.io/-meridian-showcase/agents/';
const LOGIN_TTL = 5 * 60_000;
const SESSION_TTL = 8 * 60 * 60_000;
const MAX_ACTIVE = 12;
const secret = () => randomBytes(32).toString('hex');

export function createOwnerAuth({
  clientId = process.env.GITHUB_OAUTH_CLIENT_ID,
  clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET,
  ownerId = process.env.DESKTOP_OWNER_GITHUB_ID,
  callbackUrl = process.env.DESKTOP_OAUTH_CALLBACK_URL || CALLBACK,
  returnUrl = RETURN,
  origin = 'https://christianhola.github.io',
  now = () => Date.now(),
  fetchImpl = fetch,
} = {}) {
  // Environment variables pasted from dashboards often include a trailing newline.
  // Normalize only the surrounding whitespace; never log or expose OAuth secrets.
  const normalizedClientId = typeof clientId === 'string' ? clientId.trim() : '';
  const normalizedClientSecret = typeof clientSecret === 'string' ? clientSecret.trim() : '';
  const normalizedOwnerId = String(ownerId ?? '').trim();
  const configured = Boolean(normalizedClientId && normalizedClientSecret && /^\d+$/.test(normalizedOwnerId) &&
    callbackUrl.startsWith('https://') && returnUrl.startsWith('https://'));
  const states = new Map();
  const tickets = new Map();
  const sessions = new Map();

  const prune = () => {
    for (const [key, value] of states) if (value <= now()) states.delete(key);
    for (const [key, value] of tickets) if (value <= now()) tickets.delete(key);
    for (const [key, value] of sessions) if (value <= now()) sessions.delete(key);
  };
  const validSession = token => {
    if (typeof token !== 'string' || token.length !== 64) return false;
    prune();
    return (sessions.get(token) ?? 0) > now();
  };
  const json = (res, code, value) => {
    res.writeHead(code, {
      'content-type':'application/json; charset=utf-8',
      'cache-control':'no-store',
      'x-content-type-options':'nosniff',
    });
    res.end(JSON.stringify(value));
  };
  const redirect = (res, url) => {
    res.writeHead(302, { location: url, 'cache-control':'no-store', 'referrer-policy':'no-referrer' });
    res.end();
  };
  const failed = (res, code) => redirect(res, returnUrl + '?desktop_auth_error=' + code);

  async function handle(req, res, path, readBody) {
    if (path === '/auth/config' && req.method === 'GET') {
      json(res, 200, { configured, provider: 'github', ownerOnly: true });
      return true;
    }
    if (path === '/auth/github/start' && req.method === 'GET') {
      if (!configured) json(res, 503, {error:'La conexión privada con GitHub todavía no está configurada en Railway'});
      else {
        prune();
        if (states.size >= MAX_ACTIVE) { json(res, 429, {error:'Demasiados accesos en curso'}); return true; }
        const state=secret();
        states.set(state, now() + LOGIN_TTL);
        const url=new URL('https://github.com/login/oauth/authorize');
        url.searchParams.set('client_id',normalizedClientId);
        url.searchParams.set('redirect_uri',callbackUrl);
        url.searchParams.set('state',state);
        url.searchParams.set('scope','read:user');
        redirect(res,url.toString());
      }
      return true;
    }
    if (path === '/auth/github/callback' && req.method === 'GET') {
      const u=new URL(req.url,'http://localhost');
      const state=u.searchParams.get('state') || '';
      const deadline=states.get(state);
      states.delete(state);
      if (!configured || !deadline || deadline <= now()) { failed(res,'expired'); return true; }
      const code=u.searchParams.get('code');
      if (!code || code.length>300) { failed(res,'cancelled'); return true; }
      try {
        const oauth=await fetchImpl('https://github.com/login/oauth/access_token',{
          method:'POST',
          headers:{'content-type':'application/json','accept':'application/json'},
          body:JSON.stringify({client_id:normalizedClientId,client_secret:normalizedClientSecret,code,redirect_uri:callbackUrl}),
          signal:AbortSignal.timeout(12000),
        });
        if (!oauth.ok) throw Error('GitHub code exchange failed');
        const payload=await oauth.json();
        if (typeof payload.access_token !== 'string' || !payload.access_token) throw Error('GitHub OAuth denied');
        const profileResponse=await fetchImpl('https://api.github.com/user',{
          headers:{authorization:'Bearer '+payload.access_token,'accept':'application/vnd.github+json',
            'user-agent':'Meridian-Desktop'},
          signal:AbortSignal.timeout(12000),
        });
        if (!profileResponse.ok) throw Error('GitHub identity unavailable');
        const user=await profileResponse.json();
        if (String(user.id) !== normalizedOwnerId) { failed(res,'not_owner'); return true; }
        prune();
        if (tickets.size >= MAX_ACTIVE) { failed(res,'busy'); return true; }
        const ticket=secret();
        tickets.set(ticket, now() + LOGIN_TTL);
        redirect(res,returnUrl + '#desktop_auth=' + encodeURIComponent(ticket));
      } catch {
        // Do not expose provider responses or access tokens to browser/logs.
        failed(res,'github_failed');
      }
      return true;
    }
    if (path === '/auth/exchange' && req.method === 'POST') {
      if (req.headers.origin !== origin) { json(res,403,{error:'Origen de autenticación inválido'}); return true; }
      if (!configured) { json(res,503,{error:'Acceso privado no configurado'}); return true; }
      let body;
      try { body=await readBody(req); } catch { json(res,400,{error:'Solicitud inválida'}); return true; }
      const ticket=body?.ticket;
      const expiry=typeof ticket==='string' ? tickets.get(ticket) : undefined;
      if (typeof ticket==='string') tickets.delete(ticket); // single-use, also on expiry
      if (!expiry || expiry <= now()) { json(res,401,{error:'La autorización venció o ya se utilizó'}); return true; }
      prune();
      if (sessions.size >= MAX_ACTIVE) { json(res,429,{error:'Demasiadas sesiones privadas'}); return true; }
      const token=secret(), expiresAt=now()+SESSION_TTL;
      sessions.set(token, expiresAt);
      json(res,200,{accessToken:token, expiresAt:new Date(expiresAt).toISOString()});
      return true;
    }
    if (path === '/auth/session' && req.method === 'GET') {
      const token=(req.headers.authorization || '').replace(/^Bearer /i,'');
      if (!validSession(token)) json(res,401,{authenticated:false});
      else json(res,200,{authenticated:true,ownerOnly:true});
      return true;
    }
    return false;
  }
  return {configured,handle,validSession};
}
