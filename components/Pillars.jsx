'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Pillar from './Pillar';
import { TabMark } from './PillarMarks';
import { PILLARS } from './pillarData';
import './Pillars.css';

/* Height of the sticky nav plus this section's own tab bar. The tab bar parks
   directly under the nav, and panels scroll to sit just below both. */
const NAV_H = 64;
const TABS_H = 72;
const SPY_LINE = NAV_H + TABS_H + 8;

export default function Pillars() {
  const [active, setActive] = useState(0);
  const panelsRef = useRef([]);

  // Scroll-spy by measurement rather than by observer: the active tab is the
  // last panel whose top has passed under the bar. An IntersectionObserver
  // gets ambiguous here because two panels are on screen at the boundary.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let next = 0;
      panelsRef.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= SPY_LINE) next = i;
      });
      setActive(next);
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
  }, []);

  const goTo = useCallback((i) => {
    const el = panelsRef.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="pillars" id="product">
      <div className="pillar-tabs-wrap">
        <div className="container">
          <div className="pillar-tabs" role="tablist" aria-label="Product areas">
            {/* One fill that travels, rather than three that switch on and off:
                on the reference it slides between tabs and is inset from the
                bar, so it reads as a button rather than a filled cell. */}
            <span className="ptab-slide" style={{ '--i': active }} aria-hidden="true" />
            {PILLARS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`pillar-${p.id}`}
                className={`ptab${i === active ? ' is-on' : ''}`}
                data-tone={p.tone}
                onClick={() => goTo(i)}
              >
                <TabMark />
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {PILLARS.map((p, i) => (
        <Fragment key={p.id}>
          <div className="container">
            <div
              className="pillar-anchor"
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
            >
              <Pillar pillar={p} />
            </div>
          </div>
          {/* Outside the container on purpose: the hatch is the one thing in
              this section that runs past the frame to both page edges. */}
          <div className="pillar-hatch" aria-hidden="true" />
        </Fragment>
      ))}
    </section>
  );
}
