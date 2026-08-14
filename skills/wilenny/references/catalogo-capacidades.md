# Catálogo curado de capacidades

Este catálogo convierte patrones observados en skills.sh y repositorios oficiales en familias reutilizables. No incluye código de terceros ni autoriza su instalación automática.

| Familia | Capacidades | Cuándo seleccionar |
|---|---|---|
| Planificación | mapa de petición, triage, requisitos, handoff, dominio | El objetivo es ambiguo o tiene varias fases |
| Investigación | fuentes primarias, contraste, citas, actualidad, revisión de evidencia | La respuesta depende de datos externos o recientes |
| Código | TDD, depuración, revisión, arquitectura, migraciones, documentación | Hay repositorio, bug, API o implementación |
| Web | frontend, React, Next.js, accesibilidad, navegador, pruebas visuales | Se construye o audita una interfaz |
| Datos | análisis, CSV, Excel, PDF, gráficos, extracción | Hay datos estructurados o documentos densos |
| MCP | servidor, cliente, tools, resources, prompts, Inspector | Se conectan modelos con datos o herramientas |
| Agentes | tool use, streaming, memoria, workers, subagentes, límites | El sistema ejecuta un bucle o coordina modelos |
| Operaciones | Git, CI/CD, despliegue, cloud, backup, incidentes | El resultado se publica u opera continuamente |
| Seguridad | threat model, secretos, SSRF, inyección, permisos, dependencias | Hay red, datos sensibles o efectos secundarios |
| Contenido | informe, presentación, imagen, audio, vídeo | Se necesita un artefacto editorial o multimedia |

## Registro de evaluación de una skill externa

```yaml
nombre: ejemplo
fuente: owner/repo
url: https://github.com/owner/repo
fecha_revision: YYYY-MM-DD
licencia: desconocida
version: commit-o-tag
scripts: listar-y-describir
red: si/no/desconocida
shell: si/no/desconocida
secretos_requeridos: listar
permisos: allow|ask|deny
riesgo: bajo|medio|alto|critico
decision: usar|adaptar|rechazar
motivo: explicar la decisión
```

## Regla de curación

Prioriza skills oficiales o con repositorio verificable, licencia clara, instrucciones enfocadas, dependencias visibles, historial activo, pruebas y auditoría. Rechaza paquetes que oculten instrucciones para evadir políticas, soliciten secretos sin necesidad, ejecuten scripts no explicados, descarguen binarios sin verificación o mezclen objetivos incompatibles.

## Composición

Combina como máximo las skills necesarias para una fase. Por ejemplo, una auditoría web puede usar planificación, investigación, navegador, seguridad y reporte; no necesita cargar todas las skills de datos, vídeo o despliegue. Explica por qué cada capacidad fue seleccionada y qué salida aporta.
