/* Isometric drawing for the closing banner.

   Same projection as the hero kiosk, so the two illustrations belong to one
   drawing system: a 30° axis pair, dy/dx = tan 30° = 0.577.

     A  half the width of a plan cell
     B  half its height, A * tan(30°)
     C  one unit of height, equal to the projected length of the plan axes,
        so a 1×1×1 block reads as a true cube

   Face treatment follows the reference's system rather than its artwork:
   the top face is flat white, the face turned to the lower left carries a
   solid brand colour, and the face turned to the lower right is stippled.
   That stipple is the "rough surface" — it is what stops the large flat
   parts from reading as plain vector shapes.

   The subject is our own: two beams crossing in a lap, which is the Weave's
   idea in three dimensions, with a third beam ghosted in the position it has
   not been placed into yet.

   Blocks are drawn back to front. The crossing beam sits a full block height
   above the one it crosses, so painting order alone gives correct occlusion
   and no face has to be clipped. */

const A = 40;
const B = 23.094;
const C = 46.188;

const p = (x, y, z) => `${((x - y) * A).toFixed(2)},${((x + y) * B - z * C).toFixed(2)}`;

/* The three faces a box turns toward this camera: the top, the +x face on the
   lower right, and the +y face on the lower left. The other three are behind. */
function faces({ x0, x1, y0, y1, z0, z1 }) {
  return {
    top: `${p(x0, y0, z1)} ${p(x1, y0, z1)} ${p(x1, y1, z1)} ${p(x0, y1, z1)}`,
    right: `${p(x1, y0, z1)} ${p(x1, y1, z1)} ${p(x1, y1, z0)} ${p(x1, y0, z0)}`,
    left: `${p(x0, y1, z1)} ${p(x1, y1, z1)} ${p(x1, y1, z0)} ${p(x0, y1, z0)}`,
  };
}

function Block({ tone, ...box }) {
  const f = faces(box);
  return (
    <g className="wf-block">
      <polygon points={f.top} fill="var(--surface)" />
      <polygon points={f.right} fill="url(#wf-grit)" />
      <polygon points={f.left} fill={tone} />
    </g>
  );
}

function GhostBlock(box) {
  const f = faces(box);
  return (
    <g className="wf-ghost">
      <polygon points={f.top} />
      <polygon points={f.right} />
      <polygon points={f.left} />
    </g>
  );
}

export default function WorkforceArt() {
  return (
    <svg
      className="wf-svg"
      viewBox="-246 -15 424 214"
      fill="none"
      role="img"
      aria-label="Two beams crossing in a lap joint, with a third shown in outline beside them"
    >
      <defs>
        {/* Four dots at four weights on an 8px tile: regular enough to tile
            without seams, irregular enough not to read as a grid. */}
        <pattern id="wf-grit" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="var(--surface)" />
          <circle cx="1.7" cy="2.1" r=".95" fill="var(--ink)" opacity=".30" />
          <circle cx="5.6" cy="4.6" r=".80" fill="var(--ink)" opacity=".24" />
          <circle cx="3.5" cy="6.9" r=".62" fill="var(--ink)" opacity=".18" />
          <circle cx="6.9" cy="1.1" r=".50" fill="var(--ink)" opacity=".14" />
        </pattern>
        <pattern id="wf-grit-faint" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="var(--surface)" />
          <circle cx="1.7" cy="2.1" r=".8" fill="var(--ink-3)" opacity=".28" />
          <circle cx="5.6" cy="4.6" r=".62" fill="var(--ink-3)" opacity=".2" />
        </pattern>
      </defs>

      {/* The unplaced piece, set to the left and level with the joint. */}
      {GhostBlock({ x0: -1.0, x1: 2.2, y0: 3.7, y1: 4.9, z0: 0, z1: 0.9 })}
      {/* Brand Purple runs the long lower-left face; a beam along +x is the
          only orientation that turns a long face toward the colour side. */}
      <Block x0={0} x1={5.4} y0={1.6} y1={2.8} z0={0} z1={0.9} tone="var(--accent)" />
      {/* Seated on top of it, not hovering: z starts where the other ends. */}
      <Block x0={3.4} x1={4.6} y0={0.4} y1={4.2} z0={0.9} z1={1.8} tone="var(--warn)" />
    </svg>
  );
}
