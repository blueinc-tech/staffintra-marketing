'use client';

import { useEffect, useState } from 'react';

export default function PillNav({
  logo,
  logoAlt = 'Company logo',
  items = [],
  activeHref = '/',
  className = '',
  ease = 'cubic-bezier(.22,.61,.36,1)',
  baseColor = '#ffffff',
  pillColor = '#17171C',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#17171C',
  theme = 'light',
  initialLoadAnimation = true,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
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

  const shellStyle = {
    '--pill-nav-base': baseColor,
    '--pill-nav-pill': pillColor,
    '--pill-nav-hover-text': hoveredPillTextColor,
    '--pill-nav-text': pillTextColor,
    '--pill-nav-ease': ease,
  };

  const close = () => setOpen(false);

  return (
    <div
      className={`pill-nav-shell ${className} ${scrolled ? 'is-scrolled' : ''} ${initialLoadAnimation ? 'is-animated' : ''} ${theme === 'dark' ? 'pill-nav-shell--dark' : ''}`.trim()}
      style={shellStyle}
    >
      <div className="pill-nav">
        <a className="pill-nav__logo" href="#top" aria-label="StaffIntra home" onClick={close}>
          {typeof logo === 'string' ? <img src={logo} alt={logoAlt} /> : logo}
        </a>

        <nav className="pill-nav__links" aria-label="Main navigation">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`pill-nav__link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="pill-nav__actions">
          <a className="pill-nav__ghost" href="#demo" onClick={close}>
            Demo
          </a>
          <a className="pill-nav__cta" href="#demo" onClick={close}>
            Book a demo
          </a>
        </div>

        <button
          type="button"
          className="pill-nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="pill-nav-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="pill-nav-mobile" className={`pill-nav__mobile${open ? ' is-open' : ''}`}>
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`pill-nav__mobile-link${isActive ? ' active' : ''}`}
              onClick={close}
            >
              {item.label}
            </a>
          );
        })}
        <a className="pill-nav__mobile-cta" href="#demo" onClick={close}>
          Book a demo
        </a>
      </div>
    </div>
  );
}
