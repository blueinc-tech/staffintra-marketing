'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp';
import StoryArt from './StoryArt';
import { TurnArrow } from './PillarMarks';
import './Stories.css';

/* Placeholder stories: a sector, a generic outcome, and profile chips. No
   organisation is named and none is implied, per the same rule the customer
   band follows. Real stories drop straight into this shape.

   `tone` sets a PAIR of surfaces, not one. On the reference both halves of a
   story are toned together and a dark half inverts its copy and its chips;
   one story runs light and the next runs deep. Ours keeps the pairs inside
   the purple family plus ink. */
const STORIES = [
  {
    id: 'care',
    tone: 'light',
    sector: 'Care',
    headline: 'How a care group cut rota admin from a full evening to under an hour',
    profile: ['120 people', '3 sites', 'Payroll export', 'Agency cover'],
    where: ['North West', 'Yorkshire'],
  },
  {
    id: 'retail',
    tone: 'deep',
    sector: 'Retail',
    headline: 'How a multi-site retailer brought approvals down to the same shift',
    profile: ['340 people', '12 stores', 'Open shifts', 'Bank holidays'],
    where: ['London', 'South East'],
  },
  {
    id: 'hospitality',
    tone: 'ink',
    sector: 'Hospitality',
    headline: 'How a hospitality group onboarded 60 seasonal starters in one week',
    profile: ['60 starters', 'Right to work', 'Onboarding journeys'],
    where: ['Scotland', 'North East'],
  },
];

const DWELL = 7400;

/* Stands in for a customer's mark. Same neutral device as the customer band,
   so a placeholder never reads as a real logo. */
function StoryMark() {
  return (
    <svg className="story-mark" viewBox="0 0 76 22" fill="none" aria-hidden="true">
      <rect x="0.5" y="2.5" width="15" height="15" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 14.5 8 6.5l4 8" stroke="currentColor" strokeWidth="1.3" />
      <rect x="23" y="5" width="42" height="4" rx="1" fill="currentColor" opacity=".42" />
      <rect x="23" y="12" width="27" height="3.4" rx="1" fill="currentColor" opacity=".24" />
    </svg>
  );
}

export default function Stories() {
  const rootRef = useRef(null);
  const [at, setAt] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return undefined;
    const id = setTimeout(() => setAt((i) => (i + 1) % STORIES.length), DWELL);
    return () => clearTimeout(id);
  }, [inView, reduced, at]);

  const s = STORIES[at];

  return (
    <section className="stories" id="customers" ref={rootRef}>
      <div className="container">
        <header className="sec-head sec-head--mid sec-head--tight">
          <h2>
            We&apos;ve helped <CountUp className="count-inline" value={900} suffix="+" /> teams get
            their week back.
          </h2>
          <a className="btn btn-secondary stories-all" href="#customers">
            View all stories
          </a>
        </header>

        {/* Keyed so each story fades in as its own element. */}
        <article className="story" key={s.id} data-tone={s.tone}>
          <div className="story-copy">
            <StoryMark />
            <span className="story-tag">{s.sector}</span>
            <h3>{s.headline}</h3>
            <a className="turn-link" href="#customers">
              <TurnArrow />
              Read more
            </a>

            <div className="story-meta">
              <span className="story-label">Company profile</span>
              <div className="story-chips">
                {s.profile.map((c) => (
                  <span className="story-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
              <span className="story-label">Working in</span>
              <div className="story-chips">
                {s.where.map((c) => (
                  <span className="story-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* The reference masks a customer video in here. We have none, and
              an empty colour block is not a design, so the cut carries a
              drawing rather than a play button promising something that does
              not exist. */}
          <div className="story-visual">
            <span className="story-weave" aria-hidden="true" />
            <span className="story-cut" aria-hidden="true">
              <StoryArt />
            </span>
          </div>
        </article>

        <button
          type="button"
          className="band-bar story-next"
          onClick={() => setAt((i) => (i + 1) % STORIES.length)}
        >
          {/* Doubles as the dwell indicator: the fill is the timer. */}
          <span
            className="story-progress"
            key={`${s.id}-${inView}-${reduced}`}
            style={{ '--dwell': `${DWELL}ms` }}
            data-run={inView && !reduced ? '' : undefined}
            aria-hidden="true"
          />
          <span>Next story</span>
        </button>
      </div>
    </section>
  );
}
