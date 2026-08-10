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
    id: 'sabi', name: 'Sabi Foods', s: 'd7', mark: 'a', study: true,
    quote: 'We used to publish the rota on Friday night and spend Saturday fixing it. It goes out on Wednesday now, and it holds.',
    person: 'Amara Balogun', role: 'Head of Operations', org: 'Sabi Foods · Grocery', img: 'amara',
  },
  {
    id: 'harmattan', name: 'Harmattan', s: 'u4c', mark: 'e', study: true,
    quote: 'Drivers clock in from the yard and the hours land in payroll the same day. That used to be a week of chasing paper.',
    person: 'Tunde Adeyemi', role: 'Depot Manager', org: 'Harmattan Logistics · Freight', img: 'tunde',
  },
  { id: 'gongola', name: 'Gongola', s: 'm5c', mark: 'c', study: false },
  {
    id: 'zuma', name: 'Zuma Care', s: 'd5', mark: 'd', study: true,
    quote: 'Cover for a called-in sick shift takes four minutes. It used to take the whole morning and three phone calls.',
    person: 'Hannah Eze', role: 'Registered Manager', org: 'Zuma Care Group · Care', img: 'hannah',
  },
  {
    id: 'adire', name: 'Adire', s: 'u6', mark: 'b', study: true,
    quote: 'Approvals stopped living in my inbox. I can see the balance and the cover on the same screen, so I just decide.',
    person: 'David Okonkwo', role: 'Plant Supervisor', org: 'Adire Textiles · Manufacturing', img: 'david',
  },
  {
    id: 'lekki', name: 'Lekki Group', s: 'd4', mark: 'f', study: true,
    quote: 'Sixty seasonal starters onboarded in a week, and not one of them turned up without a signed contract.',
    person: 'Priya Nwosu', role: 'People Lead', org: 'Lekki Hospitality · Hotels', img: 'priya',
  },
  {
    id: 'palmline', name: 'Palmline', s: 'u4c', mark: 'a', study: true,
    quote: 'I can see what the week costs before I publish it. That single thing changed how we build the rota.',
    person: 'Marcus Ibeh', role: 'Regional Manager', org: 'Palmline Grocers · Retail', img: 'marcus',
  },
  { id: 'obi', name: 'Obi & Sons', s: 'd7', mark: 'd', study: false },
  { id: 'kanto', name: 'Kanto', s: 'm4', mark: 'b', study: false },
  {
    id: 'terracotta', name: 'Terracotta', s: 'd5', mark: 'c', study: true,
    quote: 'Open shifts fill themselves now. The group chat has gone back to being a group chat.',
    person: 'Sofia Adeniran', role: 'Front of House Manager', org: 'Terracotta Hotels · Hospitality', img: 'sofia',
  },
  {
    id: 'wazobia', name: 'Wazobia', s: 'u7', mark: 'e', study: true,
    quote: 'One record for hours, leave, and pay. We stopped reconciling three systems at the end of every month.',
    person: 'John Okafor', role: 'Finance Director', org: 'Wazobia Health · Clinics', img: 'john',
  },
  { id: 'rivers', name: 'Rivers', s: 'u4c', mark: 'f', study: false },
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

  const cols = isDesktop ? 6 : 3;
  const visible = isDesktop ? TILES : TILES.slice(0, TILES.length - 3);
  const rows = Math.ceil(visible.length / cols);

  return (
    <section className="logos" id="customers-strip">
      {/* Wraps head AND band: the rails pick up the hero's line as dotted and
          carry it to the bottom of the section, so they can't stop at the grid. */}
      <div className="logos-rails has-rails">
        <div className="logos-head">
          <p className="logos-label">
            Trusted by <CountUp className="count-inline" value={900} suffix="+" /> operations teams
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
