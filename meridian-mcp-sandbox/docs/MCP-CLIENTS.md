# Enchufar el sandbox a un host MCP (Claude Desktop, Cursor, VS Code)

Los mismos servidores MCP que usa este sandbox pueden registrarse en cualquier
host compatible. Copia la configuración que corresponda y **sustituye la ruta
absoluta** por la tuya (`pwd` dentro de `meridian-mcp-sandbox`).

Ninguno de estos servidores requiere claves, salvo GitHub.

---

## Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
`%APPDATA%\Claude\claude_desktop_config.json` (Windows)
`~/.config/Claude/claude_desktop_config.json` (Linux)

```json
{
  "mcpServers": {
    "meridian-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/ABSOLUTE/PATH/meridian-mcp-sandbox/output/memory/meridian-memory.json"
      }
    },
    "meridian-browser": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "meridian-everything": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"]
    }
  }
}
```

## Cursor

`.cursor/mcp.json` (dentro del proyecto) o `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "meridian-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "/ABSOLUTE/PATH/meridian-mcp-sandbox/output/memory/meridian-memory.json" }
    }
  }
}
```

## VS Code (Copilot Chat, MCP nativo)

`.vscode/mcp.json`:

```json
{
  "servers": {
    "meridian-memory": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": { "MEMORY_FILE_PATH": "${workspaceFolder}/output/memory/meridian-memory.json" }
    },
    "meridian-github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "${input:github_token}" }
    }
  },
  "inputs": [
    {
      "id": "github_token",
      "type": "promptString",
      "description": "Token personal de GitHub (scope: repo)",
      "password": true
    }
  ]
}
```

---

## Conectores opcionales

### Fetch (HTTP → Markdown)

Requiere [`uv`](https://docs.astral.sh/uv/getting-started/installation/) instalado:

```json
{
  "mcpServers": {
    "fetch": { "command": "uvx", "args": ["mcp-server-fetch"] }
  }
}
```

### Puppeteer

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### GitHub

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<tu-token>" }
    }
  }
}
```

---

## Alternar conectores desde el propio sandbox

En lugar de editar cada host, usa el registro incluido:

```bash
# Inspecciona cualquier conector soportado (handshake + tools + recursos + prompts)
npm run test:tools -- --server=memory
npm run test:tools -- --server=everything
npm run test:tools -- --server=playwright
npm run test:tools -- --server=github      # requiere GITHUB_PERSONAL_ACCESS_TOKEN en .env
```

```ts
// O programáticamente, con ciclo de vida y cierre garantizados:
import { withServer } from "./src/mcp/public-servers.js";

const tools = await withServer("everything", (session) => session.listToolNames());
```

---

## Verificación

```bash
npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-memory
```

Si un servidor no arranca, `withServer`/`McpServerSession` explica exactamente qué
falta (por ejemplo: `No se encontró el ejecutable "uvx"… instala uv`), en lugar de
mostrar un `ENOENT` crudo.
