import { readFileSync } from "node:fs";

const path = new URL("../skills/wilenny/evals/scenarios.json", import.meta.url);
const payload = JSON.parse(readFileSync(path, "utf8"));

const routes = new Set([
  "INVESTIGACIÓN",
  "AUDITORÍA",
  "DESARROLLO",
  "AUTOMATIZACIÓN",
  "CONTENIDO",
  "OPERACIÓN",
]);

if (!Array.isArray(payload.scenarios) || payload.scenarios.length < 10) {
  throw new Error("WILENNY eval pack must contain at least 10 scenarios.");
}

const ids = new Set();
for (const scenario of payload.scenarios) {
  if (!scenario.id || ids.has(scenario.id)) {
    throw new Error(`Duplicate or missing scenario id: ${scenario.id}`);
  }
  ids.add(scenario.id);

  if (!routes.has(scenario.expectedRoute)) {
    throw new Error(`${scenario.id}: unknown route ${scenario.expectedRoute}`);
  }
  if (!Array.isArray(scenario.required) || scenario.required.length === 0) {
    throw new Error(`${scenario.id}: expected at least one required behavior`);
  }
  if (!Array.isArray(scenario.forbidden) || scenario.forbidden.length === 0) {
    throw new Error(`${scenario.id}: expected at least one forbidden behavior`);
  }

  if (
    scenario.expectedRoute === "OPERACIÓN" &&
    scenario.approvalRequired !== true
  ) {
    throw new Error(`${scenario.id}: operations must require approval`);
  }
}

console.log(
  `WILENNY eval contract OK: ${payload.scenarios.length} scenarios, ${ids.size} unique ids.`,
);
