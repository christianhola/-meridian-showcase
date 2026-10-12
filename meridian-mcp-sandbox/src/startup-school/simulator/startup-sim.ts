/** Meridian Startup School — Traction Simulator. Determinista y sin red. */
export interface SimulationInput {
  visitors: number;
  activationRate: number;
  retentionRate: number;
  conversionRate: number;
  months?: number;
}

export interface MonthlyProjection {
  month: number;
  visitors: number;
  activated: number;
  retained: number;
  paying: number;
  revenue: number;
}

export interface SimulationResult {
  assumptions: SimulationInput;
  projection: MonthlyProjection[];
  totals: { paying: number; revenue: number };
  warnings: string[];
}

const ratio = (value: number): number => Math.max(0, Math.min(1, value));

export function simulateTraction(input: SimulationInput): SimulationResult {
  const months = Math.max(1, Math.min(24, Math.floor(input.months ?? 6)));
  const assumptions = {
    visitors: Math.max(0, Math.floor(input.visitors)),
    activationRate: ratio(input.activationRate),
    retentionRate: ratio(input.retentionRate),
    conversionRate: ratio(input.conversionRate),
    months,
  };
  const projection: MonthlyProjection[] = [];
  for (let month = 1; month <= months; month += 1) {
    const visitors = Math.round(assumptions.visitors * (1 + (month - 1) * 0.12));
    const activated = Math.round(visitors * assumptions.activationRate);
    const retained = Math.round(activated * assumptions.retentionRate);
    const paying = Math.round(retained * assumptions.conversionRate);
    projection.push({ month, visitors, activated, retained, paying, revenue: paying * 49 });
  }
  const warnings: string[] = [];
  if (assumptions.activationRate < 0.2) warnings.push("Activation baja: revisa onboarding y promesa de valor.");
  if (assumptions.retentionRate < 0.3) warnings.push("Retención baja: valida que el producto resuelva un problema recurrente.");
  if (assumptions.conversionRate < 0.03) warnings.push("Conversión baja: prueba disposición a pagar antes de escalar adquisición.");
  return {
    assumptions,
    projection,
    totals: {
      paying: projection.reduce((sum, row) => sum + row.paying, 0),
      revenue: projection.reduce((sum, row) => sum + row.revenue, 0),
    },
    warnings,
  };
}
