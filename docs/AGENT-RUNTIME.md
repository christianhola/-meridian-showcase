# Agent Runtime — Visual Contract

Este documento define cómo el hub público representa el trabajo de los agentes de Meridian sin exponer secretos, prompts privados ni herramientas internas.

> **Estado:** contrato visual y arquitectónico. La telemetría en tiempo real requiere que el runtime publique eventos autenticados; el README no afirma que esa conexión ya esté activa.

## Flujo de ejecución

```text
USER INTENT
   ↓
BLOCK EDITOR / CHAT / TASK
   ↓
PRIMARY ORCHESTRATOR
   ├─ context selection
   ├─ plan generation
   ├─ permission check
   └─ delegation graph
          ↓
SPECIALIZED AGENTS
   ├─ design
   ├─ research
   ├─ CRM
   ├─ data
   └─ verification
          ↓
MCP / API TOOLS
          ↓
VERIFIED OUTPUT
```

## Estados visuales

| Estado | Significado | Comportamiento de interfaz |
|---|---|---|
| `idle` | El agente espera una solicitud o dependencia | Mascota neutral; controles disponibles |
| `thinking` | El orquestador está planificando o delegando | Indicador de progreso y texto de contexto |
| `running` | Una herramienta o subagente está ejecutando | Mostrar herramienta, duración y alcance |
| `success` | La salida fue verificada | Confirmación, evidencia y siguiente acción |
| `error` | La ejecución falló o fue bloqueada | Error claro, recuperación segura y reintento |
| `approval_required` | Una escritura necesita autorización | Preview de cambios y botón de aprobación |

## Contrato TypeScript de referencia

```tsx
export type AgentStatus =
  | "idle"
  | "thinking"
  | "running"
  | "success"
  | "error"
  | "approval_required";

export type AgentTelemetry = {
  agentId: string;
  label: string;
  status: AgentStatus;
  currentStep?: string;
  tool?: string;
  startedAt?: string;
  durationMs?: number;
  requiresApproval?: boolean;
};

const MASCOT_COPY: Record<AgentStatus, string> = {
  idle: "Meridian está listo.",
  thinking: "Organizando el contexto y el plan…",
  running: "Ejecutando una tarea autorizada…",
  success: "Resultado verificado.",
  error: "La ejecución fue detenida de forma segura.",
  approval_required: "Revisa y aprueba antes de continuar.",
};

export function MascotAssistant({ telemetry }: { telemetry: AgentTelemetry }) {
  return (
    <section data-status={telemetry.status} aria-live="polite">
      <PixelMascot status={telemetry.status} />
      <div>
        <strong>{telemetry.label}</strong>
        <p>{MASCOT_COPY[telemetry.status]}</p>
        {telemetry.currentStep && <small>{telemetry.currentStep}</small>}
      </div>
    </section>
  );
}
```

## Evento de telemetría

```json
{
  "traceId": "trace_public_example",
  "agentId": "design-agent",
  "status": "running",
  "currentStep": "Validando responsive y accesibilidad",
  "tool": "browser-inspector",
  "durationMs": 1820,
  "requiresApproval": false
}
```

Los eventos públicos deben excluir:

- prompts privados;
- tokens y claves;
- contenido empresarial sensible;
- identificadores internos de clientes;
- argumentos completos de herramientas;
- payloads que puedan revelar credenciales o estructura privada.

## Reglas UX

1. El estado debe ser visible sin depender únicamente del color.
2. Los procesos largos deben mostrar etapa, no porcentajes inventados.
3. Los errores deben explicar qué falló y qué puede hacer el usuario.
4. Las escrituras deben mostrar preview y pedir aprobación.
5. `prefers-reduced-motion` debe desactivar animaciones no esenciales.
6. La mascota acompaña el estado; no reemplaza mensajes técnicos.
7. La interfaz debe distinguir claramente entre demo visual y telemetría real.
