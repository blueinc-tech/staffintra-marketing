import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import CloseCta from '../../components/CloseCta';
import Reveal from '../../components/motion/Reveal';
import { Spotlight } from '../../components/motion/Surfaces';
import PillarMoment from '../../components/PillarMoment';
import { TurnArrow } from '../../components/PillarMarks';
import '../../components/LeafPage.css';

export const metadata = {
  title: 'StaffIntra: Approvals',
  description:
    'Fifteen request types across four categories, each one opening on its details, its timeline and the decision panel, with the queue counting what is still waiting on you.',
};

/* A leaf page under Time & attendance.

   The pillar band can only say the word "approvals" in passing. The thing
   worth the space here is the picker itself: fifteen named types under four
   categories, two of which (study leave, upfront loan request) are the
   clearest evidence on the whole site that this product was built for
   Nigerian workplaces rather than translated into one.

   The closing note is load bearing. "Approvals" invites the reader to assume
   rules engines and auto-approve, so the limit is stated on the same page as
   the capability, and the shift section says out loud that no rota is built
   here. */

/* Radii come from the tokens rather than from the shared leaf stylesheet,
   whose panels predate the corner upgrade. */
const R = 'var(--r-lg)';

const CATEGORIES = {
  shape: 'list',
  title: 'Requests by category',
  meta: 'Fifteen types',
  rows: [
    { name: 'Leave', meta: 'Nine types', chip: '9', tone: 'accent' },
    { name: 'Shift', meta: 'Location, schedule, swap', chip: '3', tone: 'ok' },
    { name: 'Attendance', meta: 'Early departure, lateness', chip: '2', tone: 'warn' },
    { name: 'Other', meta: 'Upfront loan request', chip: '1', tone: 'quiet' },
  ],
};

const REQUEST_LIFE = {
  shape: 'steps',
  title: 'Study leave · Jemimah Dogara',
  pct: '3 of 4',
  note: 'Raised Monday · four days · cover named',
  rows: [
    { t: 'Submitted from the picker', s: 'done' },
    { t: 'Routed to the approver', s: 'done' },
    { t: 'Reviewed against the timeline', s: 'current' },
    { t: 'Decided in the panel', s: '' },
  ],
};

const QUEUE = {
  shape: 'list',
  title: 'Approvals queue',
  meta: '3 waiting',
  rows: [
    { name: 'Ruth Adeyemi', meta: 'Annual leave · 12 to 16 May', chip: 'Waiting', tone: 'accent' },
    { name: 'Usman Ibrahim', meta: 'Lateness · Tuesday, Ikeja', chip: 'Waiting', tone: 'warn' },
    {
      name: 'Emmanuel Okafor',
      meta: 'Upfront loan request · ₦120,000',
      chip: 'Waiting',
      tone: 'quiet',
    },
  ],
};

const SHIFT_TYPES = {
  shape: 'list',
  title: 'Shift requests',
  meta: 'Three types',
  rows: [
    { name: 'Location change', meta: 'Same shift, different site', chip: 'Shift', tone: 'ok' },
    { name: 'Schedule adjustment', meta: 'Same day, different hours', chip: 'Shift', tone: 'ok' },
    { name: 'Shift change', meta: 'A swap, asked for and recorded', chip: 'Shift', tone: 'ok' },
  ],
};

/* The picker, written out in full. Prose can summarise fifteen types but it
   cannot let a reader check whether the one they need is there, so the
   groups are rendered as an actual grouped list. */
const GROUPS = [
  {
    name: 'Attendance',
    count: '2',
    tone: { background: 'var(--warn-soft)', color: 'var(--warn)' },
    types: ['Early departure', 'Lateness'],
  },
  {
    name: 'Leave',
    count: '9',
    tone: { background: 'var(--accent-soft)', color: 'var(--accent-ink)' },
    types: [
      'Annual',
      'Bereavement',
      'Casual',
      'Emergency',
      'Leave extension',
      'Maternity',
      'Paternity',
      'Sick',
      'Study',
    ],
  },
  {
    name: 'Shift',
    count: '3',
    tone: { background: 'var(--ok-soft)', color: 'var(--ok)' },
    types: ['Location change', 'Schedule adjustment', 'Shift change'],
  },
  {
    name: 'Other',
    count: '1',
    tone: { background: 'var(--surface)', color: 'var(--ink-3-text)' },
    types: ['Upfront loan request'],
  },
];

const groupGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(216px, 1fr))',
  gap: '14px',
  marginTop: 'clamp(28px, 3.4vw, 44px)',
};

const groupCard = {
  padding: '18px 20px 16px',
  border: '1px solid var(--line)',
  borderRadius: R,
  background: 'var(--surface-2)',
};

const groupHead = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
};

const groupName = {
  margin: 0,
  fontFamily: 'var(--font-ui)',
  fontSize: '.9375rem',
  fontWeight: 600,
  letterSpacing: '-.005em',
  color: 'var(--ink)',
};

const groupChip = {
  flex: '0 0 auto',
  padding: '3px 10px',
  borderRadius: 'var(--r-pill)',
  fontFamily: 'var(--font-mono)',
  fontSize: '.6875rem',
  fontVariantNumeric: 'tabular-nums',
};

const groupList = {
  margin: '12px 0 0',
  padding: 0,
  listStyle: 'none',
  fontFamily: 'var(--font-ui)',
  fontSize: '.875rem',
  lineHeight: 1.4,
  color: 'var(--ink-2)',
};

export default function ApprovalsPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="lf-hero">
          <div className="container">
            <span className="sec-eyebrow">Time &amp; attendance</span>
            <h1>Approvals, all fifteen kinds.</h1>
            <p className="lf-hero-lede">
              Every request your team actually makes, routed to the person who decides.
            </p>
            <div className="lf-hero-ctas">
              <a className="btn btn-primary btn-lg" href="/#demo">
                Book a demo
              </a>
              <a className="btn btn-secondary btn-lg" href="/pricing">
                See pricing
              </a>
            </div>
          </div>
        </header>

        <section className="lf-facts has-frame" aria-label="Key facts">
          <div className="container lf-facts-grid lf-facts-grid--3">
            <div className="lf-fact">
              <span className="lf-fact-n">15</span>
              <span className="lf-fact-t">Request types</span>
              <p className="lf-fact-s">
                Fifteen named types, each with its own row in the picker. Nobody has to describe
                what they are asking for in a free text box.
              </p>
            </div>
            <div className="lf-fact">
              <span className="lf-fact-n">4</span>
              <span className="lf-fact-t">Categories</span>
              <p className="lf-fact-s">
                Attendance, Leave, Shift and Other. Every type sits under one of them, so a request
                arrives already sorted.
              </p>
            </div>
            <div className="lf-fact">
              <span className="lf-fact-n">2</span>
              <span className="lf-fact-t">Panels on every request</span>
              <p className="lf-fact-s">
                A timeline of what has happened so far, and the decision panel where somebody
                approves it or does not.
              </p>
            </div>
          </div>
        </section>

        <section className="lf-sec has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">01</span> The picker
              </span>
              <h2>Four categories, fifteen types.</h2>
              <p>
                New request opens a picker, not a blank form. Fifteen named types sit under four
                categories, which means a request is classified the moment it is raised and the
                queue can be read without opening anything.
              </p>
              <p>
                Two of those types say where this was built. Study leave and an upfront loan
                request are ordinary asks in a Nigerian workplace, and no product imported from
                somewhere else ships with either one.
              </p>
              <ul className="lf-points">
                <li>Attendance covers the two things that happen to a working day</li>
                <li>Leave runs to nine types, study leave among them</li>
                <li>Shift covers the three ways an existing shift can change</li>
                <li>Other holds the upfront loan request, on its own</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual" style={{ borderRadius: R }}>
                <PillarMoment moment={CATEGORIES} />
              </Spotlight>
            </Reveal>
          </div>

          <Reveal className="container" delay={80} blurOnly>
            <div style={groupGrid}>
              {GROUPS.map((g) => (
                <div key={g.name} style={groupCard}>
                  <div style={groupHead}>
                    <h3 style={groupName}>{g.name}</h3>
                    <span style={{ ...groupChip, ...g.tone }}>{g.count}</span>
                  </div>
                  <ul style={groupList}>
                    {g.types.map((t, i) => (
                      <li
                        key={t}
                        style={{
                          padding: i === 0 ? '10px 0 7px' : '7px 0',
                          borderTop: i === 0 ? '0' : '1px solid var(--line)',
                        }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">02</span> The request
              </span>
              <h2>A timeline and a decision panel.</h2>
              <p>
                Open a request and three things are in front of you: the details of what is being
                asked, the timeline of what has happened to it so far, and the panel where the
                decision is made. No tab hunting, and no separate audit screen to go and find
                later.
              </p>
              <p>
                Two views hold the rest. My Requests is what you have raised, History is what has
                already been settled, and the queue keeps a count of what is still waiting.
              </p>
              <ul className="lf-points">
                <li>Details, timeline and decision panel in one pane</li>
                <li>My Requests and History are the two views</li>
                <li>The queue carries a count, so waiting work is never implied</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual" style={{ borderRadius: R }}>
                <PillarMoment moment={REQUEST_LIFE} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">03</span> The queue
              </span>
              <h2>The queue is the job.</h2>
              <p>
                Approvals waiting on you are on the home dashboard, as a queue with a count on it.
                They are not a notification you can scroll past and not an email thread that dies
                on a Friday.
              </p>
              <p>
                Clear it and the widget says so. The empty state reads &ldquo;Queue is clear&rdquo;,
                which is the whole point of putting a count on the front page in the first place.
              </p>
              <ul className="lf-points">
                <li>On the home dashboard, not behind a menu</li>
                <li>A count of what is waiting on you specifically</li>
                <li>Empty reads &ldquo;Queue is clear&rdquo;, and means it</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual" style={{ borderRadius: R }}>
                <PillarMoment moment={QUEUE} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">04</span> Shifts
              </span>
              <h2>Shift requests, without a rota.</h2>
              <p>
                Plainly: StaffIntra does not build rotas and does not publish them. There is no
                shift planner here, and any page that tells you otherwise is selling you a
                different product.
              </p>
              <p>
                What it does handle is the request to change a shift that already exists. Location
                change, schedule adjustment and shift change are three of the fifteen types, they
                route like every other request, and they land in the same queue.
              </p>
              <ul className="lf-points">
                <li>Location change: the same shift, worked somewhere else</li>
                <li>Schedule adjustment: the same day, different hours</li>
                <li>Shift change: a swap or a move, asked for and recorded</li>
              </ul>
              <a className="turn-link" href="/pricing">
                See what each plan includes
                <TurnArrow />
              </a>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual" style={{ borderRadius: R }}>
                <PillarMoment moment={SHIFT_TYPES} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-note has-frame">
          <div className="container">
            <Reveal blurOnly>
              <div className="lf-note-box" style={{ borderRadius: R }}>
                <div>
                  <span className="lf-note-tag">What this is not</span>
                  <h2>Routing is not deciding.</h2>
                  <p>
                    StaffIntra routes and records approvals. It does not decide them for you, and
                    there is no auto-approve.
                  </p>
                </div>
                <ul className="lf-nots">
                  <li>
                    <span>
                      <strong>No auto-approve.</strong> Nothing clears itself on a timer or on a
                      rule somebody set up once. Every request waits for a person to open it and
                      decide.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>No rota building.</strong> The product does not draw or publish a
                      schedule. It handles requests to change a shift that already exists.
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>No silent decisions.</strong> The timeline keeps who decided and
                      when, so an approval is never a status that changed with nobody attached to
                      it.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <CloseCta />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
