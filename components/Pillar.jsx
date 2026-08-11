'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PillarMoment from './PillarMoment';
import { EyebrowGlyph, TurnArrow, StoryArrow } from './PillarMarks';

/* How long each sub-feature holds before the next one takes over. The
   reference sits at roughly five seconds; long enough to read the moment,
   short enough that the row visibly progresses while you are on the panel.

   A step can override it, and one has to: the rota builder step plays a 20.8
   second recording, and on the shared dwell the carousel moved on a quarter
   of the way through it every time. */
const DWELL = 5200;
const RING = 39.27; // 2πr for r=6.25, the ring's circumference

export default function Pillar({ pillar }) {
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // The carousel only runs while its own panel is on screen, so three timers
  // are never competing for attention off-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Re-armed on every step change, so a click restarts the dwell rather than
  // inheriting whatever was left of the previous one.
  const active = pillar.steps[step];
  const dwell = active.dwell ?? DWELL;
  const isVideo = active.moment.shape === 'video';

  const next = useCallback(
    () => setStep((s) => (s + 1) % pillar.steps.length),
    [pillar.steps.length]
  );

  /* A clip advances on its own `ended`, not on a timer. Timing it meant the
     clip had to loop back to frame 0 and play its opening again before the
     step changed, which is the restart flicker. The timer stays as a backstop
     only, in case playback never starts or stalls. */
  useEffect(() => {
    if (!inView || reduced) return undefined;
    const id = setTimeout(next, isVideo ? dwell + 3000 : dwell);
    return () => clearTimeout(id);
  }, [inView, reduced, step, dwell, isVideo, next]);

  return (
    <article className="pillar" id={`pillar-${pillar.id}`} ref={rootRef} data-tone={pillar.tone}>
      <div className="pillar-row">
        <div className="pillar-copy">
          <span className="pillar-eyebrow">
            <span className="pe-chip">
              <EyebrowGlyph tone={pillar.tone} />
            </span>
            {pillar.name}
          </span>

          <div className="pillar-rule" aria-hidden="true" />

          <h2>{pillar.headline}</h2>
          <p>{pillar.body}</p>

          <a className="pillar-more" href={pillar.href}>
            <TurnArrow />
            Learn more
          </a>

          {/* Tablist rather than links: this switches the panel's visual in
              place, it does not navigate. */}
          <div className="pillar-steps" role="tablist" aria-label={`${pillar.name} features`}>
            {pillar.steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === step}
                className={`pstep${i === step ? ' is-on' : ''}`}
                onClick={() => setStep(i)}
              >
                {i === step ? (
                  <svg className="pstep-ring" viewBox="0 0 16 16" fill="none" aria-hidden="true" key={step}>
                    <circle cx="8" cy="8" r="6.25" stroke="var(--line-strong)" strokeWidth="1.5" />
                    <circle
                      className="arc"
                      cx="8"
                      cy="8"
                      r="6.25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray={RING}
                      style={{ '--ring': RING, '--dwell': `${dwell}ms` }}
                    />
                  </svg>
                ) : null}
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pillar-visual">
          <span className="pv-texture" aria-hidden="true" />
          <span className="pv-shape" aria-hidden="true" />
          {/* Keyed so each moment fades in as its own element. */}
          {/* Every step is its own layer and they all stay mounted, so a switch
              is a crossfade rather than an unmount and a fade-in. Remounting
              showed bare panel between clips and restarted the incoming video
              from its poster. Only the active layer plays. */}
          {pillar.steps.map((s, i) => (
            <div
              key={s.label}
              className={
                `pv-layer${i === step ? ' is-on' : ''}` +
                `${s.moment.shape === 'video' ? ' pv-layer--full' : ''}`
              }
            >
              <PillarMoment
                moment={s.moment}
                playing={i === step && inView && !reduced}
                onDone={i === step ? next : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      {pillar.story ? (
        <a className="pillar-story" href="#customers">
          <span className="ps-label">{pillar.storyLabel}</span>
          <span className="ps-text">
            {pillar.story}
            <StoryArrow />
          </span>
        </a>
      ) : null}
    </article>
  );
}
