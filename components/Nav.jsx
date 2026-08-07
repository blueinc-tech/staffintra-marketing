'use client';

import { useEffect, useState } from 'react';
import PillNav from './PillNav';

const icons = {
  rota: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="16" rx="1" />
      <path d="M3 9.5h18M8 3v3M16 3v3M7 13.5h5M7 17h8" />
    </svg>
  ),
  approvals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l4.5 4.5L20 6" />
    </svg>
  ),
  onboarding: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  ),
};

// "Platform" opens a menu of the three product areas. Every entry is a real
// anchor into the page — no pages are implied that do not exist.
const LINKS = [
  {
    href: '#product',
    label: 'Platform',
    children: [
      {
        href: '#product',
        label: 'Scheduling & shifts',
        description: 'Build the rota, catch clashes, publish to every phone at once.',
        icon: icons.rota,
      },
      {
        href: '#product',
        label: 'Leave & approvals',
        description: 'Balances, cover, and policy in view, so answers take seconds.',
        icon: icons.approvals,
      },
      {
        href: '#product',
        label: 'Onboarding journeys',
        description: 'Paperwork, sign-off, and introductions sequenced before day one.',
        icon: icons.onboarding,
      },
    ],
    menuFooter: (
      <>
        Everything else the workspace does — time tracking, reporting, permissions —{' '}
        <a href="#features">is in the features grid</a>.
      </>
    ),
  },
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
