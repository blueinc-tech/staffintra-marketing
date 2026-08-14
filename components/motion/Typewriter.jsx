'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './useReduced';
import './Typewriter.css';

/* A query typing itself into the mocked product search.

   Deliberately scoped to inside a product illustration. A typewriter on a
   marketing headline reads as a developer portfolio; a typewriter inside a
   depicted UI reads as somebody using the product, which is the one place the
   effect actually carries meaning.

   Renders the first phrase at rest, so with no script or no motion the search
   field still looks like a search field with a query in it. */

export default function Typewriter({ phrases, className = '' }) {
  const ref = useRef(null);
  const [txt, setTxt] = useState(phrases[0]);
  const [on, setOn] = useState(false);
  const reduced = useReduced();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!on || reduced) return undefined;
    let i = 0;
    let n = 0;
    let back = false;
    let timer = 0;

    const step = () => {
      const full = phrases[i];
      n = back ? n - 1 : n + 1;
      setTxt(full.slice(0, n));

      let wait = back ? 34 : 72;
      if (!back && n === full.length) { back = true; wait = 2100; }
      else if (back && n === 0) { back = false; i = (i + 1) % phrases.length; wait = 420; }
      timer = window.setTimeout(step, wait);
    };

    setTxt('');
    n = 0;
    timer = window.setTimeout(step, 700);
    return () => window.clearTimeout(timer);
  }, [on, phrases, reduced]);

  return (
    <span className={`tw ${className}`.trim()} ref={ref}>
      {txt}
      {on && !reduced ? <i className="tw-caret" aria-hidden="true" /> : null}
    </span>
  );
}
