# Nomenclatura de repositorios — Meridian Community

Un nombre debe indicar claramente el tipo de proyecto. Se utilizarán minúsculas, guiones y nombres específicos de función.

| Prefijo | Uso | Ejemplo futuro |
| --- | --- | --- |
| `plugin-*` | Extensiones, widgets y capacidades independientes | `plugin-task-summary` |
| `template-*` | Repositorios base reutilizables | `template-crm` |
| `starter-*` | Proyectos demostrativos completos | `starter-crm-vite` |
| `sdk-*` | Librerías cliente por lenguaje | `sdk-python` |
| `integrations-*` | Conectores de proveedores | `integrations-slack` |

**Repositorio raíz:** `meridian-community` (pendiente de renombrar en GitHub).

## Requisitos mínimos de cada repositorio

- `README.md`: propósito, capacidades reales, requisitos y tres pasos de arranque.
- `CONTRIBUTING.md`: guía de issues, pull requests, revisión y pruebas.
- `SECURITY.md`: reporte privado de vulnerabilidades y límites de acceso.
- Licencia `LICENSE` decidida por el propietario; no se debe inventar una.
- `.env.example` con placeholders, sin valores reales.
- CI para comprobar que el ejemplo compila y que no hay secretos en commits nuevos.

La nomenclatura es una **convención para repositorios futuros**; esta propuesta no crea ni renombra automáticamente otros repositorios.
