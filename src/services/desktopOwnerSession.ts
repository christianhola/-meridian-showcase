import { DESKTOP_API } from './desktopAutonomy';

export type PendingDesktopTask = {text:string;agent:string};
const SESSION_KEY='meridian.desktop.ownerSession.v1';
const TASK_KEY='meridian.desktop.pendingTask.v1';
const ALLOWED_AGENTS=new Set(['Architect','Coder','Researcher','Growth','Browser','Reviewer']);
const safeGet=(key:string)=>{try{return window.sessionStorage.getItem(key);}catch{return null;}};
const safeSet=(key:string,val:string)=>{try{window.sessionStorage.setItem(key,val);}catch{/* Storage may be unavailable. */}};
const safeRemove=(key:string)=>{try{window.sessionStorage.removeItem(key);}catch{/* Storage may be unavailable. */}};

export function loadDesktopOwnerSession():string {
  const raw=safeGet(SESSION_KEY);
  if (!raw) return '';
  try {
    const parsed=JSON.parse(raw) as {token:string;expiresAt:number};
    if (typeof parsed.token==='string' && /^[a-f0-9]{64}$/.test(parsed.token)
      && typeof parsed.expiresAt==='number' && parsed.expiresAt>Date.now()+30_000) return parsed.token;
  } catch {/* Stale or damaged tab state. */}
  safeRemove(SESSION_KEY);
  return '';
}
export function saveDesktopOwnerSession(token:string,expiresAt:string) {
  if (!/^[a-f0-9]{64}$/.test(token)) throw Error('Sesión privada inválida');
  const until=Date.parse(expiresAt);
  if (!Number.isFinite(until) || until<Date.now()) throw Error('La sesión privada ya venció');
  safeSet(SESSION_KEY,JSON.stringify({token,expiresAt:until}));
}
export function clearDesktopOwnerSession() {safeRemove(SESSION_KEY);}

export function loadPendingDesktopTask():PendingDesktopTask|null {
  const raw=safeGet(TASK_KEY);
  if (!raw) return null;
  try {
    const parsed=JSON.parse(raw) as PendingDesktopTask & {expiresAt:number};
    if (typeof parsed.text==='string' && parsed.text.length>0 && parsed.text.length<=600
      && ALLOWED_AGENTS.has(parsed.agent) && parsed.expiresAt>Date.now()) {
      return {text:parsed.text,agent:parsed.agent};
    }
  } catch {/* Ignore stale tab data. */}
  safeRemove(TASK_KEY);
  return null;
}
export function savePendingDesktopTask(task:PendingDesktopTask) {
  safeSet(TASK_KEY,JSON.stringify({...task,expiresAt:Date.now()+30*60_000}));
}
export function clearPendingDesktopTask(){safeRemove(TASK_KEY);}

export function takeDesktopAuthTicket():string|null {
  const match=/^#desktop_auth=([a-f0-9]{64})$/.exec(window.location.hash);
  if (!match) return null;
  // Fragment is only a single-use exchange ticket, never the actual access credential.
  window.history.replaceState(null,'',window.location.pathname+window.location.search);
  return match[1];
}
export function takeDesktopAuthError():string|null {
  const u=new URL(window.location.href);
  const code=u.searchParams.get('desktop_auth_error');
  if (!code) return null;
  u.searchParams.delete('desktop_auth_error');
  window.history.replaceState(null,'',u.pathname+u.search+u.hash);
  const errors:Record<string,string>={
    expired:'La autorización venció. Vuelve a iniciar sesión con GitHub.',
    cancelled:'No se completó la autorización con GitHub.',
    not_owner:'Esta computadora privada pertenece a otra cuenta de GitHub.',
    github_failed:'GitHub no pudo verificar la cuenta. Inténtalo nuevamente.',
    busy:'Hay demasiadas autorizaciones simultáneas. Inténtalo más tarde.',
  };
  return errors[code] || 'No se completó la autorización privada.';
}
export async function exchangeDesktopAuthTicket(ticket:string):Promise<string> {
  const res=await fetch(DESKTOP_API+'/auth/exchange',{
    method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({ticket}),cache:'no-store',
  });
  if (!res.ok) throw Error('No se pudo verificar tu cuenta de GitHub para la computadora');
  const data=await res.json() as {accessToken:string;expiresAt:string};
  saveDesktopOwnerSession(data.accessToken,data.expiresAt);
  return data.accessToken;
}
export async function validateDesktopOwnerSession(token:string):Promise<boolean> {
  if (!token) return false;
  try {
    const res=await fetch(DESKTOP_API+'/auth/session',{headers:{authorization:'Bearer '+token},cache:'no-store'});
    if (res.status===401) {clearDesktopOwnerSession();return false;}
    return res.ok;
  } catch {return false;}
}
export type DesktopAuthConfig={configured:boolean;provider:'github';ownerOnly:boolean};
export async function loadDesktopAuthConfig():Promise<DesktopAuthConfig> {
  const res=await fetch(DESKTOP_API+'/auth/config',{cache:'no-store'});
  if (!res.ok) throw Error('El servicio privado de Daytona no está disponible');
  return res.json() as Promise<DesktopAuthConfig>;
}
export function beginDesktopOwnerLogin(){
  window.location.assign(DESKTOP_API+'/auth/github/start');
}
