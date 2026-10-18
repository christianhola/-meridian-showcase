import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, Check, ChevronDown, Copy, FilePlus2, Menu, MessageSquarePlus, Mic, Paperclip, Pencil, X } from "lucide-react";
import "./AgentsWorkspace.css";
import { AgentAvatar } from "./AgentAvatar";
import { AgentMarkdown } from "./AgentMarkdown";
import { streamFreeAnswer, type FreeAgentRole, type FreeChatMessage } from "./freeModelStream";

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
  const [agent, setAgent] = useState("Coder");
  const [provider, setProvider] = useState("free");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const activeRequest = useRef<AbortController | null>(null);
  useEffect(() => () => activeRequest.current?.abort(), []);
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
  const agentTurns = turns.filter(turn => turn.agent === agent);
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
    const previous: FreeChatMessage[] = turns
      .filter(t => t.agent === selectedAgent && t.provider === "free" && t.text)
      .slice(-7)
      .map(t => ({ role: t.role, content: t.text }));
    const userId = ++nextId.current;
    const replyId = ++nextId.current;
    setTurns(prev => [...prev, { id: userId, text, agent: selectedAgent, provider: "free", role: "user" }]);
    setDraft("");
    setError("");
    setBusy(true);
    const controller = new AbortController();
    activeRequest.current = controller;
    try {
      await streamFreeAnswer(
        selectedAgent.toLowerCase() as FreeAgentRole,
        [...previous, { role: "user", content: text }],
        delta => setTurns(prev => prev.some(t => t.id === replyId)
          ? prev.map(t => t.id === replyId ? { ...t, text: t.text + delta } : t)
          : [...prev, { id: replyId, text: delta, agent: selectedAgent, provider: "free", role: "assistant" }]),
        controller.signal,
      );
    } catch (reason) {
      if (!controller.signal.aborted) {
        setError(reason instanceof Error ? reason.message : "No se pudo completar la respuesta.");
      }
    } finally {
      if (activeRequest.current === controller) activeRequest.current = null;
      setBusy(false);
    }
  };
  return (
    <section className="agents-workspace" id="agents" aria-label="Agentes de Meridian">
      <aside className={"agents-sidebar" + (sideOpen ? " open" : "")}>
        <div className="agents-sidebar-top"><span>MERIDIAN <span className="agents-slash">/</span> AGENTES</span><button type="button" aria-label="Cerrar panel" className="agents-side-close" onClick={() => setSideOpen(false)}><X size={18}/></button></div>
        <button className="agents-new" type="button" onClick={() => { setTurns([]); setDraft(""); setFiles([]); setEditId(null); setPreview(false); setError(""); activeRequest.current?.abort(); setBusy(false); setSideOpen(false); }}><MessageSquarePlus size={17}/> Nuevo chat</button>
        <span className="agents-side-label">AGENTES</span>
        <div className="agents-list">
          {agents.map(a => <button type="button" key={a.name} onClick={() => { setAgent(a.name); setError(""); setSideOpen(false); }} className={"agents-list-item" + (agent === a.name ? " active" : "")} aria-pressed={agent === a.name}><AgentAvatar name={a.name} size={35}/>{a.name}{agent === a.name && <Check size={14} className="agents-check"/>}</button>)}
        </div>
        <div className="agents-sidebar-foot"><a href="/-meridian-showcase/" className="agents-community-link">← Meridian Community</a><span>Agentes · chat gratuito</span></div>
      </aside>
      <div className="agents-center">
        <header className="agents-toolbar">
          <button type="button" className="agents-icon agents-hamburger" aria-label="Mostrar agentes" onClick={() => setSideOpen(true)}><Menu size={19}/></button>
          <div className="agents-selector">
            <button type="button" onClick={() => setAgentMenu(!agentMenu)} aria-expanded={agentMenu} className="agents-agent-btn"><AgentAvatar name={selected.name} size={29}/><strong>{agent}</strong><ChevronDown size={15}/></button>
            {agentMenu && <div className="agents-popup agents-agent-menu" role="menu">{agents.map(a => <button type="button" key={a.name} role="menuitem" onClick={() => { setAgent(a.name); setError(""); setAgentMenu(false); }}><AgentAvatar name={a.name} size={26}/>{a.name}{a.name === agent && <Check size={14}/>}</button>)}</div>}
          </div>
          <button type="button" className="agents-preview-button" aria-pressed={preview} onClick={() => { setPreview(!preview); setPhase(0); }}>{preview ? "Cerrar animación" : "Ver animación"}</button><span className="agents-toolbar-status">Gratis</span>
        </header>
        <div className={"agents-conversation" + (agentTurns.length ? " has-turns" : "")}>
          {agentTurns.length === 0 && !preview ? <div className="agents-hello"><AgentAvatar name={selected.name} size={84} active={preview}/><h1>{agent}</h1></div> : <div className="agents-thread" aria-live="polite">{agentTurns.map(t => t.role === "assistant"
            ? <div className="agents-turn agents-turn--assistant" key={t.id}>
                <div className="agents-assistant-identity"><AgentAvatar name={t.agent} size={35}/><strong>{t.agent}</strong><small>· Modelo gratuito</small></div>
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
            {busy && <div className="agents-live-activity" role="status"><AgentAvatar name={agent} size={30} active/><span>Generando respuesta gratuita…</span></div>}
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
          <p className="agents-compose-note">Modelos gratuitos por OpenRouter · límites de uso · sin claves en el navegador.</p>
        </div>
      </div>
    </section>
  );
}
