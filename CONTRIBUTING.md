# Contributing to Meridian Ecosystem Hub

Este repositorio documenta públicamente la arquitectura, experiencia y evolución de Meridian sin exponer código privado, secretos ni datos de clientes.

## Formas de contribuir

- Reportar errores de documentación.
- Proponer mejoras de accesibilidad o claridad visual.
- Revisar diagramas y contratos técnicos.
- Sugerir ejemplos de integración sin incluir credenciales.
- Mejorar traducciones, redacción o navegación.

## Flujo recomendado

1. Abra un issue describiendo el problema o propuesta.
2. Cree una rama específica.
3. Mantenga el cambio pequeño y verificable.
4. No agregue claves, tokens, `.env`, datos privados ni capturas sensibles.
5. Envíe un Pull Request explicando qué cambió y cómo se verificó.

## Convención de ramas

```text
docs/descripcion-corta
fix/descripcion-corta
feat/descripcion-corta
```

## Convención de commits

```text
docs: improve agent runtime explanation
fix: correct architecture diagram label
feat: add accessible voice engine documentation
```

## Seguridad

No publique:

- API keys;
- secretos OAuth;
- credenciales de base de datos;
- información de clientes;
- rutas internas sensibles;
- archivos de producción privados.

Los reportes de seguridad deben seguir [`SECURITY.md`](./SECURITY.md), no un issue público.

## Revisión

Un Pull Request debe indicar:

```text
[ ] El cambio corresponde al alcance público del repositorio.
[ ] No contiene secretos o datos privados.
[ ] Los enlaces funcionan.
[ ] Los SVG y Markdown se renderizan correctamente.
[ ] La descripción no presenta funciones futuras como disponibles hoy.
```
