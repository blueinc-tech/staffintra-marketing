'use client';

import { useState } from 'react';
import CountUp from './CountUp';
import './Logos.css';

// Deliberately not real customers and not invented ones either — each tile is
// an obvious placeholder until actual logos and case studies are supplied.
// `study` marks the tiles that will carry a case study; those get the arrow.
const TILES = [
  { id: 1, study: false },
  { id: 2, study: false },
  { id: 3, study: true },
  { id: 4, study: true },
  { id: 5, study: true },
  { id: 6, study: true },
  { id: 7, study: true },
  { id: 8, study: false },
  { id: 9, study: false },
  { id: 10, study: true },
  { id: 11, study: true },
  { id: 12, study: true },
];

const PLACEHOLDER_STUDY = {
  eyebrow: 'Case study',
  title: 'Customer story goes here',
  body:
    'A short account of what this operator ran before, what changed after go-live, and the ' +
    'one number that moved. Two or three sentences is the right length — enough to be ' +
    'concrete, short enough to read from the grid.',
  facts: [
    ['Sector', 'To be confirmed'],
    ['Team size', '—'],
    ['Sites', '—'],
    ['Live since', '—'],
  ],
};

/* A neutral stand-in mark: no wordmark, no invented brand. */
function PlaceholderLogo() {
  return (
    <span className="lg-mark" aria-hidden="true">
      <svg viewBox="0 0 96 26" fill="none">
        <rect x="0.5" y="4.5" width="17" height="17" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 17.5 9 8.5l4.5 9" stroke="currentColor" strokeWidth="1.4" />
        <rect x="26" y="7" width="52" height="5" rx="1" fill="currentColor" opacity=".45" />
        <rect x="26" y="15" width="34" height="4" rx="1" fill="currentColor" opacity=".25" />
      </svg>
    </span>
  );
}

export default function Logos() {
  const [open, setOpen] = useState(null);

  return (
    <section className="logos" id="customers-strip">
      <p className="logos-label">
        Trusted by <CountUp className="count-inline" value={900} suffix="+" /> operations teams
      </p>

      <div className="logos-band">
        <span className="logos-hatch" aria-hidden="true" />

        <div className="logos-grid">
          {TILES.map((t) => {
            const isOpen = open === t.id;
            return t.study ? (
              <button
                type="button"
                key={t.id}
                className={`lg-cell lg-cell--study${isOpen ? ' is-open' : ''}`}
                aria-expanded={isOpen}
                aria-controls="lg-study"
                onClick={() => setOpen(isOpen ? null : t.id)}
              >
                <PlaceholderLogo />
                <span className="lg-arrow" aria-hidden="true">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 9 9 3M4.4 3H9v4.6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
                <span className="lg-sr">Read the case study for this customer</span>
              </button>
            ) : (
              <span className="lg-cell" key={t.id}>
                <PlaceholderLogo />
              </span>
            );
          })}
        </div>

        <span className="logos-hatch" aria-hidden="true" />
      </div>

      {/* Placeholder copy — replaced when the real stories land. */}
      <div className="lg-study-wrap" id="lg-study" hidden={open === null}>
        {open !== null ? (
          <div className="lg-study">
            <div className="lg-study-main">
              <p className="lg-study-eyebrow">{PLACEHOLDER_STUDY.eyebrow}</p>
              <h3>{PLACEHOLDER_STUDY.title}</h3>
              <p className="lg-study-body">{PLACEHOLDER_STUDY.body}</p>
              <button type="button" className="lg-study-close" onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
            <dl className="lg-study-facts">
              {PLACEHOLDER_STUDY.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </section>
  );
}
