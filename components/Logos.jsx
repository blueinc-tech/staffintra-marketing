'use client';

import { useEffect, useState } from 'react';
import CountUp from './CountUp';
import './Logos.css';

// Deliberately not real customers and not invented ones — each tile is an
// obvious placeholder until real logos and stories are supplied.
// `study` marks the tiles that will carry a case study; those get the arrow.
// `quote` marks the ones that will also carry a testimonial card on hover.
const TILES = [
  { id: 1, study: false, quote: false },
  { id: 2, study: false, quote: false },
  { id: 3, study: true, quote: true },
  { id: 4, study: true, quote: true },
  { id: 5, study: true, quote: true },
  { id: 6, study: true, quote: true },
  { id: 7, study: true, quote: true },
  { id: 8, study: false, quote: false },
  { id: 9, study: false, quote: false },
  { id: 10, study: true, quote: true },
  { id: 11, study: true, quote: true },
  { id: 12, study: true, quote: true },
];

const PLACEHOLDER_QUOTE = {
  quote:
    'A short line from this customer about what changed — the kind of sentence an ' +
    'operations lead would actually say, naming one thing that got easier.',
  name: 'Name, role',
  org: 'Organisation · sector',
};

/* A neutral stand-in mark: no wordmark, no invented brand. */
function PlaceholderLogo() {
  return (
    <span className="lg-logo" aria-hidden="true">
      <svg viewBox="0 0 96 26" fill="none">
        <rect x="0.5" y="4.5" width="17" height="17" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 17.5 9 8.5l4.5 9" stroke="currentColor" strokeWidth="1.4" />
        <rect x="26" y="7" width="52" height="5" rx="1" fill="currentColor" opacity=".45" />
        <rect x="26" y="15" width="34" height="4" rx="1" fill="currentColor" opacity=".25" />
      </svg>
    </span>
  );
}

/* Always visible — on the reference this glyph never animates; only the
   label beside it moves. */
function ArrowUpRight() {
  return (
    <svg className="lg-arrow" width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M2.9 8.1 8.1 2.9" stroke="currentColor" strokeWidth="0.9" strokeLinecap="square" />
      <path d="M3.78 2.75H8.25v4.47" stroke="currentColor" strokeWidth="0.825" strokeLinecap="square" />
    </svg>
  );
}

export default function Logos() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const on = () => setIsDesktop(window.innerWidth >= 768);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  const cols = isDesktop ? 6 : 3;
  const visible = isDesktop ? TILES : TILES.slice(0, TILES.length - 3);
  const rows = Math.ceil(visible.length / cols);

  return (
    <section className="logos" id="customers-strip">
      <p className="logos-label">
        Trusted by <CountUp className="count-inline" value={900} suffix="+" /> operations teams
      </p>

      <div className="logos-band">
        <span className="logos-hatch logos-hatch--l" aria-hidden="true" />

        <div className="logos-grid" style={{ '--cols': cols }}>
          {visible.map((t, i) => {
            const lastCol = (i + 1) % cols === 0;
            const lastRow = Math.floor(i / cols) + 1 === rows;
            // Row one drops in from above; rows below rise from underneath.
            const below = i >= cols;
            // Left half of a row opens rightwards, right half opens leftwards.
            const left = i % cols < cols / 2;

            return (
              <div
                key={t.id}
                className={`lg-cell${lastCol ? ' is-last-col' : ''}${lastRow ? ' is-last-row' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <PlaceholderLogo />

                {t.study ? (
                  <a className="lg-link" href="#customers">
                    <span className="lg-cta">
                      <span className="lg-cta-clip">
                        <span className="lg-cta-label">Case study</span>
                      </span>
                      <ArrowUpRight />
                    </span>
                    <span className="lg-sr">Read this customer&apos;s story</span>
                  </a>
                ) : null}

                {/* Twice the cell in both directions, so it lands over its own
                    row and the one beside it. Never takes the pointer. */}
                {t.quote ? (
                  <div
                    aria-hidden="true"
                    className={
                      `lg-card${hovered === i ? ' is-open' : ''}` +
                      `${below ? ' from-below' : ' from-above'}` +
                      `${left ? ' to-right' : ' to-left'}` +
                      `${lastCol ? ' has-edge' : ''}`
                    }
                  >
                    <blockquote>“{PLACEHOLDER_QUOTE.quote}”</blockquote>
                    <div className="lg-card-by">
                      <span className="lg-avatar" />
                      <div>
                        <div className="lg-card-name">{PLACEHOLDER_QUOTE.name}</div>
                        <div className="lg-card-role">{PLACEHOLDER_QUOTE.org}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <span className="logos-hatch logos-hatch--r" aria-hidden="true" />
      </div>
    </section>
  );
}
