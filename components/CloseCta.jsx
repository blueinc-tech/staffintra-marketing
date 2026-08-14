import MagnetField from './MagnetField';
import './CloseCta.css';

/* The closing band's field of strokes.

   The Weave used to sit in both corners here, but it now carries the
   integrations section, and the same mark doing the same job twice on one
   page dilutes it. This is a field instead, and it points at the button. */

export default function CloseCta() {
  return (
    <section className="close-cta">
      <div className="cc-panel">
        <MagnetField focusSelector=".cc-ctas .btn-primary" />

        <div className="container">
          <div className="cc-copy">
            <h2>Run your workforce with confidence.</h2>
            <p>
              One workspace built around the way your business actually works. A Blueinc
              Technologies product.
            </p>
            <div className="cc-ctas">
              <a className="btn btn-primary btn-lg" href="/pricing">
                Open an account
              </a>
              <a className="btn btn-secondary btn-lg" href="#demo">
                Book a demo
              </a>
            </div>
            <ul className="cc-chips" aria-label="Compliance">
              <li><strong>SOC 2</strong> Type 2 ready</li>
              <li><strong>ISO 27001</strong> Aligned</li>
              <li><strong>NDPR</strong> Compliant</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
