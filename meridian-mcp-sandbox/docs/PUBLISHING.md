# Publicar `meridian-mcp-sandbox` como repositorio independiente

Este directorio es autocontenido: `package.json`, `tsconfig.json`, CI, tests y
documentación propios. Publicarlo como repositorio independiente requiere **cero
ediciones de código**.

---

## 1. Verificación previa (obligatoria)

```bash
cd meridian-mcp-sandbox
npm install
npm run typecheck        # tsc --noEmit
npm test                 # 20 pruebas, sin red y sin claves
npm run dev              # prueba MCP completa => READY
npm run test:media       # artefactos de simulación en output/media
npm run build            # compila a dist/
```

Comprueba también que **no** se sube nada sensible:

```bash
git status --porcelain           # output/ y .env NO deben aparecer (están ignorados)
grep -rn "output/" .gitignore
```

Verificación de independencia ya realizada sobre el paquete extraído
(`/tmp/publish-test`): `npm install` + `tsc --noEmit` + 23 tests + `npm run dev`
⇒ **READY**, sin monorepo alrededor.

---

## 2. Crear el repositorio (GitHub CLI)

### Opción automatizada

```bash
bash scripts/publish.sh --out=/tmp/meridian-mcp-sandbox   # extrae solo lo versionado y commitea
bash scripts/publish.sh --create                          # crea el remoto y empuja (requiere permiso createRepository)
```

El script aborta si detecta `.env`, `node_modules`, `output/` o `dist/` dentro del
paquete (salvaguarda anti-secretos) y exige que `.env.example` esté presente.

### Opción manual

Desde dentro de `meridian-mcp-sandbox`:

```bash
git init -b main
git add -A
git commit -m "feat: meridian-mcp-sandbox v1.0.0 (MCP + Playwright + medios hiperrealistas)"
gh repo create christianhola/meridian-mcp-sandbox \
  --public \
  --description "Sandbox Zero Config: MCP, automatización web resiliente con Playwright y generación de medios hiperrealistas." \
  --source=. --remote=origin --push
```

Con `git` remoto manual:

```bash
git remote add origin git@github.com:christianhola/meridian-mcp-sandbox.git
git push -u origin main
```

---

## 3. Ajustes posteriores sugeridos

- **Topics**: `mcp`, `model-context-protocol`, `playwright`, `typescript`, `esm`,
  `automation`, `flux`, `runway`, `ai-media`, `agent-tools`.
- **Descripción**: la del comando `gh repo create` de arriba.
- **Protección de rama**: exige el check `Typecheck, tests and build` (workflow `ci.yml`).
- **Dependabot**: `npm` en `/` con revisión semanal.
- **Releases**: etiqueta `v1.0.0` cuando `npm run dev` devuelva `READY` en CI.

---

## 4. CI incluido

`.github/workflows/ci.yml` ejecuta en cada push/PR:

1. `npm ci` (requiere el `package-lock.json` versionado).
2. `npm run typecheck`.
3. `npm test`.
4. `npm run test:media`.
5. `npm run build`.

Sin secretos, sin red externa (los binarios de Chromium no se descargan en CI: el
motor de navegador se valida aparte con `npm run test:web`, que degrada a
`SETUP REQUIRED` y **no** rompe el pipeline).

---

## 5. Relación con el repositorio Meridian Community

- Este sandbox vive en `meridian-mcp-sandbox/` dentro del monorepo de la comunidad.
- Al extraerlo, la carpeta pasa a ser la raíz del nuevo repositorio: las rutas
  relativas (`./src/...`, `output/`) siguen siendo válidas.
- Si quieres mantener las dos copias sincronizadas, conserva el subconjunto en el
  monorepo y usa `git subtree`:

```bash
# Desde el monorepo, publicar cambios del sandbox hacia el repo independiente
git subtree push --prefix=meridian-mcp-sandbox origin main
```
