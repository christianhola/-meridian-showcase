# WILENNY eval pack

Este directorio contiene **fixtures de contrato**, no puntuaciones inventadas de modelos.

## Objetivo

Cada escenario declara:

- ruta esperada;
- si una acción irreversible requiere aprobación;
- comportamientos mínimos;
- comportamientos prohibidos.

El validador actual comprueba estructura e invariantes de seguridad de forma determinista.

```bash
npm run evals
```

## Próxima fase

Un runner de modelo podrá ejecutar WILENNY contra estos mismos fixtures y registrar resultados versionados. Cuando existan métricas reales, deberán incluir modelo, versión, fecha, configuración y criterio de scoring.
