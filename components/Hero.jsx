'use client';

import { useEffect, useRef, useState } from 'react';
import HeroMockup from './HeroMockup';
import HeroArt from './HeroArt';
import { SplitText } from './motion/Text';
import { Magnet } from './motion/Surfaces';
import Reveal from './motion/Reveal';

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
        <div className="hero-copy">
          {/* The one split heading on the site. Words rise out of the line
              rather than fading in, and the real string stays in the
              accessibility tree behind them. */}
          <h1>
            <SplitText text="Take control of your" />
            <br />
            <SplitText className="accent" text="workforce operations." start={180} />
          </h1>

          <Reveal as="p" className="hero-sub" delay={420}>
            Join over 1,000 businesses using StaffIntra to manage people, time, productivity
            and everyday operations, with confidence.
          </Reveal>

          <Reveal className="hero-ctas" delay={520}>
            {/* One magnet on the page, on the button that matters. In a system
                with no shadows, weight is the only hover affordance left. */}
            <Magnet>
              <a className="btn btn-primary btn-lg btn-swap" href="/pricing">
                <span className="swap">
                  <span>Open an account</span>
                  <span aria-hidden="true">Open an account</span>
                </span>
              </a>
            </Magnet>
            <a className="btn btn-secondary btn-lg" href="#demo">
              Book a demo
            </a>
          </Reveal>

          <Reveal as="ul" className="hero-chips" delay={600} aria-label="Why teams start">
            <li>Free to start</li>
            <li>Set up in a day</li>
            <li>SOC 2 ready</li>
          </Reveal>
        </div>

        <div className="hero-visual">
          <HeroMockup />
        </div>
      </div>

      <HeroArt />
    </section>
  );
}
