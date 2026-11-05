# Meridian Sync

## Alcance

Meridian Sync es una librería para un Runtime Unificado que integra:

- Vercel AI SDK
- Mastra
- LangChain
- Area Charts
- Bar Charts
- Line Charts
- Pie Charts
- Radar Charts
- Radial Charts
- Tooltips

## Runtime Unificado

El runtime debe emitir una estructura donde el frontend conozca de antemano el tipo de bloque:

```ts
type BlockType =
  | "video"
  | "gallery"
  | "search_result"
  | "markdown"
```

El frontend debe renderizar el contenedor correspondiente con su altura exacta desde el inicio.

## Procesamiento paralelo

El runtime debe permitir procesar múltiples llamadas al backend en paralelo.

## Persistencia y memoria

La librería debe incluir conectores de bajo nivel para Supabase:

- Auto-persistencia mediante middleware.
- Escritura asíncrona al finalizar el flujo.
- Tablas para mensajes, bloques y páginas.
- Memoria contextual mediante pgvector.
- RLS para el aislamiento de datos.

## Orquestador Swarm

El orquestador debe ser ligero y compatible con funciones Serverless y Edge.

Debe incluir conectores modulares para:

- Búsqueda.
- Layouts.
- Ejecución.

Los agentes comparten un contexto de memoria unificado.

Los workflows deben guardar su estado intermedio para suspender y reanudar ejecuciones largas.

## Paquetes

```text
@meridian/
├── core/       # Model Router y streams estructurados
├── supabase/   # Auto-guardado, RLS y pgvector
└── swarm/      # Conectores y orquestación de agentes
```

## Sitio de Meridian Sync

El sitio debe incluir:

- Catálogo interactivo de componentes.
- Documentación por componente.
- Preview en tiempo real.
- Chat vivo con streaming letra por letra.
- Videos.
- Galerías Bento.
- Emojis.
- Pestaña `Code`.
- Copia del código con un clic.

## Código visual recopilado

- [Componentes y áreas](./generated/shadcn-requested-sidebar-code.md)
- [Código global recopilado](./generated/shadcn-all-view-code.md)
- [Charts](./generated/shadcn-charts-all-code.md)

## Estado documentado

- Repositorio clonado.
- Requisitos de Meridian Sync documentados.
- Código visual recopilado copiado al repositorio.
- Implementación del runtime pendiente.
- Sitio interactivo pendiente.
