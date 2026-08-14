'use client';

import { useEffect } from 'react';
import './AnchorFlash.css';

/* Acknowledges every in-page anchor click, including the ones that cannot
   scroll anywhere.

   The problem this solves: when a nav link points at a section that is
   already on screen, the browser scrolls zero pixels and nothing happens.
   The link is working perfectly and it reads as broken, which is worse than
   an error, because the visitor concludes the site is dead rather than that
   they have arrived.

   So the target is always marked, whether or not the page moved. The mark is
   a brief edge highlight on the section plus a rule that draws across under
   its heading. Both are decoration on a pseudo element, so no layout shifts
   and nothing reflows.

   It also re-fires on a repeat click of the same href, which :target alone
   cannot do because the hash has not changed. */

const FLASH = 'is-anchor-flash';
const HOLD = 1500;

export default function AnchorFlash() {
  useEffect(() => {
    let timer = 0;

    const mark = (el) => {
      if (!el) return;
      document.querySelectorAll('.' + FLASH).forEach((n) => n.classList.remove(FLASH));
      // Forces a reflow between removal and re-add, which is what lets the
      // same section flash twice in a row.
      void el.offsetWidth;
      el.classList.add(FLASH);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => el.classList.remove(FLASH), HOLD);
    };

    const onClick = (e) => {
      const a = e.target.closest?.('a[href*="#"]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const hash = href.slice(href.indexOf('#'));
      if (hash.length < 2) return;

      // Only same-page anchors. A link to /product#time from the home page is
      // a real navigation and the destination page handles its own arrival.
      const path = href.split('#')[0];
      if (path && path !== window.location.pathname && path !== '/') return;

      const el = document.getElementById(hash.slice(1));
      if (!el) return;

      const r = el.getBoundingClientRect();
      const settled = r.top > -40 && r.top < window.innerHeight * 0.55;

      if (settled) {
        // Already here. Nothing will move, so the flash IS the feedback.
        e.preventDefault();
        if (window.location.hash !== hash) {
          window.history.replaceState(null, '', hash);
        }
        mark(el);
      } else {
        // Let the browser scroll, then acknowledge on arrival.
        window.setTimeout(() => mark(el), 520);
      }
    };

    // Landing on a deep link should acknowledge itself too.
    if (window.location.hash.length > 1) {
      const el = document.getElementById(window.location.hash.slice(1));
      window.setTimeout(() => mark(el), 620);
    }

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
