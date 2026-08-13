'use client';

import { useCallback, useRef } from 'react';
import useReduced from './useReduced';
import './motion.css';

/* Hover surfaces, after react-bits SpotlightCard and Magnet.

   Both exist for the same reason: this brand sets every shadow token to
   none, so a card cannot lift and a button cannot raise. Hover feedback has
   to come from light and from position instead. */

/* A soft radial wash follows the pointer inside the card. Written to CSS
   custom properties rather than React state on purpose: this fires on every
   pointermove, and a setState per frame would re-render the subtree.

   The wash sits at 9% of brand purple, which is the most it can carry before
   it reads as a coloured card rather than as a lit one. */
export function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReduced();

  const onMove = useCallback(
    (e) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    },
    [reduced]
  );

  return (
    <Tag ref={ref} className={`mo-spot ${className}`.trim()} onPointerMove={onMove} {...rest}>
      {children}
    </Tag>
  );
}

/* The element drifts toward the cursor inside a proximity radius and springs
   back on exit. Applied to one button per page at most: the whole effect
   depends on being the only thing on the page that does it.

   `strength` is the fraction of the cursor's offset the element travels, so
   0.28 means it never quite reaches the pointer, which is what keeps it
   feeling weighted rather than magnetic. */
export function Magnet({ children, radius = 90, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const reduced = useReduced();

  const move = useCallback(
    (e) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius + Math.max(r.width, r.height) / 2) {
          el.style.transform = '';
          return;
        }
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      });
    },
    [radius, strength, reduced]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = '';
  }, []);

  return (
    <span
      ref={ref}
      className={`mo-magnet ${className}`.trim()}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </span>
  );
}

/* A progressive blur ramp masking one edge of a section, after GradualBlur.

   Six stacked layers rather than one: a single backdrop-filter with a mask
   fades the blur's COVERAGE but not its STRENGTH, so the boundary still
   reads as a hard line. Stepping the strength across layers is what makes it
   a ramp. This is the shadow-free way to dissolve a long screenshot or a
   scrolling rail into the page. */
export function EdgeFade({ height = 120, side = 'bottom', steps = 6 }) {
  const layers = Array.from({ length: steps }, (_, i) => {
    const t = (i + 1) / steps;
    return { b: `${t * 6}px`, m0: `${Math.max(0, (i - 1) / steps) * 100}%`, m1: `${t * 100}%` };
  });

  return (
    <span
      className="mo-fade-edge"
      aria-hidden="true"
      style={{ height, [side]: 0, transform: side === 'top' ? 'scaleY(-1)' : undefined }}
    >
      {layers.map((l, i) => (
        <span key={i} style={{ '--b': l.b, '--m0': l.m0, '--m1': l.m1 }} />
      ))}
    </span>
  );
}
