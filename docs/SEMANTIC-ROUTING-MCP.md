# Semantic Routing + MCP — The Librarian Architecture

> **Estado:** arquitectura objetivo y evolución técnica de Meridian. Este documento separa claramente la visión del producto de las capacidades verificadas actualmente.


**Meridian se está diseñando como un sistema operativo espacial B2B impulsado por orquestación multiagente y Model Context Protocol (MCP).**

El objetivo no es construir simples wrappers de inteligencia artificial. La intención es diseñar un sistema cognitivo distribuido donde contexto, herramientas, agentes y permisos se carguen únicamente cuando una tarea realmente los necesita.

## El problema: saturación de contexto

Inyectar decenas o cientos de skills completas dentro del mismo prompt produce varios problemas:

- aumenta el consumo de tokens;
- hace más lenta la selección de herramientas;
- eleva el riesgo de conflictos entre instrucciones;
- dificulta la trazabilidad;
- reduce la atención disponible para la tarea principal;
- puede aumentar errores o respuestas poco precisas.

Ninguna arquitectura elimina por completo las alucinaciones. El objetivo realista es **reducir ruido, mejorar selección de herramientas y exigir verificación basada en evidencia**.

## El paradigma del Bibliotecario

La metáfora central es una biblioteca.

El orquestador no carga todos los libros. Primero lee el catálogo y los lomos: nombre, descripción, versión, permisos requeridos, coste estimado y tipo de resultado.

Solo después de entender la intención del usuario selecciona el recurso necesario y carga su contenido.

```text
USER INTENT
    ↓
SEMANTIC ROUTER
    ↓
SKILL INDEX / METADATA
    ↓
POLICY + PERMISSION CHECK
    ↓
LAZY SKILL LOADER
    ↓
SPECIALIZED WORKER
    ↓
MCP TOOL PROXY
    ↓
VERIFICATION
    ↓
PREVIEW → APPROVAL → EXECUTION
```

### Lectura del lomo

El **Agente Orquestador** trabaja inicialmente con un índice reducido:

```ts
export interface SkillIndexEntry {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
  requiredTools: string[];
  requiredPermissions: string[];
  estimatedContextTokens: number;
  riskLevel: "read" | "write" | "external_effect";
}
```

Este índice permite comparar herramientas sin cargar todos sus prompts, referencias o implementaciones.

### Apertura a demanda

Cuando el enrutador selecciona una skill:

1. valida que la skill exista y tenga una versión permitida;
2. comprueba tenant, usuario y permisos;
3. carga solo las instrucciones y referencias requeridas;
4. crea un worker con contexto limitado;
5. asigna únicamente las tools necesarias;
6. ejecuta dentro de una política y un presupuesto definidos;
7. verifica el resultado antes de presentarlo.

## Enjambre multiagente

Meridian puede delegar trabajo a agentes especializados bajo demanda.

```text
PRIMARY ORCHESTRATOR
    ├── CODE WORKER
    ├── DESIGN WORKER
    ├── RESEARCH WORKER
    ├── DATA WORKER
    ├── VOICE WORKER
    └── VERIFICATION WORKER
```

Cada worker debe recibir:

- una tarea concreta;
- contexto mínimo;
- allowlist de herramientas;
- presupuesto de tiempo y tokens;
- scope de usuario y workspace;
- formato de salida esperado;
- reglas de aprobación;
- criterios de terminación.

Los workers no reciben autoridad global por defecto.

## Capacidades objetivo

### Terminal local y sistema de archivos

Los agentes de código podrán trabajar únicamente dentro de un entorno controlado:

- repositorio y ruta permitidos;
- rama específica;
- archivos fuera del scope bloqueados;
- comandos destructivos prohibidos;
- cambios existentes preservados;
- diffs visibles;
- typecheck, lint, build y pruebas;
- push o deploy únicamente con aprobación.

### Web y búsqueda en tiempo real

El agente de investigación podrá utilizar herramientas de búsqueda autorizadas para:

- revisar documentación oficial;
- comparar productos;
- localizar fuentes;
- verificar información reciente;
- preparar auditorías con citas;
- recopilar evidencia antes de recomendar cambios.

El scraping debe respetar permisos, términos del sitio, límites y políticas aplicables. La arquitectura no debe asumir acceso irrestricto a cualquier página.

### Geo-auditing y contexto espacial

Las herramientas geográficas solo deben activarse cuando la tarea lo requiera y el usuario haya autorizado el uso de ubicación.

Casos posibles:

- auditoría de presencia local;
- cobertura por región;
- rutas y logística;
- análisis de sedes;
- visualización espacial;
- contexto climático o temporal.

No se debe realizar rastreo oculto ni persistir ubicación sin una finalidad y consentimiento claros.

## MCP como tejido de ejecución

MCP funciona como capa de interoperabilidad entre el modelo y las tools. En Meridian, el servidor MCP debe actuar también como punto de control:

```text
AGENT
  ↓ tool request
MCP SERVER
  ├── validates identity
  ├── validates workspace scope
  ├── checks tool allowlist
  ├── checks approval
  ├── calls provider
  ├── records audit metadata
  └── returns normalized result
```

## Gestión correcta de secretos

Las claves de Supabase, Resend, ElevenLabs, LLMs y otros proveedores **no deben entregarse como texto plano a los agentes satélite**.

El patrón preferido es:

1. la clave de larga duración permanece en el servidor;
2. el worker solicita una tool declarada;
3. el MCP server valida permiso y scope;
4. el servidor ejecuta la llamada al proveedor;
5. el worker recibe únicamente el resultado normalizado.

Cuando un proveedor obligue a delegar credenciales, deben utilizarse tokens de corta duración, alcance mínimo y revocación posible.

```text
LONG-LIVED SECRET
    stays server-side
          ↓
SCOPED TOOL CAPABILITY
          ↓
ONE TASK / ONE WORKSPACE / LIMITED TIME
```

## Routing dinámico de modelos

La arquitectura debe ser agnóstica al proveedor.

```ts
export interface ModelRoute {
  provider: "openai" | "anthropic" | "google" | "openrouter" | "local";
  model: string;
  purpose: "planning" | "coding" | "research" | "vision" | "verification";
  maxTokens: number;
  timeoutMs: number;
  fallback?: string[];
}
```

El router puede elegir modelo según:

- tipo de tarea;
- soporte de tools;
- ventana de contexto;
- coste;
- velocidad;
- sensibilidad de datos;
- disponibilidad;
- requisitos de visión, audio o código.

La compatibilidad con múltiples modelos depende de adaptadores y contratos, no de una garantía automática de que cualquier LLM futuro funcionará sin integración.

## Registro semántico de skills

```ts
export interface SemanticSkillRegistry {
  search(query: string, limit: number): Promise<SkillIndexEntry[]>;
  load(skillId: string, version: string): Promise<LoadedSkill>;
  authorize(input: AuthorizationInput): Promise<AuthorizationDecision>;
}
```

El buscador puede combinar:

- filtros deterministas;
- embeddings;
- clasificación de intención;
- reranking;
- historial de éxito;
- coste y riesgo;
- compatibilidad de herramientas.

## Flujo completo

```text
01  RECEIVE INTENT
02  CLASSIFY TASK
03  SEARCH SKILL INDEX
04  RERANK CANDIDATES
05  VALIDATE POLICY
06  LOAD SELECTED SKILL
07  CREATE SCOPED WORKER
08  EXECUTE THROUGH MCP
09  VERIFY WITH EVIDENCE
10  PREVIEW RESULT
11  REQUEST APPROVAL IF NEEDED
12  EXECUTE EXTERNAL EFFECT
13  RETURN AUDITABLE OUTPUT
```

## Telemetría

La observabilidad debe registrar únicamente la información necesaria:

```ts
export interface AgentTrace {
  traceId: string;
  workspaceId: string;
  workerType: string;
  selectedSkillIds: string[];
  toolNames: string[];
  modelRoute: string;
  durationMs: number;
  status: "success" | "failed" | "blocked";
  approvalRequired: boolean;
}
```

No se deben registrar prompts completos, secretos o datos empresariales sensibles por defecto.

## Seguridad

- aislamiento por `workspaceId`;
- tools con allowlist;
- aprobación antes de efectos externos;
- secretos solo en servidor;
- idempotencia para escrituras;
- límites de tiempo, tokens y frecuencia;
- sandbox para terminal y filesystem;
- evidencia antes de afirmar éxito;
- auditoría mínima y protegida;
- capability tokens de corta duración cuando sean indispensables.

## Posicionamiento técnico

Meridian no pretende cargar todas sus capacidades dentro de un único prompt.

El sistema se diseña para operar como un catálogo vivo:

```text
METADATA FIRST
CONTEXT ON DEMAND
TOOLS BY PERMISSION
WORKERS BY TASK
SECRETS SERVER-SIDE
OUTPUTS VERIFIED
```

> **The Librarian does not memorize every book. It knows where the right book is, when to open it, who may read it and what evidence must return.**

---

*Building the operating layer of tomorrow. Architecture status: in development.*
