import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, CirclePause, CirclePlay, LockKeyhole, RotateCcw, ShieldCheck, Sparkles, X } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";
import { LiveDemoPanel } from "./LiveDemoPanel";
import type { AgentRole } from "../engine/types";
import "./ToolLab.css";

const ROLES = ["Architect", "Coder", "Researcher", "Growth", "Browser", "Reviewer"] as const;
type Role = (typeof ROLES)[number];
type Approval = "pending" | "approved" | "rejected";

const FLOW = [
  { title: "Entender", hint: "Identificar la petición y sus límites" },
  { title: "Seleccionar skill", hint: "Cargar instrucciones verificadas" },
  { title: "Solicitar permiso", hint: "Evaluar una posible acción externa" },
  { title: "Usar herramienta", hint: "Ejemplo ilustrativo, sin ejecutar nada" },
  { title: "Comprobar", hint: "Validar criterios antes del resultado" },
  { title: "Entregar", hint: "Mostrar el resultado y sus limitaciones" },
] as const;

type Scene = {
  prompt: string;
  skill: string;
  tool: string;
  category: string;
  approval: string;
  input: string;
  output: string;
  check: string;
  delivery: string;
};
const SCENES: Record<Role, Scene> = {
  Architect: {
    prompt: "Diseña una arquitectura segura para seis agentes y un solo backend.",
    skill: "architecture-decision",
    tool: "Generador de diagrama (propuesto)",
    category: "Arquitectura",
    approval: "Autorizar la generación de un diagrama de ejemplo. No se modifican servicios.",
    input: "Requisitos: 6 roles · permisos · un backend\nSalida deseada: límites y flujo de datos",
    output: "Usuario → Gateway → Política → Agente\n                              ↓\n                        Herramientas aisladas",
    check: "Contratos definidos · secret keys en servidor · rollback contemplado",
    delivery: "Mapa de arquitectura ilustrativo y decisiones pendientes.",
  },
  Coder: {
    prompt: "Crea una página HTML accesible con un botón animado.",
    skill: "html-prototype",
    tool: "Editor de archivos aislado (propuesto)",
    category: "Código",
    approval: "Autorizar escritura simulada en un archivo de demostración, nunca en tu equipo.",
    input: "archivo: index.html\nrequisitos: responsive, teclado, CSS animado",
    output: '<button class="action" type="button">Explorar</button>\n<style>.action { transition: transform .2s }\n.action:hover { transform: translateY(-2px) }</style>',
    check: "Estructura HTML completa · enfoque visible · responsive pendiente de ejecución",
    delivery: "Prototipo ilustrativo; no se creó ningún archivo real.",
  },
  Researcher: {
    prompt: "Investiga una técnica de agentes y verifica su fuente original.",
    skill: "source-verification",
    tool: "Investigación web (propuesta)",
    category: "Investigación",
    approval: "Autorizar una consulta simulada a documentación pública.",
    input: "tema: orquestación de agentes\nregla: citar la publicación original",
    output: "Registro de evidencia (ejemplo)\nAfirmación: pendiente de verificar\nURL: aún no consultada\nConfianza: no evaluada",
    check: "Ninguna fuente se da por verificada sin visita y evidencia real",
    delivery: "Plantilla de investigación preparada; sin navegación real.",
  },
  Growth: {
    prompt: "Diseña una entrevista para validar Meridian con cinco usuarios.",
    skill: "user-interviews",
    tool: "Plantilla de entrevistas (propuesta)",
    category: "Producto",
    approval: "Autorizar la preparación simulada de una guía de entrevistas.",
    input: "objetivo: validar problema\naudiencia: usuarios de producto\nprohibido: preguntas dirigidas",
    output: "1. Cuéntame la última vez que ocurrió.\n2. ¿Qué solución usaste entonces?\n3. ¿Qué parte consumió más tiempo?",
    check: "Preguntas abiertas · datos personales no recopilados",
    delivery: "Guía de entrevistas ilustrativa; no se contactó a nadie.",
  },
  Browser: {
    prompt: "Prueba la web de agentes en móvil y revisa su accesibilidad.",
    skill: "browser-qa",
    tool: "Navegador instrumentado (propuesto)",
    category: "Navegación",
    approval: "Autorizar una visita de prueba simulada; sin iniciar sesión ni enviar formularios.",
    input: "objetivo: sitio de demostración\nchecks: viewport, teclado, errores, botones",
    output: "PLAN DE PRUEBA\n[ ] Navegación con teclado\n[ ] Diseño móvil\n[ ] Estados de error\nSin observaciones reales todavía",
    check: "No afirmar PASS sin capturas o registros de navegador auténticos",
    delivery: "Matriz de QA de ejemplo; no se abrió ningún navegador.",
  },
  Reviewer: {
    prompt: "Audita una publicación antes de ponerla en producción.",
    skill: "release-readiness",
    tool: "Validador de versión (propuesto)",
    category: "Seguridad",
    approval: "Autorizar una revisión simulada, sin desplegar ni modificar infraestructura.",
    input: "revisión: pruebas, permisos, secretos, rollback\nentorno: solamente ejemplo",
    output: "CHECKLIST\n[ ] Tests reales aprobados\n[ ] Variables verificadas\n[ ] Plan de rollback comprobado",
    check: "Bloquear una publicación si faltan evidencias; no fingir un GO",
    delivery: "Informe de preparación ilustrativo, sin auditoría de producción.",
  },
};

export function ToolLab({ initialAgent, onClose, onUsePrompt }: {
  initialAgent: string;
  onClose: () => void;
  onUsePrompt: (agent: string, prompt: string) => void;
}) {
  const [role, setRole] = useState<Role>(ROLES.includes(initialAgent as Role) ? initialAgent as Role : "Coder");
  const [stage, setStage] = useState(0);
  const [approval, setApproval] = useState<Approval>("pending");
  const [playing, setPlaying] = useState(false);
  const scene = SCENES[role];

  useEffect(() => {
    if (!playing) return;
    if (stage >= FLOW.length - 1 || (stage === 2 && approval !== "approved")) {
      setPlaying(false);
      return;
    }
    const handle = window.setTimeout(() => setStage(value => Math.min(value + 1, FLOW.length - 1)), 1350);
    return () => window.clearTimeout(handle);
  }, [stage, playing, approval]);

  const select = (next: Role) => {
    setRole(next);
    setStage(0);
    setApproval("pending");
    setPlaying(false);
  };
  const restart = () => { setStage(0); setPlaying(false); setApproval("pending"); };
  const advance = () => {
    if (stage === 2 && approval !== "approved") return;
    setPlaying(false);
    setStage(i => Math.min(i + 1, FLOW.length - 1));
  };
  const completed = stage === FLOW.length - 1;
  const waiting = stage === 2 && approval !== "approved";
  return <section className="tool-lab" aria-label="Demostración interactiva de herramientas">
    <header className="tool-lab-header">
      <div>
        <div className="tool-lab-eyebrow">MERIDIAN / TOOL LAB <span className="tool-lab-tag">SIMULACIÓN INTERACTIVA</span></div>
        <h2>Así trabajaría un agente con herramientas.</h2>
        <p>Explora las decisiones, los permisos y los resultados de ejemplo. Aquí no se ejecuta código, navegador ni ninguna herramienta externa.</p>
      </div>
      <button type="button" className="tool-lab-close" onClick={onClose} aria-label="Volver al chat"><X size={19}/></button>
    </header>

    <div className="tool-lab-roles" aria-label="Elegir agente">
      {ROLES.map(name => <button type="button" key={name} aria-pressed={role === name} className={"tool-lab-role" + (role === name ? " is-selected" : "")} onClick={() => select(name)}>
        <AgentAvatar name={name} size={31}/><span>{name}</span>{role === name && <Check size={13}/>}
      </button>)}
    </div>

    <div className="tool-lab-content">
      <div className="tool-lab-workspace">
        <div className="tool-lab-main-heading"><span className="tool-lab-index">0{stage + 1} / 06</span><span>{scene.category}</span></div>
        <h3>{FLOW[stage].title}</h3>
        <p className="tool-lab-stage-description">{FLOW[stage].hint}</p>
        <div className="tool-lab-track" aria-label="Progreso de la demostración">
          {FLOW.map((node, i) => <button key={node.title} title={node.hint} aria-label={"Ir a etapa " + (i + 1) + ": " + node.title} aria-current={stage === i ? "step" : undefined} className={"tool-lab-segment" + (i <= stage ? " passed" : "") + (i === stage ? " current" : "")} type="button" onClick={() => { setPlaying(false); setStage(i > 2 && approval !== "approved" ? 2 : i); }} />)}
        </div>
        <div className="tool-lab-context-label">Petición de ejemplo</div>
        <div className="tool-lab-request"><span>Tú</span><p>{scene.prompt}</p></div>

        {stage >= 1 && <div className="tool-lab-field">
          <div className="tool-lab-field-label"><Sparkles size={15}/> Skill activada</div>
          <strong>{scene.skill}</strong>
          <small>Instrucciones locales de Meridian · selección de demostración</small>
        </div>}

        {stage >= 2 && <div className="tool-lab-approval">
          <div className="tool-lab-field-label"><LockKeyhole size={15}/> Punto de aprobación</div>
          <p>{scene.approval}</p>
          {approval === "pending" ? <div className="tool-lab-approval-actions">
            <button type="button" onClick={() => { setApproval("approved"); setStage(3); }}><Check size={15}/> Permitir simulación</button>
            <button type="button" onClick={() => { setApproval("rejected"); setPlaying(false); }}><X size={15}/> Denegar</button>
          </div> : <div className="tool-lab-approval-state">
            {approval === "approved" ? <><ShieldCheck size={16}/> Permiso ficticio concedido solo en esta demostración</> : <><CirclePause size={16}/> Demostración detenida por decisión del usuario</>}
          </div>}
        </div>}

        {stage >= 5 && <div className="tool-lab-delivery"><ShieldCheck size={18}/><div><strong>Resultado de demostración</strong><p>{scene.delivery}</p></div></div>}

        <div className="tool-lab-controls">
          <button type="button" onClick={restart} title="Reiniciar"><RotateCcw size={16}/> Reiniciar</button>
          <button type="button" onClick={() => { setPlaying(false); setStage(Math.max(0,stage - 1)); }} disabled={stage === 0}><ChevronLeft size={17}/> Atrás</button>
          <button type="button" onClick={() => setPlaying(v => !v)} disabled={completed || waiting || approval === "rejected"}>{playing ? <CirclePause size={16}/> : <CirclePlay size={16}/>} {playing ? "Pausar" : "Reproducir"}</button>
          <button type="button" className="tool-lab-next" onClick={advance} disabled={completed || waiting || approval === "rejected"}>Siguiente <ArrowRight size={16}/></button>
        </div>
      </div>

      <aside className="tool-lab-side" aria-label="Vista de herramientas">
        <div className="tool-lab-side-header"><span className="tool-lab-live-dot"/><strong>Inspector de herramientas</strong><span>DEMO</span></div>
        <div className="tool-lab-inspector-section">
          <div className="tool-lab-inspector-label">Herramienta ilustrativa</div>
          <div className="tool-lab-tool-name">{scene.tool}</div>
          <small>Esto representa una capacidad futura, no una integración instalada.</small>
        </div>
        <div className="tool-lab-inspector-section">
          <div className="tool-lab-inspector-label">Entrada {stage < 3 && "· pendiente"}</div>
          <pre>{stage >= 3 ? scene.input : "Se mostrará al autorizar la demostración."}</pre>
        </div>
        <div className="tool-lab-inspector-section">
          <div className="tool-lab-inspector-label">Salida de ejemplo {stage < 4 && "· pendiente"}</div>
          <pre>{stage >= 4 ? scene.output : "Todavía no hay salida ilustrativa."}</pre>
        </div>
        <div className="tool-lab-inspector-section">
          <div className="tool-lab-inspector-label">Criterio de comprobación</div>
          <p>{stage >= 4 ? scene.check : "Pendiente de la etapa de validación."}</p>
        </div>
        <div className="tool-lab-proof"><LockKeyhole size={15}/><span>0 llamadas externas · 0 archivos creados · 0 cambios en Railway</span></div>
      </aside>
    </div>

    <LiveDemoPanel role={role as AgentRole} />

    <footer className="tool-lab-footer">
      <span><ShieldCheck size={15}/> Esta simulación no otorga permisos a los agentes.</span>
      <button type="button" onClick={() => onUsePrompt(role,scene.prompt)}>Enviar esta petición al chat <ArrowRight size={16}/></button>
      <button type="button" className="tool-lab-chat-back" onClick={onClose}><ArrowLeft size={15}/> Volver al chat</button>
    </footer>
  </section>;
}
