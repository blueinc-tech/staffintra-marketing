import Reveal from './Reveal';
import WorkforceArt from './WorkforceArt';
import './Workforce.css';

/* The closing banner between the product pillars and the rest of the page.
   Copy is ours, not the reference's line. */
export default function Workforce() {
  return (
    <section className="workforce has-frame">
      {/* Stipple band above the banner, full bleed like the hatch it follows. */}
      <div className="grit-band" aria-hidden="true" />

      <div className="container">
        <div className="wf-row">
          <Reveal className="wf-copy">
            <h2>Spend the week on the work, not the admin.</h2>
            <a className="btn btn-primary" href="#demo">
              Get a demo
            </a>
          </Reveal>

          <div className="wf-art">
            <WorkforceArt />
          </div>
        </div>
      </div>

      <span className="wf-rule" aria-hidden="true" />
    </section>
  );
}
