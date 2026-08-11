'use client';

import { useEffect, useRef } from 'react';

/* One product moment: the white card that sits on the coloured panel.

   Five drawn shapes cover eleven of the twelve moments — the card chrome never
   changes, only what is inside it, so adding one is a data change in
   pillarData.jsx rather than a new component.

   The twelfth is real footage of the rota builder, which needs no card around
   it and gets its own treatment below. */

function Rota({ m }) {
  return (
    <>
      <div className="pm-head">
        <span className="pm-title">{m.title}</span>
        <span className="pm-chip pm-chip--accent">{m.chip}</span>
      </div>
      <div className="pm-rota">
        {m.rows.map((r) => (
          <div className="pm-rota-row" key={r.day}>
            <span className="pm-day">{r.day}</span>
            <span className="pm-track">
              {r.shifts.map((s) => (
                <span
                  className={`pm-shift k-${s.k}`}
                  key={s.t + s.l}
                  style={{ '--l': `${s.l * 100}%`, '--w': `${s.w * 100}%` }}
                >
                  {s.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function List({ m }) {
  return (
    <>
      <div className="pm-head">
        <span className="pm-title">{m.title}</span>
        <span className="pm-meta">{m.meta}</span>
      </div>
      <div className="pm-list">
        {m.rows.map((r) => (
          <div className="pm-row" key={r.name}>
            <span className="pm-row-txt">
              <strong>{r.name}</strong>
              <span>{r.meta}</span>
            </span>
            <span className={`pm-chip pm-chip--${r.tone}`}>{r.chip}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Timer({ m }) {
  return (
    <>
      <div className="pm-head">
        <span className="pm-title">{m.title}</span>
        <span className="pm-meta">{m.site}</span>
      </div>
      <div className="pm-timer">
        <span className="pm-clock">{m.time}</span>
        <span className="pm-note">
          <span className="pm-tick" aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.2 4.9 8.6 9.5 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          {m.note}
        </span>
      </div>
      <span className="pm-action">{m.action}</span>
    </>
  );
}

function Bars({ m }) {
  return (
    <>
      <div className="pm-head">
        <span className="pm-title">{m.title}</span>
        <span className="pm-meta">{m.meta}</span>
      </div>
      <div className="pm-bars">
        {m.rows.map((r) => (
          <div className="pm-bar-row" key={r.label}>
            <span className="pm-bar-label">{r.label}</span>
            <span className="pm-bar">
              <span style={{ '--p': `${r.p * 100}%` }} />
            </span>
            <span className="pm-bar-value">{r.value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function Steps({ m }) {
  return (
    <>
      <div className="pm-head">
        <span className="pm-title">{m.title}</span>
        <span className="pm-pct">{m.pct}</span>
      </div>
      <span className="pm-meta pm-meta--under">{m.note}</span>
      <div className="pm-steps">
        {m.rows.map((r, i) => (
          <div className={`pm-step${r.s ? ` is-${r.s}` : ''}`} key={r.t}>
            <span className="pm-step-mark" aria-hidden="true">
              {r.s === 'done' ? (
                <svg viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.2 4.9 8.6 9.5 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            {r.t}
          </div>
        ))}
      </div>
    </>
  );
}

/* Real product footage. It only plays while it is on screen, and it is not
   fetched at all until then: at 1.8MB this should not be on the critical path
   for a visitor who never scrolls to it. Muted and playsInline because no
   browser will autoplay otherwise, and left on its poster entirely under
   reduced motion. */
function Video({ m }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="pm-video"
      src={m.src}
      poster={m.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={m.alt}
    />
  );
}

const SHAPES = { rota: Rota, list: List, timer: Timer, bars: Bars, steps: Steps, video: Video };

export default function PillarMoment({ moment }) {
  const Shape = SHAPES[moment.shape];
  if (!Shape) return null;
  // Footage carries its own frame; wrapping it in the card would put a white
  // border round a screen recording that already has one.
  if (moment.shape === 'video') return <Shape m={moment} />;
  return (
    <div className={`pm-card pm-card--${moment.shape}`}>
      <Shape m={moment} />
    </div>
  );
}
