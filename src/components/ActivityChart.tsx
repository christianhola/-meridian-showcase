import { useCallback, useEffect, useMemo, useState } from 'react';
import { ExternalLink, RefreshCw, TrendingUp } from 'lucide-react';
import { aggregatePublicEvents, parsePublicMetrics, type DailyActivity } from '../lib/public-activity';
import './activity-chart.css';

const REPOSITORY = 'https://github.com/christianhola/-meridian-showcase';
const EVENTS_API = 'https://api.github.com/repos/christianhola/-meridian-showcase/events?per_page=100';
const REFRESH_MS = 15 * 60 * 1000;
const metricEndpoint = (import.meta.env.VITE_MERIDIAN_PUBLIC_METRICS_URL || '').trim();

type Series = 'events' | 'webSearches';
type ActivityState =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; days: DailyActivity[]; updatedAt: Date; limited: boolean; source: 'github' | 'service' };

function dayLabel(date: string): string {
  return new Intl.DateTimeFormat('es-DO', { weekday: 'short', timeZone: 'UTC' })
    .format(new Date(date + 'T12:00:00.000Z')).replace('.', '');
}

async function loadActivity(signal: AbortSignal): Promise<Extract<ActivityState, { state: 'ready' }>> {
  if (metricEndpoint && !metricEndpoint.startsWith('https://')) {
    throw new Error('La URL del servicio de métricas debe utilizar HTTPS.');
  }
  const response = await fetch(metricEndpoint || EVENTS_API, {
    signal,
    headers: { Accept: 'application/json' },
    credentials: 'omit',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(response.status === 403 || response.status === 429
      ? 'La fuente limitó temporalmente las consultas. Intenta actualizar más tarde.'
      : 'No fue posible consultar la actividad real.');
  }
  const payload: unknown = await response.json();
  const days = metricEndpoint ? parsePublicMetrics(payload) : aggregatePublicEvents(payload);
  return {
    state: 'ready',
    days,
    updatedAt: new Date(),
    source: metricEndpoint ? 'service' : 'github',
    limited: !metricEndpoint && Array.isArray(payload) && payload.length >= 100,
  };
}

export function ActivityChart() {
  const [activity, setActivity] = useState<ActivityState>({ state: 'loading' });
  const [series, setSeries] = useState<Series>('events');
  const [selected, setSelected] = useState<number | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let alive = true;
    let controller: AbortController | undefined;
    const refresh = async () => {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      try {
        const result = await loadActivity(request.signal);
        if (alive && !request.signal.aborted) setActivity(result);
      } catch (error) {
        if (alive && !request.signal.aborted) {
          setActivity({ state: 'error', message: error instanceof Error ? error.message : 'No hay datos disponibles.' });
        }
      }
    };
    void refresh();
    const interval = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, REFRESH_MS);
    const onVisibility = () => { if (!document.hidden) void refresh(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      alive = false;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [retry]);

  const days = activity.state === 'ready' ? activity.days : [];
  const hasSearches = days.length === 7 && days.every((day) => day.webSearches !== undefined);
  const currentSeries: Series = hasSearches ? series : 'events';
  const title = currentSeries === 'events' ? 'Eventos diarios' : 'Búsquedas web diarias';
  const values = useMemo(() => days.map((day) => day[currentSeries] ?? 0), [days, currentSeries]);
  const largest = Math.max(1, ...values);
  const total = values.reduce((sum, value) => sum + value, 0);
  const onRetry = useCallback(() => { setActivity({ state: 'loading' }); setRetry((count) => count + 1); }, []);

  return (
    <section className="activity-card" aria-label="Actividad real de Meridian">
      <header className="activity-heading">
        <div>
          <div className="activity-eyebrow">MERIDIAN / ACTIVITY</div>
          <h2>Actividad diaria</h2>
          <p>Últimos siete días · UTC</p>
        </div>
        <button type="button" className="activity-refresh" onClick={onRetry} aria-label="Actualizar actividad" title="Actualizar">
          <RefreshCw size={17} />
        </button>
      </header>
      {hasSearches && (
        <div className="activity-tabs" role="group" aria-label="Tipo de actividad">
          <button type="button" aria-pressed={currentSeries === 'events'} onClick={() => { setSeries('events'); setSelected(null); }}>Eventos</button>
          <button type="button" aria-pressed={currentSeries === 'webSearches'} onClick={() => { setSeries('webSearches'); setSelected(null); }}>Búsquedas web</button>
        </div>
      )}
      {activity.state === 'loading' ? (
        <div className="activity-state" role="status">Consultando actividad verificada…</div>
      ) : activity.state === 'error' ? (
        <div className="activity-state activity-state--error" role="alert">
          <p>{activity.message}</p>
          <button type="button" onClick={onRetry}>Reintentar</button>
        </div>
      ) : (
        <>
          <div className="activity-plot-wrap">
            <div className="activity-chart-info" aria-live="polite">
              <strong>{selected === null ? total : values[selected]}</strong>
              <span>{selected === null ? title + ' · total' : days[selected].date + ' · ' + title.toLowerCase()}</span>
            </div>
            <svg className="activity-plot" viewBox="0 0 720 236" role="img" aria-label={title + ': ' + days.map((day, i) => day.date + ': ' + values[i]).join(', ')}>
              {[0, 1, 2, 3].map((n) => <line key={n} x1="32" x2="702" y1={26 + n * 52} y2={26 + n * 52} className="activity-grid" />)}
              {days.map((day, i) => {
                const x = 47 + i * 95;
                const height = values[i] === 0 ? 0 : Math.max(4, (values[i] / largest) * 158);
                return (
                  <g key={day.date}>
                    <rect
                      x={x} y={183 - height} width="60" height={height} rx="7"
                      className="activity-bar"
                      aria-label={day.date + ': ' + values[i]}
                      tabIndex={0}
                      onMouseEnter={() => setSelected(i)}
                      onMouseLeave={() => setSelected(null)}
                      onFocus={() => setSelected(i)}
                      onBlur={() => setSelected(null)}
                    />
                    <text x={x + 30} y="217" textAnchor="middle" className="activity-axis">{dayLabel(day.date)}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <footer className="activity-footer">
            <div className="activity-total"><TrendingUp size={16} aria-hidden="true" /><span>{total} {currentSeries === 'events' ? 'eventos registrados' : 'búsquedas registradas'}</span></div>
            <p>{activity.limited ? 'GitHub solo devolvió los 100 eventos más recientes; el historial mostrado puede ser parcial.' : activity.source === 'github' ? 'Fuente: eventos públicos de GitHub.' : 'Fuente: métricas públicas agregadas del servidor.'}</p>
            <div className="activity-meta">
              <span>Actualizado {activity.updatedAt.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })}</span>
              <a href={REPOSITORY} target="_blank" rel="noopener noreferrer">Repositorio <ExternalLink size={13} aria-hidden="true" /></a>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
