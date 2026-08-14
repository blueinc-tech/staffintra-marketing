'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './useReduced';

/* A number that counts to its value when it first comes into view.

   Written to accept the FORMATTED string rather than a raw number, because
   the dashboard's figures are things like "5h 24m" and "14:27", not integers.
   Every run of digits in the string is animated independently and the
   separators are left alone, so one component covers hours, clocks, money and
   plain counts without a format prop.

   The final string is what renders at rest, so a visitor who never triggers
   it, or who asked for no motion, sees the real value rather than a zero. */

const DIGITS = /\d+/g;

export default function Ticker({ value, ms = 1100, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [out, setOut] = useState(value);
  const reduced = useReduced();

  useEffect(() => {
    if (reduced) { setOut(value); return undefined; }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOut(value); return undefined; }

    const targets = [...value.matchAll(DIGITS)].map((m) => ({ i: m.index, s: m[0], n: +m[0] }));
    if (!targets.length) return undefined;

    let raf = 0;
    let start = 0;
    let stop = false;

    const frame = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / ms);
      // Ease out, so it decelerates into the real figure instead of stopping dead.
      const e = 1 - (1 - p) ** 3;
      let s = value;
      let shift = 0;
      for (const g of targets) {
        const cur = String(Math.round(g.n * e)).padStart(g.s.length, '0');
        s = s.slice(0, g.i + shift) + cur + s.slice(g.i + shift + g.s.length);
        shift += cur.length - g.s.length;
      }
      setOut(s);
      if (p < 1 && !stop) raf = requestAnimationFrame(frame);
      else setOut(value);
    };

    const io = new IntersectionObserver(
      ([e2]) => {
        if (!e2.isIntersecting) return;
        io.disconnect();
        window.setTimeout(() => { if (!stop) raf = requestAnimationFrame(frame); }, delay);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => { stop = true; io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, ms, delay, reduced]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
