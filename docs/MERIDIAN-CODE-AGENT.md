# Meridian Code Agent

> **Estado:** arquitectura y experiencia en desarrollo. Este documento describe el producto objetivo; no afirma que todas las capacidades estén activas en producción.

## Visión

**Meridian Code Agent** será un entorno de ingeniería asistida que convierte lenguaje natural, documentos y referencias visuales en aplicaciones verificables.

Su objetivo no es devolver únicamente fragmentos de código. El sistema deberá comprender una intención, diseñar un plan, modificar un proyecto, ejecutar verificaciones, mostrar una vista previa y detenerse antes de cualquier operación sensible que requiera aprobación.

```text
DESCRIBE → PLAN → DESIGN → CODE → PREVIEW → VERIFY → SHIP
```

## Experiencia principal

```text
┌─────────────────────────────────────────────────────────────┐
│ MERIDIAN CODE                            PROJECT / ONLINE   │
├──────────────┬──────────────────────────────┬───────────────┤
│ FILE TREE    │ CODE EDITOR                  │ LIVE PREVIEW  │
│ app/         │ page.tsx · components · diff │ desktop/mobile│
│ components/  │ TypeScript · TSX · CSS       │ console/routes│
│ lib/         │ pending changes              │ runtime state │
├──────────────┴──────────────────────────────┴───────────────┤
│ MERI (o_o)   Describe lo que quieres construir…            │
├─────────────────────────────────────────────────────────────┤
│ PLAN → CODE → RUN → TEST → REVIEW                           │
└─────────────────────────────────────────────────────────────┘
```

## Modos operativos

| Modo | Responsabilidad |
|---|---|
| `PLAN` | Inspecciona el repositorio, detecta stack, dependencias, riesgos y archivos que cambiarían. No modifica nada. |
| `AGENT` | Ejecuta un plan aprobado, modifica archivos, corre verificaciones y prepara un resumen. |
| `DESIGN` | Analiza referencias, crea tokens, jerarquía, responsive, motion y componentes reutilizables. |
| `DEBUG` | Reproduce un error, identifica causa raíz, aplica la corrección mínima y verifica regresiones. |

## Red de agentes

```text
USER REQUEST
    ↓
ARCHITECT
    ↓
EXECUTION PLAN
    ↓
DESIGN + FRONTEND + BACKEND
    ↓
SECURITY REVIEW
    ↓
TYPECHECK + LINT + BUILD
    ↓
VISUAL VERIFICATION
    ↓
USER APPROVAL
    ↓
COMMIT / PR / DEPLOY
```

| Agente | Función |
|---|---|
| `architect` | Arquitectura, dependencias, límites y plan de ejecución. |
| `designEngineer` | UX, design tokens, accesibilidad, responsive y motion. |
| `frontendEngineer` | Next.js, React, TypeScript y Tailwind CSS. |
| `backendEngineer` | APIs, Prisma, lógica de servidor y contratos. |
| `securityReviewer` | Autenticación, permisos, secretos y aislamiento por workspace. |
| `testEngineer` | Typecheck, lint, build y pruebas. |
| `visualVerifier` | Comparación con referencias, responsive y estados de interfaz. |

Los agentes solo pueden trabajar en paralelo cuando no exista dependencia entre sus tareas.

## MERI — operador visual rojo

MERI es la mascota pixel art del Code Agent. Su color principal es `#FF3347`; el resto de la interfaz permanece OLED, blanca y gris para mantener contraste y autoridad técnica.

Estados previstos:

```ts
export type MeridianAgentStatus =
  | "idle"
  | "listening"
  | "planning"
  | "thinking"
  | "coding"
  | "running"
  | "testing"
  | "approval_required"
  | "success"
  | "error"
  | "offline";
```

Cada cambio visual deberá provenir de un evento real del runtime. El producto no mostrará progreso falso.

## Eventos en tiempo real

```ts
export type AgentEvent =
  | { type: "status"; status: MeridianAgentStatus; message: string }
  | { type: "task_started"; taskId: string; label: string }
  | { type: "file_changed"; path: string; additions: number; deletions: number }
  | { type: "command_started"; command: string }
  | { type: "command_finished"; command: string; exitCode: number }
  | { type: "approval_required"; approvalId: string; summary: string }
  | { type: "completed"; summary: string }
  | { type: "failed"; message: string };
```

## Capacidades objetivo

- Crear landing pages, dashboards, SaaS, CRM y herramientas internas.
- Generar rutas, componentes, APIs y modelos de datos.
- Leer PRD, README, capturas y referencias visuales.
- Crear una vista previa desktop, tablet y móvil.
- Mostrar archivos modificados y diffs aceptables o rechazables.
- Ejecutar typecheck, lint, build y pruebas.
- Corregir errores y documentar evidencia.
- Preparar commits, Pull Requests y despliegues únicamente con autorización.

## Política de seguridad

El agente no ejecutará automáticamente:

```text
git reset --hard
git clean -fd
git checkout -- .
git stash
git rebase
git push --force
rm -rf
DROP DATABASE
TRUNCATE
```

Las dependencias, eliminaciones, migraciones, autenticación, variables de entorno, push y deploy requieren aprobación explícita.

## Criterios de terminación

```text
[ ] Aplicación accesible
[ ] TypeScript sin errores
[ ] Lint sin errores bloqueantes
[ ] Build correcto
[ ] Responsive verificado
[ ] Navegación por teclado
[ ] Loading, empty, success y error
[ ] Estados de MERI conectados a eventos reales
[ ] Escrituras sensibles con aprobación
[ ] Secretos protegidos
[ ] Resumen de archivos y evidencia
```
