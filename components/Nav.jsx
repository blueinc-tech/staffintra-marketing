'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#features', label: 'Features' },
  { href: '#customers', label: 'Customers' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`} id="top">
      <div className="nav-inner">
        <a className="nav-logo" href="#top" aria-label="StaffIntra home" onClick={close}>
          <img src="/assets/StaffIntra_Logo_Horizontal_Purple.svg" alt="staffintra" height={28} />
        </a>
        <nav className="nav-links" id="navLinks" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="btn btn-ghost" href="#" onClick={close}>
            Sign in
          </a>
          <a className="btn btn-primary btn-swap" href="#demo" onClick={close}>
            <span className="swap">
              <span>Book a demo</span>
              <span aria-hidden="true">Book a demo</span>
            </span>
          </a>
        </div>
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
