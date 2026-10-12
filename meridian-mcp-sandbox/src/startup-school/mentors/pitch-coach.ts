/**
 * Meridian Startup School — Pitch Coach.
 *
 * Funciona sin claves mediante reglas locales y devuelve una evaluación tipada.
 * Un adaptador LLM puede consumir el mismo contrato sin cambiar el dominio.
 */
export interface StartupIdea {
  name: string;
  problem: string;
  solution: string;
  targetAudience: string;
  businessModel?: string;
  evidence?: string[];
}

export interface ScoreCard {
  problemClarity: number;
  customerSpecificity: number;
  solutionFit: number;
  evidence: number;
  monetization: number;
  total: number;
}

export interface PitchEvaluation {
  bot: "meridian-pitch-coach";
  idea: string;
  score: ScoreCard;
  strengths: string[];
  risks: string[];
  nextActions: string[];
  mode: "simulation" | "provider-ready";
}

const clamp = (value: number): number => Math.max(0, Math.min(5, value));
const lengthScore = (value: string, strongAt: number): number => clamp(Math.round((value.trim().length / strongAt) * 5));

export class PitchCoachBot {
  public evaluateIdea(idea: StartupIdea): PitchEvaluation {
    const problemClarity = lengthScore(idea.problem, 120);
    const customerSpecificity = lengthScore(idea.targetAudience, 70);
    const solutionFit = lengthScore(idea.solution, 120);
    const evidence = clamp((idea.evidence?.length ?? 0) + (idea.evidence?.some((item) => item.length > 20) ? 1 : 0));
    const monetization = lengthScore(idea.businessModel ?? "", 80);
    const score: ScoreCard = {
      problemClarity,
      customerSpecificity,
      solutionFit,
      evidence,
      monetization,
      total: problemClarity + customerSpecificity + solutionFit + evidence + monetization,
    };

    const strengths: string[] = [];
    if (problemClarity >= 4) strengths.push("El problema tiene suficiente detalle para iniciar entrevistas.");
    if (customerSpecificity >= 4) strengths.push("El público objetivo está definido con señales útiles.");
    if (solutionFit >= 4) strengths.push("La solución explica una respuesta concreta al problema.");
    if (evidence >= 3) strengths.push("Ya existe evidencia inicial para orientar la siguiente iteración.");
    if (strengths.length === 0) strengths.push("La idea tiene un punto de partida; falta convertirla en evidencia.");

    const risks: string[] = [];
    if (problemClarity < 3) risks.push("Problema demasiado abstracto: describe quién pierde tiempo, dinero o control.");
    if (customerSpecificity < 3) risks.push("Segmento amplio: elige un primer comprador y un contexto de uso.");
    if (evidence < 2) risks.push("No hay suficiente evidencia: entrevista al menos a 10 usuarios antes de construir.");
    if (monetization < 3) risks.push("Modelo de negocio débil: define quién paga, cuánto y por qué ahora.");

    return {
      bot: "meridian-pitch-coach",
      idea: idea.name,
      score,
      strengths,
      risks,
      nextActions: [
        "Escribe una hipótesis falsable de valor en una sola frase.",
        "Habla con 10 usuarios del segmento elegido y registra citas textuales.",
        "Prueba una acción de compromiso antes de ampliar el producto.",
      ],
      mode: "simulation",
    };
  }
}
