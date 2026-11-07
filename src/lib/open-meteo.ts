/** Public Open-Meteo daily forecast, validated before displaying. */
export interface WeatherDay {
  date: string;
  minimum: number;
  maximum: number;
  rainProbability?: number;
}

export const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?' +
  'latitude=18.4861&longitude=-69.9312' +
  '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  '&timezone=America%2FSanto_Domingo&forecast_days=7';

export function parseWeatherForecast(input: unknown): WeatherDay[] {
  if (!input || typeof input !== 'object' || !('daily' in input)) {
    throw new TypeError('La API meteorológica no devolvió un pronóstico válido.');
  }
  const daily = (input as { daily?: unknown }).daily;
  if (!daily || typeof daily !== 'object') throw new TypeError('Faltan los datos diarios.');
  const raw = daily as Record<string, unknown>;
  const dates = raw.time;
  const minimums = raw.temperature_2m_min;
  const maximums = raw.temperature_2m_max;
  const rain = raw.precipitation_probability_max;

  if (!Array.isArray(dates) || !Array.isArray(minimums) || !Array.isArray(maximums) ||
      dates.length !== 7 || minimums.length !== 7 || maximums.length !== 7 ||
      (rain !== undefined && (!Array.isArray(rain) || rain.length !== 7))) {
    throw new TypeError('Open-Meteo no proporcionó siete días completos.');
  }

  const seen = new Set<string>();
  return dates.map((date: unknown, i: number): WeatherDay => {
    const minimum: unknown = minimums[i];
    const maximum: unknown = maximums[i];
    const probability: unknown = Array.isArray(rain) ? rain[i] : undefined;
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        Number.isNaN(Date.parse(date + 'T00:00:00Z')) || seen.has(date) ||
        (i > 0 && date <= dates[i - 1]) ||
        typeof minimum !== 'number' || !Number.isFinite(minimum) ||
        typeof maximum !== 'number' || !Number.isFinite(maximum) ||
        minimum < -100 || maximum > 80 || minimum > maximum ||
        (probability != null && (
          typeof probability !== 'number' || !Number.isFinite(probability) ||
          probability < 0 || probability > 100
        ))) {
      throw new TypeError('Los valores del pronóstico están incompletos o fuera de rango.');
    }
    seen.add(date);
    return {
      date,
      minimum,
      maximum,
      ...(probability == null ? {} : { rainProbability: probability }),
    };
  });
}
