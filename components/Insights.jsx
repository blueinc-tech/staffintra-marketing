'use client';

import { useCallback, useRef } from 'react';
import { TurnArrow } from './PillarMarks';
import './Insights.css';

/* Our own resource titles, not claims about anyone. Cover art is a tinted
   panel with a line drawing rather than a stock photograph. */
const POSTS = [
  { id: 1, tone: 'a', title: 'Switching workforce platforms: a migration guide', tags: ['Guide', 'Migration'] },
  { id: 2, tone: 'b', title: 'What NDPR means for your staff records', tags: ['Blog', 'Compliance'] },
  { id: 3, tone: 'c', title: 'Work logs people actually fill in', tags: ['Blog', 'Productivity'] },
  { id: 4, tone: 'a', title: 'Consolidating your stack without losing a week', tags: ['Guide', 'Operations'] },
  { id: 5, tone: 'b', title: 'Payroll deductions in Nigeria, handled right', tags: ['Blog', 'Payroll'] },
  { id: 6, tone: 'c', title: 'Ops clinic: a live session for operations leads', tags: ['Event', 'Online'] },
];

const COVERS = [
  <path key="a" d="M6 70V22M22 82V10M38 70V22M54 82V10M70 70V22M86 82V10M6 46h80" strokeWidth="2.2" />,
  <path key="b" d="M4 74h88M4 58h62M4 42h88M4 26h48M20 74V26M62 74V26" strokeWidth="2.2" />,
  <path key="c" d="M8 82 34 26l26 40 24-32M8 82h80M34 26v56M60 66v16" strokeWidth="2.2" />,
];

export default function Insights() {
  const trackRef = useRef(null);
  const drag = useRef(null);

  /* Drag to pan, for mouse users who have no horizontal wheel. The row is a
     real scroll container, so trackpads, shift+wheel, touch and the keyboard
     all work without any of this. Nothing here listens to page scroll: an
     earlier version moved the row as the page scrolled, which took the
     sideways motion out of the reader's hands. */
  const onPointerDown = useCallback((e) => {
    if (e.pointerType === 'touch') return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 3) d.moved = true;
    el.scrollLeft = d.left - dx;
  }, []);

  const endDrag = useCallback((e) => {
    const el = trackRef.current;
    if (el && drag.current) {
      el.classList.toggle('was-dragged', drag.current.moved);
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
    }
    drag.current = null;
  }, []);

  return (
    <section className="insights">
      <div className="container">
        <div className="ins-head">
          <h2>Insights and events</h2>
          <a className="turn-link" href="#">
            <TurnArrow />
            View all
          </a>
        </div>
      </div>

      <div
        className="ins-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="ins-row">
          {POSTS.map((post, i) => (
            <a
              className="ins-card"
              key={post.id}
              href="#"
              data-tone={post.tone}
              onClick={(e) => {
                // A drag that ended on a card should not follow the link.
                if (trackRef.current?.classList.contains('was-dragged')) e.preventDefault();
              }}
            >
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
      </div>
    </section>
  );
}
