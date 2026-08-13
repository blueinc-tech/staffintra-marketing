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
  title: 'StaffIntra: Directory',
  description:
    'A staff directory and org chart over the same records, an eleven tab profile per person, and in-app messaging with presence the person sets themselves.',
};

/* Directory, the leaf page. Everything here traces to the real HR module at
   /dashboard/directory: its two tabs, the department filter, the org chart's
   "No direct reports" block, the eleven tab staff profile, and the Inbox with
   its four tabs and its three availability states.

   Sample people and departments are invented on purpose. The account behind
   the feature map holds real staff, and none of it comes to the marketing
   site. */

const DEPARTMENTS = {
  shape: 'list',
  title: 'Directory',
  meta: 'Filtered by department',
  rows: [
    { name: 'Operations', meta: 'Field teams and coordinators', chip: '14', tone: 'accent' },
    { name: 'Engineering', meta: 'Product and platform', chip: '9', tone: 'quiet' },
    { name: 'Finance', meta: 'Payroll, accounts and procurement', chip: '5', tone: 'quiet' },
  ],
};

const RECORD_TABS = {
  shape: 'list',
  title: 'Usman Ibrahim',
  meta: '4 of 11 tabs',
  rows: [
    { name: 'Company Devices', meta: 'Assets issued to this person', chip: '2 issued', tone: 'accent' },
    { name: 'Training', meta: 'What they have completed', chip: 'On record', tone: 'quiet' },
    { name: 'Documents', meta: 'Filed against the person', chip: 'On record', tone: 'quiet' },
    { name: 'Performance', meta: 'Reviews, not scores', chip: 'Reviews', tone: 'ok' },
  ],
};

const PRESENCE = {
  shape: 'list',
  title: 'Availability status',
  meta: 'Chosen, never inferred',
  rows: [
    { name: 'Available', meta: 'You appear online', chip: 'Selected', tone: 'ok' },
    { name: 'Busy', meta: 'Limit interruptions', chip: 'Option', tone: 'quiet' },
    { name: 'Do Not Disturb', meta: 'Silence notifications', chip: 'Option', tone: 'quiet' },
  ],
};

const FIELDS = {
  shape: 'list',
  title: 'Jemimah Dogara',
  meta: 'Personal and Job',
  rows: [
    { name: 'Staff ID', meta: 'On the Personal tab', chip: 'SI-0413', tone: 'quiet' },
    { name: 'Join date', meta: 'Carried on the record', chip: '4 March 2024', tone: 'quiet' },
    { name: 'Manager', meta: 'Emmanuel Okafor, Head of Operations', chip: 'Job', tone: 'accent' },
    { name: 'Emergency contact', meta: 'Name, relationship, phone', chip: 'Filled in', tone: 'ok' },
  ],
};

export default function Directory() {
  return (
    <>
      <Nav />

      <main>
        <header className="lf-hero has-rails">
          <div className="container">
            <Reveal>
              <span className="sec-eyebrow">People &amp; operations</span>
              <h1>Directory, org chart and messaging.</h1>
              <p className="lf-hero-lede">
                Who everyone is, who they report to, and how to reach them, in one place.
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

        <section className="lf-facts">
          <div className="container">
            <Reveal className="lf-facts-grid lf-facts-grid--3" delay={80} blurOnly>
              <div className="lf-fact">
                <span className="lf-fact-n">2</span>
                <span className="lf-fact-t">Views</span>
                <p className="lf-fact-s">
                  Directory and org chart, two tabs over the same set of people.
                </p>
              </div>
              <div className="lf-fact">
                <span className="lf-fact-n">11</span>
                <span className="lf-fact-t">Tabs per staff record</span>
                <p className="lf-fact-s">
                  Personal through to Connected Accounts, all on one profile.
                </p>
              </div>
              <div className="lf-fact">
                <span className="lf-fact-n lf-fact-n--word">Set by the person</span>
                <span className="lf-fact-t">Presence</span>
                <p className="lf-fact-s">
                  Available, Busy or Do Not Disturb, picked by them, not measured.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec has-frame" id="views">
          <div className="container">
            <div className="lf-grid">
              <Reveal className="lf-copy">
                <span className="lf-kicker">
                  <span className="lf-num">01</span> Directory and org chart
                </span>
                <h2>Two views of the same people.</h2>
                <p>
                  The HR module opens on a Directory: every person with their name, their role and
                  their department, narrowed to one department at a time and paged ten, twenty or
                  fifty at a time. Each row carries View profile and Message, so finding someone and
                  reaching them is one step rather than two.
                </p>
                <p>
                  The second tab is an Org chart built from the very same records. A manager heads a
                  block with their role, and their direct reports sit under them as cards. Where a
                  manager has nobody below them, the block says so plainly:{' '}
                  <strong>No direct reports.</strong>
                </p>
                <p>
                  That last detail is small and it matters. An org chart that draws an empty branch
                  makes you guess whether the data is missing or the team is. This one just tells
                  you.
                </p>
                <ul className="lf-points">
                  <li>Two tabs over one set of records, not two systems to keep in step.</li>
                  <li>A department filter narrows the list without leaving the page.</li>
                  <li>Every row offers View profile and Message.</li>
                  <li>Managers with nobody under them read as having no direct reports.</li>
                </ul>
              </Reveal>

              <Reveal className="lf-visual-wrap" delay={120} blurOnly>
                <Spotlight className="lf-visual">
                  <PillarMoment moment={DEPARTMENTS} />
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame" id="record">
          <div className="container">
            <div className="lf-grid">
              <Reveal className="lf-copy">
                <span className="lf-kicker">
                  <span className="lf-num">02</span> The staff record
                </span>
                <h2>Eleven tabs, one person.</h2>
                <p>
                  A profile here is not a contact card. Open one and there are eleven tabs: Personal,
                  Job, Documents, Training, Requests, Company Devices, Performance, Timesheets, Org
                  Chart, Security and Connected Accounts.
                </p>
                <p>
                  Three of those are usually separate products, or separate spreadsheets.{' '}
                  <strong>Documents</strong> holds what is filed against a person.{' '}
                  <strong>Training</strong> holds what they have completed.{' '}
                  <strong>Company Devices</strong> is asset tracking: the laptop and the phone issued
                  to a named human, sitting on the record of that human rather than in a sheet
                  somebody stopped updating after the second hire.
                </p>
                <p>
                  <strong>Performance</strong> holds reviews. There is no score, no grade and no
                  ranking in it, because a number out of a hundred is not a thing a workplace system
                  should be inventing about a colleague.
                </p>
                <ul className="lf-points">
                  <li>Documents: contracts, IDs and anything else filed against the person.</li>
                  <li>Training: completions on the record, not in a folder someone owns.</li>
                  <li>Company Devices: issued assets tracked where the person is.</li>
                  <li>Performance: written reviews, and nothing scored.</li>
                </ul>
              </Reveal>

              <Reveal className="lf-visual-wrap" delay={120} blurOnly>
                <Spotlight className="lf-visual">
                  <PillarMoment moment={RECORD_TABS} />
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="lf-sec has-frame" id="messaging">
          <div className="container">
            <div className="lf-grid">
              <Reveal className="lf-copy">
                <span className="lf-kicker">
                  <span className="lf-num">03</span> Messaging
                </span>
                <h2>Presence people control.</h2>
                <p>
                  Messaging is not bolted on beside the directory, it is the same app. The Inbox
                  carries four tabs: Chats, Groups, Approvals and Slack. An approval thread sits
                  beside a conversation because, in practice, they are usually the same
                  conversation.
                </p>
                <p>
                  Open a chat and the details rail shows the other person&apos;s local time, which
                  for a team spread across cities is the difference between a quick question and a
                  message that lands at midnight. The same rail holds the media and the files that
                  thread has shared, so a document from last month is findable from the conversation
                  it arrived in.
                </p>
                <p>
                  Presence is three states, and the person picks one. <strong>Available</strong>{' '}
                  shows them as online. <strong>Busy</strong> limits interruptions.{' '}
                  <strong>Do Not Disturb</strong> silences notifications. Chosen, not measured.
                </p>
                <ul className="lf-points">
                  <li>Chats, Groups, Approvals and Slack in one inbox.</li>
                  <li>Every conversation carries the other person&apos;s local time.</li>
                  <li>Shared media and shared files stay attached to the thread.</li>
                  <li>Status is a choice, changeable at any time by the person it describes.</li>
                </ul>
              </Reveal>

              <Reveal className="lf-visual-wrap" delay={120} blurOnly>
                <Spotlight className="lf-visual">
                  <PillarMoment moment={PRESENCE} />
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame" id="details">
          <div className="container">
            <div className="lf-grid">
              <Reveal className="lf-copy">
                <span className="lf-kicker">
                  <span className="lf-num">04</span> Emergency contacts
                </span>
                <h2>The details that matter at 6am.</h2>
                <p>
                  Some fields are dull right up to the moment they are the only thing that matters.
                  The record holds a staff ID, a join date, and the person&apos;s manager together
                  with that manager&apos;s role, so who signs this off is answerable without asking
                  around.
                </p>
                <p>
                  It also holds a three part emergency contact: a name, that person&apos;s
                  relationship to your colleague, and a number that actually works. Nobody enjoys
                  filling it in. Everybody is grateful it is there on the morning somebody has to
                  make the call.
                </p>
                <p>
                  Around those sit the vitals: email, phone, department and staff type, plus address
                  and birthday on the Personal tab.
                </p>
                <a className="turn-link" href="/#demo">
                  See a record from your own team
                  <TurnArrow />
                </a>
              </Reveal>

              <Reveal className="lf-visual-wrap" delay={120} blurOnly>
                <Spotlight className="lf-visual">
                  <PillarMoment moment={FIELDS} />
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="lf-note">
          <div className="container">
            <Reveal className="lf-note-box" blurOnly>
              <div>
                <span className="lf-note-tag">Where the line is</span>
                <h2>Presence is chosen, never inferred.</h2>
                <p>
                  A status in StaffIntra means the person set it. Nothing in the product watches how
                  somebody works in order to decide how they should appear to everyone else.
                </p>
              </div>
              <ul className="lf-nots">
                <li>
                  <span>
                    <strong>No activity inference.</strong> A status never flips because someone
                    stopped typing or stopped moving a mouse.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>No screenshots.</strong> The product does not capture anyone&apos;s
                    screen, at any interval, for any reason.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>No hidden signal.</strong> Available, Busy and Do Not Disturb are the
                    whole set, and only the person themselves can pick one.
                  </span>
                </li>
              </ul>
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
