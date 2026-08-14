'use client';

import { useCallback, useEffect, useRef } from 'react';
import useReduced from './motion/useReduced';
import './MagnetField.css';

/* A field of short strokes that all point at something.

   The react-bits MagnetLines this grew from points every line at the cursor
   and stops there, which is a toy: it does nothing when the pointer is
   elsewhere, and nothing at all on a phone. Here the field has a JOB. At rest
   every stroke points at the primary button, so the whole panel leans toward
   the one action the section is asking for, and it does that whether or not
   there is a pointer in the room. The cursor only borrows the field while it
   is inside the section, and the field returns to the button on the way out.

   Two more departures from the original. Alignment falls off with distance,
   so strokes near the focus swing fully while far ones only lean, which is
   what makes it read as a field rather than as a fan. And the strokes are
   round-capped, because that is what the mark is made of.

   No React state and no re-renders: the pointer handler writes rotation
   straight to each element's style inside one rAF. */

const COLS = 22;
const ROWS = 11;

export default function MagnetField({ focusSelector }) {
  const wrap = useRef(null);
  const lines = useRef([]);
  const target = useRef(null);
  const raf = useRef(0);
  const reduced = useReduced();

  /* Where the field points when the pointer is not involved: the centre of
     the primary button, measured from the DOM rather than guessed, so it
     stays right through any reflow. */
  const restTarget = useCallback(() => {
    const el = wrap.current;
    if (!el) return null;
    const focus = focusSelector ? el.closest('section')?.querySelector(focusSelector) : null;
    const box = el.getBoundingClientRect();
    if (!focus) return { x: box.width / 2, y: box.height / 2 };
    const f = focus.getBoundingClientRect();
    return { x: f.left + f.width / 2 - box.left, y: f.top + f.height / 2 - box.top };
  }, [focusSelector]);

  const paint = useCallback(() => {
    raf.current = 0;
    const el = wrap.current;
    const t = target.current;
    if (!el || !t) return;
    const box = el.getBoundingClientRect();
    // The diagonal is the longest possible separation, so falloff is scaled
    // by it and behaves the same at any panel size.
    const reach = Math.hypot(box.width, box.height) * 0.42;

    lines.current.forEach((ln) => {
      if (!ln) return;
      const x = +ln.dataset.x * box.width;
      const y = +ln.dataset.y * box.height;
      const dx = t.x - x;
      const dy = t.y - y;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - dist / reach);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      // Blend from the base angle toward the target by how close it is.
      const base = -18;
      ln.style.setProperty('--a', `${base + (angle - base) * (0.25 + pull * 0.75)}deg`);
      ln.style.setProperty('--o', (0.14 + pull * 0.62).toFixed(3));
    });
  }, []);

  const schedule = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    target.current = restTarget();
    schedule();
    const onResize = () => { target.current = restTarget(); schedule(); };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [restTarget, schedule]);

  const onMove = useCallback((e) => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    target.current = { x: e.clientX - box.left, y: e.clientY - box.top };
    schedule();
  }, [reduced, schedule]);

  const onLeave = useCallback(() => {
    target.current = restTarget();
    schedule();
  }, [restTarget, schedule]);

  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      cells.push({ x: (c + 0.5) / COLS, y: (r + 0.5) / ROWS, k: `${r}-${c}` });
    }
  }

  return (
    <div
      className="mf"
      ref={wrap}
      aria-hidden="true"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {cells.map((cell, i) => (
        <i
          key={cell.k}
          className="mf-l"
          data-x={cell.x}
          data-y={cell.y}
          ref={(el) => { lines.current[i] = el; }}
          style={{ left: `${cell.x * 100}%`, top: `${cell.y * 100}%` }}
        />
      ))}
    </div>
  );
}
