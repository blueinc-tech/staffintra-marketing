'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './useReduced';
import './ScrollExpand.css';

/* A media card that grows from inset to full-bleed as it is scrolled past,
   after react-bits ScrollExpand.

   This is the one hero device in that library that suits an enterprise
   product site: it makes the product screenshot the centrepiece without a
   gradient, a shader or a particle anywhere near it. The screen literally
   opens up as you arrive at it.

   Driven by scroll progress rather than by a one-shot trigger, so it is
   reversible and tracks the scrollbar exactly. Progress is measured on a
   sticky inner element inside a tall outer element: the outer reserves the
   scroll distance, the inner stays put while the card resizes.

   Under reduced motion it renders at full size immediately and the outer
   element collapses to the card's own height, so there is no dead scroll. */
export default function ScrollExpand({
  children,
  caption,
  from = 62,
  distance = 90,
  className = '',
}) {
  const outer = useRef(null);
  const [p, setP] = useState(0);
  const reduced = useReduced();

  useEffect(() => {
    if (reduced) {
      setP(1);
      return undefined;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = outer.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      /* 0 when the block's top reaches the viewport bottom, 1 once it has
         travelled one viewport height upward. Clamped both ends so the card
         holds at full size for the rest of the block. */
      const travel = window.innerHeight;
      const raw = (travel - r.top) / travel;
      setP(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduced]);

  const width = from + (100 - from) * p;

  return (
    <div
      className={`se ${className}`.trim()}
      ref={outer}
      style={{ '--se-extra': reduced ? '0px' : `${distance}vh` }}
    >
      <div className="se-sticky">
        <div className="se-card" style={{ width: `${width}%`, '--se-p': p }}>
          {children}
        </div>
        {caption ? (
          <p className="se-caption" style={{ opacity: p }}>
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}
