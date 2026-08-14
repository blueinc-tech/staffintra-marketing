/* The retraction decision, kept pure so it can be tested without a browser.

   It was originally inline in the effect, and a real bug hid there: the
   noise gate sat ahead of the above-fold check, so if the last scroll
   movement was under a few pixels, which is exactly what happens as momentum
   decays into the top of the page, the function returned early and left the
   header retracted at scroll zero. The early return also skipped updating
   `last`, so every following small movement was measured against a stale
   position and it could stay stranded.

   Order matters here, and the order is:
     1. above the fold, always show, before anything can return early
     2. a menu is open, hold still and show
     3. only then ignore jitter
     4. otherwise, direction decides */

export const BAR = 64;
export const NOISE = 6;

/* The floor only exists for pages with no first section to measure. It is
   never the real answer: see armPoint below. */
export const ARM_FLOOR = 220;

/* Where retraction is allowed to begin.

   The first version used a flat 220px, which was a number I invented. On the
   home page the hero is 666px tall, so the header was vanishing a third of
   the way through the one section it most belongs to, and in a short window
   220px is half the viewport. Both look broken, and rightly.

   The arm point is the bottom of the first section instead. Measured, so it
   is correct on every page and at every window height without a table of
   magic numbers, and it means the rule is simply: the header stays while you
   are still on the opening screen, and may retract once you have left it. */
export function armPoint(doc = typeof document !== 'undefined' ? document : null, vh = 0) {
  const first = doc && doc.querySelector('main > section, main > *');
  if (first) {
    const r = first.getBoundingClientRect();
    const bottom = r.top + (doc.defaultView?.scrollY || 0) + r.height;
    if (bottom > ARM_FLOOR) return bottom;
  }
  return Math.max(ARM_FLOOR, vh * 0.9);
}

export function decide({ y, last, hidden, busy, armAt = ARM_FLOOR }) {
  if (y < armAt) return { hidden: false, last: y };
  if (busy) return { hidden: false, last: y };
  const dy = y - last;
  if (Math.abs(dy) < NOISE) return { hidden, last };
  return { hidden: dy > 0, last: y };
}
