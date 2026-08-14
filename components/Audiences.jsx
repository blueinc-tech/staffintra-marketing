'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChipMark } from './ChipMarks';
import { Spotlight } from './motion/Surfaces';
import { TurnArrow } from './PillarMarks';
import './Audiences.css';

/* The audiences band, rebuilt as a full-bleed side scroll.

   It was a 2x2 grid inside the page's max width, which read as a form rather
   than as a set of choices. Running off both edges says there is more here
   than fits, which is the honest shape of "however your business runs".

   Depth is the react-bits DepthCarousel idea, taken as a behaviour rather
   than as a dependency: a card's scale, opacity and blur come from how far
   its centre sits from the centre of the track, so the one you are reading is
   the one in focus and the rest fall away. That is measured on the real
   scroll position, which means it works identically for a trackpad, a
   touchscreen, the keyboard, the scrollbar and the drag handler below.

   It is a genuine scroll container, not a transform hijack. The insights row
   earlier in this project moved with PAGE scroll and it was rightly called a
   bug: sideways motion has to stay in the reader's hands. Nothing here
   listens to window scroll at all. */

const AUDIENCES = [
  {
    id: 'startups', tone: 'accent', n: '01', name: 'Startups',
    body: 'Time, tasks and pay ready before the chaos starts. Free to begin, grows as you do.',
    fact: 'Clock-in live on day one',
    cta: 'Explore for startups',
  },
  {
    id: 'midsize', tone: 'info', n: '02', name: 'Mid-sized businesses',
    body: 'Approvals that route themselves, and work visible across every team at once.',
    fact: 'Fifteen request types',
    cta: 'Explore for mid-size',
  },
  {
    id: 'operations', tone: 'warn', n: '03', name: 'Field & operations teams',
    body: 'Geofencing, remote and WFH statuses, and cases that carry an SLA and a clock.',
    fact: 'A geofence per site',
    cta: 'Explore for operations',
  },
  {
    id: 'enterprise', tone: 'ok', n: '04', name: 'Established organizations',
    body: 'The full staff record, the org chart, and device and document tracking in one place.',
    fact: 'Eleven tabs per person',
    cta: 'Explore for enterprise',
  },
  {
    id: 'consolidation', tone: 'accent', n: '05', name: 'System consolidation',
    body: 'One record instead of several tools, with Slack and Google already connected.',
    fact: 'Four tool categories',
    cta: 'Explore consolidation',
  },
];

export default function Audiences() {
  const track = useRef(null);
  const drag = useRef(null);
  const [p, setP] = useState(0);
  const [at, setAt] = useState(0);

  /* Depth falloff plus the progress bar, both from one measurement pass.

     Measured off viewport rectangles rather than offsetLeft, because the
     cards' offsetParent is the spotlight wrapper rather than the track, so
     offset arithmetic would silently be relative to the wrong box. */
  /* Focus is measured in CARD INDEX space, not in pixels.

     Two geometric attempts failed. A focal point pinned to the centre of the
     track meant card one could never be focused, because at scroll zero the
     middle of the viewport already falls on card two. Sliding that point
     across the viewport fixed the two ends but not the middle: the focus
     travels a full viewport width while the cards only travel maxScroll, and
     with five cards on a wide screen maxScroll is barely two cards, so the
     two rates disagree and some cards are skipped.

     Indexing removes the geometry from the question entirely. Scroll
     progress maps straight onto the card list, so card i is exactly in focus
     at progress i/(n-1), every card gets an equal share of the travel, and it
     holds at any viewport width because no pixel measurement is involved. */
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const prog = max > 0 ? el.scrollLeft / max : 0;

    const cards = el.querySelectorAll('.aud-card');
    const focusIdx = prog * (cards.length - 1);
    cards.forEach((c, i) => {
      const d = Math.min(1, Math.abs(i - focusIdx));
      c.style.setProperty('--d', d.toFixed(3));
    });
    setP(prog);
    setAt(Math.round(focusIdx));
  }, []);

  /* Explicit navigation. Snapping alone gave only three resting positions,
     because maxScroll is about two cards wide, so several cards could never
     be settled on. These scroll to a card by name. */
  const goTo = useCallback((i) => {
    const el = track.current;
    if (!el) return;
    const cards = el.querySelectorAll('.aud-card');
    const max = el.scrollWidth - el.clientWidth;
    const n = cards.length - 1;
    el.scrollTo({
      left: (Math.min(Math.max(i, 0), n) / n) * max,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; measure(); });
    };
    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  /* Drag to pan, for mouse users with no horizontal wheel. Touch is left to
     the browser, which already does this better than any handler can. */
  const down = useCallback((e) => {
    if (e.pointerType === 'touch') return;
    const el = track.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }, []);
  const move = useCallback((e) => {
    const el = track.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 3) d.moved = true;
    el.scrollLeft = d.left - dx;
  }, []);
  const up = useCallback((e) => {
    const el = track.current;
    if (el && drag.current) {
      el.classList.toggle('was-dragged', drag.current.moved);
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    }
    drag.current = null;
  }, []);

  return (
    <section className="aud" id="audiences">
      <div className="container aud-head">
        <div>
          <span className="sec-eyebrow">Solutions</span>
          <h2>Built for teams that don&apos;t work the same way.</h2>
        </div>
        <p className="sec-lede">
          However your business runs, StaffIntra bends to fit, not the other way round.
        </p>
      </div>

      {/* Full bleed: the track ignores the page's max width so the row runs
          off both edges. */}
      <div
        className="aud-track"
        ref={track}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="aud-row">
          {AUDIENCES.map((a) => (
            <Spotlight as="article" className="aud-card" key={a.id}>
              <div className="aud-card-in">
                <span className="aud-n">{a.n}</span>
                <ChipMark tone={a.tone} />
                <h3>{a.name}</h3>
                <p>{a.body}</p>
                <span className="aud-fact">{a.fact}</span>
                <a
                  className="turn-link"
                  href={`/solutions#${a.id}`}
                  onClick={(e) => {
                    if (track.current?.classList.contains('was-dragged')) e.preventDefault();
                  }}
                >
                  <TurnArrow />
                  {a.cta}
                </a>
              </div>
            </Spotlight>
          ))}
        </div>
      </div>

      <div className="container aud-foot">
        <div className="aud-dots" role="tablist" aria-label="Choose an audience">
          {AUDIENCES.map((a, i) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={i === at}
              aria-label={a.name}
              className={`aud-dot${i === at ? ' is-on' : ''}`}
              onClick={() => goTo(i)}
            >
              <span>{a.n}</span>
            </button>
          ))}
        </div>

        <div className="aud-bar" aria-hidden="true">
          <span style={{ '--p': p }} />
        </div>

        <div className="aud-arrows">
          <button type="button" aria-label="Previous" onClick={() => goTo(at - 1)} disabled={at === 0}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => goTo(at + 1)} disabled={at === AUDIENCES.length - 1}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
