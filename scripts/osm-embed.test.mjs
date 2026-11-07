import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOsmEmbedUrl } from '../src/lib/osm-embed.ts';

test('usa un mapa oficial HTTPS sin claves ni rastreo adicional', () => {
  const url = new URL(buildOsmEmbedUrl(18.4273, -68.9728));
  assert.equal(url.origin, 'https://www.openstreetmap.org');
  assert.equal(url.pathname, '/export/embed.html');
  assert.equal(url.searchParams.get('marker'), '18.4273,-68.9728');
  assert.equal(url.searchParams.get('layer'), 'mapnik');
  assert.equal(url.searchParams.has('key'), false);
  const bbox = url.searchParams.get('bbox').split(',').map(Number);
  assert.equal(bbox.length, 4);
  assert.ok(bbox[0] < -68.9728 && bbox[2] > -68.9728);
  assert.ok(bbox[1] < 18.4273 && bbox[3] > 18.4273);
});

test('las coordenadas del fallback se actualizan con la ciudad', () => {
  assert.match(buildOsmEmbedUrl(64.1466,-21.9426), /64\.1466/);
  assert.match(buildOsmEmbedUrl(37.3688,-122.0363), /37\.3688/);
  assert.notEqual(buildOsmEmbedUrl(18.4273,-68.9728), buildOsmEmbedUrl(64.1466,-21.9426));
});

test('rechaza coordenadas imposibles o no numéricas', () => {
  assert.throws(()=>buildOsmEmbedUrl(Number.NaN, 3),RangeError);
  assert.throws(()=>buildOsmEmbedUrl(100, 3),RangeError);
  assert.throws(()=>buildOsmEmbedUrl(0, 181),RangeError);
});
