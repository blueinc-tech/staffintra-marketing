import { boxFaces } from './iso';

/* Two visuals for the support cards.

   The reference puts a shaded map of the United States in the first one. A map
   of a country we do not claim to be in would be a fabricated claim, so ours
   is a coverage grid instead: honest about being a diagram, and in the same
   geometric language as the rest of the site. Weights are fixed, not random,
   because this renders on the server and a random fill would not match on
   rehydration. */

const COLS = 11;
const WEIGHTS = [
  1, 2, 2, 3, 2, 1, 2, 3, 2, 1, 1,
  2, 3, 4, 3, 2, 3, 4, 3, 2, 2, 1,
  1, 3, 4, 5, 4, 3, 4, 5, 3, 2, 1,
  2, 2, 3, 4, 5, 4, 3, 4, 3, 2, 2,
  1, 2, 2, 3, 3, 3, 4, 3, 2, 2, 1,
  1, 1, 2, 2, 3, 2, 2, 2, 2, 1, 1,
];
const STEP = 26;
const SIZE = 21;

export function CoverageArt() {
  return (
    <svg
      className="sup-grid"
      viewBox={`0 0 ${COLS * STEP} ${(WEIGHTS.length / COLS) * STEP}`}
      fill="none"
      role="img"
      aria-label="Coverage across the country, shown as a weighted grid"
    >
      {WEIGHTS.map((w, i) => (
        <rect
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          x={(i % COLS) * STEP}
          y={Math.floor(i / COLS) * STEP}
          width={SIZE}
          height={SIZE}
          fill="var(--accent)"
          fillOpacity={0.09 + w * 0.15}
        />
      ))}
    </svg>
  );
}

/* Two slabs handed across, which is the shape of a managed setup: your records
   on one, ours on the other. Same camera as every other drawing here. */
const SLAB_A = { x0: 0, x1: 3.4, y0: 0, y1: 1.4, z0: 0, z1: 0.62 };
const SLAB_B = { x0: 0.7, x1: 4.1, y0: 2.0, y1: 3.4, z0: 0, z1: 0.62 };

export function SetupArt() {
  const a = boxFaces(SLAB_A);
  const b = boxFaces(SLAB_B);
  return (
    <svg
      className="sup-slabs"
      viewBox="-120 -40 268 226"
      fill="none"
      role="img"
      aria-label="Two slabs handed across, one carrying your records and one ours"
    >
      <defs>
        <pattern id="sup-grit" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="var(--surface)" />
          <circle cx="1.7" cy="2.1" r=".95" fill="var(--ink)" opacity=".28" />
          <circle cx="5.6" cy="4.6" r=".8" fill="var(--ink)" opacity=".22" />
          <circle cx="3.5" cy="6.9" r=".6" fill="var(--ink)" opacity=".16" />
        </pattern>
      </defs>
      <g className="sup-slab">
        <polygon points={a.top} fill="var(--surface)" />
        <polygon points={a.right} fill="var(--accent-soft)" />
        <polygon points={a.left} fill="var(--accent)" />
      </g>
      <g className="sup-slab">
        <polygon points={b.top} fill="url(#sup-grit)" />
        <polygon points={b.right} fill="var(--warn-soft)" />
        <polygon points={b.left} fill="var(--surface)" />
      </g>
    </svg>
  );
}
