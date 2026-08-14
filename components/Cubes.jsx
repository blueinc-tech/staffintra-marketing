'use client';

import { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReduced from './motion/useReduced';
import './Cubes.css';

/* A field of cubes that tilt away from the pointer.

   Adapted from the react-bits Cubes, itself after Can Tastemel's work for the
   lambda.ai landing page. Four things had to change before it could ship here.

   It was written for Tailwind and this project has none, so every utility
   class is now a real rule in Cubes.css.

   Its idle drift called gsap.to() on every cube on every frame. At an 8x8
   grid that is 64 tweens allocated sixty times a second, purely to move a
   drifting focus a few pixels. The drift is already smooth frame to frame, so
   it uses gsap.set now and allocates nothing; only the pointer, which needs
   the ease-in and ease-out, still tweens.

   It also ran that loop forever, including while the section was far off
   screen. It is now gated on an IntersectionObserver, so a visitor reading
   the top of the page is not paying for a field they cannot see.

   And it had no reduced-motion path at all. With reduce set, the grid renders
   flat and still: no drift, no tilt, no ripple. */

const Cubes = ({
  gridSize = 12,
  maxAngle = 42,
  radius = 3.4,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  rippleOnClick = true,
  rippleSpeed = 1.5,
  className = '',
}) => {
  const sceneRef = useRef(null);
  const rafRef = useRef(0);
  const idleTimerRef = useRef(null);
  const userActiveRef = useRef(false);
  const simPos = useRef({ x: 0, y: 0 });
  const simTarget = useRef({ x: 0, y: 0 });
  const simRAF = useRef(0);
  const onScreen = useRef(false);
  /* The original queried the DOM on every tilt, and the idle loop tilts every
     frame. The set never changes after mount, so it is read once. */
  const cubesRef = useRef([]);
  /* Row-major index, so the frame loop can address a window of cells directly
     instead of walking the whole grid. */
  const gridRef = useRef([]);
  const litRef = useRef(new Set());
  const reduced = useReduced();

  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  /* `immediate` skips the tween entirely. The idle drift moves a fraction of
     a cell per frame, so easing it is both invisible and the single most
     expensive thing this component could do. */
  /* Only the cells that can actually be tilted are touched, plus whichever
     were tilted last time and now need releasing.

     Walking all of them was fine at 8x8. At 28x28 it is 784 cubes a frame and
     measured 24.8ms, which misses a 16.7ms frame outright. The radius is 5, so
     at most an 11x11 window can be moving; everything beyond it is already at
     zero and setting it to zero again is pure cost. */
  const tiltAt = useCallback(
    (rowCentre, colCentre, immediate = false) => {
      const grid = gridRef.current;
      if (!grid.length) return;
      const n = grid.length;
      const touched = new Set();

      const lo = Math.max(0, Math.floor(rowCentre - radius));
      const hi = Math.min(n - 1, Math.ceil(rowCentre + radius));
      const loC = Math.max(0, Math.floor(colCentre - radius));
      const hiC = Math.min(n - 1, Math.ceil(colCentre + radius));

      const apply = (cube, angle) => {
        if (immediate) gsap.set(cube, { rotateX: -angle, rotateY: angle });
        else
          gsap.to(cube, {
            duration: angle ? enterDur : leaveDur,
            ease: angle ? easing : 'power3.out',
            overwrite: true,
            rotateX: -angle,
            rotateY: angle,
          });
      };

      for (let r = lo; r <= hi; r++) {
        for (let c = loC; c <= hiC; c++) {
          const dist = Math.hypot(r - rowCentre, c - colCentre);
          if (dist > radius) continue;
          const cube = grid[r]?.[c];
          if (!cube) continue;
          apply(cube, (1 - dist / radius) * maxAngle);
          touched.add(cube);
        }
      }

      // Release anything that was tilted a moment ago and no longer is.
      litRef.current.forEach((cube) => {
        if (!touched.has(cube)) apply(cube, 0);
      });
      litRef.current = touched;
    },
    [radius, maxAngle, enterDur, leaveDur, easing]
  );

  const resetAll = useCallback(() => {
    litRef.current = new Set();
    if (!cubesRef.current.length) return;
    gsap.to(cubesRef.current, {
      duration: leaveDur,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
    });
  }, [leaveDur]);

  const track = useCallback(
    (clientX, clientY) => {
      const scene = sceneRef.current;
      if (!scene || reduced) return;
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      const rect = scene.getBoundingClientRect();
      const col = (clientX - rect.left) / (rect.width / gridSize);
      const row = (clientY - rect.top) / (rect.height / gridSize);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(row, col));

      // Hands the field back to the idle drift once the pointer settles.
      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 2600);
    },
    [gridSize, tiltAt, reduced]
  );

  const onPointerMove = useCallback((e) => track(e.clientX, e.clientY), [track]);
  const onTouchMove = useCallback(
    (e) => {
      const t = e.touches[0];
      if (t) track(t.clientX, t.clientY);
    },
    [track]
  );

  /* The ripple runs colour outward in rings. It writes to a custom property
     rather than to backgroundColor so the faces keep their own styling and
     the value can be themed from CSS. */
  const onClick = useCallback(
    (e) => {
      const scene = sceneRef.current;
      if (!rippleOnClick || !scene || reduced) return;
      const rect = scene.getBoundingClientRect();
      const colHit = Math.floor((e.clientX - rect.left) / (rect.width / gridSize));
      const rowHit = Math.floor((e.clientY - rect.top) / (rect.height / gridSize));

      const spread = 0.15 / rippleSpeed;
      const dur = 0.3 / rippleSpeed;
      const hold = 0.6 / rippleSpeed;

      const rings = new Map();
      cubesRef.current.forEach((cube) => {
        const ring = Math.round(Math.hypot(+cube.dataset.row - rowHit, +cube.dataset.col - colHit));
        if (!rings.has(ring)) rings.set(ring, []);
        rings.get(ring).push(cube);
      });

      [...rings.keys()].sort((a, b) => a - b).forEach((ring) => {
        const delay = ring * spread;
        const cubes = rings.get(ring);
        gsap.to(cubes, { '--lit': 1, duration: dur, delay, ease: 'power3.out' });
        gsap.to(cubes, { '--lit': 0, duration: dur, delay: delay + dur + hold, ease: 'power3.out' });
      });
    },
    [rippleOnClick, gridSize, rippleSpeed, reduced]
  );

  useEffect(() => {
    const list = Array.from(sceneRef.current?.querySelectorAll('.cube') || []);
    cubesRef.current = list;
    const grid = Array.from({ length: gridSize }, () => []);
    list.forEach((cube) => { grid[+cube.dataset.row][+cube.dataset.col] = cube; });
    gridRef.current = grid;
    litRef.current = new Set();
  }, [gridSize]);

  /* Only run while the field is actually on screen. */
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !('IntersectionObserver' in window)) {
      onScreen.current = true;
      return undefined;
    }
    const io = new IntersectionObserver(([e]) => { onScreen.current = e.isIntersecting; }, {
      rootMargin: '120px',
    });
    io.observe(scene);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !sceneRef.current) return undefined;
    simPos.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
    simTarget.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };

    const loop = () => {
      if (onScreen.current && !userActiveRef.current) {
        const p = simPos.current;
        const t = simTarget.current;
        p.x += (t.x - p.x) * 0.02;
        p.y += (t.y - p.y) * 0.02;
        tiltAt(p.y, p.x, true);
        if (Math.hypot(p.x - t.x, p.y - t.y) < 0.1) {
          simTarget.current = { x: Math.random() * gridSize, y: Math.random() * gridSize };
        }
      }
      simRAF.current = requestAnimationFrame(loop);
    };
    simRAF.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(simRAF.current);
  }, [gridSize, tiltAt, reduced]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetAll);
    el.addEventListener('click', onClick);
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', resetAll, { passive: true });
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', resetAll);
      el.removeEventListener('click', onClick);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', resetAll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove]);

  const cells = Array.from({ length: gridSize });

  return (
    <div className={`cubes ${className}`.trim()} aria-hidden="true">
      <div
        ref={sceneRef}
        className="cubes-scene"
        style={{ '--n': gridSize }}
      >
        {cells.map((_, r) =>
          cells.map((__, c) => (
            <div className="cube" key={`${r}-${c}`} data-row={r} data-col={c}>
              {/* Six faces, each translated out to half the cell and turned to
                  face outward. The original's transforms, unchanged. */}
              <i className="cube-face cube-face--t" />
              <i className="cube-face cube-face--b" />
              <i className="cube-face cube-face--l" />
              <i className="cube-face cube-face--r" />
              <i className="cube-face cube-face--f" />
              <i className="cube-face cube-face--k" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;
