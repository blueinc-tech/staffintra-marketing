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
  title: 'StaffIntra: Geofencing and breaks',
  description:
    'Outside geofence is a first class attendance status and break is its own timesheet column, with location recorded only at clock in and clock out.',
};

/* A leaf page under Time & attendance.

   Two features that the pillar band only has room to name in passing get the
   space to be explained properly here: the geofence flag and the break
   column. The honesty band at the foot is load bearing, not decoration.
   Geofencing is the feature buyers are most likely to read as surveillance,
   so the limits are stated on the same page as the capability. */

const CLOCK_EVENTS = {
  shape: 'list',
  title: 'Clock events, today',
  meta: 'Ikeja site',
  rows: [
    { name: 'Ruth Adeyemi', meta: '08:02 · Ikeja office', chip: 'Inside', tone: 'ok' },
    { name: 'Usman Ibrahim', meta: '08:14 · Ikeja office', chip: 'Inside', tone: 'ok' },
    { name: 'Emmanuel Okafor', meta: '08:31 · Ikeja office', chip: 'Inside', tone: 'ok' },
    {
      name: 'Jemimah Dogara',
      meta: '09:05 · Lekki client visit',
      chip: 'Outside geofence',
      tone: 'due',
    },
  ],
};

const TWO_STAMPS = {
  shape: 'list',
  title: 'Blossom Adeh, Tuesday',
  meta: 'Attendance record',
  rows: [
    {
      name: 'Clock in',
      meta: '07:58 · Ikeja office, Lagos · Africa/Lagos',
      chip: 'Recorded',
      tone: 'accent',
    },
    {
      name: 'Clock out',
      meta: '17:04 · Ikeja office, Lagos · Africa/Lagos',
      chip: 'Recorded',
      tone: 'accent',
    },
    { name: 'Everything in between', meta: 'Not collected', chip: 'Nothing', tone: 'quiet' },
  ],
};

const WEEK_HOURS = {
  shape: 'bars',
  title: 'Joseph Obi, this week',
  meta: 'Net of break · 37h 20m',
  rows: [
    { label: 'Monday', value: '7h 30m', p: 0.94 },
    { label: 'Tuesday', value: '7h 45m', p: 0.97 },
    { label: 'Wednesday', value: '6h 50m', p: 0.85 },
    { label: 'Thursday', value: '8h 00m', p: 1 },
    { label: 'Friday', value: '7h 15m', p: 0.91 },
  ],
};

const STATUS_MIX = {
  shape: 'list',
  title: 'Attendance, this week',
  meta: '69 records',
  rows: [
    { name: 'Present', meta: 'On site and on time', chip: '42', tone: 'ok' },
    { name: 'Late', meta: 'Clocked in after start', chip: '6', tone: 'warn' },
    { name: 'Remote', meta: 'Working off site', chip: '9', tone: 'accent' },
    { name: 'WFH', meta: 'Working from home', chip: '7', tone: 'accent' },
    { name: 'Outside geofence', meta: 'Clocked in off the perimeter', chip: '3', tone: 'due' },
    { name: 'Absent', meta: 'No clock event on record', chip: '2', tone: 'quiet' },
  ],
};

export default function GeofencingPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="lf-hero">
          <div className="container">
            <span className="sec-eyebrow">Time &amp; attendance</span>
            <h1>Geofencing and breaks.</h1>
            <p className="lf-hero-lede">
              Know where a clock event happened and how long the break ran, without following
              anyone around.
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
          <div className="container lf-facts-grid">
            <div className="lf-fact">
              <span className="lf-fact-n">6</span>
              <span className="lf-fact-t">Attendance statuses</span>
              <p className="lf-fact-s">
                Present, Late, Remote, WFH, Outside geofence and Absent. Outside geofence is a
                status in its own right, not a note somebody types.
              </p>
            </div>
            <div className="lf-fact">
              <span className="lf-fact-n">1</span>
              <span className="lf-fact-t">Break column</span>
              <p className="lf-fact-s">
                Break sits beside hours on the timesheet, so worked time and paid time are never
                the same guess.
              </p>
            </div>
            <div className="lf-fact">
              <span className="lf-fact-n">2</span>
              <span className="lf-fact-t">Location stamps a shift</span>
              <p className="lf-fact-s">
                One at clock in, one at clock out. Each carries the place and the timezone, and
                nothing is taken between them.
              </p>
            </div>
            <div className="lf-fact">
              <span className="lf-fact-n">3</span>
              <span className="lf-fact-t">Ranges on the board</span>
              <p className="lf-fact-s">
                Read attendance by day, by week or by month, filter it by team, and export the
                result to CSV.
              </p>
            </div>
          </div>
        </section>

        <section className="lf-sec has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">01</span> The perimeter
              </span>
              <h2>A perimeter per site.</h2>
              <p>
                A geofence is drawn around a site. When somebody clocks in or out, the event
                records whether it landed inside that perimeter or outside it, and the attendance
                record carries the answer from then on.
              </p>
              <p>
                Outside is not blocked. It is flagged. A driver at a client address, an engineer
                on a callout and a supervisor covering another branch all clock in normally, and
                the exception is left for a person to read rather than for software to punish.
              </p>
              <ul className="lf-points">
                <li>The flag is written at the moment of the clock event, not added later</li>
                <li>Field staff are never stopped from starting work</li>
                <li>Every flagged event keeps the place it was recorded at</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual">
                <PillarMoment moment={CLOCK_EVENTS} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">02</span> The limit
              </span>
              <h2>Location context, not tracking.</h2>
              <p>
                StaffIntra records the place a clock event happened and the timezone it happened
                in, at clock in and again at clock out. That is the whole of it. The product does
                not follow anyone between those two points.
              </p>
              <p>
                This is a deliberate limit, not a gap waiting to be filled. Two stamps are enough
                to settle where a shift started and ended, and a trail of everywhere somebody went
                in between answers a question no payroll run ever asks.
              </p>
              <ul className="lf-points">
                <li>Place and timezone on the record, readable by the staff member</li>
                <li>No background collection once the clock is running</li>
                <li>Timezone stored per event, so travel does not distort the day</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual">
                <PillarMoment moment={TWO_STAMPS} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">03</span> Breaks
              </span>
              <h2>Breaks on the timesheet.</h2>
              <p>
                Break is a column beside hours, not a deduction somebody remembers to make.
                Worked time is hours minus break, so the figure that reaches payroll is already
                the net one.
              </p>
              <p>
                It also means a long break is visible as a long break rather than as missing time,
                which is a very different conversation to have with somebody.
              </p>
              <ul className="lf-points">
                <li>Staff, date, clock in, clock out, hours, break, status and location, per row</li>
                <li>Net hours roll up per person and per week</li>
                <li>The same numbers export to CSV for whoever runs payroll</li>
              </ul>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual">
                <PillarMoment moment={WEEK_HOURS} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-sec lf-sec--tint lf-sec--flip has-frame">
          <div className="container lf-grid">
            <Reveal className="lf-copy">
              <span className="lf-kicker">
                <span className="lf-num">04</span> The board
              </span>
              <h2>Filter the board by exception.</h2>
              <p>
                Most of the board is people who turned up on time, and nobody needs to read that.
                Filter attendance to just Outside geofence, or just Late, narrow it to one team,
                and set the range to a day, a week or a month.
              </p>
              <p>
                What is left is the short list worth asking about. Export it to CSV and the same
                short list goes to whoever needs it next.
              </p>
              <ul className="lf-points">
                <li>Status filter across all six attendance statuses</li>
                <li>Team is a first class grouping, not a search box</li>
                <li>Day, week and month ranges, each exportable</li>
              </ul>
              <a className="turn-link" href="/pricing">
                See what each plan includes
                <TurnArrow />
              </a>
            </Reveal>
            <Reveal className="lf-visual-wrap" delay={120} blurOnly>
              <Spotlight className="lf-visual">
                <PillarMoment moment={STATUS_MIX} />
              </Spotlight>
            </Reveal>
          </div>
        </section>

        <section className="lf-note has-frame">
          <div className="container">
            <Reveal className="lf-note-box" blurOnly>
              <div>
                <span className="lf-note-tag">What this is not</span>
                <h2>The limits, stated on the same page.</h2>
                <p>
                  Geofencing is the feature most likely to be read as surveillance, so here is
                  exactly how far it goes.
                </p>
              </div>
              <ul className="lf-nots">
                <li>
                  <span>
                    <strong>No continuous location tracking.</strong> StaffIntra does not follow a
                    device through the day, and there is no live map of where your staff are.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>No screenshots.</strong> The product never captures a screen, and there
                    is no keystroke or activity monitor behind it.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Location only at clock in and clock out.</strong> Two points on a
                    record, each with its place and timezone. Nothing is collected in between.
                  </span>
                </li>
              </ul>
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
