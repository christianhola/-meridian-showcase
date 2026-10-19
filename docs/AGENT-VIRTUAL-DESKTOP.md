# Meridian Virtual Desktop — Daytona (integración real)

La página [/desktop/](https://christianhola.github.io/-meridian-showcase/desktop/) se conecta a un servicio independiente desplegado en Railway. **No es un emulador ni una maqueta**: el backend utiliza el SDK oficial de Daytona para crear un sandbox Linux privado, arrancar XFCE y Computer Use, capturar píxeles reales y ejecutar comandos autorizados.

## Arquitectura

GitHub Pages (UI sin secretos) → Railway (API HTTP privada con token del operador) → Daytona SDK → sandbox Linux + XFCE/X11/VNC. Los agentes de chat todavía no ejecutan instrucciones autónomas sobre la laptop. El usuario dirige acciones concretas. Una integración posterior del agente necesita una identidad de usuario, un plan verificable, permisos por acción y evaluación del resultado; nunca aceptar instrucciones del modelo como autorizaciones.

## Despliegue

El backend está en services/virtual-desktop, separado del runtime Meridian Agents. Configurar en Railway **DAYTONA_API_KEY** y **DESKTOP_ACCESS_TOKEN** aleatorio de al menos 32 caracteres. Establecer DESKTOP_ALLOWED_ORIGIN=https://christianhola.github.io. Nunca publicar credenciales en el frontend, repositorio ni documentación. Hasta configurar ambas variables, /health muestra configured:false y las solicitudes son rechazadas.

Capacidades disponibles al configurar: creación y borrado real, caducidad de 30 minutos, lectura de estado, captura JPEG, clics, texto, teclas permitidas e instalación aprobada de cuatro apps de repositorios apt (Mousepad, Writer, GIMP y VLC). No se ofrece un terminal público ni instalación arbitraria. La configuración es para **un solo operador y una sola réplica**: no es una plataforma multiusuario lista para acceso anónimo.

Daytona Computer Use y VNC: https://www.daytona.io/docs/en/computer-use/ y https://www.daytona.io/docs/en/vnc-access/ . OSWorld: https://github.com/xlang-ai/OSWorld (benchmark opcional, no runtime de laptop).
