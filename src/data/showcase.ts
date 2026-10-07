export type ProofState = "LIVE" | "BETA" | "BUILDING" | "CONCEPT";

export type ProofItem = {
  state: ProofState;
  title: string;
  description: string;
  evidence: string;
  href?: string;
};

export const proofItems: ProofItem[] = [
  {
    state: "LIVE",
    title: "Product workspace",
    description:
      "Superficies autenticadas para tareas, CRM, equipo, configuración y trabajo asistido por IA.",
    evidence: "Producto activo · flujo multi-workspace",
  },
  {
    state: "BETA",
    title: "Agent execution",
    description:
      "Trabajo delegado a herramientas y workers con scopes explícitos, verificación y recuperación.",
    evidence: "Contratos de runtime y permisos",
  },
  {
    state: "BUILDING",
    title: "Voice engine",
    description:
      "Voz interrumpible, captions, fallback textual y proveedores aislados en servidor.",
    evidence: "Voice Engine spec + UI en evolución",
  },
  {
    state: "CONCEPT",
    title: "Spatial layer",
    description:
      "Visualización espacial opcional para relaciones, agentes y storytelling técnico.",
    evidence: "No requerida para operaciones críticas",
  },
];

export const architectureNodes = [
  {
    id: "intent",
    label: "USER INTENT",
    detail: "Entrada humana desde chat, bloque, tarea, CRM o evento.",
    tone: "neutral",
  },
  {
    id: "router",
    label: "LIBRARIAN",
    detail:
      "Clasifica intención y compara metadata antes de cargar una skill completa.",
    tone: "red",
  },
  {
    id: "policy",
    label: "POLICY",
    detail:
      "Valida workspace, identidad, riesgo, tools permitidas y necesidad de aprobación.",
    tone: "blue",
  },
  {
    id: "worker",
    label: "WORKER",
    detail:
      "Recibe contexto mínimo, presupuesto, tools específicas y criterio de terminación.",
    tone: "violet",
  },
  {
    id: "tools",
    label: "MCP / TOOLS",
    detail:
      "El servidor ejecuta proveedores sin entregar secretos de larga duración al worker.",
    tone: "green",
  },
  {
    id: "verify",
    label: "VERIFY",
    detail:
      "Comprueba resultado, evidencia, efectos externos y regresiones antes de afirmar éxito.",
    tone: "amber",
  },
];

export const wilennyScenarios = [
  {
    id: "audit",
    label: "Auditoría de agente",
    route: "AUDITORÍA",
    worker: "Auditor + Probador",
    tools: "repo · tests · policy",
    approval: "No requerida",
    outcome: "Hallazgos priorizados + evidencia reproducible",
  },
  {
    id: "build",
    label: "Construir integración",
    route: "DESARROLLO",
    worker: "Arquitecto + Implementador",
    tools: "repo · docs · sandbox",
    approval: "Antes de deploy",
    outcome: "Código pequeño + pruebas + rollback",
  },
  {
    id: "research",
    label: "Investigación competitiva",
    route: "INVESTIGACIÓN",
    worker: "Investigador + Verificador",
    tools: "web · fuentes primarias",
    approval: "No requerida",
    outcome: "Síntesis con contradicciones y nivel de certeza",
  },
  {
    id: "operation",
    label: "Acción con efecto externo",
    route: "OPERACIÓN",
    worker: "Cartógrafo + Revisor final",
    tools: "tool allowlist",
    approval: "Obligatoria",
    outcome: "Preview → aprobación → ejecución → auditoría",
  },
];

export const statusRows = [
  ["Dashboard y producto principal", "LIVE"],
  ["AI Workspace / Gateway", "BETA"],
  ["WILENNY portable skill", "LIVE"],
  ["Semantic Router / Librarian", "BUILDING"],
  ["Meridian Code Agent", "BUILDING"],
  ["Voice Engine", "BUILDING"],
  ["Spatial 3D layer", "CONCEPT"],
] as const;
