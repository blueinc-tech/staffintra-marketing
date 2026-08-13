import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import CloseCta from '../../components/CloseCta';
import Reveal from '../../components/motion/Reveal';
import { Spotlight } from '../../components/motion/Surfaces';
import PillarMoment from '../../components/PillarMoment';
import { TurnArrow } from '../../components/PillarMarks';
import '../../components/ProductPage.css';

export const metadata = {
  title: 'StaffIntra: Product',
  description:
    'The modules inside StaffIntra: time and attendance, workspaces and work logs, and the people operations that run on the same record.',
};

/* The spine.

   Every other subpage on this site argues in bordered two-column splits, and
   the product page is the one that cannot: it is a list of eleven modules, and
   eleven alternating boxes would read as a catalogue nobody finishes. So this
   page is a single vertical run with a sticky index beside it. The index is
   the only navigation, the hairline between blocks is the only separator, and
   each visual sits under its own copy rather than beside it, which keeps the
   measure of the paragraphs constant all the way down.

   The index is a plain list of anchors. Marking the current one would need
   scroll state, and this file is a server component on purpose, so every tick
   is drawn the same and the page stays free of JavaScript it does not need. */

const GROUPS = [
  {
    id: 'time',
    label: 'Time & attendance',
    title: 'Every hour, captured once.',
    lede: 'Clock events, the attendance board, timesheets and fifteen kinds of request, all reading from the same record.',
    link: { href: '/#demo', text: 'See a clock-in on your own policies' },
    features: [
      {
        id: 'clock-in',
        name: 'Smart clock-in',
        body: 'One tap starts the day, from a desktop at head office or a phone on site. The clock event carries its own context: the device it came from, the place it was taken, and the timezone it was taken in.',
        bullets: [
          'Verified sessions, each one stamped with an IANA timezone.',
          'A location string on every clock event, including breaks and clock-out.',
          'Lateness flagged against the schedule, without anyone having to report it.',
        ],
        moment: {
          shape: 'list',
          title: 'Clock event',
          meta: 'Africa/Lagos',
          rows: [
            { name: 'Clocked in', meta: '08:58 · inside geofence', chip: 'Present', tone: 'ok' },
            { name: 'Break', meta: '12:30 to 13:15', chip: '45m', tone: 'quiet' },
            { name: 'Clocked out', meta: '17:30 · 8h 00m worked', chip: 'Complete', tone: 'accent' },
          ],
        },
      },
      {
        id: 'attendance-board',
        name: 'The attendance board',
        body: 'One board for the whole team, not one report per manager. Filter it by status or by team, move between a day, a week and a month, and take the whole thing out as CSV when finance asks for it.',
        bullets: [
          'Present, Late, Remote / WFH, Outside geofence and Absent are first-class statuses.',
          'Day, week or month, with teams as the grouping.',
          'Export to CSV straight from the board.',
        ],
        moment: {
          shape: 'list',
          title: 'Attendance board',
          meta: 'Today · 49 records',
          rows: [
            { name: 'Present', meta: 'Clocked in on time', chip: '34', tone: 'ok' },
            { name: 'Late', meta: 'After the scheduled start', chip: '3', tone: 'warn' },
            { name: 'Remote / WFH', meta: 'Working away from a site', chip: '9', tone: 'accent' },
            { name: 'Outside geofence', meta: 'Clocked in off the site boundary', chip: '2', tone: 'due' },
            { name: 'Absent', meta: 'No clock event today', chip: '1', tone: 'quiet' },
          ],
        },
      },
      {
        id: 'timesheets',
        name: 'Timesheets',
        body: 'Timesheets are built from clock events, with breaks deducted, so nothing is typed twice. Payroll gets the number the clock recorded, and the week that produced it is one click away.',
        bullets: [
          'No re-entry: the timesheet is the clock record, totaled.',
          'Variance stays visible, so a short week is a question rather than a surprise.',
          'Sign-off happens per person, on the week that was actually worked.',
        ],
        moment: {
          shape: 'bars',
          title: 'Timesheet · this week',
          meta: 'Avg 7.9h / day',
          rows: [
            { label: 'Monday', value: '8h 10m', p: 0.82 },
            { label: 'Tuesday', value: '7h 45m', p: 0.78 },
            { label: 'Wednesday', value: '8h 30m', p: 0.85 },
            { label: 'Thursday', value: '8h 00m', p: 0.8 },
            { label: 'Friday', value: '6h 50m', p: 0.68 },
          ],
        },
      },
      {
        id: 'approvals',
        name: 'Approvals',
        body: 'Fifteen request types, grouped four ways, each with its own form. A request opens with its details, its timeline and a decision panel, so approving is reading one screen instead of chasing three messages.',
        body2: 'Study leave and upfront loan requests are on that list because this was built for Nigerian workplaces, where both are ordinary and neither arrives in an imported template.',
        bullets: [
          'Attendance: early departure, lateness.',
          'Leave: annual, bereavement, casual, emergency, extension, maternity, paternity, sick, study.',
          'Shift: location change, schedule adjustment, shift change.',
          'Other: upfront loan request.',
        ],
        moment: {
          shape: 'list',
          title: 'Request types',
          meta: '15, in four groups',
          rows: [
            { name: 'Attendance', meta: 'Early departure, lateness', chip: '2', tone: 'accent' },
            { name: 'Leave', meta: 'Annual through to study leave', chip: '9', tone: 'ok' },
            { name: 'Shift', meta: 'Location, schedule, shift change', chip: '3', tone: 'quiet' },
            { name: 'Other', meta: 'Upfront loan request', chip: '1', tone: 'warn' },
          ],
        },
      },
    ],
  },
  {
    id: 'productivity',
    label: 'Work & productivity',
    title: 'What the hours went into.',
    lede: 'Workspaces hold the work, work logs hold the hours, and reports read across both without anyone building a deck.',
    link: { href: '/pricing', text: 'See what each plan includes' },
    features: [
      {
        id: 'workspaces',
        name: 'Workspaces and tasks',
        body: 'Work lives on boards inside workspaces, and every board reports its own progress. My Tasks reads the same data in four view modes, so the person doing the work picks the shape that suits them.',
        bullets: [
          'List, board, calendar and dashboard views over the same tasks.',
          'Grouping, due dates and a running overdue count.',
          'An activity feed per workspace, so progress is legible without a status meeting.',
        ],
        moment: {
          shape: 'list',
          title: 'Workspaces',
          meta: '3 boards',
          rows: [
            { name: 'Onboarding revamp', meta: '18 tasks · 12 done', chip: '67%', tone: 'accent' },
            { name: 'Q3 compliance review', meta: '9 tasks · 9 done', chip: '100%', tone: 'ok' },
            { name: 'Lagos office move', meta: '24 tasks · 6 done', chip: '25%', tone: 'warn' },
          ],
        },
      },
      {
        id: 'work-logs',
        name: 'Work logs',
        body: 'Hours tracked by teammate, by workspace and by task. Logs can be written by hand or generated from time already tracked, so the record fills in even in the weeks nobody remembers to write it.',
        bullets: [
          'Hours roll up by teammate, workspace and task.',
          'Auto-generated logs come from tracked time, and are labeled as such.',
          'Every entry keeps its description, its date and its author.',
        ],
        moment: {
          shape: 'list',
          title: 'Work logs · this week',
          meta: 'Hours by teammate',
          rows: [
            { name: 'Ruth Adeyemi', meta: 'Onboarding revamp · 3h 20m', chip: 'Logged', tone: 'accent' },
            { name: 'Emmanuel Okafor', meta: 'Q3 compliance review · 2h 45m', chip: 'Logged', tone: 'quiet' },
            { name: 'Jemimah Dogara', meta: 'Lagos office move · 6h 00m', chip: 'Auto', tone: 'ok' },
          ],
        },
      },
      {
        id: 'reports',
        name: 'Reports',
        body: 'One cross-module snapshot: total staff, who is clocked in right now, task completion, and the approvals still waiting on somebody. Under it, a productivity trend of active, productive and idle time by week.',
        bullets: [
          'Total staff, clocked in now, task completion, pending approvals.',
          'Active, productive and idle time, week by week.',
          'One page that reads across time, work and people at once.',
        ],
        moment: {
          shape: 'bars',
          title: 'Productivity trend',
          meta: 'Active hours by week',
          rows: [
            { label: 'Week 30', value: '34h', p: 0.72 },
            { label: 'Week 31', value: '36h', p: 0.78 },
            { label: 'Week 32', value: '31h', p: 0.66 },
            { label: 'Week 33', value: '38h', p: 0.84 },
          ],
        },
      },
    ],
  },
  {
    id: 'operations',
    label: 'People & operations',
    title: 'The people, and the process around them.',
    lede: 'A directory with a real org chart, a lifecycle that runs from intake to offboarding, cases with an SLA, and one record per person.',
    link: { href: '/#demo', text: 'Walk through the staff record with us' },
    features: [
      {
        id: 'directory',
        name: 'Directory and org chart',
        body: 'People by department, with a profile and a message button on every row. The org chart tab draws managers over their direct reports, and says so plainly when somebody has none.',
        bullets: [
          'Filter the directory by department, page it 10, 20 or 50 at a time.',
          'An org chart of managers to reports, built from the same records.',
          'In-app messaging with presence: available, busy, do not disturb.',
        ],
        moment: {
          shape: 'list',
          title: 'Directory',
          meta: '48 people',
          rows: [
            { name: 'Operations', meta: 'Led by Usman Ibrahim', chip: '18', tone: 'accent' },
            { name: 'Engineering', meta: 'Led by Emmanuel Okafor', chip: '21', tone: 'quiet' },
            { name: 'Finance', meta: 'Led by Blossom Adeh', chip: '9', tone: 'ok' },
          ],
        },
      },
      {
        id: 'lifecycle',
        name: 'Staff lifecycle',
        body: 'Intake collects a candidate’s details before their first day, and submitting an intake does not create an account. Onboarding runs from there, offboarding closes it out, and every stage tracks whether it is not started, in progress, needs attention or completed.',
        bullets: [
          'Intake before day one, with no account provisioned until you say so.',
          'Onboarding and offboarding as full stages, not a checklist each.',
          'Reusable workflow templates carrying task counts, durations and auto-assign.',
        ],
        moment: {
          shape: 'steps',
          title: 'Standard Employee Onboarding',
          pct: '25%',
          note: '4 tasks · 14 days · auto-assign on',
          rows: [
            { t: 'Intake submitted', s: 'done' },
            { t: 'Contract and documents', s: 'current' },
            { t: 'Device and account setup', s: '' },
            { t: 'First week check-in', s: '' },
          ],
        },
      },
      {
        id: 'cases',
        name: 'Cases',
        body: 'Operational issues, escalations and resolutions, tracked against an SLA. Priority and severity are separate axes on purpose, because an urgent small thing and a slow serious thing are not the same case and should not be filed as one.',
        bullets: [
          'Eight statuses, five case types, five priorities, and severity as its own axis.',
          'An intake source on every case: internal, email, phone, chat or portal.',
          'A confidentiality flag, SLA tracking, and five views: dashboard, kanban, table, timeline, calendar.',
        ],
        moment: {
          shape: 'list',
          title: 'Cases',
          meta: 'SLA breaches: 0',
          rows: [
            { name: 'Payroll dispute · August run', meta: 'Under review · source: email', chip: 'High', tone: 'warn' },
            { name: 'Facility escalation · generator', meta: 'In investigation · source: phone', chip: 'Critical', tone: 'due' },
            { name: 'HR complaint', meta: 'Open · marked confidential', chip: 'Medium', tone: 'quiet' },
          ],
        },
      },
      {
        id: 'staff-record',
        name: 'The staff record',
        body: 'Eleven tabs on one person, and four of them are areas most systems leave out entirely: documents, training, company devices and connected accounts. Asset tracking sits on the same record as the contract, because the laptop and the job started on the same day.',
        bullets: [
          'Documents and training held on the person, not in a shared folder.',
          'Company devices: what was issued, and who has it now.',
          'Connected accounts, alongside job, requests, timesheets, security and org chart.',
        ],
        moment: {
          shape: 'list',
          title: 'Staff record · Ruth Adeyemi',
          meta: 'Eleven tabs',
          rows: [
            { name: 'Documents', meta: 'Held on the profile, not in a folder', chip: '12 files', tone: 'accent' },
            { name: 'Training', meta: 'Recorded against the person', chip: '4 records', tone: 'ok' },
            { name: 'Company devices', meta: 'Issued hardware, per person', chip: '2 assigned', tone: 'quiet' },
            { name: 'Connected accounts', meta: 'Slack and Google sign-in', chip: '2 linked', tone: 'accent' },
          ],
        },
      },
    ],
  },
];

export default function Product() {
  return (
    <>
      <Nav />
      <main>
        <header className="pd-hero has-rails">
          <div className="container">
            <span className="sec-eyebrow">Product</span>
            <h1>Everything the workday touches.</h1>
            <p className="pd-hero-lede">
              One platform for time, work and people. These are the modules, and what each one
              actually does.
            </p>
            <div className="pd-hero-ctas">
              <a className="btn btn-primary btn-lg" href="/#demo">
                Book a demo
              </a>
              <a className="btn btn-secondary btn-lg" href="/pricing">
                See pricing
              </a>
            </div>
          </div>
        </header>

        <section className="pd-spine has-frame">
          <div className="container">
            <div className="pd-grid">
              <nav className="pd-index" aria-label="Modules on this page">
                <span className="pd-index-title">On this page</span>
                {GROUPS.map((g) => (
                  <div className="pd-index-group" key={g.id}>
                    <a className="pd-index-label" href={`#${g.id}`}>
                      {g.label}
                    </a>
                    <ul>
                      {g.features.map((f) => (
                        <li key={f.id}>
                          <a href={`#${f.id}`}>
                            <span className="pd-tick" aria-hidden="true" />
                            {f.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div className="pd-run">
                {GROUPS.map((g) => (
                  <section className="pd-group" id={g.id} key={g.id}>
                    <Reveal className="pd-group-head" blurOnly>
                      <span className="sec-eyebrow">{g.label}</span>
                      <h2>{g.title}</h2>
                      <p className="sec-lede">{g.lede}</p>
                    </Reveal>

                    {g.features.map((f) => (
                      <Reveal as="article" className="pd-block" id={f.id} key={f.id} blurOnly>
                        <h3>{f.name}</h3>
                        <p>{f.body}</p>
                        {f.body2 ? <p>{f.body2}</p> : null}
                        <ul className="pd-bullets">
                          {f.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <Spotlight className="pd-visual">
                          <PillarMoment moment={f.moment} />
                        </Spotlight>
                      </Reveal>
                    ))}

                    <div className="pd-group-foot">
                      <a className="turn-link" href={g.link.href}>
                        {g.link.text}
                        <TurnArrow />
                      </a>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CloseCta />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
