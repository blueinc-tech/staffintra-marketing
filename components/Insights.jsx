'use client';

import { useEffect, useRef, useState } from 'react';
import { TurnArrow } from './PillarMarks';
import './Insights.css';

/* Our own resource titles, not claims about anyone. Cover art is a tinted
   panel with a mark rather than a stock photograph. */
const POSTS = [
  { id: 1, tone: 'a', title: 'Switching rota software: a practical guide', tags: ['Guide', 'Rota'] },
  { id: 2, tone: 'b', title: 'What the working time rules actually require', tags: ['Blog', 'Compliance'] },
  { id: 3, tone: 'c', title: 'Cutting agency spend without cutting cover', tags: ['Blog', 'Labour cost'] },
  { id: 4, tone: 'a', title: 'Onboarding seasonal staff: a checklist', tags: ['Guide', 'Onboarding'] },
  { id: 5, tone: 'b', title: 'Holiday accrual for irregular hours, explained', tags: ['Blog', 'Leave'] },
  { id: 6, tone: 'c', title: 'Rota clinic: a live session for operations leads', tags: ['Event', 'Online'] },
];

/* Line art, not chunky glyphs: at a heavy stroke these read as a blob sitting
   on a colour block. Thin and repeated, they read as a drawn cover. */
const COVERS = [
  <path key="a" d="M6 70V22M22 82V10M38 70V22M54 82V10M70 70V22M86 82V10M6 46h80" strokeWidth="2.2" />,
  <path key="b" d="M4 74h88M4 58h62M4 42h88M4 26h48M20 74V26M62 74V26" strokeWidth="2.2" />,
  <path key="c" d="M8 82 34 26l26 40 24-32M8 82h80M34 26v56M60 66v16" strokeWidth="2.2" />,
];

export default function Insights() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const [shift, setShift] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  /* The row travels sideways as the section travels up: progress runs from
     the moment the section's top reaches the bottom of the viewport to the
     moment its bottom leaves the top, and the track covers its own overflow
     across that span. */
  useEffect(() => {
    if (reduced) {
      setShift(0);
      return undefined;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = rootRef.current;
      const track = trackRef.current;
      if (!el || !track) return;
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight;
      const seen = Math.min(Math.max(window.innerHeight - r.top, 0), span);
      const overflow = Math.max(0, track.scrollWidth - el.clientWidth);
      setShift(-(seen / span) * overflow);
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
  }, [reduced]);

  return (
    <section className="insights" ref={rootRef} data-static={reduced ? '' : undefined}>
      <div
        className="ins-track"
        ref={trackRef}
        style={reduced ? undefined : { translate: `${shift}px 0` }}
      >
        <div className="ins-head">
          <h2>
            Insights
            <br />
            and events
          </h2>
          <a className="turn-link" href="#">
            <TurnArrow />
            View all
          </a>
        </div>

        {POSTS.map((post, i) => (
          <a className="ins-card" key={post.id} href="#" data-tone={post.tone}>
            <span className="ins-cover" aria-hidden="true">
              <span className="ins-weave" />
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="butt">
                {COVERS[i % COVERS.length]}
              </svg>
            </span>
            <h3>{post.title}</h3>
            <span className="ins-tags">
              {post.tags.map((t) => (
                <span className="ins-tag" key={t}>
                  {t}
                </span>
              ))}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
