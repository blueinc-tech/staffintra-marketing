'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './useReduced';
import './motion.css';

/* Headline treatments, after react-bits SplitText, BlurText and RotatingText.

   Rebuilt rather than copied for one structural reason: the originals split
   text into per-character spans in the DOM, which hands a screen reader a
   heading spelled out letter by letter. Here the real string stays in the
   accessibility tree and only the visual copy is split, so the heading reads
   as a heading. */

function useInView(reduced) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduced) {
      setOn(true);
      return undefined;
    }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setOn(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return [ref, on];
}

/* Words rise out of a clipping line. Reserved for one h1 per page. */
export function SplitText({ text, as: Tag = 'span', className = '', stagger = 52, start = 0 }) {
  const reduced = useReduced();
  const [ref, on] = useInView(reduced);
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`mo-split${on ? ' is-in' : ''} ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span className="mo-split-w" key={w + i}>
            <span className="mo-split-i" style={{ '--mo-d': `${start + i * stagger}ms` }}>
              {w}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* The quieter sibling: word-by-word blur-in, for secondary headings. */
export function BlurText({ text, as: Tag = 'span', className = '', stagger = 40 }) {
  const reduced = useReduced();
  const [ref, on] = useInView(reduced);
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={`mo-blur${on ? ' is-in' : ''} ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span className="mo-blur-w" key={w + i} style={{ '--mo-d': `${i * stagger}ms` }}>
            {w}
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* One line, one word cycling. It does real messaging work: it says "we cover
   your sector" in the space a list would need. Holds on the first word under
   reduced motion rather than cycling without animation, because a word
   silently swapping mid-sentence is worse than no effect. */
export function RotatingText({ words, interval = 2400, className = '' }) {
  const reduced = useReduced();
  const [at, setAt] = useState(0);
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  useEffect(() => {
    if (reduced) return undefined;
    const id = setInterval(() => setAt((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  return (
    <span className={`mo-rot ${className}`.trim()}>
      {/* Sizes the box to the longest word so the line never reflows. */}
      <span aria-hidden="true" style={{ visibility: 'hidden', height: 0, overflow: 'hidden' }}>
        {widest}
      </span>
      {words.map((w, i) => (
        <span
          key={w}
          data-s={i === at ? 'in' : i === (at - 1 + words.length) % words.length ? 'out' : 'wait'}
          aria-hidden={i === at ? undefined : 'true'}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
