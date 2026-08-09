'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import './HeroMockup.css';

/* ---------------- icons ---------------- */
/* Small line icons at a shared 16px grid, square-cut to match the brand. */
const ic = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  viewBox: '0 0 16 16',
};
const IconPeople = () => (
  <svg {...ic}><circle cx="6" cy="5.5" r="2.6" /><path d="M1.5 14a4.5 4.5 0 0 1 9 0M11 3.4a2.6 2.6 0 0 1 0 4.9M12.2 14a4.6 4.6 0 0 0-1.6-3.3" /></svg>
);
const IconAlert = () => (
  <svg {...ic}><path d="M8 1.8 15 14H1z" /><path d="M8 6.2v3.4M8 11.4v.8" /></svg>
);
const IconClock = () => (
  <svg {...ic}><circle cx="8" cy="8" r="6.3" /><path d="M8 4.4V8l2.5 1.6" /></svg>
);
const IconCal = () => (
  <svg {...ic}><rect x="1.8" y="3" width="12.4" height="11.2" /><path d="M1.8 6.4h12.4M5 1.6v2.6M11 1.6v2.6" /></svg>
);
const IconLeave = () => (
  <svg {...ic}><path d="M2 13.6h12M4.4 13.6V7.2l3.6-2.8 3.6 2.8v6.4" /><path d="M6.8 13.6v-3.2h2.4v3.2" /></svg>
);
const IconDoc = () => (
  <svg {...ic}><path d="M3.4 1.8h6L12.6 5v9.2H3.4z" /><path d="M9.2 1.8V5h3.4M5.6 8.4h5M5.6 11h5" /></svg>
);
const IconGrid = () => (
  <svg {...ic}><rect x="2" y="2" width="5" height="5" /><rect x="9" y="2" width="5" height="5" /><rect x="2" y="9" width="5" height="5" /><rect x="9" y="9" width="5" height="5" /></svg>
);
const IconBolt = () => (
  <svg {...ic}><path d="M9 1.5 3.5 9h4l-.5 5.5L13 7H9z" /></svg>
);
const IconSearch = () => (
  <svg {...ic}><circle cx="7" cy="7" r="4.6" /><path d="M10.4 10.4 14.2 14.2" /></svg>
);

const TILE_ICONS = {
  'Time clock': IconClock,
  Leave: IconLeave,
  Payslips: IconDoc,
  Timesheets: IconGrid,
  'Time off': IconLeave,
  Rota: IconCal,
};
const TAB_ICONS = { Home: IconGrid, Rota: IconCal, Time: IconClock, Leave: IconLeave, Team: IconPeople };

/* Photo where we have one, initials where we don't. */
function Avatar({ person, className = '' }) {
  if (person.img) {
    return (
      <img
        className={`hm-ava hm-ava--img ${className}`.trim()}
        src={`/assets/people/${person.img}.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <span className={`hm-ava hm-ava--${person.tone || 'a'} ${className}`.trim()}>
      {person.initials}
    </span>
  );
}

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

const VIEWS = ['Overview', 'Rota', 'People'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SHIFTS = {
  early: { label: 'Early', time: '07:00', tone: 'early' },
  late: { label: 'Late', time: '14:00', tone: 'late' },
  night: { label: 'Night', time: '22:00', tone: 'night' },
  open: { label: 'Open', time: 'Claim', tone: 'open' },
};

const ROTA = [
  { name: 'Sofia Reyes', initials: 'SR', img: 'sofia', cells: ['early', null, 'late', 'early', null, 'night', null] },
  { name: 'Tunde Okafor', initials: 'TO', img: 'tunde', cells: [null, 'late', 'late', null, 'early', 'early', null] },
  { name: 'Priya Sharma', initials: 'PS', img: 'priya', cells: ['night', 'night', null, 'open', 'late', null, 'late'] },
  { name: 'Marcus Bell', initials: 'MB', img: 'marcus', cells: ['late', null, 'early', 'early', 'open', null, 'night'] },
  { name: 'Dana Whyte', initials: 'DW', tone: 'c', cells: [null, 'early', null, 'late', 'night', 'late', 'early'] },
];

const PEOPLE = [
  { name: 'Amara Osei', initials: 'AO', img: 'amara', role: 'Operations lead', site: 'Northwind Care', status: 'On shift' },
  { name: 'Sofia Reyes', initials: 'SR', img: 'sofia', role: 'Senior carer', site: 'Northwind Care', status: 'On shift' },
  { name: 'Tunde Okafor', initials: 'TO', img: 'tunde', role: 'Floor supervisor', site: 'Harbor & Lane', status: 'Off today' },
  { name: 'Priya Sharma', initials: 'PS', img: 'priya', role: 'Night lead', site: 'Brightline', status: 'On leave' },
  { name: 'Marcus Bell', initials: 'MB', img: 'marcus', role: 'Care assistant', site: 'Northwind Care', status: 'On shift' },
  { name: 'Kofi Mensah', initials: 'KM', img: 'kofi', role: 'Floor supervisor', site: 'Harbor & Lane', status: 'Onboarding' },
];

const OUT_TODAY = [
  { name: 'John Pinnock', role: 'Floor supervisor', initials: 'JP', img: 'john' },
  { name: 'Hannah Jenner', role: 'Shift lead', initials: 'HJ', img: 'hannah' },
];
const OUT_TOMORROW = [
  { name: 'David Martins', role: 'Care assistant', initials: 'DM', img: 'david' },
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

/* A real week grid: people down, days across, shifts in the cells. Clicking a
   cell cycles it, so the rota can actually be edited. */
function Rota() {
  const [grid, setGrid] = useState(() => ROTA.map((r) => r.cells.slice()));
  const order = [null, 'early', 'late', 'night', 'open'];

  const cycle = (row, col) =>
    setGrid((g) =>
      g.map((r, i) =>
        i !== row ? r : r.map((c, j) => (j !== col ? c : order[(order.indexOf(c) + 1) % order.length]))
      )
    );

  const filled = grid.flat().filter(Boolean).length;
  const open = grid.flat().filter((c) => c === 'open').length;

  return (
    <div className="hm-rota">
      <div className="hm-rota-head">
        <span className="hm-rota-week">Week of 10 Aug</span>
        <span className="hm-rota-meta">
          {filled} shifts · {open} open
        </span>
      </div>
      <div className="hm-rota-grid">
        <span className="hm-rota-corner" />
        {DAYS.map((d) => (
          <span className="hm-rota-day" key={d}>
            {d}
          </span>
        ))}
        {ROTA.map((person, row) => (
          <Fragment key={person.name}>
            <span className="hm-rota-person">
              <Avatar person={person} />
              <span>{person.name.split(' ')[0]}</span>
            </span>
            {DAYS.map((d, col) => {
              const key = grid[row][col];
              const s = key ? SHIFTS[key] : null;
              return (
                <button
                  type="button"
                  key={d}
                  className={`hm-cell${s ? ` is-${s.tone}` : ''}`}
                  onClick={() => cycle(row, col)}
                  aria-label={`${person.name}, ${d}: ${s ? s.label : 'no shift'}`}
                >
                  {s ? (
                    <>
                      <span className="hm-cell-time">{s.time}</span>
                      <span className="hm-cell-label">{s.label}</span>
                    </>
                  ) : null}
                </button>
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="hm-rota-key">
        {Object.entries(SHIFTS).map(([k, s]) => (
          <span key={k}>
            <i className={`hm-key-dot is-${s.tone}`} /> {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function People() {
  const [q, setQ] = useState('');
  const rows = PEOPLE.filter((p) =>
    (p.name + p.role + p.site).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="hm-people">
      <input
        className="hm-people-search"
        placeholder="Search people"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search people"
      />
      <div className="hm-table" role="table">
        <div className="hm-tr hm-tr--head" role="row">
          <span>Name</span>
          <span>Role</span>
          <span>Site</span>
          <span>Status</span>
        </div>
        {rows.map((p) => (
          <div className="hm-tr" role="row" key={p.name}>
            <span className="hm-td-name">
              <Avatar person={p} />
              {p.name}
            </span>
            <span>{p.role}</span>
            <span>{p.site}</span>
            <span>
              <i className={`hm-pill is-${p.status.replace(/\s/g, '').toLowerCase()}`}>{p.status}</i>
            </span>
          </div>
        ))}
        {rows.length === 0 ? <p className="hm-empty">No one matches “{q}”.</p> : null}
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
            <strong>Northwind Care · Ward B</strong>
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
                <i className="hm-tile-mark" aria-hidden="true">
                  {(() => {
                    const I = TILE_ICONS[t];
                    return I ? <I /> : null;
                  })()}
                </i>
                {t}
              </span>
            ))}
          </div>
          <p className="hm-phone-sub">Tools</p>
          <div className="hm-tiles">
            {['Timesheets', 'Time off', 'Rota'].map((t) => (
              <span className="hm-tile" key={t}>
                <i className="hm-tile-mark" aria-hidden="true">
                  {(() => {
                    const I = TILE_ICONS[t];
                    return I ? <I /> : null;
                  })()}
                </i>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* A quick-action chip rather than a heavy black plus. */}
        <span className="hm-fab" aria-hidden="true">
          <IconBolt />
          Swap
        </span>
        <div className="hm-tabs" aria-hidden="true">
          {['Home', 'Rota', 'Time', 'Leave', 'Team'].map((t, i) => {
            const I = TAB_ICONS[t];
            return (
              <span className={i === 0 ? 'is-active' : undefined} key={t}>
                <i>{I ? <I /> : null}</i>
                {t}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- dashboard ---------------- */

export default function HeroMockup() {
  const [view, setView] = useState('Overview');
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
                <IconSearch />
                Search
              </span>
              <span className="hm-ava hm-ava--a">AO</span>
            </div>
          </div>

          <div className="hm-views" role="tablist" aria-label="Dashboard view">
            {VIEWS.map((v) => (
              <button
                type="button"
                key={v}
                role="tab"
                aria-selected={view === v}
                className={`hm-view${view === v ? ' is-on' : ''}`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>

          {/* keyed so switching replays the transition */}
          <div className="hm-viewport" key={view}>
          {view === 'Rota' ? <Rota /> : null}
          {view === 'People' ? <People /> : null}

          {view === 'Overview' ? (
            <>
          <div className="hm-stats">
            {[
              { k: 'Team members', v: '312', d: '+1 since last month', I: IconPeople },
              { k: 'Absences', v: '4', d: '+2 since last month', I: IconAlert },
              { k: 'Overtime hours', v: '253', d: '+22 since last month', I: IconClock },
            ].map((s) => (
              <div className="hm-stat" key={s.k}>
                <span className="hm-stat-k">
                  <i className="hm-stat-mark" aria-hidden="true">
                    <s.I />
                  </i>
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
                  <Avatar person={p} />
                  <span className="hm-person-txt">
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </span>
                </div>
              ))}
              <p className="hm-sub">Out tomorrow</p>
              {OUT_TOMORROW.map((p) => (
                <div className="hm-person" key={p.name}>
                  <Avatar person={p} />
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
            </>
          ) : null}
          </div>
        </div>
      </div>

      {/* Only on Overview — the other views want the full width. */}
      {view === 'Overview' ? <Phone /> : null}
    </div>
  );
}
