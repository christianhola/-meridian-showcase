# Contrato de extensiones — propuesta v0

**Estado: borrador de especificación. No es una API de Meridian disponible en producción.**

El marketplace necesita un contrato separado del backend privado para que otros puedan construir con seguridad.

## Metadata de una extensión

~~~json
{
  "schemaVersion": "0.1-draft",
  "id": "plugin-example",
  "displayName": "Example plugin",
  "version": "0.1.0",
  "description": "Illustrative manifest, not an installable plugin",
  "permissions": [],
  "entrypoint": "https://example.org/hooks/meridian",
  "documentation": "https://example.org/docs"
}
~~~

El manifiesto anterior es exclusivamente ilustrativo. No se ha verificado aún una ruta de instalación, autenticación, callbacks ni una API estable.

## Contratos por publicar antes de habilitar instalaciones

- Identidad del publisher y verificación del repositorio de origen.
- Versionado semántico y compatibilidad con la plataforma.
- Autorización granular y consentimiento por workspace.
- Firma de webhooks, timestamp, idempotencia y protección de replay.
- Límites de peticiones, reintentos, timeouts y política de desinstalación.
- Declaración de datos accedidos, retención, soporte y proceso de vulnerabilidades.
- Revisión automatizada y manual antes de incluir una extensión en el catálogo.

**Regla:** ninguna extensión externa recibirá secretos de servidor ni acceso por defecto a datos de clientes.
