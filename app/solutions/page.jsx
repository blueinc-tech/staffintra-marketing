import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import CloseCta from '../../components/CloseCta';
import Reveal from '../../components/motion/Reveal';
import { Spotlight } from '../../components/motion/Surfaces';
import PillarMoment from '../../components/PillarMoment';
import { TurnArrow } from '../../components/PillarMarks';
import '../../components/SolutionsPage.css';

export const metadata = {
  title: 'StaffIntra: Solutions',
  description:
    'How startups, mid-sized businesses, field teams, established organizations and consolidating stacks each run on the same StaffIntra workspace.',
};

/* The ladder.

   Five audiences, five full-width bands, no boxes and no splits. The only
   thing between one rung and the next is the background changing from white
   to tint, and the only ornament is the numeral sitting in the left gutter at
   headline scale. Each rung carries the same four parts in the same order:
   number, heading, three facts on hairlines, one product card. Read top to
   bottom it is a ladder; read sideways any single rung is a complete pitch. */

const BANDS = [
  {
    n: '01',
    id: 'startups',
    eyebrow: 'Startups',
    title: 'Live on the first morning.',
    lede: 'Free for the first 30 days with no card, and set up inside a day. Nothing to migrate later: the workspace you open this week is the one you grow on.',
    link: { href: '/pricing', label: 'See what it costs' },
    facts: [
      {
        k: 'Day one',
        v: 'Clock-in runs from any phone, and every record keeps the place it was made and its timezone.',
      },
      {
        k: 'One workspace, one board',
        v: 'A single board holds the work, showing tasks done against tasks open on its face.',
      },
      {
        k: 'Week one',
        v: 'Hours and breaks land per session, so the first timesheet is payroll-ready without a rebuild.',
      },
    ],
    moment: {
      shape: 'steps',
      title: 'Setting up',
      pct: '50%',
      note: 'Four steps, one afternoon',
      rows: [
        { t: 'Workspace created', s: 'done' },
        { t: 'Team added to the directory', s: 'done' },
        { t: 'Clock-in switched on', s: 'current' },
        { t: 'First board opened', s: '' },
      ],
    },
  },
  {
    n: '02',
    id: 'midsize',
    eyebrow: 'Mid-sized businesses',
    title: 'Approvals that route themselves.',
    lede: 'At fifty people, informal stops working. Requests arrive on a queue with their own timeline and decision panel, and work stays visible across every team at once.',
    link: { href: '/product#operations', label: 'See approvals and reports' },
    facts: [
      {
        k: 'Fifteen request types',
        v: 'Leave, lateness, early departure, location change, shift change, study leave and an upfront loan request, each with its own form.',
      },
      {
        k: 'Four view modes',
        v: 'The same tasks read as a list, a board, a calendar or a dashboard, with overdue counted on its own.',
      },
      {
        k: 'Cross-module reports',
        v: 'Total staff, clocked in now, task completion and pending approvals in one snapshot.',
      },
    ],
    moment: {
      shape: 'list',
      title: 'Approvals',
      meta: '3 waiting',
      rows: [
        {
          name: 'Annual leave, Ruth Adeyemi',
          meta: 'Mon 17 to Fri 21 August',
          chip: 'Pending',
          tone: 'warn',
        },
        {
          name: 'Study leave, Emmanuel Okafor',
          meta: 'With the department head',
          chip: 'In review',
          tone: 'accent',
        },
        {
          name: 'Upfront loan, Jemimah Dogara',
          meta: '₦120,000, with the finance lead',
          chip: 'Pending',
          tone: 'warn',
        },
      ],
    },
  },
  {
    n: '03',
    id: 'operations',
    eyebrow: 'Field and operations teams',
    title: 'Work that happens away from a desk.',
    lede: 'Geofencing on the clock-in, remote and WFH as real statuses, and cases that carry a priority, a severity and an SLA from the first call to the resolution.',
    link: { href: '/product#time', label: 'See attendance in detail' },
    facts: [
      {
        k: 'Geofence per site',
        v: 'Outside geofence is its own status, sitting beside present, late, remote, WFH and absent.',
      },
      {
        k: 'Breaks per session',
        v: 'Break time is tracked in its own column, next to clock in, clock out, hours and location.',
      },
      {
        k: 'Cases from anywhere',
        v: 'A case can come in by phone, email, chat or portal, and the source stays on the record.',
      },
    ],
    moment: {
      shape: 'list',
      title: 'Attendance today',
      meta: 'Three sites',
      rows: [
        {
          name: 'Usman Ibrahim',
          meta: 'Ikeja site, clocked in 07:52',
          chip: 'Present',
          tone: 'ok',
        },
        {
          name: 'Blossom Adeh',
          meta: 'Working from home, 6h 20m logged',
          chip: 'WFH',
          tone: 'accent',
        },
        {
          name: 'Joseph Obi',
          meta: 'Clock-in fell outside the site fence',
          chip: 'Geofence',
          tone: 'warn',
        },
      ],
    },
  },
  {
    n: '04',
    id: 'enterprise',
    eyebrow: 'Established organizations',
    title: 'The whole record, in one place.',
    lede: 'Eleven tabs on every person, a drawn org chart behind the directory, and the documents, training and company devices that come with the job tracked on the same record.',
    link: { href: '/platform#security', label: 'See how access works' },
    facts: [
      {
        k: 'Eleven tabs per person',
        v: 'Personal, job, documents, training, requests, company devices, performance, timesheets, org chart, security and connected accounts.',
      },
      {
        k: 'Departments and teams',
        v: 'The directory filters by department, and the org chart draws each manager with their direct reports.',
      },
      {
        k: 'Confidential cases',
        v: 'A case can be marked confidential, so a complaint stays with the people handling it.',
      },
    ],
    moment: {
      shape: 'list',
      title: 'Samuel Johnson',
      meta: 'Staff record',
      rows: [
        { name: 'Documents', meta: 'Kept on the record', chip: 'On file', tone: 'ok' },
        {
          name: 'Company Devices',
          meta: 'Hardware assigned to him',
          chip: '2 assigned',
          tone: 'accent',
        },
        { name: 'Training', meta: 'Courses on the record', chip: '1 outstanding', tone: 'warn' },
        { name: 'Org Chart', meta: 'Manager and direct reports', chip: '4 reports', tone: 'quiet' },
      ],
    },
  },
  {
    n: '05',
    id: 'consolidation',
    eyebrow: 'System consolidation',
    title: 'One record instead of several tools.',
    lede: 'A clock-in, a leave request and a case all describe the same person in the same place, and the tools you keep sit in one launcher rather than in six browser tabs.',
    link: { href: '/platform#integrations', label: 'See what connects' },
    facts: [
      {
        k: 'Slack and Google connected',
        v: 'Slack has its own tab in the inbox, and Google sign-in is live across the workspace.',
      },
      {
        k: 'One directory',
        v: 'The same person record stands behind attendance, approvals, tasks, cases and timesheets.',
      },
      {
        k: 'Tools hub, four categories',
        v: 'A single launcher for communication, recruitment, finance and general tools, each with its count.',
      },
    ],
    moment: {
      shape: 'timer',
      title: 'After consolidation',
      site: 'One workspace',
      time: '1',
      note: 'One record for time, work and people',
      action: 'See the platform',
    },
  },
];

function Band({ band, tint }) {
  return (
    <section className={`sol-band${tint ? ' sol-band--tint' : ''}`} id={band.id}>
      <div className="container">
        <Reveal className="sol-top" blurOnly>
          <span className="sol-num" aria-hidden="true">
            {band.n}
          </span>

          <div className="sol-headtext">
            <span className="sec-eyebrow">{band.eyebrow}</span>
            <h2>{band.title}</h2>
            <p className="sec-lede">{band.lede}</p>
            <a className="turn-link sol-link" href={band.link.href}>
              {band.link.label}
              <TurnArrow />
            </a>
          </div>

          <Spotlight className="sol-visual">
            <PillarMoment moment={band.moment} />
          </Spotlight>
        </Reveal>

        <Reveal className="sol-facts" delay={120} blurOnly>
          {band.facts.map((f) => (
            <div className="sol-fact" key={f.k}>
              <span className="sol-fact-k">{f.k}</span>
              <span className="sol-fact-v">{f.v}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default function SolutionsPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="sol-hero">
          <div className="container">
            <Reveal>
              <span className="sec-eyebrow">Solutions</span>
              <h1>However your business runs.</h1>
              <p className="sol-lede">
                The same platform, shaped to how your team actually works.
              </p>
              <div className="sol-ctas">
                <a className="btn btn-primary btn-lg" href="/#demo">
                  Book a demo
                </a>
                <a className="btn btn-secondary btn-lg" href="/pricing">
                  See pricing
                </a>
              </div>
            </Reveal>

            <Reveal as="nav" className="sol-index" delay={140} aria-label="Five ways teams run">
              {BANDS.map((b) => (
                <a className="sol-index-item" href={`#${b.id}`} key={b.id}>
                  <span className="sol-index-n">{b.n}</span>
                  <span>{b.eyebrow}</span>
                </a>
              ))}
            </Reveal>
          </div>
        </header>

        {BANDS.map((b, i) => (
          <Band band={b} tint={i % 2 === 1} key={b.id} />
        ))}

        <CloseCta />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
