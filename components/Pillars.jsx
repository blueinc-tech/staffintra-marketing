'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Pillar from './Pillar';
import { TabMark } from './PillarMarks';
import { PILLARS } from './pillarData';
import './Pillars.css';

/* Height of the sticky nav plus this section's own tab bar. The tab bar parks
   directly under the nav, and panels scroll to sit just below both. */
/* Measured, not assumed. The header retracts on scroll now, so a fixed 64
   would put the spy line in the wrong place half the time, and the tab bar
   parks against whatever the header currently is. */
const TABS_H = 72;
const navBottom = () => {
  const el = typeof document !== 'undefined' && document.querySelector('.nav-root');
  return el ? Math.max(0, el.getBoundingClientRect().bottom) : 64;
};

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
      const line = navBottom() + TABS_H + 8;
      panelsRef.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) next = i;
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

  /* Scrolled by hand rather than with scrollIntoView. html carries a global
     scroll-padding-top of 80px, which ADDS to the anchor's own scroll-margin
     instead of replacing it, so the panel landed at 216px — below the 144px
     spy line, and the tab never switched on its own click. Computing the
     target puts the panel top just under the sticky bar, comfortably inside
     the line. */
  const goTo = useCallback((i) => {
    const el = panelsRef.current[i];
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - (navBottom() + TABS_H - 4);
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <section className="pillars" id="product">
      <div className="container">
        <header className="sec-head">
          <span className="sec-eyebrow">Products</span>
          <h2>Everything your team needs, and complete visibility.</h2>
          <p className="sec-lede">
            One platform for the entire employee workday, from clock-in to payslip.
          </p>
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
                    ? { width: `${slide.width - 12}px`, translate: `${slide.left}px 0` }
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
                  <TabMark tone={p.tone} />
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
