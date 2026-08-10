'use client';

import { useState } from 'react';
import './HeroMockup.css';

/* The product surface in the hero, rebuilt to the real Home screen rather than
   invented: greeting, the NOW / TODAY / THIS WEEK / ELSEWHERE strip, My Work,
   Continue where you left off, the Approvals and schedule pair, the week chart
   and announcements, and the right rail of quick actions, team today and
   celebrations.

   Four deliberate departures from the screenshots:
     - main area only. The sidebar and the icon rail are dropped, because at
       this width their text would land near 6px
     - branded StaffIntra, not the org that built it
     - populated and clocked in. The real capture is an empty account showing
       "Could not load your work"; a marketing hero should not show the
       product failing
     - the dark-mode switch moves from the sidebar into the top bar, since the
       sidebar is not on screen to hold it

   Every teal and green in the original is a purple here. The four team-today
   segments are three steps of purple plus grey, so they stay tellable apart
   without reintroducing another hue. */

/* ---------------- icons ---------------- */

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
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
const ICheck = () => <Ico d="M5.5 10.4 8.6 13.5 14.5 7" />;
const ICal = () => <Ico><rect x="3.5" y="4.8" width="13" height="11.7" rx="2" {...s} /><path d="M3.5 8.4h13M7 3.4v2.6M13 3.4v2.6" {...s} /></Ico>;
const ILeave = () => <Ico d="M3.5 11.5 16.5 6.2l-2 5.6-4.6 1.3-1.6 3-1-3.6Z" />;
const IFolder = () => <Ico><path d="M3.2 6.4a1.6 1.6 0 0 1 1.6-1.6h2.6l1.6 2h5.2a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H4.8a1.6 1.6 0 0 1-1.6-1.6Z" {...s} /></Ico>;
const IPeople = () => <Ico><circle cx="8" cy="7.6" r="2.6" {...s} /><path d="M3.4 15.6a4.8 4.8 0 0 1 9.2 0M13.4 5.4a2.6 2.6 0 0 1 0 4.9M14.4 15.6a4.4 4.4 0 0 0-1.2-3" {...s} /></Ico>;
const IGear = () => <Ico><circle cx="10" cy="10" r="2.6" {...s} /><path d="M10 2.8v1.6M10 15.6v1.6M2.8 10h1.6M15.6 10h1.6M4.9 4.9l1.2 1.2M13.9 13.9l1.2 1.2M15.1 4.9l-1.2 1.2M6.1 13.9l-1.2 1.2" {...s} /></Ico>;
const IDoc = () => <Ico><path d="M5.4 3.4h6l3.2 3.2v10H5.4Z" {...s} /><path d="M11.4 3.4v3.2h3.2M7.8 10h4.4M7.8 12.8h3" {...s} /></Ico>;
const IDown = () => <Ico d="M10 4.5v8M6.4 9.2 10 12.8l3.6-3.6M4.8 15.6h10.4" />;

/* ---------------- data ---------------- */

const PEOPLE = [
  { initials: 'TS', tone: 'a', img: null },
  { initials: 'AO', tone: 'b', img: 'p1' },
  { initials: 'CN', tone: 'c', img: 'p2' },
];

const RECENT = [
  { name: 'StaffIntra Workspace', when: 'opened just now', I: IGear },
  { name: 'Attendance', when: 'opened 10m ago', I: IDoc },
  { name: 'Rota · week of 10 Aug', when: 'opened 28m ago', I: IDoc },
  { name: 'StaffIntra Workspace', when: 'opened 1h ago', I: IGear },
];

const WORK = [
  { t: 'Approve overtime · Ikeja site', m: 'Due today', tone: 'due' },
  { t: 'Sign off week 32 timesheets', m: '12 of 15 in', tone: 'go' },
  { t: 'Review cover for Sat 15 Aug', m: 'Tomorrow', tone: 'soft' },
];

const QUICK = [
  { t: 'Request leave', I: ILeave },
  { t: 'My timesheet', I: IClock },
  { t: 'Open projects', I: IFolder },
  { t: 'Team directory', I: IPeople },
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
  const maxH = Math.max(...WEEK.map((w) => w.h)) || 1;

  return (
    <div className="hm">
      <div className="hm-dash" data-theme={dark ? 'dark' : 'light'}>
        {/* Sticky, so it stays put while the screen scrolls under it. */}
        <div className="hm-top">
          <span className="hm-ico"><IPanel /></span>
          <span className="hm-search"><ISearch />Search anything<kbd>⌘K</kbd></span>
          <span className="hm-pill"><ITarget />My Work</span>
          <span className="hm-stack">
            {PEOPLE.map((p) => <Ava key={p.initials} p={p} />)}
            <span className="hm-more">+8</span>
          </span>
          <span className="hm-in">11 in today</span>
          <span className="hm-ico"><IHelp /></span>
          <span className="hm-ico hm-ico--bell"><IBell /><i>9+</i></span>
          <button
            type="button"
            className="hm-ico hm-ico--btn"
            onClick={() => setDark((d) => !d)}
            aria-pressed={dark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <ISun /> : <IMoon />}
          </button>
          <span className="hm-clock"><IClock />Clock In</span>
        </div>

        <div className="hm-scroll">
          <div className="hm-greet">
            <div>
              <h3>Good afternoon, Fortune</h3>
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
            <div>
              <span className="hm-k">This week</span>
              <strong className="hm-mono">26h 10m</strong>
              <span className="hm-sub">of 40h target</span>
              <span className="hm-link">View timesheet →</span>
            </div>
            <div>
              <span className="hm-k">Elsewhere</span>
              <span className="hm-else"><strong className="hm-mono">14:27</strong><strong className="hm-mono">09:27</strong></span>
              <span className="hm-else hm-sub"><span>London</span><span>Toronto</span></span>
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
                  {['Annual leave · 12–14 Aug', 'Overtime · Fri 13 Aug', 'Shift swap · Sat 15 Aug'].map((t) => (
                    <div className="hm-row" key={t}>
                      <span className="hm-tick hm-tick--go" />
                      <span className="hm-row-t">{t}</span>
                    </div>
                  ))}
                </Card>
                <Card title="Today's schedule" chip="2" link="Calendar">
                  {[['09:30', 'Shift handover'], ['14:00', 'Rota review']].map(([h, t]) => (
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

        <span className="hm-fab" aria-hidden="true"><IDown /></span>
      </div>

      <Phone dark={dark} />
    </div>
  );
}

/* The same Home screen at phone width: the strip stacks to two rows, the
   right rail folds under, and the top bar keeps only what fits. */
function Phone({ dark }) {
  return (
    <div className="hm-phone" data-theme={dark ? 'dark' : 'light'} aria-hidden="true">
      <div className="hm-phone-in">
        <div className="hm-p-top">
          <span className="hm-p-brand">StaffIntra</span>
          <span className="hm-ico hm-ico--bell"><IBell /><i>9+</i></span>
        </div>

        <div className="hm-p-scroll">
          <div className="hm-p-greet">
            <strong>Good afternoon, Fortune</strong>
            <em>Mon 10 Aug · Lagos</em>
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
            <h5>Quick actions</h5>
            <div className="hm-quick">
              {QUICK.slice(0, 4).map((q) => (
                <span className="hm-q" key={q.t}><q.I />{q.t}</span>
              ))}
            </div>
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
      </div>
    </div>
  );
}
