'use client';

import { useEffect, useRef, useState } from 'react';
import Brand from './Brand';
import './HeroMockup.css';

/* The product surface in the hero, rebuilt to the real Home screen rather than
   invented: greeting, the NOW / TODAY / PRODUCTIVITY / WORKDAY strip, My Work,
   Continue where you left off, the Approvals and schedule pair, the week chart
   and announcements, and the right rail of quick actions, team today and
   celebrations.

   Three deliberate departures from the screenshots:
     - the far-left icon rail is dropped; the sidebar itself is here, and it
       collapses from the panel button in the top bar
     - branded StaffIntra, not the org that built it
     - populated and clocked in. The real capture is an empty account showing
       "Could not load your work"; a marketing hero should not show the
       product failing

   The dark-mode switch sits in the sidebar where the real one does. A second
   copy appears in the top bar only while the sidebar is collapsed, so the
   control is never both duplicated and never lost.

   Every teal and green in the original is a purple here. The four team-today
   segments are three steps of purple plus grey, so they stay tellable apart
   without reintroducing another hue. */

/* ---------------- icons ---------------- */

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Ico = ({ d, children }) => (
  <svg className="hm-i" viewBox="0 0 20 20" aria-hidden="true">
    {children ?? <path d={d} {...s} />}
  </svg>
);

const IPanel = () => <Ico><rect x="2.5" y="3.5" width="15" height="13" rx="2" {...s} /><path d="M8 3.5v13" {...s} /></Ico>;
const ISearch = () => <Ico><circle cx="9" cy="9" r="5.5" {...s} /><path d="M13.5 13.5 17 17" {...s} /></Ico>;
const ITarget = () => <Ico><circle cx="10" cy="10" r="6.5" {...s} /><circle cx="10" cy="10" r="2.5" {...s} /></Ico>;
const IHelp = () => <Ico><circle cx="10" cy="10" r="7" {...s} /><path d="M8.2 8a1.9 1.9 0 1 1 2.4 1.9v1.1" {...s} /><circle cx="10" cy="14" r=".7" fill="currentColor" stroke="none" /></Ico>;
const IBell = () => <Ico><path d="M6 8.5a4 4 0 1 1 8 0c0 3 1.2 4 1.2 4H4.8S6 11.5 6 8.5Z" {...s} /><path d="M8.6 15.2a1.6 1.6 0 0 0 2.8 0" {...s} /></Ico>;
const IClock = () => <Ico><circle cx="10" cy="10" r="7" {...s} /><path d="M10 6v4.2l2.6 1.6" {...s} /></Ico>;
const ISun = () => <Ico><circle cx="10" cy="10" r="3.4" {...s} /><path d="M10 2.6v1.8M10 15.6v1.8M2.6 10h1.8M15.6 10h1.8M4.8 4.8l1.3 1.3M13.9 13.9l1.3 1.3M15.2 4.8l-1.3 1.3M6.1 13.9l-1.3 1.3" {...s} /></Ico>;
const IMoon = () => <Ico><path d="M15.5 11.4A6 6 0 0 1 8.6 4.5a6 6 0 1 0 6.9 6.9Z" {...s} /></Ico>;
const ISpark = () => <Ico><path d="M10 3.5 11.4 8 16 9.4 11.4 10.8 10 15.4 8.6 10.8 4 9.4 8.6 8Z" {...s} /></Ico>;
const IPlus = () => <Ico d="M10 4.6v10.8M4.6 10h10.8" />;
const IChev = () => <Ico d="M7.5 8.5 10 11l2.5-2.5" />;
const IArrow = () => <Ico d="M4.5 10h10M10.5 6l4 4-4 4" />;
const IRefresh = () => <Ico><path d="M16 10a6 6 0 1 1-1.9-4.4" {...s} /><path d="M16 3.5V7h-3.5" {...s} /></Ico>;
const IHistory = () => <Ico><path d="M4.2 10a5.8 5.8 0 1 0 1.8-4.2" {...s} /><path d="M4 4.4V8h3.6M10 7v3.2l2.2 1.4" {...s} /></Ico>;
const ICheck = () => <Ico d="M4.4 10.2 8.4 14.2 15.6 5.8" />;
const ICal = () => <Ico><rect x="3.4" y="4.6" width="13.2" height="12" rx="2" {...s} /><path d="M3.4 8.6h13.2" {...s} /></Ico>;
const ILeave = () => <Ico d="M3.5 10.4 16.5 5.1l-2 5.6-4.6 1.3-1.6 3-1-3.6Z" />;
const IFolder = () => <Ico><path d="M3.2 6.4a1.6 1.6 0 0 1 1.6-1.6h2.6l1.6 2h5.2a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H4.8a1.6 1.6 0 0 1-1.6-1.6Z" {...s} /></Ico>;
const IPeople = () => <Ico><circle cx="8" cy="7.6" r="2.6" {...s} /><path d="M3.4 15.6a4.8 4.8 0 0 1 9.2 0M13.4 5.4a2.6 2.6 0 0 1 0 4.9M14.4 15.6a4.4 4.4 0 0 0-1.2-3" {...s} /></Ico>;
/* Was a gear drawn as a ring with eight radial spokes, which is the same
   shape as ISun at this size and rendered as a sun everywhere it was used.
   A workspace is layers, and a gear at 12px cannot be told from a sun at all,
   so Tools takes sliders instead. */
const ILayers = () => <Ico><path d="M10 3 3 6.6 10 10.2l7-3.6Z" {...s} /><path d="M3 11.4 10 15l7-3.6" {...s} /></Ico>;
const ISliders = () => <Ico><path d="M3.2 7.2h8.2M15.2 7.2h1.6M3.2 12.8h1.6M8.6 12.8h8.2" {...s} /><circle cx="13.4" cy="7.2" r="1.8" {...s} /><circle cx="6.4" cy="12.8" r="1.8" {...s} /></Ico>;
const IInbox = () => <Ico><path d="M3.2 10.6 5.4 4.8h9.2l2.2 5.8" {...s} /><path d="M3.2 10.6h4l1 2.4h3.6l1-2.4h4v3.2a1.4 1.4 0 0 1-1.4 1.4H4.6a1.4 1.4 0 0 1-1.4-1.4Z" {...s} /></Ico>;
const IChart = () => <Ico d="M5.2 14.2V8.4M10 14.2V4.2M14.8 14.2v-4.2M3.2 15.8h13.6" />;
const IMega = () => <Ico><path d="M4.4 8.4v3a1 1 0 0 0 1 1h1.7l5.3 3.3V4.1L7.1 7.4H5.4a1 1 0 0 0-1 1Z" {...s} /><path d="M15 7.8a3.2 3.2 0 0 1 0 4.4" {...s} /></Ico>;
const IDoc = () => <Ico><path d="M5.4 3.4h6l3.2 3.2v10H5.4Z" {...s} /><path d="M11.4 3.4v3.2h3.2M7.8 10h4.4M7.8 12.8h3" {...s} /></Ico>;
const IDown = () => <Ico d="M10 4.5v8M6.4 9.2 10 12.8l3.6-3.6M4.8 15.6h10.4" />;
const IHome = () => <Ico d="M3.6 9 10 3.8 16.4 9v6.6a1 1 0 0 1-1 1H4.6a1 1 0 0 1-1-1Z" />;

/* ---------------- data ---------------- */

/* Filenames must match public/assets/people; p1 and p2 never existed and were
   404ing behind the initials fallback. */
const PEOPLE = [
  { initials: 'RA', tone: 'a', img: null },
  { initials: 'UI', tone: 'b', img: 'amara' },
  { initials: 'EO', tone: 'c', img: 'tunde' },
];

const RECENT = [
  { name: 'StaffIntra Workspace', when: 'opened just now', I: ILayers },
  { name: 'Attendance', when: 'opened 10m ago', I: IClock },
  { name: 'Timesheets · week 33', when: 'opened 28m ago', I: ICal },
  { name: 'Approvals queue', when: 'opened 1h ago', I: ICheck },
];

const WORK = [
  { t: 'Task overdue · payout webhook retries', m: '≈6 min to clear', tone: 'due' },
  { t: 'Leave request · Jemimah, Thu to Fri', m: 'rule §4 routed', tone: 'go' },
  { t: 'August payroll run', m: 'Scheduled 28 Aug', tone: 'soft' },
];

const QUICK = [
  { t: 'Request leave', I: ILeave },
  { t: 'Claim expense', I: IDoc },
  { t: 'My timesheet', I: IClock },
  { t: 'Review approvals', I: ICheck },
];

const WEEK = [
  { d: 'Mon', h: 7.6, v: '7.6' },
  { d: 'Tue', h: 8.2, v: '8.2' },
  { d: 'Wed', h: 6.4, v: '6.4' },
  { d: 'Thu', h: 4.0, v: '4.0' },
  { d: 'Fri', h: 0, v: '—' },
  { d: 'Sat', h: 0, v: '—' },
  { d: 'Sun', h: 0, v: '—' },
];

const TEAM = [
  { k: 'In office', n: 11, c: 'a' },
  { k: 'Remote', n: 2, c: 'b' },
  { k: 'On leave', n: 1, c: 'c' },
  { k: 'Not in yet', n: 1, c: 'd' },
];

/* Sidebar, in the real app's grouping. Each row carries its own icon rather
   than a grey placeholder square. */
const SIDE = [
  { items: [{ t: 'Home', I: IHome, on: true }, { t: 'Inbox', I: IInbox, n: '99+' }] },
  {
    lab: 'Pinned',
    items: [
      { t: 'My Tasks', I: ICheck },
      { t: 'Announcements', I: IMega },
      { t: 'Timesheets', I: ICal },
    ],
  },
  {
    lab: 'Work',
    items: [
      { t: 'Workspaces', I: ILayers },
      { t: 'Case Management', I: IFolder },
      { t: 'Productivity', I: IChart },
      { t: 'Forms', I: IDoc },
    ],
  },
  {
    lab: 'People',
    items: [
      { t: 'HR', I: IPeople },
      { t: 'Staff Lifecycle', I: IRefresh },
    ],
  },
];

/* One asset per theme; the light one is purple on white, the dark one white. */
function Logo({ className = '' }) {
  return (
    <>
      <span className={`hm-logo hm-logo--l ${className}`.trim()}><Brand /></span>
      <span className={`hm-logo hm-logo--d ${className}`.trim()} aria-hidden="true"><Brand variant="white" /></span>
    </>
  );
}

/* ---------------- pieces ---------------- */

function Ava({ p, className = '' }) {
  if (p.img) {
    return <img className={`hm-ava hm-ava--img ${className}`.trim()} src={`/assets/people/${p.img}.jpg`} alt="" loading="lazy" decoding="async" />;
  }
  return <span className={`hm-ava hm-ava--${p.tone} ${className}`.trim()}>{p.initials}</span>;
}

function Card({ title, chip, link, children, className = '' }) {
  return (
    <section className={`hm-card ${className}`.trim()}>
      <header className="hm-card-h">
        <h4>
          {title}
          {chip ? <span className="hm-chip">{chip}</span> : null}
        </h4>
        {link ? <span className="hm-link">{link}</span> : null}
      </header>
      {children}
    </section>
  );
}

/* 11 of 15, drawn as a ring. r=26 gives a circumference of 163.4. */
function Donut({ done, total }) {
  const C = 163.4;
  return (
    <svg className="hm-donut" viewBox="0 0 68 68" aria-hidden="true">
      <circle cx="34" cy="34" r="26" className="hm-donut-track" />
      <circle cx="34" cy="34" r="26" className="hm-donut-fill" strokeDasharray={`${(done / total) * C} ${C}`} />
      <text x="34" y="32" className="hm-donut-n">{done}</text>
      <text x="34" y="42" className="hm-donut-of">OF {total}</text>
    </svg>
  );
}

/* ---------------- the screen ---------------- */

export default function HeroMockup() {
  const [dark, setDark] = useState(false);
  const [side, setSide] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const scrollRef = useRef(null);
  const maxH = Math.max(...WEEK.map((w) => w.h)) || 1;

  /* Tied to the DASHBOARD's own scroll, not the page's. The phone sits over
     the dashboard, so it gets out of the way as soon as you scroll the screen
     underneath it, and returns when that screen is back at its start. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setAtTop(el.scrollTop < 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  const themeBtn = (
    <button
      type="button"
      className="hm-ico hm-ico--btn hm-theme"
      onClick={() => setDark((d) => !d)}
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <ISun /> : <IMoon />}
    </button>
  );

  return (
    <div className="hm">
      <div className="hm-dash" data-theme={dark ? 'dark' : 'light'} data-side={side ? '' : undefined}>
        {/* Width animates to zero; the inner column keeps its own width so the
            content never reflows mid-collapse. */}
        <aside className="hm-side">
          <div className="hm-side-in">
            <div className="hm-side-top"><Logo /></div>

            <div className="hm-side-nav">
              {SIDE.map((g, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={g.lab ?? i}>
                  {g.lab ? <span className="hm-s-lab">{g.lab}</span> : null}
                  {g.items.map((it) => (
                    <span className={`hm-s-item${it.on ? ' is-on' : ''}`} key={it.t}>
                      <it.I />
                      {it.t}
                      {it.n ? <b>{it.n}</b> : null}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="hm-side-foot">
              <button
                type="button"
                className="hm-s-theme"
                onClick={() => setDark((d) => !d)}
                aria-pressed={dark}
              >
                <IMoon />
                Dark mode
                <span className="hm-switch" data-on={dark ? '' : undefined} />
              </button>
              <span className="hm-upgrade">Upgrade plan</span>
              <span className="hm-user">
                <Ava p={{ initials: 'FS', tone: 'a' }} />
                <span>
                  <strong>Samuel Johnson</strong>
                  <em>MD / CEO · BLU-0001</em>
                </span>
              </span>
            </div>
          </div>
        </aside>

        <div className="hm-body">
        {/* Sticky, so it stays put while the screen scrolls under it. */}
        <div className="hm-top">
          <button
            type="button"
            className="hm-ico hm-ico--btn"
            onClick={() => setSide((v) => !v)}
            aria-pressed={side}
            title={side ? 'Hide sidebar' : 'Show sidebar'}
          >
            <IPanel />
          </button>
          <span className="hm-search"><ISearch />Search anything<kbd>⌘K</kbd></span>
          <span className="hm-pill"><ITarget />My Work</span>
          <span className="hm-stack">
            {PEOPLE.map((p) => <Ava key={p.initials} p={p} />)}
            <span className="hm-more">+8</span>
          </span>
          <span className="hm-in">14 of 16 in</span>
          <span className="hm-ico"><IHelp /></span>
          <span className="hm-ico hm-ico--bell"><IBell /><i>9+</i></span>
          {/* Only visible while the sidebar is collapsed; see the stylesheet. */}
          {themeBtn}
          <span className="hm-clock"><IClock />Clock In</span>
        </div>

        <div className="hm-scroll" ref={scrollRef}>
          <div className="hm-greet">
            <div>
              <h3>Good morning, Samuel</h3>
              <p>Monday, 10 August 2026 · Lagos (GMT+1)</p>
            </div>
            <div className="hm-greet-act">
              <span className="hm-brief"><ISpark />Your briefing<i /><IArrow /></span>
              <span className="hm-create"><IPlus />Create<IChev /></span>
            </div>
          </div>

          <div className="hm-strip">
            <div>
              <span className="hm-k">Now</span>
              <strong className="hm-mono">14:27</strong>
              <span className="hm-sub">Africa/Lagos</span>
              <span className="hm-dot">Clocked in 09:02</span>
            </div>
            <div>
              <span className="hm-k">Today</span>
              <strong className="hm-mono">5h 24m</strong>
              <span className="hm-sub">3 sessions</span>
            </div>
            {/* Productivity and Workday, not "This week" and "Elsewhere".
                The real briefing strip is NOW / TODAY / PRODUCTIVITY /
                WORKDAY; the first version of this mockup invented the last
                two before the app had been read. */}
            <div>
              <span className="hm-k">Productivity</span>
              <strong className="hm-mono">26h 10m</strong>
              <span className="hm-sub">This month</span>
              <span className="hm-link">View timesheet →</span>
            </div>
            <div>
              <span className="hm-k">Workday</span>
              <strong>Active</strong>
              <span className="hm-sub">Clocked in 09:02</span>
              <span className="hm-sub">5h 24m worked today</span>
            </div>
          </div>

          <div className="hm-cols">
            <div className="hm-col">
              <Card
                title="My Work"
                link={<><IRefresh />Open ›</>}
              >
                <p className="hm-lede">Three things need you before the end of the day.</p>
                {WORK.map((w) => (
                  <div className="hm-row" key={w.t}>
                    <span className={`hm-tick hm-tick--${w.tone}`} />
                    <span className="hm-row-t">{w.t}</span>
                    <span className="hm-row-m">{w.m}</span>
                  </div>
                ))}
              </Card>

              <Card title="Continue where you left off" link={<IHistory />}>
                <div className="hm-recent">
                  {RECENT.map((r) => (
                    <span className="hm-rec" key={r.name + r.when}>
                      <span className="hm-rec-i"><r.I /></span>
                      <span>
                        <strong>{r.name}</strong>
                        <em>{r.when}</em>
                      </span>
                    </span>
                  ))}
                </div>
              </Card>

              <div className="hm-pair">
                <Card title="Approvals" chip="3 waiting" link="Queue">
                  {['Annual leave · 12 to 14 Aug', 'Overtime · Fri 13 Aug', 'Expense · ₦48,500'].map((t) => (
                    <div className="hm-row" key={t}>
                      <span className="hm-tick hm-tick--go" />
                      <span className="hm-row-t">{t}</span>
                    </div>
                  ))}
                </Card>
                <Card title="Today's schedule" chip="2" link="Calendar">
                  {[['09:30', 'Standup · Engineering'], ['14:00', 'Payroll review']].map(([h, t]) => (
                    <div className="hm-row" key={t}>
                      <span className="hm-row-h hm-mono">{h}</span>
                      <span className="hm-row-t">{t}</span>
                    </div>
                  ))}
                </Card>
              </div>

              <div className="hm-pair">
                <Card title="My week" chip="26h 10m" link="Timesheet">
                  <div className="hm-week">
                    {WEEK.map((w) => (
                      <span className="hm-bar" key={w.d}>
                        <span className={`hm-bar-f${w.h ? '' : ' is-empty'}`} style={{ '--h': `${(w.h / maxH) * 100}%` }} />
                        <em>{w.d}</em>
                      </span>
                    ))}
                  </div>
                </Card>
                <Card title="Announcements" chip="1" link="View all">
                  <div className="hm-ann">
                    <span className="hm-tick hm-tick--go" />
                    <span>
                      <strong>Monday strategy meeting</strong>
                      <em>Operations · 9 Aug</em>
                    </span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="hm-col">
              <Card title="Quick actions">
                <div className="hm-quick">
                  {QUICK.map((q) => (
                    <span className="hm-q" key={q.t}><q.I />{q.t}</span>
                  ))}
                </div>
              </Card>

              <Card title="Team today" link="Directory">
                <div className="hm-team">
                  <Donut done={11} total={15} />
                  <div className="hm-legend">
                    {TEAM.map((t) => (
                      <span key={t.k}>
                        <i className={`hm-sw hm-sw--${t.c}`} />
                        {t.k}
                        <b>{t.n}</b>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hm-clocked">
                  <span className="hm-stack">
                    {PEOPLE.map((p) => <Ava key={p.initials} p={p} />)}
                    <span className="hm-more">+8</span>
                  </span>
                  11 clocked in today
                </div>
              </Card>

              <Card title="Celebrations" link="View all">
                <div className="hm-ann">
                  <span className="hm-cake">🎂</span>
                  <span>
                    <strong>Adaeze turns one year in</strong>
                    <em>Work anniversary · today</em>
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
        </div>

        <span className="hm-fab" aria-hidden="true"><IDown /></span>
      </div>

      <Phone dark={dark} hide={!atTop} />
    </div>
  );
}

const P_TABS = [
  { t: 'Home', I: IHome, on: true },
  { t: 'Time', I: ICal },
  { t: 'Tasks', I: ICheck },
  { t: 'Team', I: IPeople },
];

/* The same Home screen at phone width: the strip folds to a clock card plus
   two tiles, the right rail stacks under, and a tab bar closes the frame.
   The brand sits in the top bar as the mark, not as the word. */
function Phone({ dark, hide }) {
  return (
    <div
      className="hm-phone"
      data-theme={dark ? 'dark' : 'light'}
      data-hide={hide ? '' : undefined}
      aria-hidden="true"
    >
      <div className="hm-phone-in">
        <div className="hm-p-top">
          <Logo className="hm-p-logo" />
          <span className="hm-ico hm-ico--bell"><IBell /><i>9+</i></span>
        </div>

        <div className="hm-p-scroll">
          <div className="hm-p-greet">
            <strong>Good morning, Samuel</strong>
            <em>Wed 12 Aug · Lagos</em>
          </div>

          <div className="hm-p-now">
            <span className="hm-k">Now</span>
            <strong className="hm-mono">14:27</strong>
            <span className="hm-dot">Clocked in 09:02</span>
            <span className="hm-p-out"><IClock />Clock out</span>
          </div>

          <div className="hm-p-two">
            <span><em>Today</em><strong className="hm-mono">5h 24m</strong></span>
            <span><em>This week</em><strong className="hm-mono">26h 10m</strong></span>
          </div>

          <div className="hm-p-card">
            <h5>My Work<span className="hm-chip">3</span></h5>
            {WORK.map((w) => (
              <div className="hm-row" key={w.t}>
                <span className={`hm-tick hm-tick--${w.tone}`} />
                <span className="hm-row-t">{w.t}</span>
              </div>
            ))}
          </div>

          <div className="hm-p-card">
            <h5>Team today<span className="hm-chip">11 of 15</span></h5>
            <div className="hm-team">
              <Donut done={11} total={15} />
              <div className="hm-legend">
                {TEAM.slice(0, 3).map((t) => (
                  <span key={t.k}>
                    <i className={`hm-sw hm-sw--${t.c}`} />
                    {t.k}
                    <b>{t.n}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hm-p-tabs">
          {P_TABS.map((t) => (
            <span className={`hm-p-tab${t.on ? ' is-on' : ''}`} key={t.t}>
              <t.I />
              {t.t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
