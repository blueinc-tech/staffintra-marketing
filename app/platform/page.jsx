import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import Reveal from '../../components/motion/Reveal';
import { Spotlight } from '../../components/motion/Surfaces';
import { TurnArrow } from '../../components/PillarMarks';
import '../../components/PlatformPage.css';

export const metadata = {
  title: 'StaffIntra: Platform',
  description:
    'The home screen everyone starts on, the tools hub that launches the rest, the controls your auditors ask for, and the support behind all of it.',
};

/* The dark room. Every other page on the site is light; this one inverts, so
   the platform reads as the ground the rest of the product stands on rather
   than as another feature band. No panels, no cards: sections are separated
   by hairlines on the dark ground, and every figure below traces back to
   design/app-feature-map.md. PillarMoment is light-surfaced, so the product
   moments here are built as plain rows instead. */

const BRIEFING = [
  { label: 'Now', value: '09:14', note: 'Lagos (GMT+1), clocked in' },
  { label: 'Today', value: '8h 00m', note: '1 session, view timesheet' },
  { label: 'Productivity', value: '24h 00m', note: 'Logged this month' },
  { label: 'Workday', value: 'Standby', note: '8h 00m worked today' },
];

const MY_WORK = [
  {
    name: 'Leave request, Jemimah Dogara',
    meta: 'Annual leave, Thu to Fri',
    chip: 'Approve',
    tone: 'ok',
  },
  {
    name: 'Upfront loan request, Usman Ibrahim',
    meta: '₦150,000 over three months',
    chip: 'Decide',
    tone: 'accent',
  },
  {
    name: 'Case escalated, payroll dispute',
    meta: 'High priority, due today',
    chip: 'Review',
    tone: 'warn',
  },
  {
    name: 'Task overdue, supplier reconciliation',
    meta: 'Finance Ops workspace',
    chip: 'Open',
    tone: 'warn',
  },
];

const QUICK = [
  { name: 'Request leave', meta: 'Nine leave types, including study leave' },
  { name: 'My timesheet', meta: 'Your hours, sessions and breaks' },
  { name: 'Open projects', meta: 'Boards and tasks in your workspaces' },
  { name: 'Team directory', meta: 'Profiles, org chart, message' },
];

const TEAM_TODAY = [
  { label: 'In office', value: '11', p: 0.69 },
  { label: 'Remote', value: '3', p: 0.19 },
  { label: 'On leave', value: '1', p: 0.06 },
  { label: 'Not in yet', value: '1', p: 0.06 },
];

const CELEBRATIONS = [
  { name: 'Ruth Adeyemi', meta: 'Birthday today' },
  { name: 'Emmanuel Okafor', meta: 'Three years today' },
  { name: 'Blossom Adeh', meta: 'One year on Friday' },
];

const CATEGORIES = [
  {
    name: 'Communication',
    note: 'Where the talking happens.',
    items: [
      { name: 'Slack', chip: 'Live' },
      { name: 'Messaging and video tools' },
      { name: 'Announcement channels' },
    ],
  },
  {
    name: 'Recruitment',
    note: 'Everything before the first day.',
    items: [
      { name: 'Job boards' },
      { name: 'Applicant tracking' },
      { name: 'Interview scheduling' },
    ],
  },
  {
    name: 'Finance',
    note: 'The money side of the workday.',
    items: [
      { name: 'Payroll providers' },
      { name: 'Expense and reimbursement tools' },
      { name: 'Banking and invoicing' },
    ],
  },
  {
    name: 'General',
    note: 'The rest of the daily stack.',
    items: [
      { name: 'Google sign-in', chip: 'Live' },
      { name: 'Storage and documents' },
      { name: 'Whatever else your team opens' },
    ],
  },
];

const CONTROLS = [
  {
    label: 'Role-based access',
    value:
      'Permissions decide who can open salaries, documents and reports. A team lead and a finance manager see different parts of the same record.',
  },
  {
    label: 'A security tab per person',
    value:
      'Every staff profile carries its own Security tab, next to Documents, Training, Company Devices and Timesheets.',
  },
  {
    label: 'Connected accounts',
    value:
      'The accounts a person has linked are listed on their profile, so offboarding disconnects them from a list rather than from memory.',
  },
  {
    label: 'Confidential cases',
    value:
      'A case can be marked confidential when it is raised, so an HR complaint or a compliance incident never sits in the general queue.',
  },
  {
    label: 'Case lifecycle audit',
    value:
      'Each case keeps a timeline of its lifecycle events, so who changed what, and when, survives the handover.',
  },
];

const PROGRAM = [
  { label: 'SOC 2 Type 2', value: 'Readiness, reviewed as a standing program.' },
  { label: 'ISO 27001', value: 'Control alignment across the platform.' },
  { label: 'NDPR', value: 'Compliant handling of Nigerian employee data.' },
];

export default function Platform() {
  return (
    <>
      <Nav />
      <main>
        <div className="pf">
          <header className="pf-hero">
            <div className="container">
              <span className="sec-eyebrow">The platform</span>
              <h1>One home for the whole workday.</h1>
              <p className="pf-lede">
                Every person starts on the same surface: their clock, their queue, their team.
              </p>
              <div className="pf-acts">
                <a className="btn btn-primary btn-lg" href="/#demo">
                  Book a demo
                </a>
                <a className="btn btn-secondary btn-lg" href="/pricing">
                  See pricing
                </a>
              </div>
              <nav className="pf-jump" aria-label="On this page">
                <a className="turn-link" href="#home">
                  The command center <TurnArrow />
                </a>
                <a className="turn-link" href="#integrations">
                  The tools hub <TurnArrow />
                </a>
                <a className="turn-link" href="#security">
                  Security <TurnArrow />
                </a>
                <a className="turn-link" href="#support">
                  Support <TurnArrow />
                </a>
              </nav>
            </div>
          </header>

          <section className="pf-sec" id="home">
            <div className="container">
              <Reveal blurOnly>
                <header className="sec-head sec-head--tight">
                  <span className="sec-eyebrow">Home</span>
                  <h2>The command center.</h2>
                  <p className="sec-lede">
                    Sign in and the day is already arranged. Your day at a glance reads across
                    four cells, and the work that needs you sits directly under it.
                  </p>
                </header>
              </Reveal>

              <Reveal blurOnly delay={80}>
                <div className="pf-strip">
                  {BRIEFING.map((c) => (
                    <Spotlight className="pf-cell" key={c.label}>
                      <span className="pf-cell-label">{c.label}</span>
                      <span className="pf-cell-value">{c.value}</span>
                      <span className="pf-cell-note">{c.note}</span>
                    </Spotlight>
                  ))}
                </div>
              </Reveal>

              <Reveal blurOnly delay={120}>
                <div className="pf-panels pf-panels--wide">
                  <div className="pf-panel">
                    <div className="pf-panel-head">
                      <h3>My Work</h3>
                      <span className="pf-panel-meta">4 things need you</span>
                    </div>
                    <ul className="pf-rows">
                      {MY_WORK.map((r) => (
                        <li className="pf-row" key={r.name}>
                          <span className="pf-row-text">
                            <span className="pf-row-name">{r.name}</span>
                            <span className="pf-row-meta">{r.meta}</span>
                          </span>
                          <span className={`pf-chip pf-chip--${r.tone}`}>{r.chip}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="pf-panel-foot">
                      Clear the list top to bottom and the day is handled. When it empties, it
                      says so: queue is clear.
                    </p>
                  </div>

                  <div className="pf-panel">
                    <div className="pf-panel-head">
                      <h3>Quick actions</h3>
                      <span className="pf-panel-meta">One tap from home</span>
                    </div>
                    <ul className="pf-rows">
                      {QUICK.map((q) => (
                        <li className="pf-row pf-row--stack" key={q.name}>
                          <span className="pf-row-name">{q.name}</span>
                          <span className="pf-row-meta">{q.meta}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              <Reveal blurOnly delay={140}>
                <div className="pf-panels">
                  <div className="pf-panel">
                    <div className="pf-panel-head">
                      <h3>Team today</h3>
                      <span className="pf-panel-meta">Fed by clock-ins, live</span>
                    </div>
                    <ul className="pf-meters">
                      {TEAM_TODAY.map((t) => (
                        <li className="pf-meter-row" key={t.label}>
                          <span className="pf-meter-label">{t.label}</span>
                          <span className="pf-meter-value">{t.value}</span>
                          <span className="pf-meter" aria-hidden="true">
                            <i style={{ width: `${Math.round(t.p * 100)}%` }} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pf-panel">
                    <div className="pf-panel-head">
                      <h3>Celebrations</h3>
                      <span className="pf-panel-meta">Birthdays and work anniversaries</span>
                    </div>
                    <ul className="pf-rows">
                      {CELEBRATIONS.map((c) => (
                        <li className="pf-row" key={c.name}>
                          <span className="pf-row-name">{c.name}</span>
                          <span className="pf-row-meta pf-row-meta--right">{c.meta}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="pf-panel-foot">
                      The small human things a workplace forgets when nobody owns them.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal blurOnly delay={160}>
                <p className="pf-note">
                  Everyone lands on this screen. A manager gets more rows in the queue, not a
                  different product, which is why nobody needs training to find their timesheet.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="pf-sec" id="integrations">
            <div className="container">
              <Reveal blurOnly>
                <header className="sec-head sec-head--tight">
                  <span className="sec-eyebrow">Integrations</span>
                  <h2>The tools hub.</h2>
                  <p className="sec-lede">
                    A centralized launcher for the tools your team already opens, sorted into
                    four categories.
                  </p>
                </header>
              </Reveal>

              <Reveal blurOnly delay={80}>
                <div className="pf-cats">
                  {CATEGORIES.map((cat) => (
                    <Spotlight className="pf-cat" key={cat.name}>
                      <h3>{cat.name}</h3>
                      <p className="pf-cat-note">{cat.note}</p>
                      <ul className="pf-cat-list">
                        {cat.items.map((it) => (
                          <li key={it.name}>
                            <span>{it.name}</span>
                            {it.chip ? <span className="pf-chip pf-chip--ok">{it.chip}</span> : null}
                          </li>
                        ))}
                      </ul>
                    </Spotlight>
                  ))}
                </div>
              </Reveal>

              <Reveal blurOnly delay={120}>
                <p className="pf-note">
                  Two connections are shipped today: Slack, whose threads land in the Inbox beside
                  chats, groups and approvals, and Google sign-in for your whole company. The rest
                  of the hub is where your other tools get launched from, one place your team opens
                  instead of ten bookmarks.
                </p>
              </Reveal>
            </div>
          </section>

          <section className="pf-sec" id="security">
            <div className="container">
              <Reveal blurOnly>
                <header className="sec-head sec-head--tight">
                  <span className="sec-eyebrow">Security</span>
                  <h2>Ready for your auditors.</h2>
                  <p className="sec-lede">
                    The answers your IT and legal review will ask for, prepared before anyone asks
                    them.
                  </p>
                </header>
              </Reveal>

              <Reveal blurOnly delay={80}>
                <dl className="pf-defs">
                  {CONTROLS.map((c) => (
                    <div className="pf-def" key={c.label}>
                      <dt>{c.label}</dt>
                      <dd>{c.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal blurOnly delay={120}>
                <div className="pf-sub">
                  <span className="sec-eyebrow">Standards</span>
                  <dl className="pf-defs pf-defs--tight">
                    {PROGRAM.map((p) => (
                      <div className="pf-def" key={p.label}>
                        <dt>{p.label}</dt>
                        <dd>{p.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="pf-sec pf-sec--last" id="support">
            <div className="container">
              <Reveal blurOnly>
                <header className="sec-head sec-head--tight">
                  <span className="sec-eyebrow">Support</span>
                  <h2>Support that answers.</h2>
                  <p className="sec-lede">
                    Software is the easy half. The other half is somebody picking up.
                  </p>
                </header>
              </Reveal>

              <Reveal blurOnly delay={80}>
                <div className="pf-cols">
                  <div className="pf-col">
                    <h3>Three ways to reach us</h3>
                    <p>
                      Phone, email and in-app chat. Support sits in the top bar of the product, so
                      the person with the question does not have to leave the screen they are stuck
                      on.
                    </p>
                  </div>
                  <div className="pf-col">
                    <h3>Managed setup and import</h3>
                    <p>
                      We run the setup with you: staff imported from your spreadsheets, teams and
                      departments built out, approvals routed to the right people before anyone
                      logs in.
                    </p>
                  </div>
                  <div className="pf-col">
                    <h3>A named contact</h3>
                    <p>
                      Higher tiers get a named contact who already knows your setup, so you are not
                      explaining your structure to a new person every time.
                    </p>
                    <a className="turn-link" href="/pricing">
                      See what each plan includes <TurnArrow />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
