/** A key-free, interactive 2D OpenStreetMap fallback for browsers without WebGL. */
export function buildOsmEmbedUrl(latitude: number, longitude: number): string {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      Math.abs(latitude) > 85 || Math.abs(longitude) > 180) {
    throw new RangeError('Las coordenadas del mapa no son válidas.');
  }
  const latPad = 0.02;
  const lonPad = 0.03 / Math.max(0.35, Math.cos(latitude * Math.PI / 180));
  const bbox = [
    longitude - lonPad, latitude - latPad,
    longitude + lonPad, latitude + latPad,
  ].map((value) => value.toFixed(5)).join(',');
  const url = new URL('https://www.openstreetmap.org/export/embed.html');
  url.searchParams.set('bbox', bbox);
  url.searchParams.set('layer', 'mapnik');
  url.searchParams.set('marker', `${latitude},${longitude}`);
  return url.toString();
}
