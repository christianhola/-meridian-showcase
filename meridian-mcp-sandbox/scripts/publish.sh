#!/usr/bin/env bash
# ============================================================================
# Meridian MCP Sandbox — publicar como repositorio independiente
# ============================================================================
# Extrae EXACTAMENTE los archivos versionados del sandbox (sin output/,
# sin node_modules, sin .env), inicializa un repositorio git limpio y, si se
# pide, crea el repositorio remoto con GitHub CLI.
#
# Uso:
#   bash scripts/publish.sh                                  # solo prepara el repo local
#   bash scripts/publish.sh --out=/tmp/meridian-mcp-sandbox  # ruta de salida
#   bash scripts/publish.sh --create --name=meridian-mcp-sandbox --owner=christianhola
#
# Requisitos: git. Para --create: gh autenticado con permiso de crear repositorios.
# ============================================================================
set -euo pipefail

OWNER="${OWNER:-christianhola}"
NAME="meridian-mcp-sandbox"
OUT=""
CREATE=0
VISIBILITY="public"
COMMIT_MESSAGE="feat: meridian-mcp-sandbox v1.0.0

Sandbox/playground independiente Zero Config:
- MCP: cliente stdio cero-configuracion y conectores para Memory, Fetch,
  Everything, Puppeteer, GitHub y Playwright MCP.
- Automatizacion web resiliente con Playwright: AbortController de extremo a
  extremo, exponential backoff con jitter y timeouts por intento.
- Medios hiperrealistas: payloads exactos para FLUX (fal.ai, Replicate),
  Runway Gen-3 y Luma, con fallback de simulacion que escribe artefactos reales."

for arg in "$@"; do
  case "$arg" in
    --out=*) OUT="${arg#*=}" ;;
    --name=*) NAME="${arg#*=}" ;;
    --owner=*) OWNER="${arg#*=}" ;;
    --private) VISIBILITY="private" ;;
    --create) CREATE=1 ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Argumento desconocido: $arg" >&2; exit 2 ;;
  esac
done

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${OUT:-$(mktemp -d)/$NAME}"

echo "▌ Origen:  $ROOT"
echo "▌ Destino: $OUT"
mkdir -p "$OUT"

# ── 1. Copiar solo archivos versionados (o el contenido, si no hay git) ──────
if git -C "$ROOT" rev-parse --git-dir >/dev/null 2>&1; then
  top="$(git -C "$ROOT" rev-parse --show-toplevel)"
  prefix="$(git -C "$ROOT" rev-parse --show-prefix)"
  count=0
  while IFS= read -r file; do
    rel="${file#"$prefix"}"
    [ -z "$rel" ] && continue
    mkdir -p "$OUT/$(dirname "$rel")"
    cp "$top/$file" "$OUT/$rel"
    count=$((count + 1))
  done < <(git -C "$top" ls-files -- "$prefix")
  echo "▌ Archivos copiados desde git: $count"
else
  # Fuera de un repositorio git: copia filtrada por patrones.
  tar -C "$ROOT" --exclude=node_modules --exclude=output --exclude=dist --exclude=.env \
      --exclude='.env.*' --exclude='*.log' -cf - . | tar -C "$OUT" -xf -
  echo "▌ Archivos copiados (sin git): $(cd "$OUT" && find . -type f | wc -l | tr -d ' ')"
fi

# ── 2. Salvaguardas: nunca publicar secretos ni artefactos ──────────────────
for forbidden in ".env" "node_modules" "output" "dist"; do
  if [ -e "$OUT/$forbidden" ]; then
    echo "✖ Abortado: '$forbidden' no debería estar en el paquete de publicación." >&2
    exit 1
  fi
done
[ -f "$OUT/.env.example" ] || { echo "✖ Falta .env.example en el paquete." >&2; exit 1; }

# ── 3. Repositorio git limpio ───────────────────────────────────────────────
cd "$OUT"
git init -q -b main
git add -A
if git diff --cached --quiet; then
  echo "▌ Sin cambios que commitear."
else
  git -c user.name="${GIT_AUTHOR_NAME:-Meridian}" -c user.email="${GIT_AUTHOR_EMAIL:-noreply@localhost}" \
      commit -q -m "$COMMIT_MESSAGE"
fi
echo "▌ Commit: $(git log --oneline -1)"
echo "▌ Archivos versionados: $(git ls-files | wc -l | tr -d ' ')"

# ── 4. Creación del repositorio remoto (opcional) ───────────────────────────
if [ "$CREATE" -eq 1 ]; then
  if ! command -v gh >/dev/null 2>&1; then
    echo "✖ gh no está instalado: omite --create y crea el repositorio a mano." >&2
    exit 1
  fi
  echo "▌ Creando $OWNER/$NAME ($VISIBILITY)…"
  if ! gh repo create "$OWNER/$NAME" --"$VISIBILITY" \
       --description "Sandbox Zero Config: MCP, automatización web resiliente con Playwright (AbortController + exponential backoff) y medios hiperrealistas (FLUX / Runway / Luma)." \
       --source=. --remote=origin --push 2>&1; then
    echo "✖ No se pudo crear el repositorio (¿falta el permiso 'createRepository' en el token?)." >&2
    echo "  Alternativa: crea el repositorio vacío en GitHub y ejecuta:" >&2
    echo "    git -C \"$OUT\" remote add origin git@github.com:$OWNER/$NAME.git && git -C \"$OUT\" push -u origin main" >&2
    exit 1
  fi
  echo "✔ Publicado: https://github.com/$OWNER/$NAME"
  exit 0
fi

cat <<TIP

▌ Repositorio local listo en: $OUT

Siguientes pasos (elige uno):

  A) Crear el repositorio remoto con gh (requiere permiso de creación):
     git -C "$OUT" remote add origin git@github.com:$OWNER/$NAME.git
     git -C "$OUT" push -u origin main
     # o simplemente: bash scripts/publish.sh --create

  B) Crear el repositorio vacío en GitHub y empujar:
     git -C "$OUT" remote add origin https://github.com/$OWNER/$NAME.git
     git -C "$OUT" push -u origin main

Comprobación previa sugerida (desde $OUT):
  npm install && npm run typecheck && npm test && npm run dev
TIP
