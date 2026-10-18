import { useState } from "react";
import { ArrowUpRight, BookOpen, Bot, Code2, Globe2, Network, Search, ShieldCheck, TrendingUp } from "lucide-react";
import "./AgentStudio.css";

const AGENTS = [
  { id: "architect", title: "Architect", sub: "Systems & decisions", color: "#6c85ff", icon: Network, summary: "Diseña arquitecturas, contratos de API y planes verificables.", skills: ["architecture-review", "system-design"], sources: ["CrewAI", "LangGraph"] },
  { id: "coder", title: "Coder", sub: "Engineering & tests", color: "#51c596", icon: Code2, summary: "Propone implementaciones, pruebas y revisiones de código.", skills: ["implementation-plan", "test-strategy"], sources: ["Vercel", "AutoGen"] },
  { id: "researcher", title: "Researcher", sub: "Evidence & knowledge", color: "#ae88ff", icon: Search, summary: "Investiga fuentes y distingue evidencia de hipótesis.", skills: ["source-validation", "video-to-skill"], sources: ["Y Combinator", "Lex Fridman"] },
  { id: "growth", title: "Growth", sub: "Products & strategy", color: "#f0ad62", icon: TrendingUp, summary: "Define hipótesis de producto, entrevistas y experimentos.", skills: ["customer-discovery", "startup-strategy"], sources: ["Y Combinator", "a16z"] },
  { id: "browser", title: "Browser", sub: "Navigation & QA", color: "#64c8db", icon: Globe2, summary: "Planifica navegación y QA con aprobación antes de cambios.", skills: ["browser-testing", "safe-navigation"], sources: ["browser-use"] },
  { id: "reviewer", title: "Reviewer", sub: "Security & quality", color: "#c2c9d4", icon: ShieldCheck, summary: "Evalúa riesgos, permisos, pruebas y criterios de salida.", skills: ["security-review", "quality-gates"], sources: ["VoltAgent"] },
] as const;

export function AgentStudio() {
  const [selected, setSelected] = useState<string>("architect");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState("");
  const current = AGENTS.find(a => a.id === selected) ?? AGENTS[0];
  const Icon = current.icon;
  return (
    <section className="agent-studio" id="agents" aria-labelledby="agent-studio-heading">
      <div className="agent-studio__intro">
        <span className="agent-studio__eyebrow"><Bot size={15} /> MERIDIAN / AGENT STUDIO</span>
        <h2 id="agent-studio-heading">A team of minds. <span>One workspace.</span></h2>
        <p>Explora seis roles especializados y sus skills. Esta galería es una demostración interactiva de configuración; no ejecuta modelos ni herramientas de producción.</p>
      </div>
      <div className="agent-studio__shell">
        <div className="agent-studio__nav" aria-label="Seleccionar agente">
          {AGENTS.map(agent => {
            const AgentIcon = agent.icon;
            return <button key={agent.id} type="button" className={"agent-studio__agent " + (selected === agent.id ? "is-active" : "")}
              style={{ "--agent-color": agent.color } as React.CSSProperties}
              aria-pressed={selected === agent.id} onClick={() => { setSelected(agent.id); setSubmitted(""); }}>
              <span className="agent-studio__agent-icon"><AgentIcon size={20} /></span>
              <span><strong>{agent.title}</strong><small>{agent.sub}</small></span>
              <ArrowUpRight size={15} className="agent-studio__arrow" />
            </button>;
          })}
        </div>
        <article className="agent-studio__detail" style={{ "--agent-color": current.color } as React.CSSProperties}>
          <div className="agent-studio__detail-top"><span>AGENT PROFILE / {current.id.toUpperCase()}</span><span>SPECIFICATION PREVIEW</span></div>
          <div className="agent-studio__emblem"><Icon size={38} strokeWidth={1.4} /></div>
          <h3>{current.title}<span>.</span></h3>
          <p>{current.summary}</p>
          <div className="agent-studio__split">
            <div><div className="agent-studio__label"><BookOpen size={13} /> SKILLS</div>{current.skills.map(skill => <span className="agent-studio__chip" key={skill}>{skill}</span>)}</div>
            <div><div className="agent-studio__label">INSPIRATION / REFERENCES</div>{current.sources.map(source => <span className="agent-studio__chip" key={source}>{source}</span>)}</div>
          </div>
          <form className="agent-studio__form" onSubmit={event => { event.preventDefault(); setSubmitted(request.trim()); }}>
            <label htmlFor="agent-studio-task">Prueba el diseño de una tarea</label>
            <div className="agent-studio__input-row"><input id="agent-studio-task" value={request} onChange={event => setRequest(event.target.value)} maxLength={280} placeholder="Describe la tarea..." required /><button type="submit">Preparar <ArrowUpRight size={15}/></button></div>
          </form>
          {submitted && <div className="agent-studio__result" role="status"><strong>Solicitud preparada para {current.title}</strong><p>{submitted}</p><small>Vista previa local: no se envió a una IA. La ejecución requiere autenticación y conexión al backend.</small></div>}
          <div className="agent-studio__bottom"><span>CONTROLLED TOOLS · HUMAN APPROVAL</span><a href="https://github.com/christianhola/-meridian-showcase/tree/main/agents" target="_blank" rel="noreferrer">Explore agent specifications <ArrowUpRight size={14}/></a></div>
        </article>
      </div>
    </section>
  );
}
