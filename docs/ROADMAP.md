# Roadmap público de Meridian

Este roadmap comunica la dirección general del producto. Las prioridades pueden cambiar según seguridad, estabilidad, dependencias técnicas y validación con usuarios.

## Fase 1 — Fundamentos del producto

- Consolidar navegación, dashboard y experiencia responsive.
- Estabilizar autenticación y separación por workspace.
- Completar flujos esenciales de tareas, notas, calendario y CRM.
- Corregir defectos críticos de interacción, rendimiento y accesibilidad.

## Fase 2 — Capa de inteligencia

- Consolidar el AI Gateway y los contratos de proveedores.
- Unificar conversaciones, memoria, archivos y Skills.
- Aplicar permisos explícitos a cada tool o acción.
- Medir consumo, latencia, errores y coste por proveedor.
- Incorporar controles para evitar acceso a billing, secretos y código fuente.

## Fase 3 — Integraciones empresariales

- Completar OAuth y webhooks para proveedores verificados.
- Implementar estados de conexión, revocación y recuperación de errores.
- Cifrar tokens y asociarlos al workspace correspondiente.
- Añadir observabilidad y auditoría para acciones externas.

## Fase 4 — Operaciones y monetización

- Unificar límites de uso, planes y suscripciones.
- Mejorar analítica de actividad, negocio y consumo de IA.
- Añadir controles administrativos y gestión de equipos.
- Reforzar pruebas, CI/CD y verificación posterior al despliegue.

## Fase 5 — Escala y confiabilidad

- Optimizar rendimiento de interfaz, consultas y rutas críticas.
- Ampliar pruebas multi-tenant y de autorización.
- Mejorar experiencia móvil y accesibilidad.
- Formalizar documentación de API, incidentes y recuperación.
- Evaluar nuevas capacidades de agentes únicamente cuando puedan operar con límites seguros.

## Criterios de avance

Una función no se considera terminada solo porque aparece en la interfaz. Debe contar con:

- comportamiento real y verificable;
- validación de permisos;
- manejo de errores;
- trazabilidad suficiente;
- pruebas o comprobaciones reproducibles;
- documentación mínima;
- verificación en el entorno desplegado.

---

**Estado:** desarrollo activo  
**Propietario del producto:** Christian Junior de Jesús
