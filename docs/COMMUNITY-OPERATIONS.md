# Operaciones de la comunidad — plan de lanzamiento

Este documento es un **plan**, no una descripción de servicios ya abiertos.

## Discord (pendiente de crear)

Canales sugeridos: #introducciones, #showcase, #feedback, #ayuda-tecnica, #anuncios y #recursos. Crear después canales por idioma y tecnología cuando exista demanda real. Publicar reglas, canales para reportar abuso y moderadores antes de aceptar miembros.

## GitHub

- Issues estructurados para errores, propuestas, extensiones y proyectos del showcase.
- Pull requests con comprobaciones de compilación, contrato del catálogo y revisión humana.
- Bot de bienvenida solo a nuevos contribuidores; nunca ejecutar código del PR con permisos elevados.
- Etiquetas sugeridas: good first issue, documentation, plugin, starter, integration, security-review.
- Protección de rama, CODEOWNERS y revisiones requeridas cuando los equipos estén definidos.

## Reconocimiento

Reconocer aportes verificables en la documentación y en el showcase con consentimiento. Evaluar All Contributors para créditos públicos. Evitar rankings que premien volumen en lugar de calidad.

## Maintainers

El propietario designa por escrito responsabilidades y permisos según aportes sostenidos, revisiones seguras y respeto al código de conducta. La capacidad de fusionar cambios o administrar secretos nunca se otorga automáticamente.

## Primer hackathon virtual — propuesta

Empezar con retos de documentación, starters y plugins de prueba sin acceso al backend privado. Publicar reglas, elegibilidad, derechos sobre el código, jurado, criterios, premios y presupuesto **antes** de anunciar inscripciones. Una meta de 50–100 desarrolladores es aspiracional y no representa una inscripción confirmada.

## Criterios de apertura

1. Revisar todo el historial Git y resultados de secret scanning.
2. Clasificar documentación técnica apta para publicación.
3. Elegir y añadir licencia antes de anunciar el código como open source.
4. Configurar políticas de seguridad, moderación y revisión.
5. Validar acciones y build en la rama de comunidad.
6. Renombrar a `meridian-community` y cambiar visibilidad con autorización del propietario.
7. Publicar el enlace oficial solo cuando exista acceso público real.


## Community 3.0: implementación en esta rama

- Estructura detallada de Discord: [DISCORD-BLUEPRINT.md](./DISCORD-BLUEPRINT.md).
- Modelo de derechos y revisión: [GOVERNANCE.md](./GOVERNANCE.md).
- Lanzamiento de GitHub Organization: [ORG-LAUNCH-CHECKLIST.md](./ORG-LAUNCH-CHECKLIST.md).
- Plantillas copiables: [blueprints](../blueprints/).
- El directorio se genera desde el registro aprobado en el repositorio y se valida en CI.
- Un workflow semanal podrá consultar la API de GitHub en modo solo lectura al pasar a público; no publica ni fusiona contenido de terceros.

**Métricas de salud previstas:** tiempo de primera respuesta, PRs revisados, porcentaje de contribuciones verificadas, errores de links del catálogo y tiempo de resolución de vulnerabilidades. No existe todavía una línea de base pública comprobada.
