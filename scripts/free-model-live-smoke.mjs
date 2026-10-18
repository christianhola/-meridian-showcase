/** Real end-to-end smoke test against the free-only Railway service. No secrets. */
const base = "https://meridian-agents-v2-production.up.railway.app";
const origin = "https://christianhola.github.io";
const health = await fetch(base + "/health", { signal: AbortSignal.timeout(15000) });
if (!health.ok) throw new Error("Railway /health failed: " + health.status);
const models = await fetch(base + "/api/v1/agents/free/models", { signal: AbortSignal.timeout(15000) });
if (!models.ok) throw new Error("Free model catalog unavailable: " + models.status);
const catalog = await models.json();
if (catalog.models?.[0]?.upstream_model !== "openrouter/free") {
  throw new Error("Gateway does not select the free-only model");
}
const result = await fetch(base + "/api/v1/agents/free/chat/stream", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Origin": origin },
  body: JSON.stringify({
    agent: "coder",
    messages: [{ role: "user", content: "Responde brevemente: hola." }],
  }),
  signal: AbortSignal.timeout(65000),
});
if (!result.ok) throw new Error("Free stream HTTP " + result.status);
const text = await result.text();
if (!text.includes("event: delta") || !text.includes("event: done")) {
  console.error("SSE event types:", [...text.matchAll(/event: (\w+)/g)].map(m => m[1]));
  throw new Error("Free stream missing actual response or completion event");
}
console.log("Success: live free model streaming and backend health checks passed.");
