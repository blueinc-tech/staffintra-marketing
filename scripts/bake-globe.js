/* Bakes the 5.4MB globe OBJ into a compact binary the browser can stream.

   What is dropped and why:
     shell      18176 faces, thrown away entirely. A sphere's silhouette is a
                circle at every angle, so the body is one arc() call, and
                hiding the far side is a sign test on the rotated z, not a
                depth buffer.
     graticule  6300 segments, thrown away. Lat/long lines are pure maths and
                cost nothing to generate at runtime.
     land-hatch 11527 segments, reduced to one point each. The reference draws
                the interiors as dots, and a dot is the segment's midpoint.
     coastline  4995 segments, kept as segments. This is the only outline.

   Coordinates quantise to int16 over the unit sphere, which is ~0.003 degrees
   of arc at this radius: far finer than a 2px dot on a 600px globe. */

const fs = require('fs');

const src = fs.readFileSync('design/staffintra-coverage-globe.obj', 'utf8').split('\n');
const verts = [];
const shellVerts = [];
let obj = '';
const hatch = [];
const coast = [];

for (const line of src) {
  if (line[0] === 'o') { obj = line.slice(2).trim(); continue; }
  if (line[0] === 'v' && line[1] === ' ') {
    const p = line.split(/\s+/);
    const v = [+p[1], +p[2], +p[3]];
    verts.push(v);
    if (obj === 'shell') shellVerts.push(v);
    continue;
  }
  if (line[0] === 'l' && line[1] === ' ') {
    const p = line.split(/\s+/);
    const a = verts[+p[1] - 1];
    const b = verts[+p[2] - 1];
    if (!a || !b) continue;
    if (obj === 'land-hatch') hatch.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2]);
    else if (obj === 'coastline') coast.push(a, b);
  }
}

/* Recentre and normalise.

   The centre must come from the SHELL's bounding box, not from the mean of
   the drawn points. Land is not evenly distributed over a globe, so a
   centroid of coastline and hatch points sits well off the true axis: the
   first attempt put dots between 0.67 and 1.0 of the radius, which would have
   rendered as a lumpy potato. The shell is a complete sphere, so its box is
   exactly concentric and its half-extent is exactly the radius. */
let mnx = Infinity, mny = Infinity, mnz = Infinity;
let mxx = -Infinity, mxy = -Infinity, mxz = -Infinity;
for (const p of shellVerts) {
  if (p[0] < mnx) mnx = p[0]; if (p[0] > mxx) mxx = p[0];
  if (p[1] < mny) mny = p[1]; if (p[1] > mxy) mxy = p[1];
  if (p[2] < mnz) mnz = p[2]; if (p[2] > mxz) mxz = p[2];
}
const cx = (mnx + mxx) / 2, cy = (mny + mxy) / 2, cz = (mnz + mxz) / 2;
const r = Math.max(mxx - mnx, mxy - mny, mxz - mnz) / 2;

const q = (arr) => {
  const out = new Int16Array(arr.length * 3);
  arr.forEach((p, i) => {
    out[i * 3] = Math.round(((p[0] - cx) / r) * 32767);
    out[i * 3 + 1] = Math.round(((p[1] - cy) / r) * 32767);
    out[i * 3 + 2] = Math.round(((p[2] - cz) / r) * 32767);
  });
  return out;
};

const H = q(hatch);
const C = q(coast);
const head = new Int32Array([H.length / 3, C.length / 6]);
const buf = Buffer.concat([Buffer.from(head.buffer), Buffer.from(H.buffer), Buffer.from(C.buffer)]);
fs.writeFileSync('public/assets/globe.bin', buf);

console.log('dots     ', hatch.length);
console.log('segments ', coast.length / 2);
console.log('centre   ', cx.toFixed(4), cy.toFixed(4), cz.toFixed(4), 'r', r.toFixed(4));
let lo = 9, hi = 0;
for (let i = 0; i < H.length / 3; i++) {
  const m = Math.hypot(H[i*3]/32767, H[i*3+1]/32767, H[i*3+2]/32767);
  if (m < lo) lo = m; if (m > hi) hi = m;
}
console.log('dot radius', lo.toFixed(3), 'to', hi.toFixed(3), '(want ~1.000)');
console.log('output   ', (buf.length / 1024).toFixed(1), 'KB  (from 5340 KB)');
