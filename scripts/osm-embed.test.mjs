import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOsmEmbedUrl } from '../src/lib/osm-embed.ts';

test('el fallback usa un visor raster Leaflet de mismo origen, sin claves', () => {
  const url = new URL(buildOsmEmbedUrl(18.4273, -68.9728), 'https://christianhola.github.io');
  assert.equal(url.origin, 'https://christianhola.github.io');
  assert.equal(url.pathname, '/-meridian-showcase/osm-raster-fallback.html');
  assert.equal(url.searchParams.get('latitude'), '18.4273');
  assert.equal(url.searchParams.get('longitude'), '-68.9728');
  assert.equal(url.searchParams.has('key'), false);
});

test('el iframe cambia de coordenadas al seleccionar otra ciudad', () => {
  assert.equal(new URL(buildOsmEmbedUrl(64.1466,-21.9426),'https://christianhola.github.io').searchParams.get('latitude'),'64.1466');
  assert.equal(new URL(buildOsmEmbedUrl(37.3688,-122.0363),'https://christianhola.github.io').searchParams.get('longitude'),'-122.0363');
  assert.notEqual(buildOsmEmbedUrl(18.4273,-68.9728), buildOsmEmbedUrl(64.1466,-21.9426));
});

test('rechaza coordenadas imposibles o no numéricas', () => {
  assert.throws(()=>buildOsmEmbedUrl(Number.NaN,3),RangeError);
  assert.throws(()=>buildOsmEmbedUrl(100,3),RangeError);
  assert.throws(()=>buildOsmEmbedUrl(0,181),RangeError);
});
