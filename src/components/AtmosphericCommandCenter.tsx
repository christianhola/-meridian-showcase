"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Map as LibreMap, Marker as LibreMarker } from "maplibre-gl";
import { classifyGust, parseWindForecast, type WindReading } from "../lib/wind-forecast";
import { buildOsmEmbedUrl } from "../lib/osm-embed";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CloudLightning,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "maplibre-gl/dist/maplibre-gl.css";

/** No secrets or access tokens: both services are publicly accessible. */
const OPEN_METEO = "https://api.open-meteo.com/v1/forecast";
const MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const OPENFREE_VECTOR_SOURCE = "https://tiles.openfreemap.org/planet";
const BUILDING_LAYER_ID = "meridian-3d-buildings";
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 15_000;
const SIMULATION_MULTIPLIER = 1_000_000;

const CITIES = [
  {
    id: "la-romana",
    name: "La Romana",
    flag: "🇩🇴",
    country: "República Dominicana",
    latitude: 18.4273,
    longitude: -68.9728,
    bearing: -18,
  },
  {
    id: "silicon-valley",
    name: "Silicon Valley",
    flag: "🇺🇸",
    country: "Estados Unidos",
    latitude: 37.3688,
    longitude: -122.0363,
    bearing: 24,
  },
  {
    id: "reykjavik",
    name: "Reykjavík",
    flag: "🇮🇸",
    country: "Islandia",
    latitude: 64.1466,
    longitude: -21.9426,
    bearing: -28,
  },
] as const;

type City = (typeof CITIES)[number];
type CityId = City["id"];

type WindDataState =
  | { status: "loading"; cityId: CityId }
  | { status: "error"; cityId: CityId; message: string }
  | { status: "ready"; cityId: CityId; readings: WindReading[]; updatedAt: string };

function weatherUrl(city: City): string {
  const url = new URL(OPEN_METEO);
  url.searchParams.set("latitude", String(city.latitude));
  url.searchParams.set("longitude", String(city.longitude));
  url.searchParams.set("hourly", "wind_speed_10m,wind_gusts_10m");
  url.searchParams.set("forecast_hours", "7");
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("wind_speed_unit", "kmh");
  return url.toString();
}

const fullFormat = new Intl.NumberFormat("es-DO", { maximumFractionDigits: 1 });
const compactFormat = new Intl.NumberFormat("es-DO", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function WindTooltip({
  active,
  payload,
  overloaded,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: WindReading }>;
  overloaded: boolean;
}) {
  const reading = payload?.[0]?.payload;
  if (!active || !reading) return null;
  const factor = overloaded ? SIMULATION_MULTIPLIER : 1;
  return (
    <div className="ma-tooltip" role="status">
      <strong>{reading.dateTime.replace("T", " · ")}</strong>
      {overloaded && <span className="ma-tooltip-warning">SIMULACIÓN ×1.000.000</span>}
      <span>Viento: {fullFormat.format(reading.windSpeed * factor)} km/h</span>
      <span>Ráfaga: {fullFormat.format(reading.gustSpeed * factor)} km/h</span>
      {overloaded && (
        <span className="ma-tooltip-original">
          Original real: {fullFormat.format(reading.windSpeed)} / {fullFormat.format(reading.gustSpeed)} km/h
        </span>
      )}
    </div>
  );
}

export default function AtmosphericCommandCenter() {
  const [cityId, setCityId] = useState<CityId>("la-romana");
  const [overloaded, setOverloaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [weather, setWeather] = useState<WindDataState>({
    status: "loading",
    cityId: "la-romana",
  });
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const city = CITIES.find((candidate) => candidate.id === cityId) ?? CITIES[0];
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LibreMap | null>(null);
  const markerRef = useRef<LibreMarker | null>(null);
  const overloadRef = useRef(overloaded);

  useEffect(() => {
    overloadRef.current = overloaded;
  }, [overloaded]);

  // Map instance is created only once; changing the city never re-creates WebGL.
  useEffect(() => {
    let disposed = false;
    let instance: LibreMap | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let didLoad = false;

    async function createMap() {
      try {
        if (!mapContainerRef.current) return;
        const maplibregl = await import("maplibre-gl");
        if (disposed || !mapContainerRef.current) return;
        const container = mapContainerRef.current;
        const map = new maplibregl.Map({
          container,
          style: MAP_STYLE,
          center: [CITIES[0].longitude, CITIES[0].latitude],
          zoom: 15.5,
          pitch: 58,
          bearing: CITIES[0].bearing,
          canvasContextAttributes: { antialias: true },
        });
        instance = map;
        mapRef.current = map;
        markerRef.current = new maplibregl.Marker({ color: "#4567ec" })
          .setLngLat([CITIES[0].longitude, CITIES[0].latitude])
          .addTo(map);
        map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");

        map.on("error", () => {
          if (!disposed && !didLoad) {
            setMapError("La visualización 3D no está disponible en este navegador. Se muestra OpenStreetMap 2D.");
          }
        });

        map.on("load", () => {
          if (disposed) return;
          didLoad = true;
          setMapError(null);
          try {
            // Bright is a vector basemap. Its building layer is OpenStreetMap data.
            const existingSource = map.getSource("openmaptiles")
              ? "openmaptiles"
              : map.getSource("openfreemap")
                ? "openfreemap"
                : "meridian-openfree-buildings";

            if (existingSource === "meridian-openfree-buildings") {
              map.addSource(existingSource, {
                type: "vector",
                url: OPENFREE_VECTOR_SOURCE,
              });
            }

            if (!map.getLayer(BUILDING_LAYER_ID)) {
              const labels = map.getStyle().layers?.find(
                (layer) => layer.type === "symbol",
              )?.id;
              map.addLayer(
                {
                  id: BUILDING_LAYER_ID,
                  type: "fill-extrusion",
                  source: existingSource,
                  "source-layer": "building",
                  minzoom: 15,
                  filter: ["!=", ["get", "hide_3d"], true],
                  paint: {
                    "fill-extrusion-color": overloadRef.current ? "#ff4368" : "#96a8bb",
                    "fill-extrusion-opacity": 0.78,
                    "fill-extrusion-height": [
                      "interpolate", ["linear"], ["zoom"],
                      15, 0,
                      16, ["coalesce", ["get", "render_height"], 0],
                    ],
                    "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
                  },
                },
                labels,
              );
            }
          } catch (error) {
            // A basemap can still be useful when 3D building attributes are absent.
            console.warn("La capa opcional de edificios 3D no se pudo crear:", error);
          }
          setMapReady(true);
        });

        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(() => map.resize());
          resizeObserver.observe(container);
        }
      } catch (error) {
        if (!disposed) {
          setMapError("No se pudo iniciar WebGL para el mapa 3D. Se muestra OpenStreetMap 2D.");
        }
      }
    }

    void createMap();
    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      markerRef.current?.remove();
      markerRef.current = null;
      instance?.stop();
      instance?.remove(); // Releases listeners, map resources and the WebGL canvas.
      if (mapRef.current === instance) mapRef.current = null;
    };
  }, []);

  // One map, three cities: native camera animation and reusable marker.
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;
    const camera = {
      center: [city.longitude, city.latitude] as [number, number],
      zoom: 15.5,
      pitch: 60,
      bearing: city.bearing,
    };
    markerRef.current?.setLngLat(camera.center);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      map.jumpTo(camera);
    } else {
      map.flyTo({ ...camera, speed: 0.85, curve: 1.35, essential: false });
    }
  }, [city, mapReady]);

  // Change 3D building colors without reloading the style or interrupting flyTo.
  useEffect(() => {
    const map = mapRef.current;
    if (mapReady && map?.getLayer(BUILDING_LAYER_ID)) {
      map.setPaintProperty(
        BUILDING_LAYER_ID,
        "fill-extrusion-color",
        overloaded ? "#ff4368" : "#96a8bb",
      );
    }
  }, [overloaded, mapReady]);

  // A city change aborts the old request. Periodic refresh also aborts previous work.
  useEffect(() => {
    let alive = true;
    let pending: AbortController | null = null;

    async function refresh() {
      pending?.abort();
      const controller = new AbortController();
      pending = controller;
      setWeather({ status: "loading", cityId });
      const timeout = window.setTimeout(() => controller.abort("timeout"), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(weatherUrl(city), {
          signal: controller.signal,
          cache: "no-store",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Open-Meteo respondió ${response.status}.`);
        const payload: unknown = await response.json();
        const readings = parseWindForecast(payload);
        if (alive && pending === controller && !controller.signal.aborted) {
          setWeather({ status: "ready", cityId, readings, updatedAt: new Date().toISOString() });
        }
      } catch (error) {
        if (!alive || pending !== controller) return;
        if (controller.signal.aborted && controller.signal.reason !== "timeout") return;
        setWeather({
          status: "error",
          cityId,
          message: controller.signal.reason === "timeout"
            ? "La consulta meteorológica agotó el tiempo disponible."
            : error instanceof Error ? error.message : "No se pudo consultar Open-Meteo.",
        });
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void refresh();
    const interval = window.setInterval(() => {
      if (!document.hidden) void refresh();
    }, REFRESH_INTERVAL_MS);
    const onVisibility = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      alive = false;
      pending?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [city, cityId, reloadKey]);

  // Never display stale readings for a newly selected city.
  const validWeather = weather.cityId === cityId && weather.status === "ready" ? weather : null;
  const readings = validWeather?.readings ?? [];
  const maximumGust = Math.max(0, ...readings.map((point) => point.gustSpeed));
  const level = validWeather ? classifyGust(maximumGust) : null;
  const hasError = weather.cityId === cityId && weather.status === "error";
  const isLoading = !validWeather && !hasError;

  const chartData = useMemo(
    () => readings.map((point) => ({
      ...point,
      displayWind: point.windSpeed * (overloaded ? SIMULATION_MULTIPLIER : 1),
      displayExtra: point.gustExtra * (overloaded ? SIMULATION_MULTIPLIER : 1),
    })),
    [readings, overloaded],
  );

  const refreshNow = useCallback(() => setReloadKey((value) => value + 1), []);
  const alertLabel = level === "strong"
    ? "Ráfagas fuertes en el pronóstico"
    : level === "moderate"
      ? "Viento con ráfagas moderadas"
      : "Viento ligero en el pronóstico";

  return (
    <section className={`meridian-atmo${overloaded ? " meridian-atmo--overload" : ""}`}>
      <div className="ma-header">
        <div className="ma-heading">
          <span className="ma-eyebrow"><Activity size={13} /> MERIDIAN / ATMOSPHERIC SYSTEM</span>
          <h2>Inteligencia atmosférica</h2>
          <p>Datos meteorológicos reales + visualización geoespacial en 3D</p>
        </div>
        <div className="ma-top-actions">
          <label className="ma-city-select">
            <MapPin size={15} aria-hidden="true" />
            <span className="ma-sr-only">Seleccionar ciudad</span>
            <select
              value={cityId}
              onChange={(event) => setCityId(event.target.value as CityId)}
            >
              {CITIES.map((item) => (
                <option key={item.id} value={item.id}>{item.flag} {item.name}</option>
              ))}
            </select>
          </label>
          <button className="ma-refresh" type="button" onClick={refreshNow} aria-label="Actualizar datos">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="ma-status-row">
        <div className="ma-location"><span className="ma-dot" />{city.flag} {city.name} · {city.country}</div>
        <span className="ma-provider">Open-Meteo · OpenStreetMap · OpenFreeMap</span>
      </div>

      <div className="ma-layout">
        <div className="ma-panel ma-chart-panel">
          <div className="ma-panel-header">
            <div>
              <span className="ma-mini-label">PREVISIÓN / PRÓXIMAS 7 HORAS</span>
              <h3><Wind size={17} /> Viento y ráfagas</h3>
            </div>
            <div className="ma-unit">KM/H</div>
          </div>

          {overloaded && (
            <div className="ma-sim-banner" role="status">
              <CloudLightning size={16} />
              <span><strong>SIMULACIÓN ACTIVADA</strong> · Valores ×1.000.000; no son datos reales.</span>
            </div>
          )}

          {isLoading ? (
            <div className="ma-placeholder" role="status">
              <span className="ma-spinner" /> Consultando pronóstico de {city.name}…
            </div>
          ) : hasError ? (
            <div className="ma-placeholder ma-error" role="alert">
              <AlertTriangle size={19} />
              <p>{weather.status === "error" ? weather.message : "Error al cargar la previsión."}</p>
              <button type="button" onClick={refreshNow}>Reintentar consulta</button>
            </div>
          ) : (
            <div className="ma-chart" aria-label="Gráfico de viento previsto por hora">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart key={`${cityId}-${overloaded}`} data={chartData} margin={{ top: 14, right: 6, left: -13, bottom: 2 }}>
                  <CartesianGrid vertical={false} stroke="var(--ma-grid)" strokeDasharray="3 5" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "var(--ma-muted)", fontSize: 11 }} />
                  <YAxis
                    axisLine={false} tickLine={false} width={56}
                    tick={{ fill: "var(--ma-muted)", fontSize: 10 }}
                    tickFormatter={(number: number) => compactFormat.format(number)}
                    allowDecimals={false}
                  />
                  <Tooltip cursor={{ fill: "var(--ma-hover)" }} content={<WindTooltip overloaded={overloaded} />} />
                  <Legend verticalAlign="bottom" height={27} iconSize={9}
                    formatter={(value: string) => <span className="ma-legend-label">{value}</span>} />
                  <Bar
                    name="Viento sostenido"
                    dataKey="displayWind"
                    stackId="wind"
                    fill="var(--ma-primary)"
                    radius={[0, 0, 3, 3]}
                    maxBarSize={44}
                    isAnimationActive
                    animationDuration={overloaded ? 180 : 950}
                    animationEasing="ease-out"
                  />
                  <Bar
                    name="Incremento hasta ráfaga"
                    dataKey="displayExtra"
                    stackId="wind"
                    fill="var(--ma-secondary)"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={44}
                    isAnimationActive
                    animationDuration={overloaded ? 120 : 1250}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="ma-metrics">
            <div><span>PICO DE RÁFAGA REAL</span><strong>{validWeather ? fullFormat.format(maximumGust) : "—"} <small>km/h</small></strong></div>
            <div><span>ÚLTIMA CONSULTA</span><strong className="ma-small-value">{validWeather
              ? new Date(validWeather.updatedAt).toLocaleTimeString("es-DO", { hour: "2-digit", minute: "2-digit" })
              : "—"}</strong></div>
          </div>

          <div className={`ma-alert ma-alert--${level ?? "neutral"}`} role="status">
            {level === "strong" ? <AlertTriangle size={17} /> : <ShieldCheck size={17} />}
            <span>{validWeather ? alertLabel : "Estado meteorológico pendiente"}</span>
            <small>Indicador informativo · no es una alerta oficial</small>
          </div>

          <button
            type="button"
            className="ma-overload-button"
            aria-pressed={overloaded}
            onClick={() => setOverloaded((value) => !value)}
          >
            {overloaded ? <ShieldCheck size={17} /> : <Zap size={17} />}
            {overloaded ? "Desactivar simulación" : "Activar tormenta eléctrica · simulación"}
          </button>
        </div>

        <div className="ma-panel ma-map-panel">
          <div className="ma-panel-header">
            <div>
              <span className="ma-mini-label">OPENSTREETMAP / VECTOR 3D</span>
              <h3><MapPin size={17} /> Vista geoespacial</h3>
            </div>
            <span className="ma-unit">3D</span>
          </div>
          <div className="ma-map-shell" data-overload={String(overloaded)}>
            <div ref={mapContainerRef} className="ma-map" aria-label={`Mapa interactivo de ${city.name}`} />
            {!mapReady && !mapError && <span className="ma-map-loading">Inicializando motor cartográfico…</span>}
            {mapError && (
              <div className="ma-map-fallback" role="region" aria-label={`Mapa 2D de ${city.name}`}>
                <iframe
                  src={buildOsmEmbedUrl(city.latitude, city.longitude)}
                  title={`Mapa alternativo interactivo OpenStreetMap de ${city.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="ma-map-fallback-note" role="status">{mapError}</div>
              </div>
            )}
            <div className="ma-map-hud">
              <span>LAT {city.latitude.toFixed(4)}</span>
              <span>LON {city.longitude.toFixed(4)}</span>
              {overloaded && <strong>SIMULACIÓN CRÍTICA</strong>}
            </div>
          </div>
          <div className="ma-map-footnote">
            <span>Edificios extruidos donde OpenStreetMap dispone de alturas.</span>
            <a href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">
              Atribución <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <p className="ma-disclaimer">
        Open-Meteo entrega pronósticos numéricos, no observaciones instantáneas ni alertas oficiales.
        La sobrecarga modifica solo la visualización local; no cambia ninguna fuente externa.
        El servicio público sin clave puede estar sujeto a condiciones de uso no comercial.
      </p>

      <style>{`
        .meridian-atmo {
          --ma-bg: #ffffff;
          --ma-panel: #ffffff;
          --ma-ink: #192433;
          --ma-muted: #718094;
          --ma-line: #e6ebf2;
          --ma-grid: #e9edf4;
          --ma-hover: rgba(78, 110, 219, .075);
          --ma-primary: #4568e8;
          --ma-secondary: #7eb9dd;
          --ma-critical: #d83b62;
          color: var(--ma-ink);
          background: transparent;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .meridian-atmo * { box-sizing: border-box; }
        .ma-header, .ma-panel-header, .ma-status-row, .ma-map-footnote { display: flex; justify-content: space-between; align-items: center; gap: 14px; }
        .ma-header { margin-bottom: 17px; align-items: flex-end; flex-wrap: wrap; }
        .ma-heading h2 { margin: 7px 0 4px; font-size: clamp(25px, 3vw, 35px); letter-spacing: -.055em; font-weight: 720; }
        .ma-heading p { margin: 0; color: var(--ma-muted); font-size: 13px; }
        .ma-eyebrow, .ma-mini-label, .ma-unit, .ma-metrics span, .ma-map-hud, .ma-provider, .ma-disclaimer { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .ma-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 650; letter-spacing: .13em; color: #64768d; }
        .ma-top-actions { display: flex; align-items: center; gap: 9px; }
        .ma-city-select, .ma-refresh { min-height: 39px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; background: var(--ma-panel); border: 1px solid var(--ma-line); border-radius: 9px; color: var(--ma-ink); }
        .ma-city-select select { background: transparent; color: inherit; border: 0; outline-offset: 2px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; max-width: 195px; }
        .ma-city-select select option { color: #182236; background: #fff; }
        .ma-refresh { width: 40px; padding: 0; justify-content: center; cursor: pointer; }
        .ma-refresh:hover, .ma-city-select:focus-within { border-color: #8398eb; }
        .ma-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
        .ma-status-row { border-top: 1px solid var(--ma-line); border-bottom: 1px solid var(--ma-line); padding: 12px 1px; margin-bottom: 17px; }
        .ma-location { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; }
        .ma-dot { width: 7px; height: 7px; border-radius: 100%; background: #24a780; box-shadow: 0 0 0 3px rgba(36,167,128,.12); }
        .ma-provider { font-size: 10px; color: var(--ma-muted); }
        .ma-layout { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.12fr); gap: 23px; }
        .ma-panel { min-width: 0; background: var(--ma-panel); border: 1px solid var(--ma-line); border-radius: 12px; padding: 19px; }
        .ma-panel-header { min-height: 42px; margin-bottom: 15px; }
        .ma-mini-label { font-size: 9px; letter-spacing: .105em; color: var(--ma-muted); }
        .ma-panel-header h3 { font-size: 16px; letter-spacing: -.025em; margin: 5px 0 0; display: flex; gap: 8px; align-items: center; font-weight: 680; }
        .ma-unit { font-size: 10px; letter-spacing: .08em; color: var(--ma-muted); }
        .ma-chart { height: 282px; width: 100%; min-width: 0; }
        .ma-legend-label { font-size: 10px; color: var(--ma-muted); }
        .ma-tooltip { background: var(--ma-panel); color: var(--ma-ink); box-shadow: 0 9px 30px rgba(17,31,57,.12); border: 1px solid var(--ma-line); padding: 11px 13px; border-radius: 9px; display: grid; gap: 5px; font-family: ui-monospace,monospace; font-size: 11px; }
        .ma-tooltip strong { font-size: 11px; }
        .ma-tooltip-warning { color: var(--ma-critical); font-weight: 800; }
        .ma-tooltip-original { font-size: 10px; color: var(--ma-muted); }
        .ma-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 14px 0 15px; border-top: 1px solid var(--ma-line); }
        .ma-metrics > div { display: grid; gap: 8px; }
        .ma-metrics span { font-size: 9px; letter-spacing: .07em; color: var(--ma-muted); }
        .ma-metrics strong { font-size: 23px; letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
        .ma-metrics strong small { font-size: 11px; color: var(--ma-muted); font-weight: 500; }
        .ma-metrics .ma-small-value { font-size: 16px; }
        .ma-alert { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 11px 12px; border-radius: 8px; font-size: 11px; background: #edf8f3; color: #26765c; border: 1px solid #cfeadd; }
        .ma-alert small { margin-left: auto; font-size: 9px; opacity: .8; }
        .ma-alert--moderate { background: #fff8ec; color: #8d6221; border-color: #f0e0c2; }
        .ma-alert--strong { background: #fff0f0; color: #b23540; border-color: #f0cbd1; }
        .ma-alert--neutral { background: #f3f5f8; color: #697589; border-color: var(--ma-line); }
        .ma-overload-button { margin-top: 14px; width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px; border-radius: 9px; border: 1px solid var(--ma-line); padding: 12px; cursor: pointer; color: var(--ma-ink); font-size: 12px; font-weight: 650; background: transparent; transition: border-color .18s,background-color .18s; }
        .ma-overload-button:hover { border-color: #647ee8; background: var(--ma-hover); }
        .ma-sim-banner { display: flex; align-items: center; gap: 9px; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; border: 1px solid rgba(216,59,98,.4); color: #b42549; font-size: 11px; background: rgba(216,59,98,.06); }
        .ma-placeholder { min-height: 282px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 12px; font-size: 12px; color: var(--ma-muted); text-align: center; }
        .ma-spinner { width: 19px; height: 19px; border: 2px solid var(--ma-line); border-top-color: var(--ma-primary); border-radius: 50%; animation: ma-spin .8s linear infinite; }
        .ma-error { color: var(--ma-critical); }
        .ma-error p { margin: 0; }
        .ma-error button { color: var(--ma-ink); border: 1px solid var(--ma-line); border-radius: 7px; padding: 8px 12px; background: transparent; cursor: pointer; }
        .ma-map-shell { width: 100%; min-height: 432px; height: 432px; position: relative; isolation: isolate; overflow: hidden; border: 1px solid var(--ma-line); border-radius: 8px; background: #e9edf3; }
        .ma-map { position: absolute; inset: 0; }
        .ma-map-shell::after { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; z-index: 2; background: repeating-linear-gradient(0deg, transparent, transparent 17px, rgba(255,38,91,.08) 19px), radial-gradient(circle at 50% 50%, transparent 20%, rgba(228,28,75,.35)); transition: opacity .25s ease; }
        .ma-map-shell[data-overload="true"]::after { opacity: 1; animation: ma-pulse .7s steps(2,end) infinite; }
        .ma-map-hud { position: absolute; bottom: 14px; left: 12px; display: grid; gap: 5px; padding: 8px 10px; border-radius: 7px; background: rgba(20,29,46,.88); z-index: 3; color: #dbe7ff; font-size: 10px; pointer-events: none; }
        .ma-map-hud strong { color: #ff8fae; font-size: 9px; }
        .ma-map-loading, .ma-map-error { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 4; background: #fff; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #52627a; text-align: center; }
        .ma-map-error { color: #ae2846; }
        .ma-map-fallback { position: absolute; inset: 0; z-index: 5; background: #e9edf3; }
        .ma-map-fallback iframe { display: block; width: 100%; height: 100%; border: 0; }
        .ma-map-fallback-note { position: absolute; top: 10px; left: 10px; right: 10px; max-width: 380px; color: #2d466b; font-size: 11px; line-height: 1.45; border: 1px solid rgba(25,46,80,.12); border-radius: 7px; background: rgba(255,255,255,.93); padding: 7px 10px; pointer-events: none; }
        .ma-map-footnote { padding-top: 13px; font-size: 10px; color: var(--ma-muted); align-items: flex-start; }
        .ma-map-footnote a { color: var(--ma-primary); display: inline-flex; align-items: center; gap: 3px; text-decoration: none; white-space: nowrap; }
        .ma-map-footnote a:hover { text-decoration: underline; }
        .ma-disclaimer { color: var(--ma-muted); margin: 16px 0 0; font-size: 10px; line-height: 1.7; }
        .meridian-atmo--overload { --ma-primary: #ed355e; --ma-secondary: #ffad45; --ma-hover: rgba(237,53,94,.10); }
        .meridian-atmo--overload .ma-chart-panel { border-color: rgba(237,53,94,.34); }
        .meridian-atmo--overload .ma-overload-button { background: rgba(237,53,94,.12); border-color: rgba(237,53,94,.5); color: #d03457; }
        .meridian-atmo :focus-visible { outline: 2px solid #7792ff; outline-offset: 2px; }
        @keyframes ma-spin { to { transform: rotate(360deg); } }
        @keyframes ma-pulse { 0%,100% { filter: none; } 50% { filter: brightness(1.5); } }
        @media (max-width: 920px) { .ma-layout { grid-template-columns: minmax(0, 1fr); } .ma-map-shell { height: 370px; min-height: 370px; } }
        @media (max-width: 600px) { .ma-header { align-items: flex-start; } .ma-top-actions, .ma-city-select { width: 100%; } .ma-city-select { flex: 1; } .ma-status-row { flex-wrap: wrap; } .ma-panel { padding: 14px; } .ma-chart { height: 245px; } .ma-map-shell { height: 310px; min-height: 310px; } .ma-alert small { margin-left: 0; } }
        @media (prefers-color-scheme: dark) {
          .meridian-atmo { --ma-bg: #11161e; --ma-panel: #171e29; --ma-ink: #f0f3fb; --ma-muted: #9dabc0; --ma-line: #313d4f; --ma-grid: #323e4e; --ma-hover: rgba(124,151,255,.11); --ma-primary: #7490ff; --ma-secondary: #6bbfce; }
        }
        html.dark .meridian-atmo, [data-theme="dark"] .meridian-atmo { --ma-panel: #171e29; --ma-ink: #f0f3fb; --ma-muted: #9dabc0; --ma-line: #313d4f; --ma-grid: #323e4e; --ma-hover: rgba(124,151,255,.11); --ma-primary: #7490ff; --ma-secondary: #6bbfce; }
        html.light .meridian-atmo { --ma-panel: #ffffff; --ma-ink: #192433; --ma-muted: #718094; --ma-line: #e6ebf2; --ma-grid: #e9edf4; --ma-hover: rgba(78,110,219,.075); --ma-primary: #4568e8; --ma-secondary: #7eb9dd; }
        html.dark .meridian-atmo--overload, html.light .meridian-atmo--overload, .meridian-atmo--overload { --ma-primary: #ed355e; --ma-secondary: #ffad45; }
        @media (prefers-reduced-motion: reduce) { .ma-spinner, .ma-map-shell[data-overload="true"]::after { animation: none !important; } .ma-map-shell::after, .ma-overload-button { transition: none !important; } }
      `}</style>
    </section>
  );
}