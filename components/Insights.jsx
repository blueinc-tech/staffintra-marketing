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

const COVERS = [
  <path key="a" d="M12 74V26M34 86V14M56 74V26M78 86V14M100 74V26" strokeWidth="7" />,
  <path key="b" d="M10 78h80M10 58h60M10 38h80M10 18h44" strokeWidth="7" />,
  <path key="c" d="M14 82 50 18l36 64M30 60h40" strokeWidth="7" />,
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
