import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  Activity, ArrowDown, ArrowUp, Check, ChevronDown, Circle, Command,
  Cpu, FileImage, Gauge, ImagePlus, Paperclip, Play, Plus, Send,
  Sparkles,
} from "lucide-react";

type Model = {
  id: string;
  name: string;
  maker: string;
  icon: string;
  color: string;
  speed: number;
  context: string;
  strength: string;
};

const models: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", maker: "OpenAI", icon: "O", color: "#171717", speed: 84, context: "128k", strength: "Versátil" },
  { id: "gemini", name: "Gemini 1.5 Pro", maker: "Google", icon: "✦", color: "#6576ff", speed: 71, context: "1M", strength: "Visión" },
  { id: "claude", name: "Claude 3.5 Sonnet", maker: "Anthropic", icon: "A", color: "#c56b42", speed: 63, context: "200k", strength: "Razonamiento" },
  { id: "llama", name: "Llama 3.1 70B", maker: "Groq", icon: "G", color: "#f04f3d", speed: 500, context: "128k", strength: "Velocidad" },
  { id: "together", name: "Llama 3.1 405B", maker: "Together AI", icon: "T", color: "#7861e8", speed: 96, context: "128k", strength: "Open models" },
  { id: "sonar", name: "Sonar", maker: "Perplexity", icon: "P", color: "#21887b", speed: 52, context: "128k", strength: "Búsqueda" },
];

const integrations = ["OpenAI", "Google AI", "Anthropic", "Groq", "Together AI", "Perplexity", "Tavily"];

export function AIPlayground() {
  const [selected, setSelected] = useState(models[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("Prueba a cambiar de modelo o escribe una pregunta. Esta respuesta de ejemplo no realiza ninguna llamada a un servicio de IA.");
  const [sent, setSent] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const toggleIntegration = (name: string) => {
    setConnected(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const runDemo = () => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) return;
    setSent(true);
    setAnswer(`Vista previa de ${selected.name}: ${cleanPrompt}\n\nLa interfaz está lista para mostrar una respuesta en streaming. En este modo visual, el texto no se envía a ningún proveedor.`);
    setPrompt("");
  };

  const loadImage = (file?: File) => {
    if (file && file.type.startsWith("image/")) setImageUrl(URL.createObjectURL(file));
  };

  return (
    <section className="section ai-playground" id="ai-playground" aria-labelledby="ai-playground-title">
      <div className="ai-heading">
        <div>
          <span className="ai-heading__brand"><span className="vercel-mark" aria-hidden="true" /> Vercel AI SDK <span className="ai-heading__slash">/</span> Playground</span>
          <h2 id="ai-playground-title">One interface.<br /><span>Every model.</span></h2>
          <p>Explora una interfaz unificada para modelos de IA. Cambia de proveedor, prueba el flujo y observa cómo se adapta el espacio de trabajo.</p>
        </div>
        <div className="ai-heading__note"><span className="ai-demo-dot" /> Vista interactiva<br /><small>Solo demostración visual · sin llamadas externas</small></div>
      </div>

      <div className="ai-workbench">
        <aside className="ai-sidebar" aria-label="Panel de integraciones">
          <div className="ai-side-title"><span>PROVEEDORES</span><button type="button" aria-label="Añadir proveedor" className="ai-add"><Plus size={15} /></button></div>
          <div className="ai-provider-list">
            {integrations.map(name => {
              const active = connected.includes(name);
              const model = models.find(item => item.maker === name || (name === "Google AI" && item.maker === "Google"));
              return (
                <button type="button" className={`ai-provider ${active ? "is-connected" : ""}`} key={name} onClick={() => toggleIntegration(name)} aria-pressed={active}>
                  <span className="ai-provider__icon" style={{ "--provider-color": model?.color ?? "#6d6d68" } as CSSProperties}>{model?.icon ?? name.slice(0, 1)}</span>
                  <span className="ai-provider__name">{name}</span>
                  <span className={`ai-provider__status ${active ? "is-on" : ""}`} aria-label={active ? "Conectado en modo demo" : "Inactivo"} />
                </button>
              );
            })}
          </div>
          <div className="ai-sidebar__foot"><Circle size={8} /> Las conexiones son simuladas</div>
        </aside>

        <div className="ai-chat">
          <header className="ai-chat__top">
            <div className="ai-select-wrap">
              <button type="button" className="ai-model-select" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-haspopup="listbox">
                <span className="ai-model-avatar" style={{ "--provider-color": selected.color } as CSSProperties}>{selected.icon}</span>
                <span><strong>{selected.name}</strong><small>{selected.maker}</small></span><ChevronDown size={15} />
              </button>
              {menuOpen && <div className="ai-model-menu" role="listbox" aria-label="Seleccionar modelo">
                {models.map(model => <button type="button" key={model.id} role="option" aria-selected={selected.id === model.id} onClick={() => { setSelected(model); setMenuOpen(false); }}>
                  <span className="ai-model-avatar" style={{ "--provider-color": model.color } as CSSProperties}>{model.icon}</span><span><strong>{model.name}</strong><small>{model.maker}</small></span>{selected.id === model.id && <Check size={15} />}
                </button>)}
              </div>}
            </div>
            <span className="ai-mode-label"><span /> Playground</span>
          </header>

          <div className="ai-conversation" aria-live="polite">
            <div className="ai-welcome">
              <span className="ai-welcome__icon"><Sparkles size={18} /></span>
              <div><strong>¿Qué quieres explorar?</strong><p>Prueba el selector de modelo o envía un mensaje de ejemplo.</p></div>
            </div>
            {sent && <div className="ai-message ai-message--user"><span className="ai-message__label">TÚ</span><p>Consulta de demostración procesada en esta vista.</p></div>}
            <div className="ai-message ai-message--assistant">
              <span className="ai-message__label"><span className="ai-mini-mark" /> {selected.name}</span>
              <p>{answer}</p>
              {selected.id === "gemini" && <button type="button" className="ai-image-drop" onClick={() => fileInput.current?.click()} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); loadImage(event.dataTransfer.files[0]); }}>
                {imageUrl ? <><img src={imageUrl} alt="Vista previa local" /><span><Check size={14} /> Vista previa local lista</span></> : <><ImagePlus size={16} /><span>Suelta una imagen o haz clic para verla aquí</span></>}
              </button>}
            </div>
          </div>

          <form className="ai-composer" onSubmit={event => { event.preventDefault(); runDemo(); }}>
            <label className="sr-only" htmlFor="ai-prompt">Escribe un mensaje de demostración</label>
            <textarea id="ai-prompt" value={prompt} onChange={event => setPrompt(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); runDemo(); } }} placeholder="Escribe algo para probar la interfaz…" rows={2} />
            <div className="ai-composer__bottom">
              <div><button type="button" aria-label="Adjuntar imagen" className="ai-tool" onClick={() => fileInput.current?.click()}><Paperclip size={15} /></button><button type="button" className="ai-attach-label" onClick={() => fileInput.current?.click()}><FileImage size={14} /> Adjuntar imagen</button></div>
              <div><kbd>↵</kbd><span>para enviar</span><button type="submit" className="ai-send" aria-label="Enviar mensaje de ejemplo"><Send size={15} /></button></div>
            </div>
            <input ref={fileInput} type="file" accept="image/*" hidden onChange={event => loadImage(event.target.files?.[0])} />
          </form>
          <div className="ai-chat__disclaimer">Los mensajes e indicadores son ejemplos visuales. No se envía información fuera del navegador.</div>
        </div>

        <aside className="ai-insights" aria-label="Información del modelo seleccionado">
          <div className="ai-insights__top"><span>MODELO ACTIVO</span><span className="ai-live-tag">DEMO</span></div>
          <div className="ai-model-card"><span className="ai-model-avatar ai-model-avatar--large" style={{ "--provider-color": selected.color } as CSSProperties}>{selected.icon}</span><strong>{selected.name}</strong><small>{selected.maker}</small></div>
          <div className="ai-insight-row"><span><Gauge size={15} /> Velocidad ilustrativa</span><strong>{selected.speed} <small>tok/s*</small></strong></div>
          <div className="ai-speed-meter" aria-label={`Indicador visual de velocidad: ${selected.speed} tokens por segundo`}><span style={{ width: `${Math.min(selected.speed / 5, 100)}%` }} /></div>
          <div className="ai-insight-row"><span><Cpu size={15} /> Contexto</span><strong>{selected.context}</strong></div>
          <div className="ai-insight-row"><span><Activity size={15} /> Punto fuerte</span><strong>{selected.strength}</strong></div>
          <div className="ai-insights__foot">* Métrica ilustrativa, no representa una prueba real de rendimiento.</div>
          <div className="ai-quick-actions"><span>ATAJOS</span><div><kbd><Command size={10} /> K</kbd> Cambiar modelo</div><div><kbd><ArrowUp size={10} /><ArrowDown size={10} /></kbd> Recorrer modelos</div><button type="button" onClick={() => { setSelected(models[0]); setAnswer("Prueba a cambiar de modelo o escribe una pregunta. Esta respuesta de ejemplo no realiza ninguna llamada a un servicio de IA."); setSent(false); }}><Play size={13} /> Reiniciar demo</button></div>
        </aside>
      </div>

      <div className="ai-capabilities" aria-label="Capacidades ilustrativas de modelos">
        <div className="ai-capability ai-capability--vision"><span className="ai-capability__symbol">✦</span><div><strong>Visión y contexto</strong><p>Interfaz para mostrar prompts con imágenes y modelos multimodales.</p></div><span className="ai-capability__tag">GEMINI</span></div>
        <div className="ai-capability ai-capability--speed"><span className="ai-capability__symbol">↯</span><div><strong>Inferencia veloz</strong><p>Un indicador visual que cambia al seleccionar proveedores.</p></div><span className="ai-capability__tag">GROQ</span></div>
        <div className="ai-capability ai-capability--reason"><span className="ai-capability__symbol">◉</span><div><strong>Modelos para cada tarea</strong><p>Compara opciones sin salir de un mismo espacio de trabajo.</p></div><span className="ai-capability__tag">MULTI-MODELO</span></div>
      </div>
    </section>
  );
}
