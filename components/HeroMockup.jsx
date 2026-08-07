'use client';

import { useEffect, useRef, useState } from 'react';
import './HeroMockup.css';

/* ---------------- data ---------------- */

const RANGES = {
  '6 months': {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    hires: [34, 41, 52, 63, 68, 79],
    leavers: [0, 9, 0, 0, 11, 0],
  },
  '3 months': {
    labels: ['Jun', 'Jul', 'Aug'],
    hires: [63, 68, 79],
    leavers: [0, 11, 0],
  },
  '12 months': {
    labels: ['Sep', 'Nov', 'Jan', 'Mar', 'May', 'Jul'],
    hires: [22, 29, 31, 34, 52, 68],
    leavers: [6, 0, 8, 0, 0, 11],
  },
};

const COST = {
  '3 months': [
    { site: 'Northwind Care', pct: 82, value: '£184k' },
    { site: 'Harbor & Lane', pct: 61, value: '£137k' },
    { site: 'Brightline', pct: 44, value: '£98k' },
  ],
  '6 months': [
    { site: 'Northwind Care', pct: 74, value: '£352k' },
    { site: 'Harbor & Lane', pct: 66, value: '£271k' },
    { site: 'Brightline', pct: 39, value: '£186k' },
  ],
  '12 months': [
    { site: 'Northwind Care', pct: 88, value: '£702k' },
    { site: 'Harbor & Lane', pct: 57, value: '£534k' },
    { site: 'Brightline', pct: 48, value: '£391k' },
  ],
};

const FILTERS = ['All sites', 'Care', 'Retail', 'Nights'];

const OUT_TODAY = [
  { name: 'John Pinnock', role: 'Floor supervisor', initials: 'JP', tone: 'a' },
  { name: 'Hannah Jenner', role: 'Shift lead', initials: 'HJ', tone: 'b' },
];
const OUT_TOMORROW = [
  { name: 'David Martins', role: 'Care assistant', initials: 'DM', tone: 'c' },
];

/* ---------------- parts ---------------- */

function Select({ value, options, onChange, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div className="hm-select" ref={ref}>
      <button
        type="button"
        className="hm-select-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        Last {value}
        <span className="hm-caret" aria-hidden="true" />
      </button>
      {open ? (
        <ul className="hm-select-menu" role="listbox">
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                role="option"
                aria-selected={o === value}
                className={o === value ? 'is-sel' : undefined}
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
              >
                Last {o}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* Bars read as the reference's do: a light tinted body with a saturated cap,
   and the second series stacked above in the contrast colour. */
function Chart({ data }) {
  const [hover, setHover] = useState(null);
  const peak = Math.max(...data.hires.map((h, i) => h + data.leavers[i]));
  const max = Math.ceil((peak * 1.2) / 20) * 20;
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, 0];

  return (
    <div className="hm-chart">
      <div className="hm-chart-body">
        <div className="hm-axis" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t}>{Math.round(t)}</span>
          ))}
        </div>
        <div className="hm-chart-plot">
          {ticks.map((t, i) => (
            <span className="hm-grid" style={{ '--t': `${(i / (ticks.length - 1)) * 100}%` }} key={t} />
          ))}
          {data.labels.map((m, i) => {
            const h = (data.hires[i] / max) * 100;
            const l = (data.leavers[i] / max) * 100;
            return (
              <div
                className={`hm-col${hover === i ? ' is-hover' : ''}`}
                key={m}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="hm-stack">
                  {data.leavers[i] > 0 ? (
                    <span className="hm-seg hm-seg--leavers" style={{ '--h': `${l}%` }} />
                  ) : null}
                  <span className="hm-seg hm-seg--hires" style={{ '--h': `${h}%` }}>
                    <i className="hm-cap" />
                  </span>
                </span>
                {hover === i ? (
                  <span className="hm-tip">
                    {data.hires[i]} hires
                    {data.leavers[i] > 0 ? ` · ${data.leavers[i]} leavers` : ''}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="hm-xaxis" aria-hidden="true">
        {data.labels.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className="hm-legend">
        <span>
          <i className="hm-dot hm-dot--hires" /> New hires
        </span>
        <span>
          <i className="hm-dot hm-dot--leavers" /> Leavers
        </span>
      </div>
    </div>
  );
}

function Phone() {
  const [clockedIn, setClockedIn] = useState(false);

  return (
    <div className="hm-phone" role="img" aria-label="StaffIntra on mobile: upcoming shift and clock in">
      <div className="hm-phone-screen">
        <div className="hm-phone-top">
          <div className="hm-phone-status">
            <span>9:41</span>
            <span className="hm-phone-icons" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="hm-phone-head">
            <span className="hm-ava hm-ava--a">A</span>
            <span className="hm-phone-bell" aria-hidden="true" />
          </div>
        </div>

        <div className="hm-phone-body">
          <p className="hm-phone-h">Upcoming shift</p>
          <div className="hm-shift">
            <span className="hm-shift-time">07:00 · Early</span>
            <strong>Northwind Care — Ward B</strong>
            <span className="hm-shift-addr">14 Mission Street, Leeds</span>
          </div>
          <button
            type="button"
            className={`hm-clock${clockedIn ? ' is-in' : ''}`}
            onClick={() => setClockedIn((v) => !v)}
          >
            {clockedIn ? 'Clock out' : 'Clock in'}
          </button>

          <p className="hm-phone-sub">Favourites</p>
          <div className="hm-tiles">
            {['Time clock', 'Leave', 'Payslips'].map((t) => (
              <span className="hm-tile" key={t}>
                <i className="hm-tile-mark" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
          <p className="hm-phone-sub">Tools</p>
          <div className="hm-tiles">
            {['Timesheets', 'Time off', 'Rota'].map((t) => (
              <span className="hm-tile" key={t}>
                <i className="hm-tile-mark" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <span className="hm-fab" aria-hidden="true">
          +
        </span>
        <div className="hm-tabs" aria-hidden="true">
          {['Home', 'Rota', 'Time', 'Leave', 'Team'].map((t, i) => (
            <span className={i === 0 ? 'is-active' : undefined} key={t}>
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- dashboard ---------------- */

export default function HeroMockup() {
  const [range, setRange] = useState('6 months');
  const [costRange, setCostRange] = useState('3 months');
  const [filter, setFilter] = useState('All sites');

  return (
    <div className="hm">
      <div className="hm-dash">
        {/* Only the top of the rail is visible; the phone covers the rest. */}
        <div className="hm-rail" aria-hidden="true">
          <span className="hm-rail-mark" />
          <span className="hm-rail-item is-active" />
          <span className="hm-rail-item" />
        </div>

        <div className="hm-main">
          <div className="hm-topbar">
            <div className="hm-greet">
              <span>Good afternoon Amara</span>
              <strong>Welcome back to StaffIntra</strong>
            </div>
            <div className="hm-topbar-right">
              <span className="hm-search" aria-hidden="true">
                Search
              </span>
              <span className="hm-ava hm-ava--a">AO</span>
            </div>
          </div>

          <div className="hm-stats">
            {[
              { k: 'Team members', v: '312', d: '+1 since last month' },
              { k: 'Absences', v: '4', d: '+2 since last month' },
              { k: 'Overtime hours', v: '253', d: '+22 since last month' },
            ].map((s) => (
              <div className="hm-stat" key={s.k}>
                <span className="hm-stat-k">
                  <i className="hm-stat-mark" aria-hidden="true" />
                  {s.k}
                </span>
                <strong>{s.v}</strong>
                <span className="hm-stat-d">{s.d}</span>
              </div>
            ))}
          </div>

          <div className="hm-filters">
            {FILTERS.map((f) => (
              <button
                type="button"
                key={f}
                className={`hm-chip${filter === f ? ' is-on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="hm-grid2">
            <div className="hm-card">
              <div className="hm-card-head">
                <strong>Headcount</strong>
                <Select
                  value={range}
                  options={Object.keys(RANGES)}
                  onChange={setRange}
                  label="Headcount range"
                />
              </div>
              <Chart data={RANGES[range]} />
            </div>

            <div className="hm-card">
              <div className="hm-card-head">
                <strong>Time off</strong>
              </div>
              <p className="hm-sub">Out today</p>
              {OUT_TODAY.map((p) => (
                <div className="hm-person" key={p.name}>
                  <span className={`hm-ava hm-ava--${p.tone}`}>{p.initials}</span>
                  <span className="hm-person-txt">
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </span>
                </div>
              ))}
              <p className="hm-sub">Out tomorrow</p>
              {OUT_TOMORROW.map((p) => (
                <div className="hm-person" key={p.name}>
                  <span className={`hm-ava hm-ava--${p.tone}`}>{p.initials}</span>
                  <span className="hm-person-txt">
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="hm-card">
              <div className="hm-card-head">
                <strong>Live labour cost breakdown</strong>
                <Select
                  value={costRange}
                  options={Object.keys(COST)}
                  onChange={setCostRange}
                  label="Labour cost range"
                />
              </div>
              {COST[costRange].map((c) => (
                <div className="hm-cost-row" key={c.site}>
                  <span className="hm-cost-site">{c.site}</span>
                  <span className="hm-cost-track">
                    <span className="hm-cost-fill" style={{ '--p': `${c.pct}%` }} />
                  </span>
                  <span className="hm-cost-val">{c.value}</span>
                </div>
              ))}
            </div>

            <div className="hm-card">
              <div className="hm-card-head">
                <strong>Certifications</strong>
              </div>
              <div className="hm-cert">
                <span className="hm-cert-bad">Expires in 6 days</span>
                <span>First aid · 3 people</span>
              </div>
              <div className="hm-cert">
                <span className="hm-cert-ok">Valid</span>
                <span>Safeguarding · 41 people</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Phone />
    </div>
  );
}
