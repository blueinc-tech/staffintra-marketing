import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import CloseCta from '../../components/CloseCta';
import Reveal from '../../components/motion/Reveal';
import { Spotlight } from '../../components/motion/Surfaces';
import { TurnArrow } from '../../components/PillarMarks';
import '../../components/ResourcesPage.css';

export const metadata = {
  title: 'StaffIntra: Resources',
  description:
    'Guides, blog posts and live sessions for operations leads, plus the help center, API documentation and platform status.',
};

/* Nine line drawings, one per piece. Drawn here rather than pulled from an
   icon set: each one describes the specific thing its article is about, at
   2px on a 132 by 76 field, so the nine read as one hand. Colour comes from
   the cover block through currentColor. */

const S = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'square', fill: 'none' };

function Frame({ children }) {
  return (
    <svg viewBox="0 0 132 76" aria-hidden="true" {...S} xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

/* Many systems collapsing into one: the migration guide. */
function ArtStack() {
  return (
    <Frame>
      <rect x="7" y="5" width="16" height="16" />
      <rect x="7" y="30" width="16" height="16" />
      <rect x="7" y="55" width="16" height="16" />
      <path d="M25 13h20M25 38h20M25 63h20" />
      <path d="M45 13v50M45 38h13" />
      <path d="M55 32l6 6-6 6" />
      <rect x="61" y="10" width="59" height="56" />
      <path d="M73 30h35M73 46h24" />
    </Frame>
  );
}

/* A record with a lock on it: what the regulation asks of staff data. */
function ArtRecord() {
  return (
    <Frame>
      <rect x="26" y="6" width="58" height="62" />
      <path d="M38 24h34M38 36h34M38 48h20" />
      <rect x="82" y="48" width="22" height="18" />
      <path d="M88 48v-7h10v7" />
    </Frame>
  );
}

/* A boundary, a point inside it, and one point outside: geofencing. */
function ArtGeo() {
  return (
    <Frame>
      <circle cx="60" cy="38" r="29" />
      <circle cx="60" cy="38" r="12" />
      <rect x="103" y="8" width="14" height="14" />
      <path d="M96 24l-8 8" />
    </Frame>
  );
}

/* Fifteen cells, one chosen: the request picker. */
function ArtGrid() {
  const cells = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 5; c += 1) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={14 + c * 22}
          y={8 + r * 22}
          width="16"
          height="16"
          fill={r === 1 && c === 3 ? 'currentColor' : 'none'}
          fillOpacity={r === 1 && c === 3 ? 0.16 : undefined}
        />
      );
    }
  }
  return <Frame>{cells}</Frame>;
}

/* A spine with three stages hanging off it: the reusable template. */
function ArtTemplate() {
  return (
    <Frame>
      <path d="M24 8v60" />
      <rect x="18" y="8" width="12" height="12" />
      <rect x="18" y="30" width="12" height="12" />
      <rect x="18" y="52" width="12" height="12" />
      <path d="M36 14h72M36 36h56M36 58h40" />
    </Frame>
  );
}

/* Two axes with four cases plotted: priority across, severity up. */
function ArtAxes() {
  return (
    <Frame>
      <path d="M22 6v58h96" />
      <rect x="36" y="46" width="10" height="10" />
      <rect x="56" y="32" width="10" height="10" />
      <rect x="76" y="38" width="10" height="10" />
      <rect x="98" y="16" width="10" height="10" />
    </Frame>
  );
}

/* A gross figure, segmented, and the net that comes out below it. */
function ArtDeduct() {
  return (
    <Frame>
      <rect x="12" y="10" width="108" height="18" />
      <path d="M74 10v18M94 10v18M108 10v18" />
      <path d="M40 30v10" />
      <path d="M35 36l5 6 5-6" />
      <rect x="12" y="48" width="62" height="18" />
    </Frame>
  );
}

/* A trend against a flat reference line: reading the report. */
function ArtTrend() {
  return (
    <Frame>
      <path d="M20 6v58h98" />
      <path d="M20 42h98" />
      <path d="M28 54l18-12 18 6 18-20 18 6" />
    </Frame>
  );
}

/* A dated block with a play mark in it: the live session. */
function ArtSession() {
  return (
    <Frame>
      <rect x="22" y="14" width="88" height="52" />
      <path d="M22 30h88M40 6v10M92 6v10" />
      <path d="M58 40l18 8-18 8z" />
    </Frame>
  );
}

const ART = {
  stack: ArtStack,
  record: ArtRecord,
  geo: ArtGeo,
  grid: ArtGrid,
  template: ArtTemplate,
  axes: ArtAxes,
  deduct: ArtDeduct,
  trend: ArtTrend,
  session: ArtSession,
};

/* The index. The lead runs first and carries a dek; the rest carry a tag row,
   a title and a reading time, which is all a scan needs. */

const LEAD = {
  art: 'stack',
  type: 'Guide',
  topic: 'Migration',
  title: 'Consolidating your stack without losing a week',
  dek: 'The order to move things in: directory first, then attendance and approvals, with cases and staff lifecycle last. Written so the month you switch still closes on time.',
  meta: '9 min read',
};

const PIECES = [
  {
    art: 'record',
    type: 'Blog',
    topic: 'Compliance',
    title: 'What NDPR means for your staff records',
    meta: '7 min read',
  },
  {
    art: 'geo',
    type: 'Blog',
    topic: 'Attendance',
    title: 'Geofencing without making your team feel watched',
    meta: '6 min read',
  },
  {
    art: 'grid',
    type: 'Guide',
    topic: 'Approvals',
    title: 'Fifteen request types, and when to use each',
    meta: '8 min read',
  },
  {
    art: 'template',
    type: 'Guide',
    topic: 'Lifecycle',
    title: 'Writing an onboarding template that survives contact',
    meta: '7 min read',
  },
  {
    art: 'axes',
    type: 'Blog',
    topic: 'Operations',
    title: 'Cases, severity and the difference from priority',
    meta: '6 min read',
  },
  {
    art: 'deduct',
    type: 'Blog',
    topic: 'Payroll',
    title: 'Payroll deductions in Nigeria, handled right',
    meta: '8 min read',
  },
  {
    art: 'trend',
    type: 'Blog',
    topic: 'Reports',
    title: 'Reading the productivity report honestly',
    meta: '5 min read',
  },
  {
    art: 'session',
    type: 'Event',
    topic: 'Online',
    title: 'Ops clinic: a live session for operations leads',
    meta: 'Live, 45 minutes',
  },
];

const TYPES = [
  {
    name: 'Blog',
    note: 'Short reads on attendance, approvals, cases and pay, from the team that builds them.',
    href: '#blog',
  },
  {
    name: 'Guides',
    note: 'Longer walkthroughs for setting one thing up properly, start to finish.',
    href: '#blog',
  },
  {
    name: 'Events',
    note: 'Live clinics and walkthroughs, run online, with questions taken on the call.',
    href: '#blog',
  },
  {
    name: 'Help center',
    note: 'A written answer for every workflow, and a person when the writing runs out.',
    href: '#help',
  },
  {
    name: 'API docs',
    note: 'Endpoints, webhooks and a sandbox, so your own tools can read the same record.',
    href: '#api',
  },
  {
    name: 'Status',
    note: 'Live uptime and incident history for the app, the API and notifications.',
    href: '#status',
  },
];

function Card({ piece, lead = false }) {
  const Drawing = ART[piece.art];
  return (
    <Spotlight as="a" href="#" className={`rx-card${lead ? ' rx-card--lead' : ''}`}>
      <div className="rx-cover">
        <Drawing />
      </div>
      <div className="rx-body">
        <div className="rx-tags">
          <span className="rx-tag rx-tag--type">{piece.type}</span>
          <span className="rx-tag">{piece.topic}</span>
        </div>
        <h3 className="rx-title">{piece.title}</h3>
        {lead ? <p className="rx-dek">{piece.dek}</p> : null}
        <span className="rx-meta">{piece.meta}</span>
        {lead ? (
          <span className="rx-read turn-link">
            Read the guide
            <TurnArrow />
          </span>
        ) : null}
      </div>
    </Spotlight>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="rx-hero has-rails">
          <div className="container">
            <span className="sec-eyebrow">Resources</span>
            <h1>Guidance for the people who run operations.</h1>
            <p className="rx-lede">
              Practical reading, help when you need it, and a platform you can build on.
            </p>
          </div>
        </header>

        <section className="rx-index" id="blog">
          <div className="container">
            <Reveal className="rx-masthead" blurOnly>
              <div>
                <span className="sec-eyebrow">Reading</span>
                <h2>The index.</h2>
              </div>
              <p className="rx-masthead-note">
                Written by the people who build StaffIntra, for the people who run a case queue,
                an approvals queue and a payroll in the same afternoon.
              </p>
            </Reveal>

            <Reveal className="rx-grid" delay={120} blurOnly>
              <Card piece={LEAD} lead />
              {PIECES.map((p) => (
                <Card key={p.title} piece={p} />
              ))}
            </Reveal>
          </div>
        </section>

        <section className="rx-filed has-frame">
          <div className="container">
            <Reveal blurOnly>
              <span className="sec-eyebrow">By type</span>
              <h2>Everything, filed.</h2>
            </Reveal>

            <Reveal className="rx-list" delay={100} blurOnly>
              {TYPES.map((t) => (
                <a className="rx-row" key={t.name} href={t.href}>
                  <span className="rx-row-name">{t.name}</span>
                  <span className="rx-row-note">{t.note}</span>
                  <span className="rx-row-go">
                    <TurnArrow />
                  </span>
                </a>
              ))}
            </Reveal>

            <h2 className="rx-sr">Help, API and status</h2>
            <Reveal className="rx-three" delay={140} blurOnly>
              <div className="rx-col" id="help">
                <h3>Help center</h3>
                <p>
                  Answers you can read at your desk, and a person to reach when the writing does
                  not cover it.
                </p>
                <ul>
                  <li>Phone, during Nigerian business hours</li>
                  <li>Email, answered by the support team</li>
                  <li>In-app chat, without leaving the workspace</li>
                </ul>
              </div>
              <div className="rx-col" id="api">
                <h3>API docs</h3>
                <p>
                  The same records the app runs on, documented and reachable from your own tools.
                </p>
                <ul>
                  <li>REST endpoints for people, time and requests</li>
                  <li>Webhooks for clock events and approvals</li>
                  <li>A sandbox to build against before you go live</li>
                </ul>
              </div>
              <div className="rx-col" id="status">
                <h3>Status</h3>
                <p>
                  Live uptime and a full incident history, published in the open and readable
                  without an account.
                </p>
                <ul>
                  <li>App uptime, updated as incidents open</li>
                  <li>API uptime, tracked separately</li>
                  <li>Notifications, email and in-app</li>
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
