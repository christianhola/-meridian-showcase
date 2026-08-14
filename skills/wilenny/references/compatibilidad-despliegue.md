# Compatibilidad y despliegue de WILENNY

## Estructura portable

```text
wilenny/
├── SKILL.md
└── references/
    ├── compatibilidad-despliegue.md
    ├── catalogo-capacidades.md
    ├── seguridad-operativa.md
    └── protocolo-subagentes.md
```

El formato mínimo es una carpeta con `SKILL.md`, frontmatter YAML con `name` y `description`, instrucciones y recursos opcionales. El estándar Agent Skills usa divulgación progresiva: descubrir metadata, cargar SKILL.md al activar y cargar referencias o scripts bajo demanda [1].

## Claude y Claude Code

Usa una carpeta compatible con Claude Skills/Claude Code y conserva un nombre lowercase portable. Anthropic documenta `SKILL.md` como archivo requerido y recursos opcionales. Claude Code puede distribuir skills mediante repositorios/plugins; no asumas que una skill de otro catálogo es confiable.

## ChatGPT y Codex

Codex busca skills en ubicaciones `.agents/skills` de repositorio o usuario. ChatGPT/Codex pueden usar invocación explícita e implícita y empaquetar varias skills mediante plugins. Mantén la descripción breve, específica y con palabras de activación. Si hay muchas skills, el catálogo inicial puede recortar descripciones.

## OpenCode

OpenCode descubre `.opencode/skills`, `.claude/skills` y `.agents/skills`, en el proyecto o globalmente. Reconoce `name`, `description`, `license`, `compatibility` y `metadata`. Configura permisos de skill como `allow`, `ask` o `deny`; para WILENNY se recomienda `ask` en skills con scripts, red o efectos secundarios.

## Otros clientes

Para Cursor, VS Code, Gemini, Cline, Windsurf, Zed y clientes listados por skills.sh, comprueba su documentación actual y adapta la ruta de instalación. Si el cliente no implementa Agent Skills, usa el contenido de WILENNY como guía de sistema o plugin sin afirmar compatibilidad nativa.

## Despliegue seguro

1. Versiona WILENNY en un repositorio revisado.
2. Revisa licencia y origen de cada referencia o skill externa.
3. Ejecuta el validador de metadatos.
4. Instala en un entorno de prueba sin secretos.
5. Prueba activación explícita y coincidencia implícita.
6. Prueba permisos `allow`, `ask` y `deny`.
7. Verifica que los scripts no ejecuten red o shell arbitrario.
8. Promueve a repositorio o instalación global solo después de revisión.
9. Registra versión, cambios y rollback.

## Fuentes

[1]: https://agentskills.io/home
[2]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
[3]: https://learn.chatgpt.com/docs/build-skills
[4]: https://opencode.ai/docs/skills/
[5]: https://www.skills.sh/
