'use client';

import { useState } from 'react';
import './Integrations.css';

/* Rebuilt, not copied. A scrolling wall of logos says "we have integrations";
   it does not say what an integration DOES. This says it: six systems wired
   into one hub, with a pulse running down each line, and the categories
   rewiring the board rather than filtering a carousel.

   Marks are neutral placeholders, so no tile claims to be a real vendor. */

const CATEGORIES = [
  {
    id: 'people',
    label: 'HR & people',
    nodes: ['HR record', 'Right to work', 'Contracts', 'Absence', 'Training', 'Directory'],
  },
  {
    id: 'payroll',
    label: 'Payroll',
    nodes: ['Gross to net', 'Pensions', 'Payslips', 'Expenses', 'Overtime', 'Year end'],
  },
  {
    id: 'time',
    label: 'Rota & time',
    nodes: ['Clock-in', 'Timesheets', 'Open shifts', 'Cover', 'Job costing', 'Sites'],
  },
  {
    id: 'finance',
    label: 'Finance',
    nodes: ['Ledger', 'Cost centres', 'Budgets', 'Invoicing', 'Reporting', 'Forecast'],
  },
];

/* Board geometry. Three nodes down each side, hub in the middle; every line
   is routed orthogonally, which is what makes it read as wiring rather than
   as a starburst. */
const BOARD = { w: 620, h: 330 };
const HUB = { x: 310, y: 165, w: 132, h: 74 };
const NODE = { w: 150, h: 62 };
const ROWS = [26, 134, 242];
const LEFT_X = 18;
const RIGHT_X = BOARD.w - NODE.w - 18;

function route(i) {
  const side = i < 3 ? -1 : 1;
  const y = ROWS[i % 3] + NODE.h / 2;
  const startX = side < 0 ? LEFT_X + NODE.w : RIGHT_X;
  const midX = side < 0 ? 250 : 370;
  const endX = side < 0 ? HUB.x - HUB.w / 2 : HUB.x + HUB.w / 2;
  return `M${startX} ${y} H${midX} V${HUB.y} H${endX}`;
}

export default function Integrations() {
  const [at, setAt] = useState(0);
  const active = CATEGORIES[at];

  return (
    <section className="integrations" id="integrations">
      <div className="int-panel">
        <div className="container">
          <div className="int-grid">
            <header className="int-head">
              <span className="sec-eyebrow">Integrations</span>
              <h2>Wire StaffIntra into what you already run.</h2>
              <p>
                One record, shared both ways. Hours approved here land in payroll, and a new
                starter there shows up on the rota, without anyone retyping a thing.
              </p>
              <a className="btn btn-light" href="#demo">
                Explore all integrations
              </a>

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
            </header>

            <div className="int-board">
              {/* The real mark, laid over the hub rather than drawn into the
                  SVG. The hub is dead centre of the viewBox, so 50%/50% puts
                  the logo on it exactly at any width, and this avoids the
                  inconsistent sizing an external SVG gets inside <image>. */}
              <img className="ib-logo" src="/assets/StaffIntra_Logo_Mark_White.svg" alt="StaffIntra" />
              <svg viewBox={`0 0 ${BOARD.w} ${BOARD.h}`} role="img" aria-label={`${active.label} systems wired into StaffIntra`}>
                {/* Lines first, so every tile sits on top of its own wire. */}
                <g className="ib-wires" key={active.id}>
                  {active.nodes.map((n, i) => (
                    <g key={n}>
                      <path className="ib-wire" d={route(i)} />
                      {/* A short dash travelling the same path is the pulse. */}
                      <path className="ib-pulse" d={route(i)} style={{ '--d': `${i * 0.42}s` }} />
                    </g>
                  ))}
                </g>

                {active.nodes.map((n, i) => {
                  const x = i < 3 ? LEFT_X : RIGHT_X;
                  const y = ROWS[i % 3];
                  return (
                    <g className="ib-node" key={n}>
                      <rect x={x} y={y} width={NODE.w} height={NODE.h} rx="2" />
                      <text x={x + NODE.w / 2} y={y + NODE.h / 2 + 5}>
                        {n}
                      </text>
                    </g>
                  );
                })}

                <g className="ib-hub">
                  <rect
                    x={HUB.x - HUB.w / 2}
                    y={HUB.y - HUB.h / 2}
                    width={HUB.w}
                    height={HUB.h}
                    rx="2"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
