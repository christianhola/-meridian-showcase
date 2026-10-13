# Contributing to Meridian Community

¡Gracias por ayudar a construir Meridian Community! Puedes contribuir con documentación, accesibilidad, diseño, ejemplos reproducibles o propuestas de extensiones.

## Entorno local en tres pasos

Requiere Node.js 22 o superior y Git.

1. Clona el repositorio actual (el cambio a meridian-community está pendiente):
   ~~~bash
   git clone https://github.com/christianhola/-meridian-showcase.git
   cd -- -meridian-showcase
   ~~~
2. Instala las dependencias:
   ~~~bash
   npm install
   ~~~
3. Arranca la aplicación:
   ~~~bash
   npm run dev
   ~~~

Antes de proponer un PR ejecuta `npm run check`, `npm run evals`, `npm run community:check`, `npm run test`, `npm run security:check` y `npm run build`.

## Flujo de contribución

1. Abre un issue para una funcionalidad nueva, un plugin o un proyecto del showcase.
2. Crea una rama (`docs/...`, `feat/...` o `fix/...`) y cambios pequeños.
3. Adjunta al PR el motivo, capturas sin datos personales y pruebas reproducibles.

Para publicar entradas en `community/registry.json` se requiere URL pública válida, licencia explícita, estado `published` y revisión de un maintainer.

## Calidad y seguridad

- No añadas secretos, valores de `.env`, cookies, tokens, datos de clientes, endpoints internos o capturas privadas.
- No describas APIs futuras como si ya existieran.
- Comprueba navegación móvil, teclado, etiquetas y contraste en cambios visuales.
- Los reportes de vulnerabilidades deben seguir [SECURITY.md](./SECURITY.md), nunca issues públicas.
- Respeta [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
- El contrato de plugins es todavía un [borrador](./docs/PLUGIN-CONTRACT.md).

Las contribuciones no transfieren por sí solas permisos administrativos ni acceso a servicios privados.

## Extensiones y seguridad de la comunidad

Los plugins, servidores MCP y SDKs nuevos requieren especificación pública de permisos, compatibilidad, límites de uso y proceso para informar vulnerabilidades. Las contribuciones del catálogo se proponen como Issues y se aceptan mediante revisión humana. Lee [Governance](./docs/GOVERNANCE.md).

El repositorio actual es privado y la URL de clonación requiere acceso hasta completar el lanzamiento público.

## An example that actually runs

Start with [Agent Response Starter](./examples/agent-response-starter/README.md). Its local HTTP server requires Node.js 20+, does not use provider tokens and has standalone integration tests:

```bash
node --test examples/agent-response-starter/test/*.test.mjs
node examples/agent-response-starter/server.mjs
```

See [design references](./docs/DESIGN-REFERENCES-21ST.md), including the requested 21st.dev patterns. All visual designs are implemented independently.

**Before opening the repository publicly:** community owner approval is still required for the publication/license policy and full-history privacy review.

## Working with AI

AI-assisted contributions are welcome when a person reads and verifies the result. Disclose substantial assistance in the PR and never allow an agent to publish or merge without authorization. See our [AI development and pseudocode guide](./docs/AI-ASSISTED-DEVELOPMENT.md), [copy-ready agent instructions](./docs/AI-AGENT-WORKFLOW.md) and [responsible AI contribution policy](./docs/AI-CONTRIBUTION-POLICY.md).
