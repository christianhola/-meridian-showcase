export type WindReading = {
  dateTime: string;
  time: string;
  windSpeed: number;
  gustSpeed: number;
  gustExtra: number;
};

type RiskLevel = "low" | "moderate" | "strong";

/** Pure parsing boundary: no malformed third-party data reaches the chart. */
export function parseWindForecast(input: unknown): WindReading[] {
  if (!input || typeof input !== "object" || !("hourly" in input)) {
    throw new TypeError("Open-Meteo devolvió un formato inesperado.");
  }

  const response = input as {
    hourly?: {
      time?: unknown;
      wind_speed_10m?: unknown;
      wind_gusts_10m?: unknown;
    };
    hourly_units?: { wind_speed_10m?: string; wind_gusts_10m?: string };
  };

  const hours = response.hourly?.time;
  const speeds = response.hourly?.wind_speed_10m;
  const gusts = response.hourly?.wind_gusts_10m;

  if (!Array.isArray(hours) || !Array.isArray(speeds) || !Array.isArray(gusts)) {
    throw new TypeError("Faltan las series horarias de viento.");
  }
  if (hours.length < 7 || hours.length !== speeds.length || hours.length !== gusts.length) {
    throw new TypeError("La respuesta no incluye siete horas completas.");
  }
  const units = response.hourly_units;
  if (
    (units?.wind_speed_10m && units.wind_speed_10m !== "km/h") ||
    (units?.wind_gusts_10m && units.wind_gusts_10m !== "km/h")
  ) {
    throw new TypeError("Las velocidades no están expresadas en km/h.");
  }

  return hours.slice(0, 7).map((dateTime: unknown, index: number) => {
    const windSpeed: unknown = speeds[index];
    const gustSpeed: unknown = gusts[index];
    if (
      typeof dateTime !== "string" ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateTime) ||
      Number.isNaN(Date.parse(dateTime.slice(0, 10) + "T00:00:00Z")) ||
      new Date(dateTime.slice(0, 10) + "T00:00:00Z").toISOString().slice(0, 10) !== dateTime.slice(0, 10) ||
      Number(dateTime.slice(11, 13)) > 23 || Number(dateTime.slice(14, 16)) > 59 ||
      typeof windSpeed !== "number" || !Number.isFinite(windSpeed) ||
      typeof gustSpeed !== "number" || !Number.isFinite(gustSpeed) ||
      windSpeed < 0 || gustSpeed < 0 || windSpeed > 1000 || gustSpeed > 1000
    ) {
      throw new TypeError(`Dato horario no válido en el índice ${index}.`);
    }

    return {
      dateTime,
      // Open-Meteo returns local ISO timestamps when timezone=auto.
      time: dateTime.slice(11, 16),
      windSpeed,
      gustSpeed,
      gustExtra: Math.max(0, gustSpeed - windSpeed),
    };
  });
}

/** Indicative scale for visualization; NOT an official weather warning. */
export function classifyGust(maximumGust: number): RiskLevel {
  if (!Number.isFinite(maximumGust) || maximumGust < 0) {
    throw new RangeError("La intensidad de ráfaga no es válida.");
  }
  if (maximumGust >= 70) return "strong";
  if (maximumGust >= 35) return "moderate";
  return "low";
}

