import './CloseCta.css';

/* The Weave, as a corner ornament.

   This was a pair of isometric stepped boxes. Those were the reference site's
   device and carried no meaning of ours, so the closing band is now signed
   with our own mark instead of decorated with someone else's geometry.

   Two strand groups crossing at ninety degrees, the near group painted last
   so it passes over the far one. Outline weight only, no fills: this sits on
   a tinted panel, and a filled form would read as a hole cut in it. */

const PITCH = 22;
const R = 28;

/* Falls, then turns right. */
function strandDR(x, y, len) {
  return `M${x} ${y} L${x} ${y + len - R} Q${x} ${y + len} ${x + R} ${y + len} L${x + len + 70} ${y + len}`;
}

/* Runs right, then falls. The partner that crosses it. */
function strandRD(x, y, len) {
  return `M${x} ${y} L${x + len - R} ${y} Q${x + len} ${y} ${x + len} ${y + R} L${x + len} ${y + len + 60}`;
}

const A = [0, 1, 2].map((i) => strandDR(30 + i * PITCH, -30, 120 - i * PITCH));
const B = [0, 1, 2].map((i) => strandRD(-30, 70 + i * PITCH, 160 - i * PITCH));

function StepForm({ className }) {
  return (
    <svg className={`cc-art ${className}`} viewBox="-40 -40 260 300" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
        {A.map((d, i) => (
          <path key={`a${i}`} d={d} opacity=".5" />
        ))}
        {B.map((d, i) => (
          <path key={`b${i}`} d={d} opacity=".28" />
        ))}
        {/* Overpaint: this is what makes the crossing read as woven. */}
        {A.slice(0, 2).map((d, i) => (
          <path key={`o${i}`} d={d} opacity=".5" />
        ))}
      </g>
    </svg>
  );
}

export default function CloseCta() {
  return (
    <section className="close-cta">
      <div className="cc-panel">
        <StepForm className="cc-art--l" />
        <StepForm className="cc-art--r" />

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
