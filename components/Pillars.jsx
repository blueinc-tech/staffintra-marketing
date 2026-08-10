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
  const [slide, setSlide] = useState({ left: 0, width: 0 });
  const panelsRef = useRef([]);
  const tabsRef = useRef([]);

  // The fill is measured off the active button rather than computed as a
  // third of the bar: offsetLeft and abspos left share the same origin (the
  // padding edge), so it lands exactly on the button and sits flush against
  // the bar on the first and last tab, with no gap to the outer edge.
  useEffect(() => {
    const measure = () => {
      const el = tabsRef.current[active];
      if (el) setSlide({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

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
      <div className="container">
        <header className="sec-head">
          <span className="sec-eyebrow">Products</span>
          <h2>Connect your people, your rota, and your payroll.</h2>
        </header>
      </div>

      {/* The frame's side lines start at the tab bar, not at the section top:
          the header sits on open white above them. */}
      <div className="pillars-frame has-frame">
        <div className="pillar-tabs-wrap">
          <div className="container">
            <div className="pillar-tabs" role="tablist" aria-label="Product areas">
              {/* One fill that travels, rather than three that switch on and
                  off: on the reference it slides between tabs and is inset
                  from the bar top and bottom, so it reads as a button rather
                  than a filled cell. It is never inset from the ends. */}
              <span
                className="ptab-slide"
                aria-hidden="true"
                style={
                  slide.width
                    ? { width: `${slide.width}px`, translate: `${slide.left}px 0` }
                    : undefined
                }
              />
              {PILLARS.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
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
      </div>
    </section>
  );
}
