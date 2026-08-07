'use client';

// Based on React Bits "PillNav" (shadcn registry: @react-bits/PillNav-TS-CSS).
// Adapted for this project:
//   - converted to JSX + 'use client' for the Next.js app router
//   - react-router-dom dropped: every link here is a same-page hash anchor
//   - logo hover no longer rotates the mark (brand guidelines list rotation as misuse)
//   - hover-circle colour decoupled from the bar colour, so the bar can stay light
//   - added a logoHref and an actions slot for the demo CTA
//   - honours prefers-reduced-motion

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

export default function PillNav({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = 'transparent',
  hoveredPillTextColor = '#fff',
  pillTextColor = '#17171C',
  hoverCircleColor,
  logoHref = '#top',
  actions = null,
  mobileActions = null,
  onMobileMenuClick,
  initialLoadAnimation = false,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const hoverTimer = useRef(null);
  const shellRef = useRef(null);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        if (!w || !h) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    // The display face loads async; remeasure once it lands or the pills mis-size.
    if (document.fonts?.ready) document.fonts.ready.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });

    if (initialLoadAnimation && !reduced()) {
      if (logoRef.current) {
        gsap.set(logoRef.current, { scale: 0 });
        gsap.to(logoRef.current, { scale: 1, duration: 0.6, ease });
      }
      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, { width: 0, overflow: 'hidden' });
        gsap.to(navItemsRef.current, { width: 'auto', duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl || reduced()) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl || reduced()) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
  };

  // The mark must not rotate (brand guidelines) — a small lift reads as responsive instead.
  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img || reduced()) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, { scale: 1.08, duration: 0.25, ease, overwrite: 'auto' });
  };

  const handleLogoLeave = () => {
    const img = logoImgRef.current;
    if (!img || reduced()) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, { scale: 1, duration: 0.25, ease, overwrite: 'auto' });
  };

  const closeMobile = () => {
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;
    const dur = reduced() ? 0 : 0.3;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: dur, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: dur, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: dur, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: dur, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: dur, ease, transformOrigin: 'top center' }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: reduced() ? 0 : 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        });
      }
    }

    onMobileMenuClick?.();
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') toggleMobileMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Dropdown: close on Escape or a click outside the header.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onDown = (e) => {
      if (shellRef.current && !shellRef.current.contains(e.target)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [openMenu]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const openWithIntent = (href) => {
    clearTimeout(hoverTimer.current);
    setOpenMenu(href);
  };
  const closeWithIntent = () => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor,
    '--hover-circle': hoverCircleColor || baseColor,
  };

  return (
    <div className={`pill-nav-container ${className}`.trim()} style={cssVars} ref={shellRef}>
      <nav className="pill-nav" aria-label="Primary">
        <a
          className="pill-logo"
          href={logoHref}
          aria-label="StaffIntra home"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          onClick={closeMobile}
          ref={logoRef}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} />
        </a>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list">
            {items.map((item, i) => {
              const hasMenu = Array.isArray(item.children) && item.children.length > 0;
              const isOpen = hasMenu && openMenu === item.href;
              const inner = (
                <>
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </>
              );

              return (
                <li
                  key={item.href}
                  onMouseEnter={hasMenu ? () => openWithIntent(item.href) : undefined}
                  onMouseLeave={hasMenu ? closeWithIntent : undefined}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      className={`pill pill-trigger${isOpen || activeHref === item.href ? ' is-active' : ''}`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={`pill-menu-${item.label.toLowerCase()}`}
                      onClick={() => setOpenMenu(isOpen ? null : item.href)}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onFocus={() => handleEnter(i)}
                      onBlur={() => handleLeave(i)}
                    >
                      {inner}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                      aria-label={item.ariaLabel || item.label}
                      aria-current={activeHref === item.href ? 'true' : undefined}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                      onFocus={() => handleEnter(i)}
                      onBlur={() => handleLeave(i)}
                    >
                      {inner}
                    </a>
                  )}

                  {hasMenu ? (
                    <div
                      id={`pill-menu-${item.label.toLowerCase()}`}
                      className={`pill-menu${isOpen ? ' is-open' : ''}`}
                      onMouseEnter={() => openWithIntent(item.href)}
                      onMouseLeave={closeWithIntent}
                    >
                      <div className="pill-menu-inner">
                        {item.children.map((child) => (
                          <a
                            key={child.href + child.label}
                            className="pill-menu-item"
                            href={child.href}
                            onClick={() => setOpenMenu(null)}
                          >
                            {child.icon ? (
                              <span className="pill-menu-icon" aria-hidden="true">
                                {child.icon}
                              </span>
                            ) : null}
                            <span className="pill-menu-text">
                              <strong>{child.label}</strong>
                              <span>{child.description}</span>
                            </span>
                          </a>
                        ))}
                      </div>
                      {item.menuFooter ? (
                        <div className="pill-menu-footer">{item.menuFooter}</div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>

        {actions ? <div className="pill-nav-actions desktop-only">{actions}</div> : null}

        <button
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="pill-nav-mobile"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div id="pill-nav-mobile" className="mobile-menu-popover mobile-only" ref={mobileMenuRef}>
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                aria-current={activeHref === item.href ? 'true' : undefined}
                onClick={toggleMobileMenu}
              >
                {item.label}
              </a>
              {Array.isArray(item.children) && item.children.length > 0 ? (
                <ul className="mobile-submenu">
                  {item.children.map((child) => (
                    <li key={child.href + child.label}>
                      <a
                        href={child.href}
                        className="mobile-submenu-link"
                        onClick={toggleMobileMenu}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        {mobileActions ? (
          <div className="mobile-menu-actions" onClick={toggleMobileMenu}>
            {mobileActions}
          </div>
        ) : null}
      </div>
    </div>
  );
}
