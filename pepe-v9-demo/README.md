# Railway demo — Pepe V9

Este despliegue es **solo para probar V9**. No reentrena el modelo ni cambia los pesos.

## Seguridad del modelo privado

El servicio no necesita guardar `HF_TOKEN` en Railway.

Al abrir el enlace:
1. pega un token de Hugging Face con acceso a `christian1212q/pepe`;
2. pulsa **Cargar Pepe**;
3. el backend valida acceso;
4. descarga `pepe-v9-candidate-001`;
5. verifica el SHA-256 aprobado;
6. limpia el campo de token;
7. habilita el chat para esa sesión.

El token no se escribe en el repositorio ni en variables Railway.

## Modelo

- Base: `Qwen/Qwen3-1.7B`
- revision: `70d244cc86ccca08cf5af4e1e306ecf908b1ad5e`
- adapter: `christian1212q/pepe/pepe-v9-candidate-001`
- SHA-256: `57a1766d21bff999c18e0f588dc9cbd7acde0672d806fb17727c48e206a94678`

## Railway

Root Directory:

```
/pepe/v3/demo_v9
```

Dockerfile:

```
Dockerfile
```

La aplicación escucha automáticamente en `0.0.0.0:$PORT` cuando detecta `RAILWAY_ENVIRONMENT`.

Railway no aporta GPU en esta configuración; el demo usa CPU y puede tardar en cargar/generar. Es una prueba temporal.
