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
  title: 'StaffIntra: Staff lifecycle',
  description:
    'Intake, onboarding and offboarding on one record per person, with reusable workflow templates that assign themselves on the start date.',
};

/* Staff Lifecycle, the leaf page. Everything here traces to the real module at
   /dashboard/onboarding: its four stage states, the Intake tab's promise about
   accounts, and the Workflows tab, which is a template builder with a task
   count, a duration, a usage count and optional auto-assignment. */

const INTAKE = {
  shape: 'steps',
  title: 'Intake · Ruth Adeyemi',
  pct: '2 of 3',
  note: 'Submitted · no account created',
  rows: [
    { t: 'Personal details', s: 'done' },
    { t: 'Documents uploaded', s: 'done' },
    { t: 'Details reviewed', s: 'current' },
  ],
};

const ONBOARDING = {
  shape: 'steps',
  title: 'Standard Employee Onboarding',
  pct: '25%',
  note: '4 tasks · 14 days · auto-assign enabled',
  rows: [
    { t: 'Welcome pack sent', s: 'done' },
    { t: 'Devices issued', s: 'current' },
    { t: 'Documents signed', s: '' },
    { t: 'Manager check-in', s: '' },
  ],
};

const OFFBOARDING = {
  shape: 'list',
  title: 'Standard Offboarding · Joseph Obi',
  meta: '4 tasks · 7 days',
  rows: [
    { name: 'Handover notes', meta: 'Filed with the team lead', chip: 'Completed', tone: 'ok' },
    { name: 'Devices returned', meta: 'Laptop and phone logged back in', chip: 'Completed', tone: 'ok' },
    { name: 'Access revoked', meta: 'Workspaces and shared files', chip: 'Completed', tone: 'ok' },
    { name: 'Final timesheet signed off', meta: 'Waiting on the last week', chip: 'Needs attention', tone: 'warn' },
  ],
};

const COLUMNS = {
  shape: 'list',
  title: 'Onboarding · this month',
  meta: 'Where everyone stands',
  rows: [
    { name: 'Not started', meta: 'Assigned, not opened yet', chip: '2', tone: 'quiet' },
    { name: 'In progress', meta: 'Moving through the journey', chip: '5', tone: 'accent' },
    { name: 'Needs attention', meta: 'Stalled, late or blocked', chip: '3', tone: 'warn' },
    { name: 'Completed', meta: 'Journey finished', chip: '9', tone: 'ok' },
  ],
};

export default function Lifecycle() {
  return (
    <>
      <Nav />

      <main>
        <header className="lf-hero">
          <div className="container">
            <Reveal>
              <span className="sec-eyebrow">People &amp; operations</span>
              <h1>Intake, onboarding, offboarding.</h1>
              <p className="sec-lede">
                One record per person from before their first day to after their last.
              </p>
              <div className="lf-hero-ctas">
                <a className="btn btn-primary btn-lg" href="/#demo">
                  Book a demo
                </a>
                <a className="btn btn-secondary btn-lg" href="/pricing">
                  See pricing
                </a>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="container">
          <Reveal className="lf-stats" delay={80} blurOnly>
            <div className="lf-stat">
              <strong>3</strong>
              <span>stages: intake, onboarding, offboarding</span>
            </div>
            <div className="lf-stat">
              <strong>Reusable</strong>
              <span>workflow templates, each with a usage count</span>
            </div>
            <div className="lf-stat">
              <strong>Auto-assign</strong>
              <span>on the start date, with no reminder needed</span>
            </div>
          </Reveal>
        </div>

        <section className="lf-section" id="intake">
          <div className="container">
            <Reveal>
              <header className="sec-head sec-head--tight">
                <span className="sec-eyebrow">Intake</span>
                <h2>Intake, before there is an account.</h2>
                <p className="sec-lede">
                  Collect a candidate&apos;s details before their first day, while they are still a
                  candidate.
                </p>
              </header>
            </Reveal>

            <div className="lf-split">
              <Reveal className="lf-copy" delay={60}>
                <p>
                  Hiring produces paperwork long before it produces a colleague. Intake gathers the
                  details, the documents and the start date up front, so day one opens on a record
                  that already exists rather than on a blank form and a scramble.
                </p>
                <p className="lf-quote">
                  <strong>
                    &ldquo;Collect a candidate&apos;s details before their first day. Submitting an
                    intake does not create an account.&rdquo;
                  </strong>
                </p>
                <p>
                  That second sentence is the product&apos;s own promise, and it is a deliberate
                  decision. You can hold everything you need for someone who has not started, and
                  if the offer never lands there is no half-made account to unpick.
                </p>
                <p>
                  Intake has three states of its own. <strong>Awaiting completion</strong> means it
                  has gone out and nothing has come back.{' '}
                  <strong>Submitted</strong> means the candidate has filled it in.{' '}
                  <strong>Needs review</strong> means a person has to look at it before it moves on.
                </p>
              </Reveal>

              <Spotlight className="lf-visual">
                <PillarMoment moment={INTAKE} />
              </Spotlight>
            </div>
          </div>
        </section>

        <section className="lf-section" id="onboarding">
          <div className="container">
            <Reveal>
              <header className="sec-head sec-head--tight">
                <span className="sec-eyebrow">Onboarding</span>
                <h2>Onboarding that assigns itself.</h2>
                <p className="sec-lede">
                  Write the journey once as a template, then let the start date trigger it.
                </p>
              </header>
            </Reveal>

            <div className="lf-split">
              <Reveal className="lf-copy" delay={60}>
                <p>
                  Onboarding lives in Workflows, which is a builder rather than a checklist. Every
                  template carries a name, a description, a task count, a duration in days, a usage
                  count and the author who wrote it, and any template can be set to auto-assign on a
                  person&apos;s start date.
                </p>
                <ul className="checklist">
                  <li>The shipped default is Standard Employee Onboarding: 4 tasks, 14 days.</li>
                  <li>Auto-assign means the journey lands on the profile without anyone opening the app.</li>
                  <li>The usage count shows which template your company actually runs.</li>
                  <li>Progress shows on the person&apos;s own profile as a percentage.</li>
                </ul>
                <p>
                  That last one matters more than it looks. A new hire does not have to ask how far
                  along they are, because the nudge on their profile tells them, names the template
                  they are on, and counts down the tasks that are left.
                </p>
              </Reveal>

              <Spotlight className="lf-visual">
                <PillarMoment moment={ONBOARDING} />
              </Spotlight>
            </div>
          </div>
        </section>

        <section className="lf-section" id="offboarding">
          <div className="container">
            <Reveal>
              <header className="sec-head sec-head--tight">
                <span className="sec-eyebrow">Offboarding</span>
                <h2>Offboarding is a stage, not an afterthought.</h2>
                <p className="sec-lede">
                  The same machinery runs in reverse, on the same record, with the same states.
                </p>
              </header>
            </Reveal>

            <div className="lf-split">
              <Reveal className="lf-copy" delay={60}>
                <p>
                  A template can be typed Onboarding or Offboarding, and the shipped default for the
                  second is Standard Offboarding: 4 tasks over 7 days. An exit is scheduled ahead of
                  the last day, then moves through in progress, needs attention and completed like
                  every other stage in the module.
                </p>
                <p>
                  Most exits go wrong quietly. A laptop that never comes back, an account nobody
                  closed, a handover that lived in one person&apos;s head. Giving the last week the
                  same structure as the first week is what stops that, and it leaves the record
                  closed rather than trailing off.
                </p>
                <p>Ending well matters as much as starting well.</p>
              </Reveal>

              <Spotlight className="lf-visual">
                <PillarMoment moment={OFFBOARDING} />
              </Spotlight>
            </div>
          </div>
        </section>

        <section className="lf-section" id="attention">
          <div className="container">
            <Reveal>
              <header className="sec-head sec-head--tight">
                <span className="sec-eyebrow">Stage tracking</span>
                <h2>Needs attention is the useful column.</h2>
                <p className="sec-lede">
                  Every stage tracks Not started, In progress, Needs attention and Completed.
                </p>
              </header>
            </Reveal>

            <div className="lf-split">
              <Reveal className="lf-copy" delay={60}>
                <p>
                  Three of those four columns are reporting. Not started and In progress tell you
                  the plan is holding, Completed tells you it held. Needs attention is the only one
                  that asks for a person, and it is the one a manager actually works from.
                </p>
                <p>
                  The Staff Lifecycle overview counts active, completed, onboarding and offboarding
                  across the whole workspace, so who is joining, who needs attention and who is
                  leaving is a single view rather than three separate asks.
                </p>
                <a className="turn-link" href="/#demo">
                  See it on your own lifecycle
                  <TurnArrow />
                </a>
              </Reveal>

              <Spotlight className="lf-visual">
                <PillarMoment moment={COLUMNS} />
              </Spotlight>
            </div>
          </div>
        </section>

        <section className="lf-section">
          <div className="container">
            <Reveal className="lf-note" blurOnly>
              <h3>What this does not do</h3>
              <p>
                StaffIntra tracks the journey and the tasks inside it. It does not write contracts
                and it does not run background checks for you. Bring your own paperwork and your own
                screening, and keep the record of what happened here.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <CloseCta />
      <Cta />
      <Footer />
    </>
  );
}
