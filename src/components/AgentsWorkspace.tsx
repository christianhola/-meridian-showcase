import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Check, ChevronDown, Copy, FilePlus2, Menu, MessageSquarePlus, Mic, Paperclip, Pencil, X } from "lucide-react";
import "./AgentsWorkspace.css";
import { AgentAvatar } from "./AgentAvatar";
import { AgentMarkdown } from "./AgentMarkdown";
import { ToolLab } from "./ToolLab";
import { streamFreeAnswer, type FreeAgentRole, type FreeChatMessage } from "./freeModelStream";
import { desktopCall, shouldUseDesktop, type LocalTaskState } from "../services/desktopAutonomy";
import {
  loadDesktopOwnerSession, loadPendingDesktopTask, savePendingDesktopTask,
  clearPendingDesktopTask, clearDesktopOwnerSession, takeDesktopAuthTicket,
  takeDesktopAuthError, exchangeDesktopAuthTicket, validateDesktopOwnerSession,
  loadDesktopAuthConfig, beginDesktopOwnerLogin, type PendingDesktopTask,
} from "../services/desktopOwnerSession";

type Turn = { id: number; text: string; agent: string; provider: string; role: "user" | "assistant" };
const agents = [
  { name: "Architect", symbol: "◇", tone: "#8595ff" },
  { name: "Coder", symbol: "</>", tone: "#6ecdaa" },
  { name: "Researcher", symbol: "◎", tone: "#b6a0e9" },
  { name: "Growth", symbol: "↗", tone: "#e3bc87" },
  { name: "Browser", symbol: "◉", tone: "#85c7dc" },
  { name: "Reviewer", symbol: "✓", tone: "#b9c1cc" },
] as const;

export function AgentsWorkspace() {
  const [agent, setAgent] = useState(() => loadPendingDesktopTask()?.agent || "Coder");
  const [toolLabOpen, setToolLabOpen] = useState(false);
  const [provider, setProvider] = useState("free");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [desktopAccessOpen, setDesktopAccessOpen] = useState(false);
  const [ownerSession, setOwnerSession] = useState(loadDesktopOwnerSession);
  const [ownerAuthConfigured, setOwnerAuthConfigured] = useState(false);
  const [ownerAuthChecking, setOwnerAuthChecking] = useState(true);
  const [desktopRun, setDesktopRun] = useState<LocalTaskState | null>(null);
  const [pendingDesktopTask, setPendingDesktopTask] = useState<PendingDesktopTask | null>(loadPendingDesktopTask);
  const desktopSession = useRef<string | null>(null);
  const desktopStopRequested = useRef(false);
  const wait = (ms:number) => new Promise<void>(resolve=>window.setTimeout(resolve,ms));
  async function stopDesktopTask() {
    desktopStopRequested.current=true;
    const id=desktopSession.current;
    if (!id) return;
    try {
      const stopped=await desktopCall<LocalTaskState>(ownerSession,'/api/desktops/'+id+'/autopilot','DELETE');
      setDesktopRun(stopped);
    } catch (e) {setError(e instanceof Error?e.message:'No se pudo detener la tarea');}
  }
  async function performLocalGoal(text:string,selectedAgent:string):Promise<string> {
    let id:string|null=null;
    desktopStopRequested.current=false;
    try {
      const connected=await desktopCall<{id:string;status:string;reused:boolean}>(ownerSession,'/api/desktops','POST');
      id=connected.id;
      desktopSession.current=id;
      let ready=false;
      for(let i=0;i<35;i++){
        if(desktopStopRequested.current) throw new Error('La tarea se canceló antes de abrir el escritorio');
        const poll=await desktopCall<{status:string;message?:string}>(ownerSession,'/api/desktops/'+id);
        if(poll.status==='error') throw new Error(poll.message||'Daytona no pudo abrir el escritorio');
        if(poll.status==='ready'){ready=true;break;}
        await wait(1500);
      }
      if(!ready) throw new Error('La computadora no estuvo lista para la tarea');
      if(desktopStopRequested.current) throw new Error('Tarea cancelada');
      const started=await desktopCall<LocalTaskState>(ownerSession,'/api/desktops/'+id+'/autopilot','POST',{task:text,agent:selectedAgent});
      setDesktopRun(started);
      let outcome=started;
      for(let i=0;i<120;i++){
        await wait(1200);
        outcome=await desktopCall<LocalTaskState>(ownerSession,'/api/desktops/'+id+'/autopilot');
        setDesktopRun(outcome);
        if(!['starting','running'].includes(outcome.status))break;
      }
      if(['starting','running'].includes(outcome.status)) {
        await stopDesktopTask();
        throw new Error('La ejecución superó el tiempo máximo de seguimiento');
      }
      const detail=outcome.history.map(h=>'Paso '+h.step+': '+h.message).join('\n');
      const label=outcome.status==='finished'
        ?'El agente indicó que terminó la tarea; comprueba el resultado en el escritorio.'
        :outcome.status==='cancelled'?'La tarea se detuvo'
        :'La ejecución se detuvo: '+outcome.message;
      return [label,detail].filter(Boolean).join('\n\n');
    } finally {
      if(id) {
        try{await desktopCall(ownerSession,'/api/desktops/'+id,'DELETE');}catch{}
      }
      desktopSession.current=null;
      desktopStopRequested.current=false;
    }
  }
  const activeRequest = useRef<AbortController | null>(null);
  const chatGeneration = useRef(0);
  useEffect(() => () => activeRequest.current?.abort(), []);
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>(() => {
    const pending=loadPendingDesktopTask();
    return pending ? [{id:1,text:pending.text,agent:pending.agent,provider:'daytona',role:'user'}] : [];
  });
  const [level, setLevel] = useState("Standard");
  const [agentMenu, setAgentMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);
  const [phase, setPhase] = useState(0);
  const phrases = ["Analizando la solicitud", "Revisando el contexto", "Organizando el plan", "Preparando la respuesta"];
  useEffect(() => {
    if (!preview) return;
    const timer = window.setInterval(() => setPhase(value => (value + 1) % phrases.length), 1850);
    return () => window.clearInterval(timer);
  }, [preview]);
  const fileInput = useRef<HTMLInputElement>(null);
  const nextId = useRef(loadPendingDesktopTask() ? 1 : 0);
  const selected = agents.find(a => a.name === agent) ?? agents[1];
  const agentTurns = turns.filter(turn => turn.agent === agent);
  function connectOwner() {
    setDesktopAccessOpen(false);
    if (!ownerAuthConfigured) {
      setError('El acceso privado todavía no está habilitado en Railway. Se necesita configurar una aplicación OAuth de GitHub una sola vez; no introduzcas tokens en el chat.');
      return;
    }
    beginDesktopOwnerLogin();
  }
  async function resumeDesktopTask() {
    const pending = pendingDesktopTask;
    if (!pending || busy) return;
    if (!ownerSession) {
      connectOwner();
      return;
    }
    const generation = chatGeneration.current;
    setError('');
    setBusy(true);
    try {
      const summary = await performLocalGoal(pending.text, pending.agent);
      if (generation === chatGeneration.current) {
        setTurns(prev => [...prev, {
          id: ++nextId.current, text: summary, agent: pending.agent,
          provider:'daytona', role:'assistant'
        }]);
        setPendingDesktopTask(null);
        clearPendingDesktopTask();
      }
    } catch (cause) {
      if (generation === chatGeneration.current) {
        const message=cause instanceof Error ? cause.message : 'No fue posible abrir Daytona. La tarea sigue pendiente.';
        if (message.includes('Acceso no autorizado')) {
          clearDesktopOwnerSession();
          setOwnerSession('');
          setError('La sesión privada venció. Vuelve a iniciar sesión con GitHub para continuar.');
        } else setError(message);
      }
    } finally {
      setBusy(false);
    }
  }
  const autoResumeKey=useRef('');
  useEffect(() => {
    if (!ownerSession || !pendingDesktopTask || busy) return;
    const key=ownerSession+':'+pendingDesktopTask.agent+':'+pendingDesktopTask.text;
    if (autoResumeKey.current===key) return;
    autoResumeKey.current=key;
    void resumeDesktopTask();
  }, [ownerSession, pendingDesktopTask]);

  useEffect(() => {
    async function prepare() {
      const previousError=takeDesktopAuthError();
      if (previousError) setError(previousError);
      const ticket=takeDesktopAuthTicket();
      if (ticket) {
        try {
          const session=await exchangeDesktopAuthTicket(ticket);
          setOwnerSession(session);
          setError('');
        } catch (e) { setError(e instanceof Error ? e.message : 'No se pudo recuperar la sesión privada'); }
      } else {
        const stored=loadDesktopOwnerSession();
        if (stored && !(await validateDesktopOwnerSession(stored))) setOwnerSession('');
      }
      try {
        const config=await loadDesktopAuthConfig();
        setOwnerAuthConfigured(config.configured);
      } catch { setError('No se pudo consultar la configuración privada de Daytona.'); }
      finally { setOwnerAuthChecking(false); }
    }
    void prepare();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;
    if (editId !== null) {
      setTurns(prev => prev.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
      setDraft("");
      return;
    }
    const selectedAgent = agent;
    const generation = chatGeneration.current;
    const localDesktopTask = shouldUseDesktop(text);
    const previous: FreeChatMessage[] = turns
      .filter(t => t.agent === selectedAgent && t.provider === "free" && t.text)
      .slice(-7)
      .map(t => ({ role: t.role, content: t.text }));
    const userId = ++nextId.current;
    const replyId = ++nextId.current;
    setTurns(prev => [...prev, { id: userId, text, agent: selectedAgent, provider: localDesktopTask ? "daytona" : "free", role: "user" }]);
    setDraft("");
    setError("");
    if (localDesktopTask && !ownerSession) {
      const pending={text,agent:selectedAgent};
      savePendingDesktopTask(pending);
      setPendingDesktopTask(pending);
      setError(ownerAuthConfigured
        ? 'Para usar tu computadora privada, inicia sesión con GitHub una sola vez. Coder continuará automáticamente tu tarea.'
        : 'La computadora privada todavía no está vinculada a GitHub en Railway. Tu tarea queda en espera; no compartas credenciales aquí.');
      return;
    }
    setBusy(true);
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      if(localDesktopTask) {
        const summary=await performLocalGoal(text,selectedAgent);
        if (generation === chatGeneration.current) setTurns(prev=>[...prev,{id:replyId,text:summary,agent:selectedAgent,provider:'daytona',role:'assistant'}]);
      } else await streamFreeAnswer(
        selectedAgent.toLowerCase() as FreeAgentRole,
        [...previous, { role: "user", content: text }],
        delta => setTurns(prev => prev.some(t => t.id === replyId)
          ? prev.map(t => t.id === replyId ? { ...t, text: t.text + delta } : t)
          : [...prev, { id: replyId, text: delta, agent: selectedAgent, provider: "free", role: "assistant" }]),
        controller.signal,
      );
    } catch (reason) {
      if (!controller.signal.aborted && generation === chatGeneration.current) {
        setError(reason instanceof Error ? reason.message : "No se pudo completar la respuesta.");
      }
    } finally {
      if (activeRequest.current === controller) activeRequest.current = null;
      setBusy(false);
    }
  };
  if (toolLabOpen) {
    return <ToolLab initialAgent={agent} onClose={() => setToolLabOpen(false)} onUsePrompt={(selectedAgent, prompt) => {
      setAgent(selectedAgent);
      setDraft(prompt);
      setError("");
      setEditId(null);
      setToolLabOpen(false);
    }}/>;
  }
  return (
    <section className="agents-workspace" id="agents" aria-label="Agentes de Meridian">
      <aside className={"agents-sidebar" + (sideOpen ? " open" : "")}>
        <div className="agents-sidebar-top"><span>MERIDIAN <span className="agents-slash">/</span> AGENTES</span><button type="button" aria-label="Cerrar panel" className="agents-side-close" onClick={() => setSideOpen(false)}><X size={18}/></button></div>
        <button className="agents-new" type="button" onClick={() => { chatGeneration.current++; desktopStopRequested.current=true; if(desktopSession.current)void stopDesktopTask(); setDesktopRun(null); setPendingDesktopTask(null); clearPendingDesktopTask(); setTurns([]); setDraft(""); setFiles([]); setEditId(null); setPreview(false); setError(""); activeRequest.current?.abort(); setBusy(false); setSideOpen(false); }}><MessageSquarePlus size={17}/> Nuevo chat</button>
        <span className="agents-side-label">AGENTES</span>
        <div className="agents-list">
          {agents.map(a => <button type="button" key={a.name} onClick={() => { setAgent(a.name); setError(""); setSideOpen(false); }} className={"agents-list-item" + (agent === a.name ? " active" : "")} aria-pressed={agent === a.name}><AgentAvatar name={a.name} size={35}/>{a.name}{agent === a.name && <Check size={14} className="agents-check"/>}</button>)}
        </div>
        <div className="agents-desktop-access">
          <strong>Computadora Daytona</strong>
          <small>{ownerSession ? "Conectada a tu cuenta privada. Coder puede usar sbmeridian cuando la tarea lo requiera." :
            ownerAuthChecking ? "Verificando acceso privado…" :
            ownerAuthConfigured ? "Se requiere iniciar sesión con GitHub una sola vez. No necesitas tokens de operador." :
            "Conexión privada pendiente de configuración en Railway."}</small>
          {!ownerSession && <button type="button" disabled={ownerAuthChecking || !ownerAuthConfigured}
            onClick={connectOwner}>Conectar con GitHub</button>}
          {pendingDesktopTask && <button type="button" disabled={busy || (!ownerSession && !ownerAuthConfigured)}
            onClick={() => ownerSession ? void resumeDesktopTask() : connectOwner()}>
            {ownerSession ? "Continuar tarea pendiente" : "Autorizar y continuar"}
          </button>}
        </div>
        <div className="agents-sidebar-foot"><button type="button" onClick={() => setToolLabOpen(true)}>Laboratorio interactivo →</button><a href="/-meridian-showcase/desktop/" className="agents-community-link">Laptop virtual Daytona →</a><a href="/-meridian-showcase/" className="agents-community-link">← Meridian Community</a><span>Agentes · chat gratuito</span></div>
      </aside>
      <div className="agents-center">
        <header className="agents-toolbar">
          <button type="button" className="agents-icon agents-hamburger" aria-label="Mostrar agentes" onClick={() => setSideOpen(true)}><Menu size={19}/></button>
          <div className="agents-selector">
            <button type="button" onClick={() => setAgentMenu(!agentMenu)} aria-expanded={agentMenu} className="agents-agent-btn"><AgentAvatar name={selected.name} size={29}/><strong>{agent}</strong><ChevronDown size={15}/></button>
            {agentMenu && <div className="agents-popup agents-agent-menu" role="menu">{agents.map(a => <button type="button" key={a.name} role="menuitem" onClick={() => { setAgent(a.name); setError(""); setAgentMenu(false); }}><AgentAvatar name={a.name} size={26}/>{a.name}{a.name === agent && <Check size={14}/>}</button>)}</div>}
          </div>
          <button type="button" className="agents-mobile-desktop-toggle"
            aria-controls="agents-mobile-daytona" aria-expanded={desktopAccessOpen}
            onClick={() => { setDesktopAccessOpen(value => !value); setSideOpen(false); }}>
            {ownerSession ? "Computadora lista" : pendingDesktopTask ? "Conectar computadora" : "Computadora"}
          </button>
          <button type="button" className="agents-preview-button" onClick={() => { setToolLabOpen(true); }}>Explorar herramientas · Demo</button><span className="agents-toolbar-status">Gratis</span>
        </header>
        {desktopAccessOpen && <section className="agents-mobile-desktop-panel" id="agents-mobile-daytona" aria-label="Acceso privado Daytona">
          <strong>Computadora Daytona</strong>
          <p>{ownerSession
            ? "Tu cuenta está conectada. El agente usa sbmeridian cuando lo necesita."
            : ownerAuthConfigured
              ? "Inicia sesión con tu GitHub una sola vez. No tienes que introducir tokens de Daytona."
              : "El propietario debe completar la conexión de GitHub en Railway antes de usar la computadora."}</p>
          {!ownerSession && <button type="button" className="agents-mobile-desktop-resume"
            disabled={!ownerAuthConfigured || ownerAuthChecking} onClick={connectOwner}>Conectar con GitHub</button>}
          {pendingDesktopTask && <button type="button" className="agents-mobile-desktop-resume"
            disabled={busy || (!ownerSession && !ownerAuthConfigured)}
            onClick={() => ownerSession ? void resumeDesktopTask() : connectOwner()}>
            {ownerSession ? "Continuar tarea pendiente" : "Autorizar y continuar"}
          </button>}
          <button type="button" className="agents-mobile-desktop-close" onClick={() => setDesktopAccessOpen(false)}>Cerrar</button>
        </section>}
        <div className={"agents-conversation" + (agentTurns.length ? " has-turns" : "")}>
          {agentTurns.length === 0 && !preview ? <div className="agents-hello"><AgentAvatar name={selected.name} size={84} active={preview}/><h1>{agent}</h1></div> : <div className="agents-thread" aria-live="polite">{agentTurns.map(t => t.role === "assistant"
            ? <div className="agents-turn agents-turn--assistant" key={t.id}>
                <div className="agents-assistant-identity"><AgentAvatar name={t.agent} size={35}/><strong>{t.agent}</strong><small>· {t.provider === "daytona" ? "Daytona · computadora real" : "Modelo gratuito"}</small></div>
                <div className="agents-assistant-answer"><AgentMarkdown text={t.text}/></div>
                <div className="agents-turn-actions"><button type="button" aria-label="Copiar respuesta" onClick={() => navigator.clipboard?.writeText(t.text)}><Copy size={15}/></button></div>
              </div>
            : <div className="agents-turn" key={t.id}>
                <div className="agents-turn-meta">Tú · {t.agent}</div>
                <div className="agents-user-bubble">{t.text}</div>
                <div className="agents-turn-actions">
                  <button type="button" aria-label="Copiar mensaje" onClick={() => navigator.clipboard?.writeText(t.text)}><Copy size={15}/></button>
                  <button type="button" aria-label="Editar mensaje" disabled={busy} onClick={() => { setDraft(t.text); setEditId(t.id); }}><Pencil size={15}/></button>
                </div>
              </div>)}
            {busy && <div className="agents-live-activity" role="status"><AgentAvatar name={agent} size={30} active/><span>{desktopSession.current?'Trabajando en sbmeridian…':'Generando respuesta gratuita…'}</span></div>}
            {desktopRun && <div className="agents-desktop-run" role="status" aria-live="polite"><strong>Computadora · {desktopRun.status}</strong><span>{desktopRun.message} · {desktopRun.step}/{desktopRun.maxSteps} pasos</span>{desktopRun.history.length>0 && <small>{desktopRun.history.slice(-2).map(s=>s.message).join(' · ')}</small>}{['starting','running'].includes(desktopRun.status) && <button type="button" onClick={()=>void stopDesktopTask()}>Detener agente</button>}<a href="/-meridian-showcase/desktop/" target="_blank" rel="noreferrer">Abrir pantalla ↗</a></div>}
            {pendingDesktopTask && pendingDesktopTask.agent === agent && <div className="agents-desktop-pending" role="status">
              <strong>Computadora privada · tarea pendiente</strong>
              <p>{ownerSession ? "La sesión privada está lista. Puedes reintentar la tarea."
                : "Tu tarea se guardó. Autoriza tu cuenta de GitHub una sola vez para que el agente pueda usar sbmeridian sin tokens manuales."}</p>
              <button type="button" disabled={busy || (!ownerSession && !ownerAuthConfigured)}
                onClick={() => ownerSession ? void resumeDesktopTask() : connectOwner()}>
                {ownerSession ? "Continuar tarea" : "Conectar GitHub y continuar"}
              </button>
            </div>}
            {error && <div className="agents-live-error" role="alert">{error}</div>}{preview && <div className="agent-reasoning-preview"><div className="agent-reasoning-heading"><AgentAvatar name={agent} size={48} active/><div><strong>{agent}</strong><small>Vista previa de animación · Sin ejecución real</small></div></div><div className="agent-reasoning-status" role="status"><span className="agent-reasoning-loader" aria-hidden="true"/> <span key={phase} className="agent-reasoning-shimmer">{phrases[phase]}…</span></div><div className="agent-plan-preview"><div className="agent-plan-title">Plan de trabajo <small>Ejemplo visual</small></div>{phrases.map((step,i) => <div key={step} className="agent-plan-step"><span className={i < phase ? "complete" : i === phase ? "working" : ""}>{i < phase ? "✓" : i === phase ? "◌" : "○"}</span><span>{step}</span></div>)}</div><div className="agent-reasoning-example"><AgentAvatar name={agent} size={35}/><span>Animación de ejemplo. El chat utiliza respuestas reales del modelo gratuito.</span></div></div>}</div>}
        </div>
        <div className="agents-compose-area">
          {files.length > 0 && <div className="agents-file-names">{files.map((name,i) => <span key={i}><Paperclip size={12}/>{name}</span>)}</div>}
          <form className="agents-compose" onSubmit={submit}>
            <textarea maxLength={1200} disabled={busy} aria-label="Mensaje para el agente" placeholder={"Enviar mensaje a " + agent} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} rows={2}/>
            <div className="agents-compose-bottom">
              <div className="agents-compose-left"><label className="agents-model-label"><span className="sr-only">Proveedor de IA (vista previa)</span><select value={provider} onChange={e => setProvider(e.target.value)} aria-label="Proveedor de IA para la vista previa"><option value="free">Gratis · Auto</option><option value="openai" disabled>OpenAI · próximamente</option><option value="gemini" disabled>Gemini · próximamente</option><option value="claude" disabled>Claude · próximamente</option></select><ChevronDown size={13} aria-hidden="true"/></label>
                <input ref={fileInput} type="file" multiple className="agents-file-input" aria-label="Seleccionar archivos" onChange={e => setFiles(Array.from(e.target.files ?? []).map(f => f.name))}/>
                <button type="button" title="Adjuntos disponibles próximamente" aria-label="Adjuntar archivos (no disponible)" className="agents-icon" disabled><FilePlus2 size={19}/></button>
                <div className="agents-settings-wrap"><button type="button" className="agents-level" aria-expanded={settingsMenu} onClick={() => setSettingsMenu(!settingsMenu)}>{level}<ChevronDown size={13}/></button>{settingsMenu && <div className="agents-popup agents-level-menu">{["Standard","Deep","Expert"].map(l => <button key={l} type="button" onClick={() => { setLevel(l); setSettingsMenu(false); }}>{l}{l===level && <Check size={14}/>}</button>)}<small>Preferencia visual; no cambia el razonamiento.</small></div>}</div>
              </div>
              <div className="agents-compose-right"><button type="button" className="agents-icon" disabled title="Voz todavía no conectada" aria-label="Micrófono no disponible"><Mic size={19}/></button><button type="submit" className="agents-send" disabled={!draft.trim() || busy} aria-label={editId === null ? "Enviar mensaje" : "Guardar edición"}>{editId !== null ? <Check size={18}/> : <ArrowUp size={19}/>}</button></div>
            </div>
          </form>
          <p className="agents-compose-note">Chat gratuito · Daytona autónomo hasta 8 pasos en tu computadora privada. Acciones sensibles requieren supervisión.</p>
        </div>
      </div>
    </section>
  );
}
