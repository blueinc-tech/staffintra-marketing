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
      className="hero has-rails"
      ref={rootRef}
      data-ready={ready ? '' : undefined}
      data-idle={idle ? '' : undefined}
    >
      <div className="container hero-inner">
        {/* Deliberately not animated: the copy paints immediately and the
            motion budget goes on the artwork. */}
        <div className="hero-copy">
          <h1>
            Take control of your
            <br />
            <span className="accent">workforce operations</span>.
          </h1>
          <p className="hero-sub">
            Join over 1,000 businesses using StaffIntra to manage people, time, productivity
            and everyday operations, with confidence.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary btn-lg btn-swap" href="/pricing">
              <span className="swap">
                <span>Open an account</span>
                <span aria-hidden="true">Open an account</span>
              </span>
            </a>
            <a className="btn btn-secondary btn-lg" href="#demo">
              Book a demo
            </a>
          </div>
          <ul className="hero-chips" aria-label="Why teams start">
            <li>Free to start</li>
            <li>Set up in a day</li>
            <li>SOC 2 ready</li>
          </ul>
        </div>

        <div className="hero-visual">
          <HeroMockup />
        </div>
      </div>

      <HeroArt />
    </section>
  );
}
