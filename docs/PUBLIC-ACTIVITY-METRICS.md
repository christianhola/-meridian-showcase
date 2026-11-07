# Actividad pública de Meridian

Este gráfico muestra actividad real y **nunca** inventa visitas, búsquedas ni eventos.

## Fuente predeterminada

GitHub Pages consulta la API pública de GitHub para eventos del repositorio
christianhola/-meridian-showcase. Agrupa los eventos por día UTC y
se actualiza al abrir el widget, al volver a la pestaña y cada 15 minutos.
La API pública solo devuelve eventos recientes: si devuelve 100 eventos,
el gráfico advierte que la cobertura histórica puede ser parcial.
Los eventos de GitHub NO son visitas a la web ni búsquedas web.

## Para conectar métricas reales de búsquedas web

Configurar en el **build de GitHub Pages** la variable pública
VITE_MERIDIAN_PUBLIC_METRICS_URL=https://HOST/api/public/meridian-activity
una vez que exista un endpoint validado en Vercel o Railway. **No** configurar
una API key con el prefijo VITE_: acabaría publicada en JavaScript.

El endpoint debe responder por HTTPS, permitir CORS solo para el sitio autorizado,
limitar peticiones, publicar únicamente cifras agregadas sin identificadores,
y devolver siete días UTC completos:

    {
      "days": [
        { "date": "YYYY-MM-DD", "events": 12, "webSearches": 4 }
      ]
    }

El array debe incluir exactamente una fila por cada uno de los últimos siete días
UTC. Los valores son enteros no negativos; si no hay fuente de búsquedas, omitir
webSearches en todas las filas y la interfaz ocultará esa pestaña.
La clave del proveedor de analytics, de búsqueda o base de datos debe permanecer
exclusivamente en las variables del servicio de Vercel/Railway.

**Importante:** disponer de SERPAPI_API_KEY o TAVILY_API_KEY permite buscar en
internet, pero no demuestra que exista un historial de búsquedas contabilizadas.
La métrica webSearches solo debe provenir de logs de ejecución autorizados,
comprobados y agregados por el servidor. No exponer telemetría de workspaces
privados o de usuarios individuales en una web pública.

## Validación

Ejecutar Node.js 22, npm ci, npm run check, npm test,
npm run build -- --base=/-meridian-showcase/app/ y npm run docs:build.
Además verificar la ruta /app/activity/, su iframe en la portada y
/GETTING-STARTED, navegación por teclado y respuesta 403/429 de GitHub.

## Open-Meteo: datos reales sin clave

La interfaz contiene una pestaña de pronóstico meteorológico para Santo Domingo. Consulta el endpoint HTTPS público de Open-Meteo con las variables diarias temperature_2m_max, temperature_2m_min y precipitation_probability_max, zona horaria America/Santo_Domingo y siete días de pronóstico. No usa claves API. Valida fecha, cardinalidad, rango y mínimos/máximos antes de mostrar cualquier barra.

El cursor, el foco del teclado y el resaltado automático cada 3,2 segundos muestran valores verificables, sin cambiar los números aleatoriamente. La animación de entrada no convierte el gráfico en datos de medición real. La fuente de eventos de GitHub y los pronósticos meteorológicos son independientes.

La presentación en GitHub Pages está incrustada sin tarjeta, borde ni sombra; hay que verificarla en escritorio y móvil después de publicar.
