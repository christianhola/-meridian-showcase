# Protocolo de subagentes WILENNY

## Contrato

Cada subagente recibe:

```yaml
id: identificador-unico
rol: cartografo|investigador|verificador|arquitecto|implementador|auditor|probador|redactor
objetivo: una frase verificable
entradas: archivos, preguntas, URLs o resultados permitidos
restricciones: permisos, fuentes, tiempo y acciones prohibidas
salida: esquema exacto de respuesta
criterio_finalizacion: condición medible
```

## Estados

```text
pendiente → asignado → ejecutando → necesita-dato → listo
                         └──────────────→ bloqueado → escalado
```

Un subagente en estado `listo` debe entregar evidencia y no solo una conclusión. `necesita-dato` debe formular una pregunta concreta. `bloqueado` debe explicar causa, impacto y alternativa.

## Grafo de ejecución

```text
Cartógrafo
   ├── Investigadores independientes ──┐
   ├── Arquitecto                       ├─→ Verificador
   └── Analista de riesgos ─────────────┘       │
                                                ├─→ Implementador
                                                ├─→ Probador
                                                └─→ Redactor → Revisor final
```

Ejecuta en paralelo solo investigadores o análisis que no compartan estado mutable. Ejecuta verificación después de recibir resultados. No permitas que un subagente ejecute una acción sensible solo porque otro la recomendó.

## Pacto de evidencia

Cada resultado debe indicar: afirmación, fuente o artefacto, nivel de certeza, supuestos, contradicciones y acción recomendada. El Verificador debe rechazar afirmaciones sin evidencia, fuentes con licencia desconocida cuando se quieran reutilizar, y recomendaciones que ignoren seguridad.

## Handoff

```markdown
## Handoff
- Objetivo completado:
- Evidencia:
- Decisiones:
- Riesgos abiertos:
- Archivos producidos:
- Próximo subagente:
- Criterio para continuar:
```

## Fusión

El orquestador conserva la información de procedencia. Si dos subagentes discrepan, muestra la discrepancia, busca una fuente adicional y no promedia conclusiones incompatibles. La salida final debe poder rastrearse desde cada afirmación importante hasta su fuente o prueba.
