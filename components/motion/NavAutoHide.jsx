'use client';

import { useEffect } from 'react';

/* Retracts the header on the way down the page and brings it back on the way
   up.

   The point is room: a full-height band like the coverage globe loses 64px of
   its own height to a bar the reader is not using while they are reading it.
   Retracting on descent hands that back, and returning on ascent means the
   nav is there the instant somebody reaches for it, which is the only moment
   they want it.

   It publishes ONE number, --nav-shift on the document element, and both the
   header and every bar that parks beneath it are positioned from that. Before
   this there were five separate hardcoded 64s and 88s across four
   stylesheets and a JS constant, and any of them could drift.

   Three things hold it still on purpose:
     - it never hides above the fold, where the bar is part of the page
     - it never hides while a menu is open, which would tear the panel off
       its trigger
     - it ignores movements under a few pixels, so a trackpad's jitter or the
       rubber band at the end of a page cannot flicker it */

const BAR = 64;
const ARM_AT = 220;
const NOISE = 6;

export default function NavAutoHide() {
  useEffect(() => {
    const root = document.documentElement;
    let last = window.scrollY;
    let frame = 0;
    let hidden = false;

    const apply = (next) => {
      if (next === hidden) return;
      hidden = next;
      root.style.setProperty('--nav-shift', next ? `-${BAR}px` : '0px');
      root.dataset.nav = next ? 'away' : 'here';
    };

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const dy = y - last;
      if (Math.abs(dy) < NOISE) return;

      // A menu is open, or the mobile sheet is: the header stays put.
      const busy = document.querySelector('.nav-root[data-open], .nav-root[data-mobile-open]');
      if (busy) { last = y; apply(false); return; }

      if (y < ARM_AT) apply(false);
      else apply(dy > 0);
      last = y;
    };

    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    root.style.setProperty('--nav-shift', '0px');
    root.dataset.nav = 'here';
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      root.style.removeProperty('--nav-shift');
      delete root.dataset.nav;
    };
  }, []);

  return null;
}
