'use client';

import { useEffect, useState } from 'react';

/* One reduced-motion source for every animated component on the site.

   The react-bits originals almost all animate unconditionally: 22 of their
   166 files check this at all. Rather than patch each adopted component in
   its own way, they all read this hook and jump straight to their end state
   when it returns true.

   It starts false and corrects after mount on purpose. Reading matchMedia
   during render would differ between the static export and the browser, and
   a hydration mismatch on every animated element is a worse failure than one
   frame of motion for a user who asked for none. Every consumer is written
   so that `true` means "render the finished state", never "render nothing". */
export default function useReduced() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return reduced;
}
