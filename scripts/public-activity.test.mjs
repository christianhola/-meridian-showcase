import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregatePublicEvents, parsePublicMetrics } from '../src/lib/public-activity.ts';

const now = new Date('2026-11-07T16:00:00.000Z');
test('cuenta eventos por día en UTC sin duplicar IDs', () => {
  const actual = aggregatePublicEvents([
    { id: '1', created_at: '2026-11-07T02:00:00Z' },
    { id: '1', created_at: '2026-11-07T02:00:00Z' },
    { id: '2', created_at: '2026-11-06T23:59:59Z' },
    { id: '3', created_at: '2026-10-31T23:59:59Z' },
    { id: '4', created_at: 'not-a-date' },
    { id: '5', created_at: '2026-11-08T00:00:00Z' },
  ], now);
  assert.equal(actual.length, 7);
  assert.deepEqual(actual.slice(-2), [
    { date: '2026-11-06', events: 1 },
    { date: '2026-11-07', events: 1 },
  ]);
  assert.equal(actual.reduce((sum, item) => sum + item.events, 0), 2);
});
test('falla al recibir una respuesta inválida: no inventa eventos', () => {
  assert.throws(() => aggregatePublicEvents({ error: 'rate limited' }, now), TypeError);
  assert.throws(() => aggregatePublicEvents([], now, 0), RangeError);
  assert.throws(() => parsePublicMetrics(null, now), TypeError);
});
test('admite búsquedas web únicamente cuando la API contiene conteos verificables', () => {
  const days = Array.from({ length: 7 }, (_, index) => ({
    date: new Date(Date.UTC(2026, 10, index + 1)).toISOString().slice(0, 10),
    events: index,
    ...(index === 5 ? { webSearches: 3 } : {}),
  }));
  const actual = parsePublicMetrics({ days }, now);
  assert.equal(actual.length, 7);
  assert.equal(actual[5].webSearches, 3);
  assert.equal(actual[0].webSearches, undefined);
});

test('rechaza métricas negativas, días incompletos o respuestas malformadas', () => {
  assert.throws(() => parsePublicMetrics({ days: [
    { date: '2026-11-07', events: -7, webSearches: 2 },
    { date: '2026-11-06', events: 1, webSearches: -1 },
  ] }, now), TypeError);
  assert.throws(() => parsePublicMetrics({ days: [] }, now), TypeError);
});
