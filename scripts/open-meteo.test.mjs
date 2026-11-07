import test from 'node:test';
import assert from 'node:assert/strict';
import { parseWeatherForecast, WEATHER_API_URL } from '../src/lib/open-meteo.ts';

function sample() {
  return {
    daily: {
      time: ['2026-11-07', '2026-11-08', '2026-11-09', '2026-11-10',
        '2026-11-11', '2026-11-12', '2026-11-13'],
      temperature_2m_min: [22, 22.4, 23, 23, 21, 24, 23],
      temperature_2m_max: [30, 31, 29, 31, 32, 30, 31],
      precipitation_probability_max: [20, 40, 0, 25, 60, 80, 5],
    },
  };
}

test('Open-Meteo utiliza HTTPS, sin API key y con zona horaria explícita', () => {
  const url = new URL(WEATHER_API_URL);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'api.open-meteo.com');
  assert.equal(url.searchParams.get('forecast_days'), '7');
  assert.equal(url.searchParams.get('timezone'), 'America/Santo_Domingo');
  assert.equal(url.searchParams.has('apikey'), false);
});

test('presenta mínimas y máximas reales sin inventar ni redondear los valores', () => {
  const forecast = parseWeatherForecast(sample());
  assert.equal(forecast.length, 7);
  assert.deepEqual(forecast[1], {
    date: '2026-11-08',
    minimum: 22.4,
    maximum: 31,
    rainProbability: 40,
  });
});

test('acepta probabilidad de precipitación desconocida sin inventar un cero', () => {
  const input = sample();
  input.daily.precipitation_probability_max[1] = null;
  const forecast = parseWeatherForecast(input);
  assert.equal(forecast[1].rainProbability, undefined);
});

test('rechaza respuestas incompletas, duplicadas y con valores no físicos', () => {
  assert.throws(() => parseWeatherForecast({}), TypeError);
  const missing = sample();
  missing.daily.time.pop();
  assert.throws(() => parseWeatherForecast(missing), TypeError);
  const duplicate = sample();
  duplicate.daily.time[2] = duplicate.daily.time[1];
  assert.throws(() => parseWeatherForecast(duplicate), TypeError);
  const reversed = sample();
  reversed.daily.temperature_2m_min[0] = 38;
  assert.throws(() => parseWeatherForecast(reversed), TypeError);
  const invalid = sample();
  invalid.daily.time[0] = '2026-02-30';
  assert.throws(() => parseWeatherForecast(invalid), TypeError);
  const badRain = sample();
  badRain.daily.precipitation_probability_max[0] = 110;
  assert.throws(() => parseWeatherForecast(badRain), TypeError);
});
