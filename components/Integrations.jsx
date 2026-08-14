'use client';

import { useState } from 'react';
import WeaveBoard from './WeaveBoard';
import './Integrations.css';

/* A scrolling wall of logos says "we have integrations"; it does not say what
   an integration DOES. This says it, and it says it with our own mark: the
   Weave, at board scale. Strands enter from two directions, interlock, and
   leave as one cloth, which is the section's whole argument.

   It replaces an invented wiring schematic. Six boxes routed into a hub was a
   picture of an architecture we cannot vouch for; the mark claims nothing.

   Categories follow the product's own Tools Hub: Communication, Recruitment,
   Finance and General. Slack and Google are named because both are shipped and
   confirmed; every other tile is a capability, not a vendor claim. */

const CATEGORIES = [
  {
    id: 'communication',
    label: 'Communication',
    nodes: ['Slack', 'Google', 'Email', 'In-app chat', 'Groups', 'Announcements'],
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    nodes: ['Intake forms', 'Candidate records', 'Offer letters', 'Right to work', 'Onboarding', 'Job boards'],
  },
  {
    id: 'finance',
    label: 'Finance',
    nodes: ['Payroll', 'Expenses', 'Loan requests', 'Cost centres', 'Invoicing', 'Reporting'],
  },
  {
    id: 'general',
    label: 'General',
    nodes: ['Calendar', 'Storage', 'Devices', 'Documents', 'Training', 'Single sign-on'],
  },
];

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
              <h2>The tools hub.</h2>
              <p>
                One launcher for every tool your workspace runs on, sorted the way the product sorts them. Slack and Google sign-in ship today, and the record is shared both ways.
              </p>
              <a className="btn btn-light" href="/platform#integrations">
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
              <WeaveBoard nodes={active.nodes} label={active.label} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
