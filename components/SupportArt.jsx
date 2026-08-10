import { boxFaces } from './iso';

/* Two slabs handed across, which is the shape of a managed setup: your records
   on one, ours on the other. Same camera as every other drawing on the site.

   The coverage visual that used to live here has moved to NigeriaMap. */
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

export default SetupArt;
