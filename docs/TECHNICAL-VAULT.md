# Technical Vault

Este documento separa la infraestructura **verificada actualmente** de las capas **objetivo** que Meridian puede incorporar después.

## Estado verificado

### Autenticación

La aplicación actual usa:

- NextAuth v5;
- proveedor Credentials;
- Prisma para consultar usuarios;
- bcrypt para validar contraseñas;
- estrategia de sesión JWT;
- protección de rutas desde Server Components y Route Handlers.

Supabase no funciona actualmente como proveedor de autenticación. Se utiliza como hosting administrado de PostgreSQL.

### Base de datos

```text
Next.js / Route Handlers
          ↓
       Prisma ORM
          ↓
PostgreSQL hosted on Supabase
```

Las operaciones sensibles deben incluir el scope de usuario o `workspaceId` correspondiente. El acceso a datos se controla desde la capa de aplicación.

### Cifrado de integraciones

Las credenciales de integraciones se cifran en la aplicación mediante AES-256-GCM y una clave proporcionada por variable de entorno. El código público del showcase no incluye claves, secretos ni payloads reales.

### Despliegue

- Aplicación web: Vercel.
- Base de datos: PostgreSQL administrado en Supabase.
- ORM: Prisma.
- Repositorios y control de versiones: GitHub.

## Capas objetivo

### Resend

Resend se documenta aquí como una **capa objetivo**, no como una integración verificada actualmente en producción.

Casos de uso previstos:

- magic links;
- correos transaccionales;
- invitaciones a workspaces;
- recuperación de acceso;
- notificaciones operativas;
- resúmenes generados por agentes.

Antes de activarlo se requieren:

1. dominio verificado;
2. plantillas versionadas;
3. protección contra abuso y rate limits;
4. separación por workspace;
5. logs sin contenido sensible;
6. política de reintentos e idempotencia.

### Supabase OAuth

Supabase OAuth no forma parte del flujo actual. Solo debe documentarse como opción futura si se decide reemplazar o complementar NextAuth.

Una migración futura tendría que resolver:

- compatibilidad con usuarios existentes;
- sesiones actuales;
- membresías de workspace;
- recuperación y verificación de email;
- proveedores OAuth;
- rollback y coexistencia temporal.

## Modelo de seguridad

```text
IDENTITY
  └─ authenticated user

TENANT BOUNDARY
  └─ workspaceId

POLICY
  ├─ allowed tools
  ├─ read / write distinction
  ├─ approval requirement
  └─ idempotency

EXECUTION
  └─ external provider or integration

AUDIT
  └─ trace ID · status · duration · safe metadata
```

## Lo que nunca debe entrar al showcase

- `.env`;
- tokens OAuth;
- claves privadas;
- service-role keys;
- cookies o JWT reales;
- datos de clientes;
- connection strings;
- endpoints administrativos privados;
- prompts internos con información sensible;
- diagramas que revelen controles explotables.
