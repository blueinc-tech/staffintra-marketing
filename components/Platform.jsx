import PlatformArt from './PlatformArt';
import { TurnArrow } from './PillarMarks';
import { ChipMark } from './ChipMarks';
import './Platform.css';

/* One lead feature on the left, over the drawing, and two stacked features on
   the right. Copy follows the Solutions branch of navData. */
const STACK = [
  {
    id: 'compliance',
    tone: 'info',
    title: 'Compliance',
    body:
      'Working time, right to work, and holiday policy are checked as you build the rota, ' +
      'not discovered afterwards in an audit.',
    link: 'Stay on the right side of it',
  },
  {
    id: 'cost',
    tone: 'warn',
    title: 'Labour cost',
    body:
      'See what the week costs before you publish it, down to the hour, the site, and the ' +
      'premium rate.',
    link: 'Cost the week',
  },
];

export default function Platform() {
  return (
    <section className="platform" id="features">
      <div className="container">
        <header className="sec-head">
          <h2>One workspace, every piece in place.</h2>
        </header>
      </div>

      <div className="plat-frame has-frame">
        <div className="container">
          <div className="plat-box">
            <div className="plat-lead">
              <h3>Connected systems</h3>
              <p>
                Stop the double entry for good. Rota, time, leave, and payroll share one record,
                so a change in one place is a change everywhere.
              </p>
              <a className="turn-link" href="#product">
                <TurnArrow />
                Bring your systems together
              </a>
              <PlatformArt />
            </div>

            <div className="plat-stack">
              {STACK.map((s) => (
                <div className="plat-item" key={s.id}>
                  <ChipMark tone={s.tone} />
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <a className="turn-link" href="#product">
                    <TurnArrow />
                    {s.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
