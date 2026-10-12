/** Meridian Startup School — Growth Bot. */
export interface GrowthBrief {
  product: string;
  audience: string;
  goal: "activation" | "retention" | "revenue" | "referrals";
  currentUsers?: number;
}

export interface GrowthPlan {
  bot: "meridian-growth-bot";
  northStarMetric: string;
  funnel: Array<{ stage: string; event: string; metric: string }>;
  experiments: string[];
  guardrails: string[];
  mode: "simulation" | "provider-ready";
}

export class GrowthBot {
  public plan(brief: GrowthBrief): GrowthPlan {
    const northStarMetric = brief.goal === "revenue" ? "ingreso recurrente por cuenta activa" :
      brief.goal === "retention" ? "usuarios activos que regresan en 30 días" :
      brief.goal === "referrals" ? "invitaciones aceptadas por cuenta activa" : "usuarios que completan el primer valor";
    return {
      bot: "meridian-growth-bot",
      northStarMetric,
      funnel: [
        { stage: "Adquisición", event: "landing_view", metric: "visitas calificadas" },
        { stage: "Activación", event: "first_value_completed", metric: "% que alcanza valor" },
        { stage: "Retención", event: "return_session", metric: "cohortes D7/D30" },
        { stage: "Conversión", event: "plan_started", metric: "ingreso por cuenta" },
      ],
      experiments: [
        "Reducir el tiempo hasta el primer valor a menos de 5 minutos.",
        "Probar dos mensajes de segmento con una sola variable cambiada.",
        "Instrumentar una entrevista posterior al abandono, no solo el click.",
      ],
      guardrails: [
        "No automatizar mensajes masivos sin consentimiento y límites de frecuencia.",
        "Separar métricas de vanidad de eventos que demuestran valor.",
        "Registrar cohorte, fuente y versión del experimento para evitar conclusiones falsas.",
      ],
      mode: "simulation",
    };
  }
}
