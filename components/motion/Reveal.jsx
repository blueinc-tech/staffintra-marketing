'use client';

import { useEffect, useRef, useState } from 'react';
import useReduced from './useReduced';
import './motion.css';

/* Section reveal, after react-bits AnimatedContent and FadeContent, rebuilt
   on an IntersectionObserver instead of GSAP ScrollTrigger.

   The originals pull gsap plus the ScrollTrigger plugin to do what an
   observer and a CSS transition already do. We do ship gsap now, but it is
   worth spending on the things only gsap can do (character-level splitting,
   scrub-linked scroll) rather than on a fade. This keeps the commonest
   wrapper on the site free.

   `blurOnly` is the FadeContent behaviour: opacity and blur, no movement,
   for blocks below the fold that should settle rather than travel.

   Distances stay small by default. The house style is restrained, and a
   40px slide reads as a website announcing itself. */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  distance = 18,
  blurOnly = false,
  once = true,
  ...rest
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const reduced = useReduced();

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
          if (once) io.disconnect();
        } else if (!once) {
          setOn(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, reduced]);

  return (
    <Tag
      ref={ref}
      className={`mo-reveal${blurOnly ? ' mo-reveal--soft' : ''}${on ? ' is-in' : ''} ${className}`.trim()}
      style={{ '--mo-d': `${delay}ms`, '--mo-y': `${distance}px` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
