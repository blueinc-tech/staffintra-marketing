'use client';

import { useEffect, useState } from 'react';
import PillNav from './PillNav';

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#customers', label: 'Customers' },
];

export default function Nav() {
  const [activeHref, setActiveHref] = useState(null);

  // Light scroll spy: whichever linked section owns the upper third of the
  // viewport is the active pill. Nothing is active while the hero is in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        if (!visible.size) {
          setActiveHref(null);
          return;
        }
        const topId = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
        setActiveHref(`#${topId}`);
      },
      { rootMargin: '-72px 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header id="top">
      {/* Brand guidelines put the horizontal lockup in the website header. */}
      <PillNav
        logo="/assets/StaffIntra_Logo_Horizontal_Purple.svg"
        logoAlt="StaffIntra"
        items={LINKS}
        activeHref={activeHref}
        logoHref="#top"
        className="site-pill-nav"
        ease="power3.easeOut"
        baseColor="#FFFFFF"
        pillColor="transparent"
        pillTextColor="#17171C"
        hoveredPillTextColor="#FFFFFF"
        hoverCircleColor="#4024C0"
        initialLoadAnimation={false}
        actions={
          <>
            <a className="btn btn-nav btn-nav-ghost btn-swap" href="#">
              <span className="swap">
                <span>Log in</span>
                <span aria-hidden="true">Log in</span>
              </span>
            </a>
            <a className="btn btn-primary btn-swap btn-nav" href="#demo">
              <span className="swap">
                <span>Book a demo</span>
                <span aria-hidden="true">Book a demo</span>
              </span>
            </a>
          </>
        }
        mobileActions={
          <>
            <a className="btn btn-secondary btn-lg" href="#">
              Log in
            </a>
            <a className="btn btn-primary btn-lg" href="#demo">
              Book a demo
            </a>
          </>
        }
      />
    </header>
  );
}
