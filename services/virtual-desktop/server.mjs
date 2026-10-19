import { createServer } from 'node:http';
import { randomUUID, timingSafeEqual } from 'node:crypto';

const TTL = 30 * 60_000;
const PACKAGE = Object.freeze({ editor: 'mousepad', office: 'libreoffice-writer', drawing: 'gimp', media: 'vlc' });

const reply = (res, code, value) => {
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control':'no-store', 'x-content-type-options':'nosniff' });
  res.end(code === 204 ? undefined : JSON.stringify(value));
};
const err = (code, message) => Object.assign(new Error(message), { code });
export function validToken(supplied, stored) {
  if (!stored || stored.length < 32 || typeof supplied !== 'string') return false;
  const a = Buffer.from(supplied), b = Buffer.from(stored);
  return a.length === b.length && timingSafeEqual(a, b);
}
const point = (n, max) => { if (!Number.isInteger(n) || n < 0 || n > max) throw err(400,'Coordenadas inválidas'); return n; };
async function readBody(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10000) throw err(413, 'Solicitud demasiado grande');
  }
  try { return raw ? JSON.parse(raw) : {}; } catch { throw err(400, 'JSON inválido'); }
}

export function buildHandler({ getDaytona, accessToken, daytonaKey, origin = 'https://christianhola.github.io', clock = () => Date.now() }) {
  const sessions = new Map();
  const attempts = new Map();
  let creating = false;
  const close = async (id, entry) => {
    if (sessions.get(id) !== entry) return;
    sessions.delete(id);
    if (entry.sandbox) await entry.sandbox.delete().catch(() => {});
  };
  return async (req, res) => {
    if (req.headers.origin && req.headers.origin !== origin) return reply(res, 403, {error:'Origen no permitido'});
    res.setHeader('access-control-allow-origin', origin);
    res.setHeader('vary', 'Origin');
    res.setHeader('access-control-allow-methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('access-control-allow-headers', 'Authorization,Content-Type');
    if (req.method === 'OPTIONS') return reply(res, 204, {});
    const path = new URL(req.url || '/', 'http://localhost').pathname;
    if (path === '/health' && req.method === 'GET') {
      return reply(res, 200, { service:'meridian-virtual-desktop', configured:Boolean(daytonaKey && accessToken?.length >= 32) });
    }
    const ip = req.socket.remoteAddress || 'unknown';
    let bucket = attempts.get(ip);
    if (!bucket || bucket.until < clock()) bucket = { until:clock() + 60_000, count:0 };
    bucket.count++; attempts.set(ip, bucket);
    if (bucket.count > 120) return reply(res, 429, {error:'Demasiadas peticiones'});
    if (!daytonaKey || !accessToken || accessToken.length < 32) return reply(res,503,{error:'Falta configurar el servicio privado en Railway'});
    const bearer = (req.headers.authorization || '').replace(/^Bearer /i, '');
    if (!validToken(bearer, accessToken)) return reply(res,401,{error:'Acceso no autorizado'});
    for (const [id, entry] of sessions) if (entry.expires <= clock()) void close(id,entry);
    try {
      if (path === '/api/desktops' && req.method === 'POST') {
        if (creating || sessions.size >= 1) throw err(409, 'Ya existe un escritorio activo');
        const id = randomUUID();
        const entry = {status:'starting', message:'Daytona está creando el escritorio', sandbox:null, expires:clock()+TTL};
        creating = true;
        sessions.set(id,entry);
        void (async () => {
          let sandbox;
          try {
            const daytona = await getDaytona();
            sandbox = await daytona.create({
              snapshot:process.env.DAYTONA_DESKTOP_SNAPSHOT || 'daytonaio/sandbox:0.6.0',
              name:'meridian-' + id.slice(0,8),
              public:false,
              ttlMinutes:30,
              envVars:{VNC_RESOLUTION:'1280x800'}
            });
            entry.sandbox=sandbox;
            await sandbox.computerUse.start();
            entry.status='ready'; entry.message='Escritorio gráfico iniciado en Daytona';
          } catch (cause) {
            entry.status='error'; entry.message='No se pudo iniciar Daytona. Revisa el snapshot o la clave';
            if (sandbox) await sandbox.delete().catch(()=>{});
          } finally { creating=false; }
        })();
        return reply(res,202,{id,status:entry.status,expiresAt:new Date(entry.expires).toISOString()});
      }
      const match=/^\/api\/desktops\/([a-f0-9-]{36})(?:\/(screenshot|action|install))?$/.exec(path);
      if (!match) throw err(404,'Ruta no encontrada');
      const [,id,operation]=match;
      const entry=sessions.get(id);
      if (!entry) throw err(404,'Sesión no encontrada o vencida');
      if (!operation && req.method === 'GET') return reply(res,200,{id,status:entry.status,message:entry.message,expiresAt:new Date(entry.expires).toISOString()});
      if (!operation && req.method === 'DELETE') { await close(id,entry); return reply(res,200,{deleted:true}); }
      if (entry.status !== 'ready' || !entry.sandbox) throw err(409,entry.message);
      if (operation === 'screenshot' && req.method === 'GET') {
        const image=await entry.sandbox.computerUse.screenshot.takeCompressed({format:'jpeg',quality:75,showCursor:true});
        const encoded=image.screenshot || image.image;
        if (typeof encoded !== 'string' || !encoded) throw err(502,'Daytona no devolvió captura');
        return reply(res,200,{image:'data:image/jpeg;base64,'+encoded,width:image.width,height:image.height,at:new Date(clock()).toISOString()});
      }
      if (operation === 'action' && req.method === 'POST') {
        const action=await readBody(req);
        if (action.type === 'click') await entry.sandbox.computerUse.mouse.click(point(action.x,1279),point(action.y,799),'left',Boolean(action.double));
        else if (action.type === 'type' && typeof action.text === 'string' && action.text.length <= 1000) await entry.sandbox.computerUse.keyboard.type(action.text);
        else if (action.type === 'key' && ['enter','escape','tab','backspace','up','down','left','right'].includes(action.key)) await entry.sandbox.computerUse.keyboard.press(action.key);
        else throw err(400,'Acción no permitida');
        return reply(res,200,{executed:true,type:action.type});
      }
      if (operation === 'install' && req.method === 'POST') {
        const {app,confirmed}=await readBody(req);
        if (!confirmed || !Object.hasOwn(PACKAGE,app)) throw err(400,'Instalación no autorizada');
        const name=PACKAGE[app];
        const result=await entry.sandbox.process.executeCommand('sudo DEBIAN_FRONTEND=noninteractive apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y '+name,undefined,undefined,180);
        if (result.exitCode !== 0) throw err(502,'Falló la instalación: '+String(result.result||'').slice(-350));
        return reply(res,200,{installed:name,output:String(result.result||'').slice(-300)});
      }
      throw err(405,'Operación inválida');
    } catch(cause) {
      return reply(res,cause.code||502,{error:cause.code?cause.message:'Daytona no completó la operación'});
    }
  };
}

if (process.argv[1] && new URL(import.meta.url).pathname === process.argv[1]) {
  let daytona;
  const handler=buildHandler({
    accessToken:process.env.DESKTOP_ACCESS_TOKEN,
    daytonaKey:process.env.DAYTONA_API_KEY,
    origin:process.env.DESKTOP_ALLOWED_ORIGIN || 'https://christianhola.github.io',
    getDaytona:async()=>{ if (!daytona) { const {Daytona}=await import('@daytona/sdk'); daytona=new Daytona(); } return daytona; }
  });
  createServer(handler).listen(Number(process.env.PORT||8080),'0.0.0.0',()=>console.log('Meridian Desktop service listening'));
}
