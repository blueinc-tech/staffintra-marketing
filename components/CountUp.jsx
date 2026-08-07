'use client';

import { useEffect, useRef } from 'react';

// Odometer-style count-up once the number scrolls into view.
export default function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const decimals = String(value).includes('.') ? 1 : 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      el.textContent = value.toFixed(decimals) + suffix;
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const duration = 1400;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (value * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {String(value).includes('.') ? value.toFixed(1) : value}
      {suffix}
    </span>
  );
}
