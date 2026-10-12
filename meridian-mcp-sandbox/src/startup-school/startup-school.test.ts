import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GrowthBot, PitchCoachBot, TechArchitectBot, simulateTraction } from "./index.js";

describe("Meridian Startup School", () => {
  it("evalúa una idea con score y siguientes acciones", () => {
    const result = new PitchCoachBot().evaluateIdea({
      name: "EcoDelivery",
      problem: "Los comercios pierden tiempo y pedidos gestionando entregas manualmente.",
      solution: "Un panel con automatización y trazabilidad de pedidos.",
      targetAudience: "Dueños de pequeños comercios urbanos.",
      evidence: ["8 entrevistas con comercios"],
      businessModel: "Suscripción mensual por local.",
    });
    assert.equal(result.bot, "meridian-pitch-coach");
    assert.ok(result.score.total > 10);
    assert.equal(result.nextActions.length, 3);
  });

  it("propone una arquitectura con límites MCP", () => {
    const result = new TechArchitectBot().advise({ product: "CRM", users: "fundadores", coreWorkflow: "capturar leads", sensitivity: "sensitive" });
    assert.match(result.stack.database, /PostgreSQL/);
    assert.match(result.mcpBoundaries[0] ?? "", /Read-only/);
    assert.equal(result.security.some((item) => item.includes("Encrypt")), true);
  });

  it("devuelve un plan de growth con guardrails", () => {
    const result = new GrowthBot().plan({ product: "FounderOS", audience: "empresarios", goal: "activation" });
    assert.match(result.northStarMetric, /valor/);
    assert.equal(result.funnel.length, 4);
    assert.ok(result.guardrails.length > 1);
  });

  it("simula tracción de forma determinista", () => {
    const result = simulateTraction({ visitors: 1000, activationRate: 0.4, retentionRate: 0.5, conversionRate: 0.1, months: 3 });
    assert.equal(result.projection.length, 3);
    assert.equal(result.projection[0]?.paying, 20);
    assert.ok(result.totals.revenue > 0);
  });
});
