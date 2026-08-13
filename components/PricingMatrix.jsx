'use client';

import { useState } from 'react';
import './PricingMatrix.css';

/* Pricing, built as a comparison rather than as three sales cards.

   A buyer on this page is not being introduced to the product, they are
   deciding which tier they need. That is a comparison task, so the matrix is
   the page rather than an afterthought below the cards: one row per
   capability, one column per plan, and the plan header sticks under the nav
   so the column you are reading is always labelled.

   Cell values: true renders a tick, false renders a dash, a string renders
   as text. Strings are for capabilities that differ by degree rather than by
   presence, which a tick would misrepresent. */

const PLANS = [
  { id: 'core', name: 'Core', monthly: '₦1,500', yearly: '₦1,250', best: '1 to 25 people' },
  { id: 'plus', name: 'Plus', monthly: '₦3,000', yearly: '₦2,500', best: '26 to 100 people', featured: true },
  { id: 'complete', name: 'Complete', monthly: '₦4,500', yearly: '₦3,750', best: '101 to 500 people' },
  { id: 'ent', name: 'Enterprise', monthly: 'Quoted', yearly: 'Quoted', best: '500+ people', quoted: true },
];

const GROUPS = [
  {
    name: 'Time & attendance',
    rows: [
      { t: 'Smart clock-in, desktop and mobile', v: [true, true, true, true] },
      { t: 'Device health and location context', v: [true, true, true, true] },
      { t: 'Timesheets built from clock events', v: [true, true, true, true] },
      { t: 'Approval requests, all fifteen types', v: [true, true, true, true] },
      { t: 'Geofence per site', v: ['1 site', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { t: 'Break tracking on the timesheet', v: [true, true, true, true] },
    ],
  },
  {
    name: 'Work & productivity',
    rows: [
      { t: 'Workspaces and boards', v: ['1 board', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { t: 'Four view modes on every board', v: [false, true, true, true] },
      { t: 'Work logs, manual and auto-generated', v: [true, true, true, true] },
      { t: 'Cross-module reports', v: [false, true, true, true] },
    ],
  },
  {
    name: 'People & operations',
    rows: [
      { t: 'Directory and org chart', v: [true, true, true, true] },
      { t: 'Documents, training and device records', v: [false, true, true, true] },
      { t: 'Lifecycle: intake, onboarding, offboarding', v: [false, true, true, true] },
      { t: 'Workflow templates with auto-assign', v: [false, true, true, true] },
      { t: 'Cases with SLA tracking', v: [false, true, true, true] },
      { t: 'Confidential cases', v: [false, false, true, true] },
    ],
  },
  {
    name: 'Platform & control',
    rows: [
      { t: 'Your logo and colours', v: [true, true, true, true] },
      { t: 'Manager and staff roles', v: [true, true, true, true] },
      { t: 'Permissions by role and site', v: [false, false, true, true] },
      { t: 'Single sign-on', v: [false, false, true, true] },
      { t: 'Full audit trail', v: [false, false, true, true] },
      { t: 'API and webhooks', v: [false, false, true, true] },
      { t: 'A workspace per brand or region', v: [false, false, false, true] },
    ],
  },
  {
    name: 'Support',
    rows: [
      { t: 'In-app chat, groups and Slack', v: [true, true, true, true] },
      { t: 'Phone support', v: [false, true, true, true] },
      { t: 'Managed setup and import', v: [false, false, true, true] },
      { t: 'Named contact', v: [false, false, true, true] },
      { t: 'Written uptime commitment', v: [false, false, false, true] },
    ],
  },
];

function Cell({ v }) {
  if (v === true) {
    return (
      <span className="pmx-yes" role="img" aria-label="Included">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7.4 5.8 10.2 11 4.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  /* The "not included" marker is drawn, not typed: a dash character would be
     the one long dash left on the site, and the rule is everywhere. */
  if (v === false) return <span className="pmx-no" role="img" aria-label="Not included" />;
  return <span className="pmx-val">{v}</span>;
}

export default function PricingMatrix() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="pmx">
      <div className="container">
        <div className="pmx-toggle-row">
          <div className="pmx-toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
          <p className="pmx-note">Two months free when you pay for the year.</p>
        </div>

        {/* One scroll container so the table can go sideways on a phone
            without the whole page doing so. */}
        <div className="pmx-scroll">
          <table className="pmx-table">
            <caption className="pmx-sr">
              Plan comparison. Columns are plans, rows are capabilities.
            </caption>

            {/* Sticky: parks under the nav so the column being read stays
                labelled all the way down a long matrix. */}
            <thead>
              <tr>
                <th scope="col" className="pmx-corner">
                  <span className="pmx-sr">Capability</span>
                </th>
                {PLANS.map((p) => (
                  <th
                    scope="col"
                    key={p.id}
                    className={`pmx-plan${p.featured ? ' is-featured' : ''}`}
                  >
                    <span className="pmx-plan-name">{p.name}</span>
                    <span className="pmx-plan-price">
                      {p.quoted ? 'Quoted' : yearly ? p.yearly : p.monthly}
                    </span>
                    {!p.quoted ? <span className="pmx-plan-unit">per person / month</span> : null}
                    <span className="pmx-plan-best">{p.best}</span>
                    <a
                      className={`btn ${p.featured ? 'btn-primary' : 'btn-secondary'} pmx-plan-cta`}
                      href="/#demo"
                    >
                      {p.quoted ? 'Talk to us' : 'Start free'}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>

            {GROUPS.map((g) => (
              <tbody key={g.name}>
                <tr className="pmx-group">
                  <th scope="colgroup" colSpan={5}>
                    {g.name}
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.t}>
                    <th scope="row">{r.t}</th>
                    {r.v.map((v, i) => (
                      <td key={PLANS[i].id} className={PLANS[i].featured ? 'is-featured' : undefined}>
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        <p className="pmx-foot">
          Free for 30 days on any plan, with no card, no minimum spend, and no setup fee. Sixty
          people on Plus is ₦180,000 a month, or ₦150,000 a month paid for the year.
        </p>
      </div>
    </div>
  );
}
