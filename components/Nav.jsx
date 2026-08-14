'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './navData';
import Brand from './Brand';
import './Nav.css';

// Timings follow the Stripe/Radix conventions: hover-intent before the first
// open, instant switching once open, and a grace period on the way out.
const OPEN_DELAY = 150;
const CLOSE_DELAY = 150;
const SKIP_DELAY = 300;
const FADE_MS = 170;

const whenMouse = (fn) => (e) => {
  if (e.pointerType === 'mouse') fn(e);
};

/* ---------------- menu body renderers ---------------- */

function MenuRow({ item }) {
  return (
    <a className="mm-row" href={item.href}>
      <span className="mm-row-mark" aria-hidden="true">
        {item.mark}
      </span>
      <span className="mm-row-label">{item.label}</span>
    </a>
  );
}

function ColumnsMenu({ menu }) {
  return (
    <div className="mm-columns" style={{ '--cols': menu.groups.reduce((n, g) => n + g.span, 0) }}>
      <div className="mm-heads">
        {menu.groups.map((g) => (
          <div className="mm-head" key={g.heading} style={{ '--span': g.span }}>
            {g.heading}
          </div>
        ))}
      </div>
      <div className="mm-cols">
        {menu.groups.flatMap((g, gi) =>
          g.columns.map((col, ci) => (
            <div
              /* Columns inside a group are separated by a dashed rule; the
                 boundary between groups is solid. */
              className={`mm-col${
                ci === g.columns.length - 1 && gi < menu.groups.length - 1 ? ' is-group-end' : ''
              }`}
              key={g.heading + ci}
            >
              {col.feature ? (
                <a className="mm-feature" href={col.feature.href}>
                  <span className="mm-row-mark" aria-hidden="true">
                    {col.feature.mark}
                  </span>
                  <span className="mm-feature-text">
                    <strong>{col.feature.label}</strong>
                    <span>{col.feature.description}</span>
                  </span>
                </a>
              ) : null}
              {col.items.map((item) => (
                <MenuRow item={item} key={item.label} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function IntroMenu({ menu }) {
  return (
    <div className="mm-intro-wrap">
      <div className="mm-intro">
        <strong>{menu.intro.title}</strong>
        <span>{menu.intro.description}</span>
      </div>
      <div className="mm-intro-list">
        {menu.items.map((item) => (
          <MenuRow item={item} key={item.label} />
        ))}
      </div>
    </div>
  );
}

function ResourcesMenu({ menu }) {
  return (
    <div className="mm-resources">
      <div className="mm-intro mm-intro--mark">
        {menu.intro.mark ? (
          <span className="mm-row-mark" aria-hidden="true">
            {menu.intro.mark}
          </span>
        ) : null}
        <span className="mm-intro-text">
          <strong>{menu.intro.title}</strong>
          <span>{menu.intro.description}</span>
        </span>
      </div>
      <div className="mm-res-col">
        <div className="mm-head mm-head--inline">{menu.byType.heading}</div>
        {menu.byType.items.map((item) => (
          <a className="mm-row mm-row--plain" href={item.href} key={item.label}>
            <span className="mm-row-label">{item.label}</span>
          </a>
        ))}
      </div>
      <div className="mm-res-col mm-res-col--featured">
        <div className="mm-head mm-head--inline">{menu.featured.heading}</div>
        {/* Artwork is the card; the title sits on top of it. */}
        <a className="mm-featured" href={menu.featured.href}>
          <span className="mm-featured-art" aria-hidden="true">
            <svg viewBox="0 0 260 150" fill="none">
              <g stroke="#6E58D8" strokeWidth="1.6" strokeLinejoin="miter" strokeLinecap="butt">
                {/* isometric slabs, echoing the hero artwork */}
                <path d="M150 40 L196 13 L242 40 L196 67 Z" />
                <path d="M150 40 L150 54 L196 81 L196 67 Z" />
                <path d="M242 40 L242 54 L196 81 L196 67 Z" />
                <path d="M118 78 L164 51 L210 78 L164 105 Z" />
                <path d="M118 78 L118 92 L164 119 L164 105 Z" />
                <path d="M210 78 L210 92 L164 119 L164 105 Z" />
                <g opacity=".55">
                  <path d="M172 40 L196 26" />
                  <path d="M184 47 L208 33" />
                  <path d="M140 78 L164 64" />
                  <path d="M152 85 L176 71" />
                </g>
                <path d="M8 132 L252 -6" strokeDasharray="5 7" opacity=".4" />
              </g>
            </svg>
          </span>
          <span className="mm-featured-title">{menu.featured.title}</span>
        </a>
      </div>
    </div>
  );
}

function MenuBody({ menu }) {
  if (menu.type === 'columns') return <ColumnsMenu menu={menu} />;
  if (menu.type === 'resources') return <ResourcesMenu menu={menu} />;
  return <IntroMenu menu={menu} />;
}

/* ---------------- nav ---------------- */

export default function Nav() {
  const [activeId, setActiveId] = useState(null);
  const [leavingId, setLeavingId] = useState(null);
  const [morphing, setMorphing] = useState(false);
  const [dir, setDir] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);

  const rootRef = useRef(null);
  const barRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRefs = useRef({});
  const panelRefs = useRef({});
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const skipTimer = useRef(null);
  const leaveTimer = useRef(null);
  const isOpenDelayed = useRef(true);
  const suppress = useRef(false);
  const wasOpen = useRef(false);
  const prevIndex = useRef(-1);

  const menuItems = NAV_ITEMS.filter((i) => i.menu);
  const triggerIds = NAV_ITEMS.map((i) => i.id);

  /* Measure with offsetWidth/Height: unlike getBoundingClientRect these ignore
     transforms, so a measurement taken mid-morph can't feed back on itself. */
  const layout = useCallback((id) => {
    const content = panelRefs.current[id];
    const trigger = triggerRefs.current[id];
    const root = rootRef.current;
    const bar = barRef.current;
    const panel = panelRef.current;
    if (!content || !trigger || !root || !bar || !panel) return;

    // The framed contents sit inset from the panel edge, so the panel is the
    // frame plus that gap on every side.
    const gap = parseFloat(getComputedStyle(panel).getPropertyValue('--gap')) || 0;
    const w = content.offsetWidth + gap * 2;
    const h = content.offsetHeight + gap * 2;

    const rootRect = root.getBoundingClientRect();
    const barRect = bar.getBoundingClientRect();
    const barCS = getComputedStyle(bar);

    // Clamp to the nav's own content box, not the viewport: the panel should
    // never run wider than the bar above it.
    const left = barRect.left + parseFloat(barCS.paddingLeft) - rootRect.left;
    const right = barRect.right - parseFloat(barCS.paddingRight) - rootRect.left;

    const tRect = trigger.getBoundingClientRect();
    const centre = tRect.left + tRect.width / 2 - rootRect.left;
    const x = Math.min(Math.max(centre - w / 2, left), Math.max(left, right - w));

    panel.style.setProperty('--x', `${x}px`);
    panel.style.setProperty('--w', `${w}px`);
    panel.style.setProperty('--h', `${h}px`);
  }, []);

  /* First open places the panel with transitions suppressed, or it would appear
     to grow out of the left edge. Only a switch animates. */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!activeId || !panel) return;
    if (!wasOpen.current) {
      panel.setAttribute('data-instant', '');
      layout(activeId);
      void panel.offsetWidth;
      panel.removeAttribute('data-instant');
      wasOpen.current = true;
    } else {
      layout(activeId);
    }
  }, [activeId, layout]);

  useEffect(() => {
    if (!activeId) return undefined;
    const content = panelRefs.current[activeId];
    const onResize = () => layout(activeId);
    let rAF = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => layout(activeId));
    });
    if (content) ro.observe(content);
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rAF);
      window.removeEventListener('resize', onResize);
    };
  }, [activeId, layout]);

  const commit = useCallback(
    (id) => {
      const idx = menuItems.findIndex((m) => m.id === id);
      setActiveId((current) => {
        if (current === id) return current;
        if (current) {
          setMorphing(true);
          setDir(idx > prevIndex.current ? 1 : -1);
          setLeavingId(current);
          clearTimeout(leaveTimer.current);
          leaveTimer.current = setTimeout(() => setLeavingId(null), FADE_MS);
        } else {
          setMorphing(false);
        }
        prevIndex.current = idx;
        return id;
      });
    },
    [menuItems]
  );

  const requestOpen = useCallback(
    (id) => {
      if (suppress.current) return;
      clearTimeout(closeTimer.current);
      if (isOpenDelayed.current) {
        clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => commit(id), OPEN_DELAY);
      } else {
        commit(id); // already open — switch instantly so the panel morphs
      }
    },
    [commit]
  );

  const reset = useCallback(() => {
    setActiveId(null);
    setLeavingId(null);
    setMorphing(false);
    wasOpen.current = false;
    prevIndex.current = -1;
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(reset, CLOSE_DELAY);
  }, [reset]);

  const closeNow = useCallback(() => {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    reset();
  }, [reset]);

  /* After closing, skip the hover-intent delay briefly so coming straight back
     feels instant. */
  useEffect(() => {
    if (activeId) {
      isOpenDelayed.current = false;
      clearTimeout(skipTimer.current);
    } else {
      skipTimer.current = setTimeout(() => {
        isOpenDelayed.current = true;
      }, SKIP_DELAY);
    }
  }, [activeId]);

  useEffect(
    () => () => {
      [openTimer, closeTimer, skipTimer, leaveTimer].forEach((t) => clearTimeout(t.current));
    },
    []
  );

  useEffect(() => {
    if (!activeId) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        suppress.current = true; // don't reopen on the next pointer move
        const id = activeId;
        closeNow();
        triggerRefs.current[id]?.focus();
      }
    };
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) closeNow();
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [activeId, closeNow]);

  const onTriggerKeyDown = (id) => (e) => {
    const i = triggerIds.indexOf(id);
    const last = triggerIds.length - 1;
    const focusAt = (n) => triggerRefs.current[triggerIds[n]]?.focus();
    if (e.key === 'ArrowDown' && activeId === id) {
      panelRefs.current[id]
        ?.querySelector('a[href], button:not([disabled])')
        ?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      focusAt(Math.min(i + 1, last));
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      focusAt(Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === 'Home') {
      focusAt(0);
      e.preventDefault();
    } else if (e.key === 'End') {
      focusAt(last);
      e.preventDefault();
    }
  };

  return (
    <header
      className="nav-root"
      id="top"
      ref={rootRef}
      /* Read by NavAutoHide: the bar must not retract out from under an open
         panel, which would tear it off its trigger. */
      data-open={activeId || undefined}
      data-mobile-open={mobileOpen ? '' : undefined}
      onPointerLeave={whenMouse(scheduleClose)}
      onPointerEnter={() => {
        suppress.current = false;
      }}
    >
      <div className="nav-bar" ref={barRef}>
        <a className="nav-logo" href="/" aria-label="StaffIntra home" onClick={closeNow}>
          <Brand className="nav-brand" />
        </a>

        <nav className={`nav-links${activeId ? ' has-open' : ''}`} aria-label="Primary">
          {NAV_ITEMS.map((item) =>
            item.menu ? (
              <button
                key={item.id}
                type="button"
                id={`trigger-${item.id}`}
                className={`nav-link${activeId === item.id ? ' is-open' : ''}`}
                aria-expanded={activeId === item.id}
                aria-haspopup="true"
                aria-controls={activeId === item.id ? `mm-${item.id}` : undefined}
                ref={(el) => {
                  triggerRefs.current[item.id] = el;
                }}
                /* pointermove, not pointerenter: a trigger sliding under a
                   stationary cursor should not open a menu. */
                onPointerMove={whenMouse(() => requestOpen(item.id))}
                onPointerLeave={whenMouse(() => clearTimeout(openTimer.current))}
                onFocus={() => commit(item.id)}
                onKeyDown={onTriggerKeyDown(item.id)}
                onClick={() => {
                  if (activeId === item.id) {
                    suppress.current = true;
                    closeNow();
                  } else {
                    commit(item.id);
                  }
                }}
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.id}
                className="nav-link"
                href={item.href}
                ref={(el) => {
                  triggerRefs.current[item.id] = el;
                }}
                onPointerMove={whenMouse(scheduleClose)}
                onFocus={closeNow}
                onKeyDown={onTriggerKeyDown(item.id)}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-nav btn-nav-ghost btn-swap" href="#">
            <span className="swap">
              <span>Log in</span>
              <span aria-hidden="true">Log in</span>
            </span>
          </a>
          <a className="btn btn-primary btn-nav btn-swap" href="/#demo">
            <span className="swap">
              <span>Book a demo</span>
              <span aria-hidden="true">Book a demo</span>
            </span>
          </a>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* One shared panel for every menu: it slides and resizes between
          triggers rather than closing and reopening. */}
      <div
        ref={panelRef}
        className={`nav-panel${activeId ? ' is-open' : ''}${morphing ? ' is-morphing' : ''}`}
        style={{ '--dir': dir }}
        onPointerEnter={() => clearTimeout(closeTimer.current)}
        onPointerLeave={whenMouse(scheduleClose)}
      >
        <div className="nav-panel-viewport">
          {menuItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                id={`mm-${item.id}`}
                className={`nav-panel-content${isActive ? ' is-active' : ''}${
                  leavingId === item.id ? ' is-leaving' : ''
                }`}
                aria-labelledby={`trigger-${item.id}`}
                /* inert keeps the hidden panels out of the tab order and the
                   a11y tree while still allowing them to be measured. */
                inert={!isActive || undefined}
                ref={(el) => {
                  panelRefs.current[item.id] = el;
                }}
              >
                <MenuBody menu={item.menu} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className={`nav-mobile${mobileOpen ? ' is-open' : ''}`}>
        {NAV_ITEMS.map((item) =>
          item.menu ? (
            <div className="nav-mobile-group" key={item.id}>
              <button
                type="button"
                className={`nav-mobile-trigger${mobileSection === item.id ? ' is-open' : ''}`}
                aria-expanded={mobileSection === item.id}
                onClick={() => setMobileSection((s) => (s === item.id ? null : item.id))}
              >
                {item.label}
                <span className="nav-mobile-chev" aria-hidden="true" />
              </button>
              {mobileSection === item.id ? (
                <div className="nav-mobile-sub">
                  {flattenMenu(item.menu).map((link) => (
                    <a
                      key={link.label + link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <a
              className="nav-mobile-link"
              href={item.href}
              key={item.id}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          )
        )}
        <div className="nav-mobile-actions">
          <a className="btn btn-secondary btn-lg" href="#" onClick={() => setMobileOpen(false)}>
            Log in
          </a>
          <a className="btn btn-primary btn-lg" href="/#demo" onClick={() => setMobileOpen(false)}>
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}

function flattenMenu(menu) {
  if (menu.type === 'columns') {
    return menu.groups.flatMap((g) =>
      g.columns.flatMap((c) => [...(c.feature ? [c.feature] : []), ...c.items])
    );
  }
  if (menu.type === 'resources') {
    return [...menu.byType.items, { label: menu.featured.title, href: menu.featured.href }];
  }
  return menu.items;
}
