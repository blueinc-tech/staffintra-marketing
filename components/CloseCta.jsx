import { boxFaces } from './iso';
import './CloseCta.css';

/* A large stepped form, outline only, sitting half off the panel at each edge.
   Two boxes rather than a notched prism, drawn near-to-far, which is all the
   occlusion this needs. */
const TALL = { x0: 0, x1: 2, y0: 0, y1: 2, z0: 0, z1: 3 };
const LOW = { x0: 2, x1: 4, y0: 0, y1: 2, z0: 0, z1: 1.6 };

function StepForm({ className }) {
  const a = boxFaces(TALL);
  const b = boxFaces(LOW);
  return (
    <svg className={`cc-art ${className}`} viewBox="-90 -150 260 300" fill="none" aria-hidden="true">
      <defs>
        <pattern id="cc-grit" width="7" height="7" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="var(--surface)" />
          <circle cx="1.6" cy="1.9" r=".8" fill="var(--ink)" opacity=".2" />
          <circle cx="4.9" cy="4.4" r=".62" fill="var(--ink)" opacity=".15" />
        </pattern>
      </defs>
      {[a, b].map((f, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <g key={i}>
          <polygon points={f.top} fill="var(--surface)" />
          <polygon points={f.right} fill="url(#cc-grit)" />
          <polygon points={f.left} fill="var(--surface)" />
        </g>
      ))}
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
            <h2>Give your managers their evenings back.</h2>
            <p>
              StaffIntra is the piece that brings the week together, so your team can plan with
              confidence and stop rebuilding the rota by hand.
            </p>
            <a className="btn btn-primary btn-lg" href="#demo">
              Get a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
