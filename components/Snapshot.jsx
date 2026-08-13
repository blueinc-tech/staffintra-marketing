import { TurnArrow } from './PillarMarks';
import './Snapshot.css';

/* THE PLATFORM band, from v3. The hero already shows the home command center
   live, so this section shows the other surface v3 draws: the timesheets
   screen, in a browser frame, with the week reconciling itself. Data is the
   v3 cast verbatim. */

const ROWS = [
  { ini: 'RA', name: 'Ruth Adeyemi', hours: '38h 40m', dept: 'Client Success', chip: 'Approved', tone: 'ok' },
  { ini: 'UI', name: 'Usman Ibrahim', hours: '41h 05m', dept: 'Sales', chip: 'Approved', tone: 'ok' },
  { ini: 'EO', name: 'Emmanuel Okafor', hours: '39h 55m', dept: 'Engineering', chip: 'Review', tone: 'warn' },
  { ini: 'JD', name: 'Jemimah Dogara', hours: '36h 20m', dept: 'Intake', chip: 'Approved', tone: 'ok' },
  { ini: 'BA', name: 'Blossom Adeh', hours: '40h 00m', dept: 'Sales', chip: 'Auto-built', tone: 'accent' },
  { ini: 'JO', name: 'Joseph Obi', hours: '28h 10m', dept: 'Delivery', chip: '2 gaps', tone: 'due' },
];

const FILTERS = ['This week', 'Needs review', 'Approved', 'Scheduled'];

export default function Snapshot() {
  return (
    <section className="snapshot" id="snapshot">
      <div className="container">
        <header className="sec-head">
          <span className="sec-eyebrow">The platform</span>
          <h2>One home for the whole workday.</h2>
          <p className="sec-lede">
            Every person starts their day on a personal command center: clock, work queue,
            team pulse and quick actions in one calm surface. And every hour lands here,
            payroll-ready.
          </p>
        </header>
      </div>

      <div className="snap-frame has-frame">
        <div className="container">
          <div className="snap-browser">
            <div className="snap-bar">
              <span className="snap-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="snap-url">app.staffintra.com/blueinc/timesheets</span>
            </div>

            <div className="snap-body">
              <div className="snap-head">
                <h3>Timesheets</h3>
                <div className="snap-filters" aria-hidden="true">
                  {FILTERS.map((f, i) => (
                    <span key={f} className={i === 0 ? 'is-on' : undefined}>{f}</span>
                  ))}
                </div>
              </div>

              <div className="snap-table" role="img" aria-label="Six timesheets, hours totalled per person, approval states beside each">
                {ROWS.map((r) => (
                  <div className="snap-row" key={r.ini}>
                    <span className={`snap-ava snap-ava--${r.tone}`}>{r.ini}</span>
                    <span className="snap-name">{r.name}</span>
                    <span className="snap-hours">{r.hours}</span>
                    <span className="snap-dept">{r.dept}</span>
                    <span className={`snap-chip snap-chip--${r.tone}`}>{r.chip}</span>
                  </div>
                ))}
              </div>

              <div className="snap-foot">
                <span className="snap-user">
                  <strong>Samuel Johnson</strong> MD / CEO · BLU-0001
                </span>
                <span className="snap-live">
                  <i aria-hidden="true" />
                  14 of 16 clocked in · live
                </span>
              </div>
            </div>
          </div>

          <a className="turn-link snap-more" href="/platform">
            <TurnArrow />
            See the platform
          </a>
        </div>
      </div>
    </section>
  );
}
