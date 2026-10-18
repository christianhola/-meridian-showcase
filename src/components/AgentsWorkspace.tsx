import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, ChevronDown, Copy, FilePlus2, Menu, MessageSquarePlus, Mic, Paperclip, Pencil, X } from "lucide-react";
import "./AgentsWorkspace.css";
import { AgentAvatar } from "./AgentAvatar";

type Turn = { id: number; text: string; agent: string; provider: string };
const agents = [
  { name: "Architect", symbol: "◇", tone: "#8595ff" },
  { name: "Coder", symbol: "</>", tone: "#6ecdaa" },
  { name: "Researcher", symbol: "◎", tone: "#b6a0e9" },
  { name: "Growth", symbol: "↗", tone: "#e3bc87" },
  { name: "Browser", symbol: "◉", tone: "#85c7dc" },
  { name: "Reviewer", symbol: "✓", tone: "#b9c1cc" },
] as const;

export function AgentsWorkspace() {
  const [agent, setAgent] = useState("Coder");
  const [provider, setProvider] = useState("openai");
  const [draft, setDraft] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
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
  const nextId = useRef(0);
  const selected = agents.find(a => a.name === agent) ?? agents[1];
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    if (editId !== null) {
      setTurns(prev => prev.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
    } else {
      setTurns(prev => [...prev, { id: ++nextId.current, text, agent, provider }]);
    }
    setDraft("");
  };
  return (
    <section className="agents-workspace" id="agents" aria-label="Agentes de Meridian">
      <aside className={"agents-sidebar" + (sideOpen ? " open" : "")}>
        <div className="agents-sidebar-top"><span>MERIDIAN <span className="agents-slash">/</span> AGENTES</span><button type="button" aria-label="Cerrar panel" className="agents-side-close" onClick={() => setSideOpen(false)}><X size={18}/></button></div>
        <button className="agents-new" type="button" onClick={() => { setTurns([]); setDraft(""); setFiles([]); setEditId(null); setPreview(false); setSideOpen(false); }}><MessageSquarePlus size={17}/> Nuevo chat</button>
        <span className="agents-side-label">AGENTES</span>
        <div className="agents-list">
          {agents.map(a => <button type="button" key={a.name} onClick={() => { setAgent(a.name); setSideOpen(false); }} className={"agents-list-item" + (agent === a.name ? " active" : "")} aria-pressed={agent === a.name}><AgentAvatar name={a.name} size={35}/>{a.name}{agent === a.name && <Check size={14} className="agents-check"/>}</button>)}
        </div>
        <div className="agents-sidebar-foot">Vista de diseño · Sin conexión al modelo</div>
      </aside>
      <div className="agents-center">
        <header className="agents-toolbar">
          <button type="button" className="agents-icon agents-hamburger" aria-label="Mostrar agentes" onClick={() => setSideOpen(true)}><Menu size={19}/></button>
          <div className="agents-selector">
            <button type="button" onClick={() => setAgentMenu(!agentMenu)} aria-expanded={agentMenu} className="agents-agent-btn"><AgentAvatar name={selected.name} size={29}/><strong>{agent}</strong><ChevronDown size={15}/></button>
            {agentMenu && <div className="agents-popup agents-agent-menu" role="menu">{agents.map(a => <button type="button" key={a.name} role="menuitem" onClick={() => { setAgent(a.name); setAgentMenu(false); }}><AgentAvatar name={a.name} size={26}/>{a.name}{a.name === agent && <Check size={14}/>}</button>)}</div>}
          </div>
          <button type="button" className="agents-preview-button" aria-pressed={preview} onClick={() => { setPreview(!preview); setPhase(0); }}>{preview ? "Cerrar animación" : "Ver animación"}</button><span className="agents-toolbar-status">Vista previa</span>
        </header>
        <div className={"agents-conversation" + (turns.length ? " has-turns" : "")}>
          {turns.length === 0 && !preview ? <div className="agents-hello"><AgentAvatar name={selected.name} size={84} active={preview}/><h1>{agent}</h1></div> : <div className="agents-thread" aria-live="polite">{turns.map(t => <div className="agents-turn" key={t.id}><div className="agents-turn-meta">{t.agent} · {({openai:"OpenAI",gemini:"Gemini",claude:"Claude"} as Record<string,string>)[t.provider] ?? t.provider}</div><div className="agents-user-bubble">{t.text}</div><div className="agents-turn-actions"><button type="button" aria-label="Copiar mensaje" onClick={() => navigator.clipboard?.writeText(t.text)}><Copy size={15}/></button><button type="button" aria-label="Editar mensaje" onClick={() => { setDraft(t.text); setEditId(t.id); }}><Pencil size={15}/></button></div></div>)}{preview && <div className="agent-reasoning-preview"><div className="agent-reasoning-heading"><AgentAvatar name={agent} size={48} active/><div><strong>{agent}</strong><small>Vista previa de animación · Sin ejecución real</small></div></div><div className="agent-reasoning-status" role="status"><span className="agent-reasoning-loader" aria-hidden="true"/> <span key={phase} className="agent-reasoning-shimmer">{phrases[phase]}…</span></div><div className="agent-plan-preview"><div className="agent-plan-title">Plan de trabajo <small>Ejemplo visual</small></div>{phrases.map((step,i) => <div key={step} className="agent-plan-step"><span className={i < phase ? "complete" : i === phase ? "working" : ""}>{i < phase ? "✓" : i === phase ? "◌" : "○"}</span><span>{step}</span></div>)}</div><div className="agent-reasoning-example"><AgentAvatar name={agent} size={35}/><span>El avatar aparecerá aquí junto a la respuesta cuando se conecte un modelo real.</span></div></div>}<div className="agents-unavailable" role="status"><span className="agents-unavailable-dot"/> Los mensajes están guardados solo en esta vista. El modelo todavía no está conectado.</div></div>}
        </div>
        <div className="agents-compose-area">
          {files.length > 0 && <div className="agents-file-names">{files.map((name,i) => <span key={i}><Paperclip size={12}/>{name}</span>)}</div>}
          <form className="agents-compose" onSubmit={submit}>
            <textarea aria-label="Mensaje para el agente" placeholder={"Enviar mensaje a " + agent} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }} rows={2}/>
            <div className="agents-compose-bottom">
              <div className="agents-compose-left"><label className="agents-model-label"><span className="sr-only">Proveedor de IA (vista previa)</span><select value={provider} onChange={e => setProvider(e.target.value)} aria-label="Proveedor de IA para la vista previa"><option value="openai">OpenAI</option><option value="gemini">Gemini</option><option value="claude">Claude</option></select><ChevronDown size={13} aria-hidden="true"/></label>
                <input ref={fileInput} type="file" multiple className="agents-file-input" aria-label="Seleccionar archivos" onChange={e => setFiles(Array.from(e.target.files ?? []).map(f => f.name))}/>
                <button type="button" title="Seleccionar archivos (solo vista previa)" aria-label="Adjuntar archivos" className="agents-icon" onClick={() => fileInput.current?.click()}><FilePlus2 size={19}/></button>
                <div className="agents-settings-wrap"><button type="button" className="agents-level" aria-expanded={settingsMenu} onClick={() => setSettingsMenu(!settingsMenu)}>{level}<ChevronDown size={13}/></button>{settingsMenu && <div className="agents-popup agents-level-menu">{["Standard","Deep","Expert"].map(l => <button key={l} type="button" onClick={() => { setLevel(l); setSettingsMenu(false); }}>{l}{l===level && <Check size={14}/>}</button>)}<small>Preferencia visual; no cambia el razonamiento.</small></div>}</div>
              </div>
              <div className="agents-compose-right"><button type="button" className="agents-icon" disabled title="Voz todavía no conectada" aria-label="Micrófono no disponible"><Mic size={19}/></button><button type="submit" className="agents-send" disabled={!draft.trim()} aria-label={editId === null ? "Guardar mensaje" : "Guardar edición"}>{editId !== null ? <Check size={18}/> : <ArrowUp size={19}/>}</button></div>
            </div>
          </form>
          <p className="agents-compose-note">Vista previa pública · El modelo seleccionado no responde aún. Sin conexión a Railway ni claves en el navegador.</p>
        </div>
      </div>
    </section>
  );
}
