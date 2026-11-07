export interface PublicEvent {
  id?: string;
  created_at?: string;
  type?: string;
}

export interface DailyActivity {
  date: string;
  events: number;
  webSearches?: number;
}

const DAY_MS = 86_400_000;

export function utcDay(value: Date): string {
  return value.toISOString().slice(0, 10);
}

/** Count only verifiable public events; never fabricate missing data. */
export function aggregatePublicEvents(input: unknown, now: Date = new Date(), days = 7): DailyActivity[] {
  if (!Array.isArray(input)) throw new TypeError('La API devolvió un formato inesperado.');
  if (!Number.isInteger(days) || days < 1 || days > 31) throw new RangeError('days debe estar entre 1 y 31');
  if (Number.isNaN(now.getTime())) throw new RangeError('Fecha actual inválida');
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const start = end - (days - 1) * DAY_MS;
  const counts = new Map<string, number>();
  const seen = new Set<string>();

  for (const item of input as PublicEvent[]) {
    if (!item || typeof item.id !== 'string' || !item.id || typeof item.created_at !== 'string') continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    const timestamp = Date.parse(item.created_at);
    if (!Number.isFinite(timestamp) || timestamp < start || timestamp >= end + DAY_MS) continue;
    const date = utcDay(new Date(timestamp));
    counts.set(date, (counts.get(date) ?? 0) + 1);
  }

  return Array.from({ length: days }, (_, index) => {
    const date = utcDay(new Date(start + index * DAY_MS));
    return { date, events: counts.get(date) ?? 0 };
  });
}

/** Validate a publicly accessible, server-aggregated metrics contract. */
export function parsePublicMetrics(input: unknown, now: Date = new Date()): DailyActivity[] {
  if (!input || typeof input !== 'object' || !('days' in input) || !Array.isArray(input.days)) {
    throw new TypeError('El endpoint público no devolvió la serie diaria esperada.');
  }
  const byDay = new Map<string, DailyActivity>();
  for (const item of input.days) {
    if (!item || typeof item !== 'object') continue;
    const { date, events, webSearches } = item as Record<string, unknown>;
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    if (!Number.isSafeInteger(events) || (events as number) < 0) continue;
    if (webSearches !== undefined && (!Number.isSafeInteger(webSearches) || (webSearches as number) < 0)) continue;
    byDay.set(date, { date, events: events as number, ...(webSearches === undefined ? {} : { webSearches: webSearches as number }) });
  }
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Array.from({ length: 7 }, (_, index) => {
    const date = utcDay(new Date(today - (6 - index) * DAY_MS));
    const point = byDay.get(date);
    if (!point) throw new TypeError('La API no proporcionó datos verificados para ' + date + '.');
    return point;
  });
}
