# Interface Guide — Spatial UI

Meridian usa una dirección visual **OLED, estructurada y espacial**. La profundidad no debe convertirse en decoración; debe ayudar a distinguir jerarquía, contexto, estado y acción.

## Principios

### 1. Capa base

- Fondo principal: negro OLED.
- Superficies: negro elevado y gris oscuro.
- Bordes: discretos, de un píxel.
- Texto principal: blanco suave.
- Texto secundario: gris muteado.
- Acento: reservado para estado, foco o acción crítica.

### 2. Espacio

La interfaz organiza el trabajo en planos:

```text
BACKGROUND
  └─ ambient grid / subtle depth

WORKSPACE PLANE
  ├─ navigation
  ├─ editor
  └─ data views

INTELLIGENCE PLANE
  ├─ assistant
  ├─ agent states
  └─ recommendations

ACTION PLANE
  ├─ approvals
  ├─ forms
  └─ confirmed execution
```

### 3. Notion-Core

El término `Notion-Core` describe una experiencia basada en bloques y contexto conectable, no una copia visual de Notion.

Cada bloque debe tener:

- identidad estable;
- tipo conocido;
- permisos;
- metadata;
- estado de sincronización;
- acciones explícitas;
- relación con el workspace.

## Motion

Framer Motion ya forma parte de la dirección de interfaz de Meridian. Debe usarse para:

- cambios de estado;
- entrada y salida de paneles;
- continuidad entre vistas;
- feedback de acciones;
- organización de listas;
- estados del agente.

Reglas:

1. Animar preferentemente `transform` y `opacity`.
2. Evitar movimiento perpetuo en superficies de trabajo.
3. Usar duraciones breves para controles y más largas para cambios de contexto.
4. Implementar `prefers-reduced-motion`.
5. Nunca retrasar una acción crítica para completar una animación.

## React Three Fiber

React Three Fiber se documenta como una capacidad de evolución espacial; no debe presentarse como una dependencia verificada del runtime actual.

Usos apropiados:

- mapa visual del ecosistema;
- onboarding espacial opcional;
- visualización de agentes y relaciones;
- objetos de marca en landing pages;
- demostraciones y storytelling de producto.

Usos inapropiados:

- tablas de CRM;
- formularios;
- navegación esencial;
- lectura de documentos;
- acciones críticas;
- reemplazo de indicadores accesibles.

## Presupuesto de rendimiento

- El contenido central debe funcionar sin WebGL.
- Cargar escenas 3D de manera lazy.
- Pausar render cuando la pestaña no está visible.
- Reducir DPR en móviles.
- Comprimir texturas.
- Mantener fallback estático.
- Evitar múltiples canvas simultáneos.

## Liquid Glass

Las superficies translúcidas deben conservar legibilidad y contraste.

```css
.liquid-panel {
  background: color-mix(in srgb, #111 84%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 80px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px) saturate(120%);
}
```

No usar transparencia alta detrás de texto largo, tablas, formularios o datos financieros.

## Estados obligatorios

Cada módulo debe diseñar:

- loading;
- empty;
- success;
- error;
- disabled;
- permission denied;
- offline / integration unavailable;
- approval required.

## Responsive

El diseño debe validarse en:

- 375 px;
- 768 px;
- 1024 px;
- 1440 px;
- pantallas amplias.

La versión móvil no debe ser una reducción del escritorio. Debe reorganizar prioridad, navegación, tablas y acciones.
