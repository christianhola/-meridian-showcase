# Getting started / Primeros pasos

**Current status:** este repositorio es público. Mantén las credenciales, datos privados y métricas internas exclusivamente en servicios protegidos.

## Actividad diaria


<div class="meridian-activity-embed">
  <iframe
    src="/-meridian-showcase/app/activity/"
    title="Actividad diaria verificable de Meridian"
    loading="lazy"
    style="display:block;width:100%;height:490px;border:0;background:transparent"
  ></iframe>
</div>

Los eventos corresponden a actividad pública verificable del repositorio. Las búsquedas web aparecerán únicamente si un servicio autorizado publica datos agregados; no se exponen claves en GitHub Pages.

## English — start with a real project
1. Clone the repository with a GitHub account that has access.
2. Install [Node.js 20 or newer](https://nodejs.org/). No other packages are required for the starter.
3. Run `node examples/agent-response-starter/server.mjs` and visit `http://127.0.0.1:4173`.

Verify behavior first: `node --test examples/agent-response-starter/test/*.test.mjs`.

Next: inspect [WILENNY](https://github.com/christianhola/-meridian-showcase/blob/main/skills/wilenny/SKILL.md) and propose an improvement following [CONTRIBUTING](https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md).

The website demo and starter show simulated responses. They do **not** call an AI provider or connect to private Meridian services.

## Español — comienza con un proyecto real
1. Clona el repositorio usando una cuenta de GitHub con acceso.
2. Instala [Node.js 20 o superior](https://nodejs.org/). El starter no necesita paquetes adicionales.
3. Ejecuta `node examples/agent-response-starter/server.mjs` y abre `http://127.0.0.1:4173`.

Prueba que funciona con `node --test examples/agent-response-starter/test/*.test.mjs`.

Después revisa [la skill WILENNY](https://github.com/christianhola/-meridian-showcase/blob/main/skills/wilenny/SKILL.md) y la [guía para contribuir](https://github.com/christianhola/-meridian-showcase/blob/main/CONTRIBUTING.md).

La interfaz y las respuestas del starter son demostraciones deterministas, no llamadas a modelos reales.

## Before sharing links publicly / Antes de publicar
Review [launch readiness](./LAUNCH-READINESS.md), confirm license ownership, audit the Git history and Actions artifacts, and establish the public organization and confidential vulnerability reporting.

## MCP v2 / Protocolo MCP

To try a genuine local MCP server (not a cloud integration):

```bash
npm install --prefix examples/mcp-readonly
npm test --prefix examples/mcp-readonly
```

The test exercises official SDK `tools/list` and `tools/call` via stdio. See [the read-only MCP tutorial](https://github.com/christianhola/-meridian-showcase/blob/main/examples/mcp-readonly/README.md).

En español: el ejemplo MCP usa el SDK oficial v2, valida entradas y no ejecuta acciones externas ni requiere credenciales. El test prueba la comunicación real entre cliente y servidor.
