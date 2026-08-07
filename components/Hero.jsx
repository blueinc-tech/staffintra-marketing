'use client';

import { useEffect, useRef, useState } from 'react';
import HeroMockup from './HeroMockup';
import HeroArt from './HeroArt';

export default function Hero() {
  const rootRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [idle, setIdle] = useState(false);

  // The reveal is gated on paint, not on scroll: the hero is above the fold,
  // so an observer there would only cost a frame. The observer below exists
  // purely to pause the idle loops once the hero scrolls away.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setIdle(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="hero"
      ref={rootRef}
      data-ready={ready ? '' : undefined}
      data-idle={idle ? '' : undefined}
    >
      <div className="container hero-inner">
        {/* Deliberately not animated — the copy paints immediately, as the
            reference does, and the motion budget goes on the artwork. */}
        <div className="hero-copy">
          <span className="eyebrow">The connected workforce platform</span>
          <h1>
            One workspace for
            <br />
            your <span className="accent">whole team</span>.
          </h1>
          <p className="hero-sub">
            How modern operators manage rotas, leave, onboarding, and time in one place.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg btn-swap" href="#demo">
              <span className="swap">
                <span>Book a demo</span>
                <span aria-hidden="true">Book a demo</span>
              </span>
            </a>
            <a className="btn btn-secondary btn-lg" href="#product">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <HeroMockup />
        </div>
      </div>

      <HeroArt />
    </section>
  );
}
