import { useEffect, useRef, useState } from "react";
import { Check, CirclePlay, LockKeyhole, ShieldCheck, X } from "lucide-react";
import type { AgentEvent, AgentPlanner, AgentRole, ExecutionContext, PermissionRequest, ToolName } from "../engine/types";
import { runAgentLoop } from "../engine/runAgentLoop";
import { PermissionGate } from "../services/permissionGate";
import { AgentMemory, InMemoryKV } from "../services/agentMemory";
import { createToolRegistry, VirtualWorkspace } from "../services/toolRegistry";

const EXAMPLES: Record<AgentRole, Readonly<{ tool: ToolName; arguments: Readonly<Record<string, string>>; text: string }>> = {
  Architect: { tool: "write_file", arguments: { path: "architecture.md",
    content: "Gateway → Policy → Agent → Tool sandbox\nAlways verify before release." },
    text: "Se creó un plan únicamente dentro del espacio virtual temporal." },
  Coder: { tool: "write_file", arguments: { path: "index.html",
    content: "<!doctype html><html lang=\"es\"><meta charset=\"utf-8\"><title>Demo</title><button>Hola</button></html>" },
    text: "HTML guardado en el entorno virtual de esta demostración." },
  Researcher: { tool: "read_file", arguments: { path: "sources.md" },
    text: "Se leyó una nota precargada de ejemplo; no hubo búsquedas web." },
  Growth: { tool: "write_file", arguments: { path: "interviews.md",
    content: "1. Describe el último problema real.\n2. ¿Cómo lo resolviste?\n3. ¿Qué intentaste antes?" },
    text: "Guía de entrevistas creada en la memoria virtual." },
  Browser: { tool: "browser_navigate", arguments: { url: "https://example.org" },
    text: "El navegador se simuló sin navegar en Internet." },
  Reviewer: { tool: "read_file", arguments: { path: "release-checklist.md" },
    text: "Revisión de un checklist ficticio precargado." },
};

const LABELS: Record<AgentEvent["type"], string> = {
  "agent:thought": "Estado público",
  "agent:tool_call": "Herramienta propuesta",
  "agent:permission_request": "Permiso requerido",
  "agent:tool_result": "Resultado verificado",
  "agent:memory_update": "Memoria de sesión",
  "agent:completed": "Finalizado",
  "agent:error": "Error",
};

export function LiveDemoPanel({ role }: { role: AgentRole }) {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [pending, setPending] = useState<PermissionRequest | null>(null);
  const [running, setRunning] = useState(false);
  const gate = useRef(new PermissionGate());
  const abort = useRef<AbortController | null>(null);
  const identity = useRef<ExecutionContext>({ userId: "demo-user", projectId: "virtual-demo",
    sessionId: "tool-lab-" + Math.random().toString(36).slice(2) });
  useEffect(() => {
    return () => { abort.current?.abort(); gate.current.cancelAll(); };
  }, [role]);

  const decide = (decision: "APPROVED" | "REJECTED") => {
    if (!pending) return;
    gate.current.decide(identity.current, pending.id, decision);
    setPending(null);
  };

  async function start() {
    abort.current?.abort();
    gate.current.cancelAll();
    const controller = new AbortController();
    abort.current = controller;
    const context: ExecutionContext = { ...identity.current, signal: controller.signal };
    const example = EXAMPLES[role];
    const workspace = new VirtualWorkspace();
    workspace.write(context, "sources.md", "Ejemplo local: fuentes todavía no verificadas.");
    workspace.write(context, "release-checklist.md", "Estado de ejemplo: faltan pruebas de producción.");
    const browser = {
      navigate: async (url: string) => ({ ok: true as const, code: "OK" as const,
        output: "Vista ilustrativa de " + url + ". No se visitó Internet." }),
      click: async (_selector: string) => ({ ok: false as const, code: "UNAVAILABLE" as const,
        output: "No existe navegador activo en la demostración." }),
    };
    const registry = createToolRegistry({ workspace, browser });
    const memory = new AgentMemory(new InMemoryKV());
    const planner: AgentPlanner = async ({ previous }) => previous.length
      ? { kind: "answer", text: example.text }
      : { kind: "tool", tool: example.tool, arguments: example.arguments };
    setEvents([]);
    setPending(null);
    setRunning(true);
    try {
      for await (const event of runAgentLoop({
        runId: "demo-" + Date.now(), context, role, request: example.text,
        registry, permissions: gate.current, memory, planner, maxSteps: 2,
      })) {
        if (controller.signal.aborted) break;
        setEvents(previous => [...previous, event]);
        if (event.type === "agent:permission_request") setPending(event.request);
      }
    } finally {
      if (abort.current === controller) {
        setPending(null);
        setRunning(false);
      }
    }
  }

  return <section className="tool-lab-runtime" aria-label="Motor de eventos interactivo">
    <div className="tool-lab-runtime-header">
      <div><span className="tool-lab-runtime-overline">MOTOR / EVENTOS</span>
        <h3>Ver el flujo de herramientas</h3>
        <p>Ejecuta el bucle TypeScript sobre archivos temporales y un navegador simulado. Los eventos y el permiso sí funcionan aquí; no hay llamadas externas.</p>
      </div>
      <button type="button" onClick={() => void start()} disabled={running}>
        <CirclePlay size={16}/> {running ? "Esperando o ejecutando" : "Iniciar simulación"}
      </button>
    </div>
    {pending && <div className="tool-lab-runtime-gate" role="group" aria-label="Solicitud de permiso">
      <LockKeyhole size={17}/>
      <div><strong>¿Autorizar esta acción de demostración?</strong>
        <p>{pending.tool} · {pending.risk} · {JSON.stringify(pending.arguments)}</p>
        <small>Solo afecta al espacio virtual de esta página. El modelo no puede aprobarla.</small>
        <div className="tool-lab-runtime-approval">
          <button type="button" onClick={() => decide("APPROVED")}><Check size={14}/> Aprobar simulación</button>
          <button type="button" onClick={() => decide("REJECTED")}><X size={14}/> Rechazar</button>
        </div>
      </div>
    </div>}
    <div className="tool-lab-runtime-stream" aria-live="polite">
      {events.length ? events.map((event, i) => <div className="tool-lab-runtime-event" key={event.runId + "-" + i}>
        <span className="tool-lab-runtime-counter">{String(i + 1).padStart(2, "0")}</span>
        <div><strong>{LABELS[event.type]}</strong>
          <p>{event.type === "agent:thought" ? event.message
            : event.type === "agent:tool_call" ? event.call.name + " · " + event.risk
            : event.type === "agent:permission_request" ? "Esperando decisión del usuario"
            : event.type === "agent:tool_result" ? event.result.code + " · " + event.result.output.slice(0, 220)
            : event.type === "agent:memory_update" ? "Sesión en memoria temporal"
            : event.type === "agent:completed" ? event.message
            : event.message}</p></div>
      </div>) : <div className="tool-lab-runtime-empty"><ShieldCheck size={20}/><span>Pulsa «Iniciar simulación» para ver eventos emitidos por el motor real, sin ejecutar herramientas externas.</span></div>}
    </div>
  </section>;
}
