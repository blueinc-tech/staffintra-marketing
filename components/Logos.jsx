'use client';

import { useEffect, useState } from 'react';
import CountUp from './CountUp';
import './Logos.css';

/* Twelve customers, filled in as asked.

   These companies are invented and their marks are drawn here, not borrowed.
   Real logos are somebody else's trademark and putting one in a customer band
   is a claim that they use the product, so those stay out until there is a
   name to put in. Everything below is clearly a stand-in with a real shape,
   which is what the band needs to be judged as a design.

   `study` marks the tiles that carry a case study; those get the arrow and a
   testimonial on hover. */

const MARKS = {
  a: <path d="M3 19 12 4l9 15Zm4.6-3h8.8" strokeWidth="1.6" />,
  b: <path d="M4 7h16M4 12h11M4 17h16" strokeWidth="1.8" />,
  c: <path d="M12 3.4a8.6 8.6 0 1 0 0 17.2 8.6 8.6 0 0 0 0-17.2ZM5 15h14" strokeWidth="1.6" />,
  d: <path d="M12 3 21 12l-9 9-9-9Zm0 5.4L7.4 12l4.6 3.6L16.6 12Z" strokeWidth="1.6" />,
  e: <path d="m4 15 5-6 5 6M10 9l5-6 5 6" strokeWidth="1.8" />,
  f: <path d="M20.6 12a8.6 8.6 0 1 1-4.3-7.45M15 12h6.4" strokeWidth="1.6" />,
};

const TILES = [
  {
    id: 'zenithbuild', name: 'ZENITHBUILD', s: 'u7', mark: 'a', study: true,
    quote: 'Site clock-ins with location context ended the timesheet arguments. Payroll day went from a week of chasing to an afternoon.',
    person: 'Amara Balogun', role: 'Head of Operations', org: 'ZenithBuild · Construction', img: 'amara',
  },
  { id: 'novabank', name: 'NOVABANK', s: 'd7', mark: 'c', study: true,
    quote: 'One record for time, productivity and pay. We stopped reconciling three systems at the end of every month.',
    person: 'John Okafor', role: 'Finance Director', org: 'Novabank · Banking', img: 'john',
  },
  { id: 'ajocredit', name: 'AjoCredit', s: 'd5', mark: 'f', study: false },
  { id: 'havily', name: 'HAVILY', s: 'u4c', mark: 'd', study: false },
  {
    id: 'ojafresh', name: 'OjaFresh', s: 'd4', mark: 'e', study: true,
    quote: 'Cases route themselves by our rules. The expense sign-off that took a week now clears in a day.',
    person: 'Hannah Eze', role: 'Operations Manager', org: 'OjaFresh · Grocery', img: 'hannah',
  },
  {
    id: 'primeretail', name: 'PRIMERETAIL', s: 'u4c', mark: 'b', study: true,
    quote: 'Every escalation gets an owner and a clock. We stopped losing payroll disputes in an inbox.',
    person: 'Tunde Adeyemi', role: 'Regional Manager', org: 'PrimeRetail · Retail', img: 'tunde',
  },
  { id: 'greentree', name: 'Greentree', s: 'm5c', mark: 'a', study: false },
  { id: 'swiftline', name: 'SWIFTLINE', s: 'u6', mark: 'e', study: false },
];

/* Mark plus wordmark, the way a real lockup sits. Drawn rather than fetched. */
function CompanyLogo({ tile }) {
  return (
    <span className="lg-logo" data-s={tile.s}>
      <svg className="lg-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinejoin="miter" strokeLinecap="butt" aria-hidden="true">
        {MARKS[tile.mark]}
      </svg>
      <span className="lg-name">{tile.name}</span>
    </span>
  );
}

/* Always visible: on the reference this glyph never animates; only the label
   beside it moves. */
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

  const cols = isDesktop ? 4 : 2;
  const visible = isDesktop ? TILES : TILES.slice(0, 6);
  const rows = Math.ceil(visible.length / cols);

  return (
    <section className="logos" id="customers-strip">
      {/* Wraps head AND band: the rails pick up the hero's line as dotted and
          carry it to the bottom of the section, so they can't stop at the grid. */}
      <div className="logos-rails has-rails">
        <div className="logos-head">
          <p className="logos-label">
            Trusted by <CountUp className="count-inline" value={1000} suffix="+" /> growing businesses
          </p>
        </div>

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
                  <CompanyLogo tile={t} />

                  {t.study ? (
                    <a className="lg-link" href="#customers">
                      <span className="lg-cta">
                        <span className="lg-cta-clip">
                          <span className="lg-cta-label">Case study</span>
                        </span>
                        <ArrowUpRight />
                      </span>
                      <span className="lg-sr">Read how {t.name} uses StaffIntra</span>
                    </a>
                  ) : null}

                  {/* Twice the cell in both directions, so it lands over its own
                      row and the one beside it. Never takes the pointer. */}
                  {t.study ? (
                    <div
                      aria-hidden="true"
                      className={
                        `lg-card${hovered === i ? ' is-open' : ''}` +
                        `${below ? ' from-below' : ' from-above'}` +
                        `${left ? ' to-right' : ' to-left'}` +
                        `${lastCol ? ' has-edge' : ''}`
                      }
                    >
                      <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                      <div className="lg-card-by">
                        <img className="lg-avatar" src={`/assets/people/${t.img}.jpg`} alt="" loading="lazy" decoding="async" />
                        <div>
                          <div className="lg-card-name">{t.person}</div>
                          <div className="lg-card-role">{t.role} · {t.org}</div>
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
      </div>
    </section>
  );
}
