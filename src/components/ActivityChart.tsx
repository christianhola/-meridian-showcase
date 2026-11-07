import { useCallback, useEffect, useState } from 'react';
import { CloudSun, ExternalLink, RefreshCw, TrendingUp } from 'lucide-react';
import { aggregatePublicEvents, parsePublicMetrics, type DailyActivity } from '../lib/public-activity';
import { parseWeatherForecast, WEATHER_API_URL, type WeatherDay } from '../lib/open-meteo';
import './activity-chart.css';

const REPOSITORY = 'https://github.com/christianhola/-meridian-showcase';
const EVENTS_API = 'https://api.github.com/repos/christianhola/-meridian-showcase/events?per_page=100';
const REFRESH_MS = 15 * 60 * 1000;
const ROTATE_MS = 3_200;
const metricEndpoint = (import.meta.env.VITE_MERIDIAN_PUBLIC_METRICS_URL || '').trim();

type Series = 'events' | 'webSearches' | 'weather';
type ActivityState =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; days: DailyActivity[]; updatedAt: Date; limited: boolean; source: 'github' | 'service' };
type WeatherState =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; days: WeatherDay[]; updatedAt: Date };

interface PlotPoint {
  date: string;
  value: number;
  minimum?: number;
  rainProbability?: number;
}

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
      ? 'GitHub ha limitado temporalmente las consultas. Intenta actualizar más tarde.'
      : 'No fue posible consultar los eventos reales.');
  }
  const payload: unknown = await response.json();
  return {
    state: 'ready',
    days: metricEndpoint ? parsePublicMetrics(payload) : aggregatePublicEvents(payload),
    updatedAt: new Date(),
    source: metricEndpoint ? 'service' : 'github',
    limited: !metricEndpoint && Array.isArray(payload) && payload.length >= 100,
  };
}

async function loadWeather(signal: AbortSignal): Promise<Extract<WeatherState, { state: 'ready' }>> {
  const response = await fetch(WEATHER_API_URL, {
    signal,
    headers: { Accept: 'application/json' },
    credentials: 'omit',
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'Open-Meteo ha limitado temporalmente las consultas.'
      : 'No fue posible consultar el pronóstico real.');
  }
  const payload: unknown = await response.json();
  return { state: 'ready', days: parseWeatherForecast(payload), updatedAt: new Date() };
}

function valueLabel(value: number, series: Series): string {
  return series === 'weather' ? value.toLocaleString('es-DO', { maximumFractionDigits: 1 }) + ' °C' : String(value);
}

function ActivityBars({
  points,
  series,
  selected,
  onSelect,
}: {
  points: PlotPoint[];
  series: Series;
  selected: number | null;
  onSelect: (index: number | null) => void;
}) {
  const last = Math.max(1, ...points.map((item) => Math.max(0, item.value)));
  const baseline = 185;
  const heightMax = 150;
  const active = selected !== null && points[selected] ? points[selected] : null;

  return (
    <div className="activity-plot-wrap">
      <svg
        className="activity-plot"
        viewBox="0 0 720 230"
        role="img"
        aria-label={(series === 'weather' ? 'Temperaturas máximas previstas: ' : 'Actividad diaria: ') +
          points.map((item) => item.date + ' ' + valueLabel(item.value, series)).join(', ')}
      >
        {[0, 1, 2, 3].map((n) => (
          <line key={n} x1="27" x2="697" y1={35 + n * 50} y2={35 + n * 50} className="activity-grid" />
        ))}
        {points.map((point, index) => {
          const x = 46 + 95 * index;
          const height = Math.max(0, point.value) / last * heightMax;
          const base = series === 'weather' && typeof point.minimum === 'number'
            ? Math.min(height, Math.max(0, point.minimum) / last * heightMax)
            : height;
          const top = Math.max(0, height - base);
          const isActive = selected === index;

          return (
            <g key={point.date} className={isActive ? 'activity-column is-active' : 'activity-column'}>
              {series === 'weather' ? (
                <>
                  <rect x={x} y={baseline - base} width="60" height={base}
                    rx="5" className="activity-bar activity-bar--minimum" />
                  <rect x={x} y={baseline - height} width="60" height={top}
                    rx="6" className="activity-bar activity-bar--maximum" />
                </>
              ) : (
                <rect x={x} y={baseline - height} width="60" height={height}
                  rx="7" className="activity-bar activity-bar--events" />
              )}
              <rect
                x={x - 12} y="17" width="84" height="200" rx="9"
                className="activity-hit"
                role="button"
                tabIndex={0}
                aria-label={point.date + ': ' + valueLabel(point.value, series)}
                aria-describedby="meridian-activity-tooltip"
                onPointerEnter={() => onSelect(index)}
                onPointerMove={() => onSelect(index)}
                onPointerDown={() => onSelect(index)}
                onPointerLeave={() => onSelect(null)}
                onFocus={() => onSelect(index)}
                onBlur={() => onSelect(null)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(index);
                  }
                }}
              />
              <text x={x + 30} y="218" textAnchor="middle" className="activity-axis">{dayLabel(point.date)}</text>
            </g>
          );
        })}
      </svg>
      {active && selected !== null && (
        <div
          id="meridian-activity-tooltip"
          className="activity-tooltip"
          role="tooltip"
          style={{ left: `${Math.min(83, Math.max(17, (76 + 95 * selected) / 720 * 100))}%` }}
        >
          <strong>{active.date}</strong>
          {series === 'weather' ? (
            <>
              <span>Máxima: {valueLabel(active.value, series)}</span>
              {typeof active.minimum === 'number' && <span>Mínima: {valueLabel(active.minimum, series)}</span>}
              {typeof active.rainProbability === 'number' && <span>Lluvia: {active.rainProbability}% de probabilidad</span>}
            </>
          ) : (
            <span>{valueLabel(active.value, series)} {series === 'events' ? 'eventos públicos' : 'búsquedas registradas'}</span>
          )}
        </div>
      )}
    </div>
  );
}

export function ActivityChart() {
  const [activity, setActivity] = useState<ActivityState>({ state: 'loading' });
  const [weather, setWeather] = useState<WeatherState>({ state: 'loading' });
  const [series, setSeries] = useState<Series>('events');
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let alive = true;
    let controller: AbortController | undefined;
    const refresh = () => {
      controller?.abort();
      const request = new AbortController();
      controller = request;
      void loadActivity(request.signal).then((value) => {
        if (alive && !request.signal.aborted) setActivity(value);
      }).catch((error: unknown) => {
        if (alive && !request.signal.aborted) {
          setActivity({ state: 'error', message: error instanceof Error ? error.message : 'No hay datos de eventos.' });
        }
      });
      void loadWeather(request.signal).then((value) => {
        if (alive && !request.signal.aborted) setWeather(value);
      }).catch((error: unknown) => {
        if (alive && !request.signal.aborted) {
          setWeather({ state: 'error', message: error instanceof Error ? error.message : 'No hay datos meteorológicos.' });
        }
      });
    };
    refresh();
    const interval = window.setInterval(() => {
      if (!document.hidden) refresh();
    }, REFRESH_MS);
    const onVisibility = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      alive = false;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [retry]);

  useEffect(() => {
    // Motion cycles through real bars; no metric is randomly modified.
    const interval = window.setInterval(() => {
      if (!document.hidden) setAutoIndex((value) => (value + 1) % 7);
    }, ROTATE_MS);
    return () => window.clearInterval(interval);
  }, []);

  const hasSearches = activity.state === 'ready' &&
    activity.days.length === 7 && activity.days.every((day) => day.webSearches !== undefined);
  const current: Series = series === 'webSearches' && !hasSearches ? 'events' : series;
  const source = current === 'weather' ? weather : activity;
  const points: PlotPoint[] = current === 'weather'
    ? weather.state === 'ready'
      ? weather.days.map((day) => ({
          date: day.date, value: day.maximum, minimum: day.minimum, rainProbability: day.rainProbability,
        }))
      : []
    : activity.state === 'ready'
      ? activity.days.map((day) => ({ date: day.date, value: day[current] ?? 0 }))
      : [];
  const ready = source.state === 'ready';
  const activeIndex = manualIndex ?? autoIndex;
  const total = points.reduce((sum, item) => sum + item.value, 0);
  const onRetry = useCallback(() => {
    setActivity({ state: 'loading' });
    setWeather({ state: 'loading' });
    setRetry((value) => value + 1);
  }, []);
  const onSwitch = (view: Series) => {
    setSeries(view);
    setManualIndex(null);
    setAutoIndex(0);
  };

  return (
    <section className="activity-card" aria-label="Datos reales de Meridian y Open-Meteo">
      <header className="activity-heading">
        <div>
          <div className="activity-eyebrow">MERIDIAN / LIVE DATA</div>
          <h2>Actividad conectada</h2>
          <p>{current === 'weather' ? 'Pronóstico · Santo Domingo · próximos 7 días' : 'Eventos del repositorio · últimos 7 días UTC'}</p>
        </div>
        <button type="button" className="activity-refresh" onClick={onRetry}
          aria-label="Actualizar datos reales" title="Actualizar datos reales">
          <RefreshCw size={17} />
        </button>
      </header>
      <div className="activity-tabs" role="group" aria-label="Fuente de datos">
        <button type="button" aria-pressed={current === 'events'} onClick={() => onSwitch('events')}>Eventos</button>
        {hasSearches && (
          <button type="button" aria-pressed={current === 'webSearches'}
            onClick={() => onSwitch('webSearches')}>Búsquedas web</button>
        )}
        <button type="button" aria-pressed={current === 'weather'} onClick={() => onSwitch('weather')}>
          <CloudSun size={15} aria-hidden="true" /> Clima
        </button>
      </div>

      {source.state === 'loading' ? (
        <div className="activity-state" role="status">Consultando la fuente de datos…</div>
      ) : source.state === 'error' ? (
        <div className="activity-state activity-state--error" role="alert">
          <p>{source.message}</p>
          <button type="button" onClick={onRetry}>Volver a consultar</button>
        </div>
      ) : (
        <>
          <div className="activity-chart-info">
            <strong>{current === 'weather'
              ? 'Santo Domingo'
              : total.toLocaleString('es-DO') + (current === 'events' ? ' eventos públicos' : ' búsquedas')}
            </strong>
            <span>{current === 'weather'
              ? 'Temperaturas mínimas y máximas previstas (°C)'
              : 'Registros verificables · no son visitas a la web'}</span>
          </div>
          <ActivityBars points={points} series={current} selected={ready ? activeIndex : null}
            onSelect={setManualIndex} />
          <footer className="activity-footer">
            <div className="activity-total">
              {current === 'weather'
                ? <CloudSun size={16} aria-hidden="true" />
                : <TrendingUp size={16} aria-hidden="true" />}
              <span>{current === 'weather' ? 'Datos meteorológicos de Open-Meteo' : 'Actividad pública de GitHub'}</span>
            </div>
            <p>{current === 'weather'
              ? 'Pronóstico basado en modelos meteorológicos; no son mediciones observadas.'
              : activity.state === 'ready' && activity.limited
                ? 'GitHub solo devolvió sus 100 eventos más recientes; el historial puede ser parcial.'
                : 'Los eventos representan actividad pública del repositorio.'}</p>
            <div className="activity-meta">
              <span>Actualizado {source.updatedAt.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })}</span>
              <a href={current === 'weather' ? 'https://open-meteo.com/en/docs' : REPOSITORY}
                target="_blank" rel="noopener noreferrer">
                Fuente <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
