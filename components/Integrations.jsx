'use client';

import { useState } from 'react';
import './Integrations.css';

/* Placeholder tiles, not invented vendors. Each category holds its own set so
   switching tabs visibly changes the row; real marks drop in here later. */
const CATEGORIES = [
  { id: 'people', label: 'HR & people', count: 7 },
  { id: 'payroll', label: 'Payroll', count: 6 },
  { id: 'time', label: 'Rota & time', count: 7 },
  { id: 'finance', label: 'Finance', count: 6 },
];

/* Five neutral marks, cycled, so the row reads as a row of logos without any
   of them claiming to be one. */
const MARKS = [
  <path key="a" d="M4 20 12 6l8 14M8.5 15h7" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  <path key="b" d="M5 6h14v14H5zM5 13h14M12 6v14" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  <path key="c" d="M12 4 20 12l-8 8-8-8z" stroke="currentColor" strokeWidth="1.5" fill="none" />,
  <path key="d" d="M5 18V8m4.7 10V6M14.3 18V10M19 18V7" stroke="currentColor" strokeWidth="1.8" fill="none" />,
  <path key="e" d="M5 12a7 7 0 0 1 14 0 7 7 0 0 1-14 0zM12 5v14" stroke="currentColor" strokeWidth="1.5" fill="none" />,
];

function Tile({ index }) {
  return (
    <span className="int-tile">
      <svg className="int-mark" viewBox="0 0 24 24" aria-hidden="true">
        {MARKS[index % MARKS.length]}
      </svg>
      <span className="int-bars" aria-hidden="true">
        <span style={{ '--w': '100%' }} />
        <span style={{ '--w': `${58 + ((index * 13) % 34)}%` }} />
      </span>
    </span>
  );
}

export default function Integrations() {
  const [at, setAt] = useState(0);
  const active = CATEGORIES[at];
  const tiles = Array.from({ length: active.count }, (_, i) => i);

  return (
    <section className="integrations">
      <div className="int-panel">
        <div className="container">
          <header className="int-head">
            <span className="sec-eyebrow">Integrations</span>
            <h2>StaffIntra works with the tools you already run.</h2>
            <p>
              Connect the systems you already have. Use a ready-made integration, or build your
              own on the REST API.
            </p>
            <a className="btn btn-light" href="#features">
              Explore all integrations
            </a>
          </header>
        </div>

        {/* Wider than the frame and moving, so the row reads as continuing past
            both edges. Duplicated once, and the loop travels exactly half the
            track plus half a gap, which is where the copy lines up. */}
        <div className="int-track">
          <div className="int-row" key={active.id}>
            {[...tiles, ...tiles].map((n, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Tile key={`${active.id}-${i}`} index={n} />
            ))}
          </div>
        </div>

        <div className="container">
          <div className="int-tabs" role="tablist" aria-label="Integration categories">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === at}
                className={`int-tab${i === at ? ' is-on' : ''}`}
                onClick={() => setAt(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
