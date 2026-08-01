# Seguridad

La seguridad de Meridian se trata como una propiedad del sistema, no como una función aislada.

## Alcance de este repositorio

Este repositorio es una presentación pública del producto. No debe contener:

- claves API, tokens OAuth o contraseñas;
- archivos `.env`;
- credenciales de Supabase, Vercel, GitHub u otros proveedores;
- datos reales de clientes;
- exports de bases de datos;
- endpoints administrativos privados;
- detalles internos que faciliten eludir controles de acceso.

## Reportar una vulnerabilidad

No publiques secretos ni detalles explotables en una issue pública.

Reporta el problema de forma privada al propietario del repositorio mediante los canales privados disponibles en GitHub. Incluye únicamente la información necesaria para reproducirlo:

1. componente afectado;
2. impacto observado;
3. pasos de reproducción seguros;
4. evidencia sin datos personales ni credenciales;
5. recomendación de mitigación, si aplica.

## Principios de Meridian

- Aislamiento estricto por `workspaceId`.
- Privilegios mínimos para usuarios, integraciones y herramientas de IA.
- Secretos fuera del código y del historial de Git.
- Validación de payloads externos.
- Revocación y rotación de credenciales cuando exista riesgo.
- Registro de acciones sensibles sin almacenar secretos en logs.
- La IA no recibe acceso libre a billing, credenciales o código fuente.

## Divulgación responsable

Evita pruebas destructivas, extracción de datos, interrupción del servicio o acceso a cuentas ajenas. La investigación debe limitarse a recursos propios y entornos autorizados.
