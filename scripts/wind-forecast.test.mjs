import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyGust, parseWindForecast } from '../src/lib/wind-forecast.ts';

const sample = () => ({
  hourly_units: { wind_speed_10m: 'km/h', wind_gusts_10m: 'km/h' },
  hourly: {
    time: Array.from({ length: 7 }, (_, i) => `2026-11-07T${String(i + 10).padStart(2, '0')}:00`),
    wind_speed_10m: [11.2, 12, 13, 14, 15, 16, 17],
    wind_gusts_10m: [20, 22, 26, 30, 34, 36, 39],
  },
});

test('pronóstico de siete horas: sin redondeos ni cifras falsas', () => {
  const values = parseWindForecast(sample());
  assert.equal(values.length, 7);
  assert.deepEqual(values[0], {dateTime:'2026-11-07T10:00',time:'10:00',windSpeed:11.2,gustSpeed:20,gustExtra:8.8});
});

test('rechaza siete horas incompletas', () => {
  const data=sample();
  data.hourly.time.pop();
  assert.throws(()=>parseWindForecast(data), TypeError);
});

test('rechaza unidades incorrectas y datos no numéricos', () => {
  const mph=sample(); mph.hourly_units.wind_speed_10m='mph';
  assert.throws(()=>parseWindForecast(mph), TypeError);
  const nonfinite=sample(); nonfinite.hourly.wind_gusts_10m[0]=Number.NaN;
  assert.throws(()=>parseWindForecast(nonfinite), TypeError);
});

test('incremento de ráfaga no negativo, conserva ráfaga original', () => {
  const data=sample();data.hourly.wind_gusts_10m[0]=5;
  const point=parseWindForecast(data)[0];
  assert.equal(point.gustExtra,0);
  assert.equal(point.gustSpeed,5);
});

test('umbrales reproducibles e información no oficial', () => {
  assert.equal(classifyGust(34.9),'low');
  assert.equal(classifyGust(35),'moderate');
  assert.equal(classifyGust(69.9),'moderate');
  assert.equal(classifyGust(70),'strong');
  assert.throws(()=>classifyGust(Number.NaN),RangeError);
});

test('descarta calendarios imposibles y rangos fuera de límites', () => {
  const bad=sample(); bad.hourly.time[0]='2026-02-30T10:00';
  assert.throws(()=>parseWindForecast(bad),TypeError);
  const tooHigh=sample(); tooHigh.hourly.wind_speed_10m[0]=Infinity;
  assert.throws(()=>parseWindForecast(tooHigh),TypeError);
});
