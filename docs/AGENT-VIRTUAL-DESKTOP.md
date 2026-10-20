# Meridian Virtual Desktop — conexión Daytona desde la web

La página pública https://christianhola.github.io/-meridian-showcase/desktop/ pertenece exclusivamente al repositorio `christianhola/-meridian-showcase`. El servicio `meridian-virtual-desktop` de Railway es su API privada. **No se realizan modificaciones en meridian-api ni Meridian Completo.**

## Flujo verídico

GitHub Pages (interfaz pública) → Railway (token de operador, sin secretos en el cliente) → SDK oficial Daytona → sandbox Linux real `sbmeridian` (`da9ec846-473e-4779-be41-5fe8d5daf785`).

Al conectarse, el backend consulta el sandbox existente. Si está archivado o detenido, solicita iniciarlo; después intenta iniciar XFCE/VNC/Computer Use. Solo muestra capturas reales de Daytona, sin datos inventados. Si el escritorio gráfico no está disponible, lo comunica. No crea máquinas alternativas.

## Aislamiento y protección

La API acepta una sola sesión por réplica y requiere `DESKTOP_ACCESS_TOKEN` de al menos 32 caracteres. Validación de origen del sitio web, acciones acotadas, sin terminal pública. OpenRouter puede analizar una captura únicamente cuando el operador lo confirma y propone un paso; requiere otra aprobación para ejecutarlo. El token no se envía al modelo.

**Cerrar sesión no elimina, detiene ni archiva sbmeridian**. Daytona mantiene sus propias reglas de auto-stop, auto-archive y auto-delete; si está configurada una eliminación automática de un día, puede borrar la máquina sin intervención de esta web. Deshabilita o revisa esa política en Daytona si deseas persistencia.

En `meridian-virtual-desktop` (Railway) configurar `DAYTONA_API_KEY`, `DAYTONA_SANDBOX_ID` y `DESKTOP_ACCESS_TOKEN` (secreto). Mantener `OPENROUTER_API_KEY` en el servidor para propuestas visuales.

Consultas HTTP autenticadas y capturas reales deben comprobarse antes de declarar que el escritorio funciona por completo. Las pruebas con mocks validan la lógica, no el proveedor.

Docs: https://www.daytona.io/docs/en/computer-use/ · https://www.daytona.io/docs/en/typescript-sdk/daytona/
