'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './motion/useReduced';
import './Globe.css';

/* The coverage globe.

   The source is a 5.4MB Wavefront OBJ. Shipping that plus a loader plus
   three.js would have cost well over a megabyte of runtime to draw what is,
   at heart, a rotating scatter of points. So it is baked at build time
   (scripts/bake-globe.js) into a 126KB binary of quantised int16 coordinates,
   and drawn here in plain canvas 2D.

   Three things make that cheap enough to do by hand:
     - a sphere's silhouette is a circle at every angle, so the body is one
       arc() and needs no geometry at all
     - hiding the far hemisphere is a sign test on the rotated z, not a depth
       buffer
     - the graticule is pure maths, so none of it has to be stored

   Rotation is about the world's own tilted axis rather than screen-vertical,
   which is what stops it reading as a spinning logo. */

const TILT = 0.41; // ~23.5 degrees, in radians
const DPR_CAP = 2;

export default function Globe({ className = '' }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [data, setData] = useState(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReduced();

  // Nothing is fetched until the section is near the viewport: this is a
  // decorative 126KB that a visitor who never scrolls should never pay for.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return undefined;
    let dead = false;
    fetch('/assets/globe.bin')
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))))
      .then((buf) => {
        if (dead) return;
        const head = new Int32Array(buf, 0, 2);
        const nDots = head[0];
        const nSegs = head[1];
        const dots = new Int16Array(buf, 8, nDots * 3);
        const segs = new Int16Array(buf, 8 + nDots * 6, nSegs * 6);
        setData({ dots, segs, nDots, nSegs });
      })
      // A decorative globe is not worth an error state. If it never arrives
      // the panel keeps its copy and simply has no picture.
      .catch(() => {});
    return () => { dead = true; };
  }, [seen]);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv || !data) return undefined;
    const ctx = cv.getContext('2d');
    let raf = 0;
    let spin = -0.6;
    let last = 0;
    /* Arrival. The globe assembles rather than appearing: it eases up to full
       size while the graticule fades in, then the coastlines draw around it,
       then the land fills in behind them. Progress is one number and every
       stage is a window on it, so the sequence cannot drift apart. */
    let intro = reduced ? 1 : 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const r = cv.getBoundingClientRect();
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      return dpr;
    };
    let dpr = size();

    const draw = (t) => {
      const w = cv.width;
      const h = cv.height;

      const dt = last ? Math.min(t - last, 60) : 16;
      if (!reduced) {
        spin += dt * 0.000065;
        intro = Math.min(1, intro + dt / 1500);
      }
      last = t;

      // Ease out, so it settles into place instead of stopping dead.
      const e = 1 - (1 - intro) ** 3;
      // Each stage occupies its own window of the same progress value.
      const win = (a, b) => Math.min(1, Math.max(0, (e - a) / (b - a)));
      const gShell = win(0, 0.35);
      const gCoast = win(0.25, 0.75);
      const gLand = win(0.4, 1);

      /* Geometry has to come AFTER the progress block: R reads `e`, and a
         const cannot be read before its own declaration. Computing it above
         threw on every frame and left the canvas blank. */
      // Sits low and right, so the sphere reads as bigger than its panel.
      const R = Math.min(w, h) * 0.62 * (0.94 + 0.06 * e);
      const cx = w * 0.62;
      const cy = h * 0.52;

      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);

      ctx.clearRect(0, 0, w, h);

      // Body. One arc, no mesh.
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(11,10,20,${(0.92 * gShell).toFixed(3)})`;
      ctx.fill();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = `rgba(255,255,255,${(0.14 * gShell).toFixed(3)})`;
      ctx.stroke();

      // Project a unit-sphere point. Spin about Y, then tilt the axis toward
      // the viewer. z greater than zero is the near hemisphere.
      const proj = (x, y, z) => {
        const rx = x * cs + z * sn;
        const rz = -x * sn + z * cs;
        const ry2 = y * ct - rz * st;
        const rz2 = y * st + rz * ct;
        return [cx + rx * R, cy - ry2 * R, rz2];
      };

      // Graticule, generated rather than stored.
      ctx.lineWidth = 0.7 * dpr;
      ctx.strokeStyle = `rgba(255,255,255,${(0.1 * gShell).toFixed(3)})`;
      for (let a = 0; a < 12; a++) {
        const lon = (a / 12) * Math.PI * 2;
        ctx.beginPath();
        let up = false;
        for (let i = 0; i <= 72; i++) {
          const lat = -Math.PI / 2 + (i / 72) * Math.PI;
          const [px, py, pz] = proj(
            Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)
          );
          if (pz < 0) { up = false; continue; }
          if (!up) { ctx.moveTo(px, py); up = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      for (let b = 1; b < 6; b++) {
        const lat = -Math.PI / 2 + (b / 6) * Math.PI;
        ctx.beginPath();
        let up = false;
        for (let i = 0; i <= 96; i++) {
          const lon = (i / 96) * Math.PI * 2;
          const [px, py, pz] = proj(
            Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon)
          );
          if (pz < 0) { up = false; continue; }
          if (!up) { ctx.moveTo(px, py); up = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Coastlines. A segment is drawn only when both ends are on the near
      // side, which is cheap and correct enough at this scale.
      const S = data.segs;
      ctx.lineWidth = 0.9 * dpr;
      ctx.strokeStyle = 'rgba(255,255,255,.5)';
      ctx.beginPath();
      // Drawn in stored order, which follows the coastline itself, so the
      // outlines appear to trace round the continents rather than dissolve in.
      const segCut = Math.floor(data.nSegs * gCoast);
      for (let i = 0; i < segCut; i++) {
        const o = i * 6;
        const [ax, ay, az] = proj(S[o] / 32767, S[o + 1] / 32767, S[o + 2] / 32767);
        if (az <= 0) continue;
        const [bx, by, bz] = proj(S[o + 3] / 32767, S[o + 4] / 32767, S[o + 5] / 32767);
        if (bz <= 0) continue;
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
      }
      ctx.stroke();

      // Land dots. Fading them toward the limb is what sells the curvature.
      const D = data.dots;
      const s = 1.15 * dpr;
      const dotCut = Math.floor(data.nDots * gLand);
      for (let i = 0; i < dotCut; i++) {
        const o = i * 3;
        const [px, py, pz] = proj(D[o] / 32767, D[o + 1] / 32767, D[o + 2] / 32767);
        if (pz <= 0.02) continue;
        ctx.fillStyle = `rgba(255,255,255,${0.22 + pz * 0.62})`;
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }

      // Keeps running while the intro finishes even under reduced motion, so
      // the assembled state is reached; it simply gets there on frame one.
      if (!reduced || intro < 1) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    const onResize = () => { dpr = size(); if (reduced) requestAnimationFrame(draw); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [data, reduced]);

  return (
    <div className={`globe ${className}`.trim()} ref={wrap}>
      <canvas ref={canvas} className="globe-cv" aria-hidden="true" />
    </div>
  );
}
