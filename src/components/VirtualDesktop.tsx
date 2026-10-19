import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowLeft, ArrowRight, Monitor, RefreshCw, Power, Keyboard, ShieldCheck } from 'lucide-react';
import './VirtualDesktop.css';

const API='https://meridian-virtual-desktop-production.up.railway.app';
type Status={id:string;status:'starting'|'ready'|'error'|'closing';message?:string;expiresAt:string};
type Frame={image:string;width:number;height:number;at:string};
type Proposed={summary:string;action:{type:'click'|'type'|'key'|'finish';x?:number;y?:number;text?:string;key?:string};executed:false;model:string};
const APPS=[
  {id:'editor',name:'Mousepad',help:'Editor de texto'},
  {id:'office',name:'LibreOffice Writer',help:'Documentos'},
  {id:'drawing',name:'GIMP',help:'Editor de imágenes'},
  {id:'media',name:'VLC',help:'Multimedia'}
];
export function VirtualDesktop(){
  const [credential,setCredential]=useState('');
  const [connected,setConnected]=useState(false);
  const [status,setStatus]=useState<Status|null>(null);
  const [frame,setFrame]=useState<Frame|null>(null);
  const [text,setText]=useState('');
  const [task,setTask]=useState('');
  const [agent,setAgent]=useState('Browser');
  const [proposed,setProposed]=useState<Proposed|null>(null);
  const [message,setMessage]=useState('Conecta tu credencial privada para crear un escritorio Daytona real.');
  const [busy,setBusy]=useState(false);
  const [refreshing,setRefreshing]=useState(false);
  async function request<T>(path:string,method='GET',data?:unknown):Promise<T>{
    const response=await fetch(API+path,{method,headers:{Authorization:'Bearer '+credential,'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data),cache:'no-store'});
    const result=await response.json();
    if(!response.ok) throw new Error(result.error || 'Falló la operación');
    return result as T;
  }
  useEffect(()=>{
    if(!status || status.status!=='starting')return;
    const interval=window.setInterval(()=>{
      request<Status>('/api/desktops/'+status.id).then(next=>{setStatus(next);setMessage(next.message||next.status);}).catch(e=>setMessage(e.message));
    },2500);
    return()=>window.clearInterval(interval);
  },[status?.id,status?.status,credential]);
  useEffect(()=>{
    if(status?.status!=='ready' || frame) return;
    void refresh();
  },[status?.status]);
  async function login(){
    setBusy(true);
    try{
      const health=await fetch(API+'/health',{cache:'no-store'}).then(r=>r.json());
      if(!health.configured) throw new Error('Daytona o la credencial de acceso no están configurados en Railway.');
      const next=await request<Status>('/api/desktops','POST');
      setStatus(next);setConnected(true);setFrame(null);setMessage('Daytona está preparando el escritorio.');
    }catch(e){setMessage(e instanceof Error?e.message:'Conexión rechazada.');}
    finally{setBusy(false);}
  }
  async function refresh(){
    if(!status || status.status!=='ready') return;
    setRefreshing(true);
    try{setFrame(await request<Frame>('/api/desktops/'+status.id+'/screenshot'));setMessage('Captura real actualizada.');}
    catch(e){setMessage(e instanceof Error?e.message:'No se pudo obtener pantalla.');}
    finally{setRefreshing(false);}
  }
  async function execute(path:string,body:unknown,description:string){
    if(!status || status.status!=='ready' || busy)return;
    setBusy(true);
    try{await request('/api/desktops/'+status.id+path,'POST',body);setMessage(description);await refresh();}
    catch(e){setMessage(e instanceof Error?e.message:'La acción falló.');}
    finally{setBusy(false);}
  }
  async function click(e:MouseEvent<HTMLImageElement>){
    if(!frame || !status || busy)return;
    const r=e.currentTarget.getBoundingClientRect();
    const x=Math.min(1279,Math.round((e.clientX-r.left)/r.width*frame.width));
    const y=Math.min(799,Math.round((e.clientY-r.top)/r.height*frame.height));
    await execute('/action',{type:'click',x,y,double:e.detail===2},'Clic ejecutado por Daytona.');
  }
  async function plan(){
    if(!status || status.status!=='ready' || busy || !task.trim())return;
    if(!window.confirm('La captura actual de Daytona se enviará al modelo de visión de OpenRouter para proponer un solo paso. ¿Autorizar el análisis?'))return;
    setBusy(true);setProposed(null);
    try{const answer=await request<Proposed>('/api/desktops/'+status.id+'/plan','POST',{task,agent});setProposed(answer);setMessage('El modelo propuso una acción. Nada se ejecutó sin tu aprobación.');}
    catch(e){setMessage(e instanceof Error?e.message:'Falló el análisis visual');}
    finally{setBusy(false);}
  }
  async function approve(){
    if(!proposed || proposed.action.type==='finish')return;
    if(!window.confirm('¿Ejecutar en Daytona la acción propuesta por el modelo?'))return;
    const action=proposed.action;
    setProposed(null);
    await execute('/action',action,'Acción propuesta por el agente y aprobada por el usuario.');
  }
  async function install(app:string,name:string){
    if(!window.confirm('¿Autorizar la instalación real de '+name+' en el sandbox Daytona? Puede consumir recursos.'))return;
    await execute('/install',{app,confirmed:true},name+' instalado realmente en el sandbox.');
  }
  async function close(){
    if(!status || busy)return;
    if(!window.confirm('¿Cerrar y eliminar definitivamente este sandbox Daytona?'))return;
    setBusy(true);
    try{await request('/api/desktops/'+status.id,'DELETE');setStatus(null);setFrame(null);setConnected(false);setCredential('');setMessage('Sandbox eliminado de Daytona.');}
    catch(e){setMessage(e instanceof Error?e.message:'No pudo eliminarse la máquina.');}
    finally{setBusy(false);}
  }
  return <main className="virtual-desktop">
    <header className="virtual-desktop-header"><a href="/-meridian-showcase/agents/"><ArrowLeft size={17}/> Agentes</a><strong><Monitor size={20}/> Meridian / Laptop virtual</strong><span className="virtual-desktop-kind">DAYTONA · REAL</span></header>
    <div className="virtual-desktop-shell">
      <div className="virtual-desktop-intro"><div><h1>Una computadora real para tus agentes.</h1><p>Sandbox Linux aislado, escritorio gráfico XFCE, pantalla auténtica y controles enviados al proveedor Daytona. Las acciones requieren autorización.</p></div><a href="https://www.daytona.io/docs/en/computer-use/" target="_blank" rel="noreferrer">Documentación Daytona <ArrowRight size={15}/></a></div>
      {!connected?<section className="virtual-desktop-auth" aria-label="Acceso al escritorio"><ShieldCheck size={28}/><h2>Acceso privado</h2><p>Necesitas el token configurado por el administrador en Railway. No se guarda en tu navegador y nunca se inserta en GitHub Pages.</p><form onSubmit={e=>{e.preventDefault();void login();}}><label htmlFor="desktop-token">Credencial de acceso</label><input id="desktop-token" type="password" autoComplete="off" placeholder="Token del operador" value={credential} onChange={e=>setCredential(e.target.value)} minLength={32} required/><button type="submit" disabled={busy || credential.length<32}>{busy?'Conectando…':'Crear laptop en Daytona'}</button></form></section>:<>
        <div className="virtual-desktop-status"><span><span className={'virtual-desktop-dot '+(status?.status==='ready'?'is-ready':'')}/>{status?.status==='ready'?'Escritorio conectado':status?.status==='starting'?'Creando sandbox…':'Error real del proveedor'}</span><span>{status?.expiresAt?'Vence: '+new Date(status.expiresAt).toLocaleTimeString():''}</span><button type="button" disabled={busy} onClick={()=>void close()}><Power size={15}/> Eliminar sandbox</button></div>
        <div className="virtual-desktop-layout"><section className="virtual-desktop-screen" aria-label="Pantalla Daytona"><div className="virtual-desktop-screenbar"><span>LINUX / XFCE · 1280 × 800</span><button disabled={refreshing || busy || status?.status!=='ready'} type="button" onClick={()=>void refresh()}><RefreshCw size={14}/> Actualizar captura</button></div>{frame && status?.status==='ready'?<img alt="Captura real del escritorio Linux en Daytona; haz clic para controlar el ratón" src={frame.image} onClick={e=>void click(e)} draggable={false}/>:<div className="virtual-desktop-empty">{status?.status==='error'?status.message:'Esperando la primera captura real de Daytona.'}</div>}</section>
        <aside className="virtual-desktop-controls"><h2>Agente con visión real</h2><p>El agente observa la captura Daytona mediante OpenRouter y propone UN paso. Nunca ejecuta nada sin tu autorización. La captura se comparte con el proveedor del modelo al confirmar.</p><label htmlFor="desktop-agent">Agente</label><select id="desktop-agent" value={agent} onChange={e=>setAgent(e.target.value)}>{['Architect','Coder','Researcher','Growth','Browser','Reviewer'].map(a=><option key={a} value={a}>{a}</option>)}</select><label htmlFor="desktop-task">Instrucción para el agente</label><textarea id="desktop-task" rows={3} maxLength={700} value={task} onChange={e=>setTask(e.target.value)} placeholder="Ejemplo: identifica cómo abrir el editor y propone el siguiente clic"/><button type="button" className="virtual-desktop-plan" disabled={busy || status?.status!=='ready' || !task.trim()} onClick={()=>void plan()}>Analizar pantalla real</button>{proposed && <div className="virtual-desktop-proposal"><strong>Acción propuesta · {proposed.model}</strong><p>{proposed.summary}</p><code>{JSON.stringify(proposed.action)}</code><div>{proposed.action.type==='finish'?<span>No hay acción para ejecutar.</span>:<button disabled={busy} type="button" onClick={()=>void approve()}>Aprobar y ejecutar</button>}<button type="button" onClick={()=>setProposed(null)}>Rechazar</button></div></div>}<h2><Keyboard size={18}/> Controles de la laptop</h2><p>Las acciones se ejecutan en el sandbox real. No se permite acceso directo a tu computadora personal.</p><form onSubmit={e=>{e.preventDefault();if(text.trim())void execute('/action',{type:'type',text},'Texto escrito en Daytona.');}}><label htmlFor="desktop-type">Escribir en la pantalla</label><textarea id="desktop-type" rows={3} maxLength={1000} value={text} onChange={e=>setText(e.target.value)} placeholder="Texto para la ventana activa"/><button disabled={busy || status?.status!=='ready' || !text.trim()}>Enviar teclado</button></form><div className="virtual-desktop-keys">{['enter','tab','escape','backspace','up','down','left','right'].map(key=><button type="button" key={key} disabled={busy || status?.status!=='ready'} onClick={()=>void execute('/action',{type:'key',key},'Tecla '+key+' enviada.')}>{key}</button>)}</div><h2>Instalar aplicaciones</h2><p>Paquetes reales de Linux instalados mediante apt, con tu confirmación.</p>{APPS.map(app=><button className="virtual-desktop-app" type="button" key={app.id} disabled={busy || status?.status!=='ready'} onClick={()=>void install(app.id,app.name)}><span><strong>{app.name}</strong><small>{app.help}</small></span><ArrowRight size={16}/></button>)}</aside></div>
      </>}
      <p className="virtual-desktop-message" role="status">{message}</p><p className="virtual-desktop-note">El servicio requiere credenciales privadas y puede generar costos de infraestructura. Sin claves configuradas, ninguna laptop se inicia. Los agentes proponen acciones visuales reales mediante OpenRouter, pero el usuario aprueba cada ejecución. No tienen autonomía sin supervisión.</p>
    </div>
  </main>;
}
