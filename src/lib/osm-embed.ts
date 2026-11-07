/** Key-free same-origin Leaflet raster map fallback when MapLibre/WebGL cannot initialize. */
export function buildOsmEmbedUrl(latitude: number, longitude: number): string {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      Math.abs(latitude) > 85 || Math.abs(longitude) > 180) {
    throw new RangeError('Las coordenadas del mapa no son válidas.');
  }
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
  });
  return '/-meridian-showcase/osm-raster-fallback.html?' + params.toString();
}
