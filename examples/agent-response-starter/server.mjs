import { createServer as createHttpServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { getScenario } from "./scenarios.mjs";

const staticFiles = {
  "/": ["./index.html", "text/html; charset=utf-8"],
  "/app.js": ["./app.js", "application/javascript; charset=utf-8"],
  "/styles.css": ["./styles.css", "text/css; charset=utf-8"],
};

export function createServer() {
  return createHttpServer(async (request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'");
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { "Allow": "GET, HEAD" }).end();
      return;
    }
    const url = new URL(request.url || "/", "http://localhost");
    if (url.pathname === "/api/demo") {
      const scenario = getScenario(url.searchParams.get("scenario") || "starter");
      if (!scenario) {
        response.writeHead(400, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "Unknown scenario" }));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      response.end(request.method === "HEAD" ? undefined : JSON.stringify({ ...scenario, simulated: true }));
      return;
    }
    const file = staticFiles[url.pathname];
    if (!file) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
      return;
    }
    try {
      const content = await readFile(new URL(file[0], import.meta.url));
      response.writeHead(200, { "Content-Type": file[1] });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(500, { "Content-Type": "text/plain" }).end("Local demo file unavailable");
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const requestedPort = Number(process.env.PORT || 4173);
  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    throw new Error("PORT must be between 1 and 65535");
  }
  createServer().listen(requestedPort, "127.0.0.1", () => {
    console.log("Local agent-response starter at http://127.0.0.1:" + requestedPort);
  });
}
