import { ChipMark } from './ChipMarks';
import { TurnArrow } from './PillarMarks';
import './Audiences.css';

/* The v3 audiences band: four ways of working, one platform bending to fit.
   Copy verbatim from v3 apart from the house rule on long dashes. Each card
   fronts a deeper block on the Solutions page. */
const AUDIENCES = [
  {
    id: 'startups',
    tone: 'accent',
    name: 'Startups',
    body: 'Time, tasks and pay ready before the chaos starts. Free to begin, grows as you do.',
    cta: 'Explore for startups',
  },
  {
    id: 'midsize',
    tone: 'info',
    name: 'Mid-sized businesses',
    body: 'Empower every team with clear time, fair grades and approvals that route themselves.',
    cta: 'Explore for mid-size',
  },
  {
    id: 'operations',
    tone: 'warn',
    name: 'Field & operations teams',
    body: 'Shifts, cases and multi-step sign-offs. Model your real operations, stage by stage.',
    cta: 'Explore for operations',
  },
  {
    id: 'enterprise',
    tone: 'ok',
    name: 'Established organizations',
    body: 'Consolidate the sprawl: HR, time, productivity and operations under one branded roof.',
    cta: 'Explore for enterprise',
  },
];

export default function Audiences() {
  return (
    <section className="audiences" id="audiences">
      <div className="container">
        <header className="sec-head">
          <span className="sec-eyebrow">Solutions</span>
          <h2>Built for teams that don&apos;t work the same way.</h2>
          <p className="sec-lede">
            However your business runs, StaffIntra bends to fit, not the other way round.
          </p>
        </header>
      </div>

      <div className="aud-frame has-frame">
        <div className="container">
          <div className="aud-grid">
            {AUDIENCES.map((a) => (
              <article className="aud-card" key={a.id}>
                <ChipMark tone={a.tone} />
                <h3>{a.name}</h3>
                <p>{a.body}</p>
                <a className="turn-link" href={`/solutions#${a.id}`}>
                  <TurnArrow />
                  {a.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
