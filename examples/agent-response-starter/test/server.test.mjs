import { test } from "node:test";
import { strict as assert } from "node:assert";
import { once } from "node:events";
import { createServer } from "../server.mjs";
import { getScenario } from "../scenarios.mjs";

test("published examples are deterministic and unknown keys are rejected", () => {
  assert.equal(getScenario("starter").steps.length, 3);
  assert.equal(getScenario("security").title, "Prepare a public repository");
  assert.equal(getScenario("__proto__"), null);
});
test("HTTP endpoint returns clear simulated data and rejects unknown scenarios", async () => {
  const server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const base = "http://127.0.0.1:" + server.address().port;
  try {
    const response = await fetch(base + "/api/demo?scenario=permissions");
    assert.equal(response.status, 200);
    const payload = await response.json();
    assert.equal(payload.simulated, true);
    assert.ok(payload.answer.includes("schemas"));
    assert.equal((await fetch(base + "/api/demo?scenario=invalid")).status, 400);
    assert.equal((await fetch(base + "/.env")).status, 404);
    const head = await fetch(base + "/", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.ok(head.headers.get("content-security-policy")?.includes("object-src 'none'"));
    assert.equal((await fetch(base + "/", { method: "POST" })).status, 405);
  } finally {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
