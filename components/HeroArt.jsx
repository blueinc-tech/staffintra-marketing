import './HeroArt.css';

/* The Weave, at page scale.

   The logo is a set of parallel round-capped strands that turn ninety degrees
   and interlock with a second set running the other way. Enlarged, that motif
   becomes the argument the page is making: separate strands, entering from
   different directions, ending up as one fabric.

   Five strands a group rather than three, because three reads as a ribbon and
   five reads as cloth. Each group shares ONE turn centre, so the radii step by
   the same pitch as the spacing. That is what keeps a group parallel through
   its corner instead of splaying, and it is the same construction the mark
   uses at 24px.

   The layout is a pinwheel. Group A falls from the top and turns right, group
   B runs in from the left and turns down, and their two nested elbows sit on
   opposite diagonals. That leaves two clean crossing fields: A's uprights over
   B's rows at top left, and B's uprights over A's rows at bottom right.

   Every strand is a different length, and the innermost strand of each group
   stops five units short of its last crossing so its cap lands in the gap
   between two strands of the other group. Threads that end mid-cloth are the
   difference between fabric and a printed grid. */

const W = 460;
const H = 300;

/* Centre to centre. With an 11 wide stroke the clear gap is 10, which is what
   lets the crossing fields read as holes rather than as a solid block. */
const PITCH = 21;
const R0 = 15;
const N = 5;

const RAD = Array.from({ length: N }, (_, i) => R0 + i * PITCH);

const A = { cx: 194, cy: 136 }; /* falls, then runs right */
const B = { cx: 230, cy: 122 }; /* runs right, then falls */

/* Ends, innermost strand first. */
const A_TOP = [40, 20, 13, 9, 6];
const A_RIGHT = [313, 396, 414, 432, 450];
const B_LEFT = [111, 34, 24, 16, 10];
const B_BOTTOM = [219, 268, 278, 286, 292];

/* Down the left of the turn centre, a quarter arc around it, then out to the
   right. Sweep 0: the tangent is vertical going in and horizontal coming out. */
const NEAR = A_TOP.map((top, i) => ({
  i,
  fan: `${(i * -2.4).toFixed(1)}deg`,
  d: `M${A.cx - RAD[i]} ${top}V${A.cy}A${RAD[i]} ${RAD[i]} 0 0 0 ${A.cx} ${A.cy + RAD[i]}H${A_RIGHT[i]}`,
}));

/* The mirror partner: in along the top of the turn centre, around it, then
   down. Sweep 1, for the same reason in reverse. */
const FAR = B_LEFT.map((left, i) => ({
  i,
  fan: `${(i * 2.4).toFixed(1)}deg`,
  d: `M${left} ${B.cy - RAD[i]}H${B.cx}A${RAD[i]} ${RAD[i]} 0 0 1 ${B.cx + RAD[i]} ${B.cy}V${B_BOTTOM[i]}`,
}));

/* Two far strands are painted a third time, clipped to the lower right, so
   they ride back over the near group there while their neighbours stay under
   it. Whole-strand overpaint is how the mark weaves, so it is how this weaves,
   and alternating two columns out of five is what turns a stack into a
   crossing. */
const TUCK = FAR.filter((s) => s.i === 2 || s.i === 3);

/* pathLength normalises every strand to 1000 units regardless of its true
   arc length, which is what lets one set of dash figures drive the draw and
   the travelling pulse across strands of five different lengths. */
function Strand({ s }) {
  return (
    <path
      d={s.d}
      pathLength="1000"
      className="wv-s"
      style={{ '--i': s.i, '--fan': s.fan }}
    />
  );
}

/* The same geometry again, thinner and lighter, carrying a single short dash
   that travels the strand once a cycle. */
function Pulse({ s }) {
  return <path d={s.d} pathLength="1000" className="wv-p" style={{ '--i': s.i }} />;
}

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="wv">
        <defs>
          {/* Graded across the whole composition rather than per strand, so
              the group darkens into the corner as one piece of cloth. */}
          <linearGradient id="wvInk" gradientUnits="userSpaceOnUse" x1="95" y1="6" x2="450" y2="292">
            <stop offset="0" className="wv-k0" />
            <stop offset=".55" className="wv-k1" />
            <stop offset="1" className="wv-k2" />
          </linearGradient>

          {/* The cut sits at y 141, in the empty band between the bottom of
              the far group's arcs and the top of the near group's rows, so
              the overpaint joins its own strand with no visible seam. */}
          <clipPath id="wvTuck">
            <rect x="-30" y="141" width="530" height="220" />
          </clipPath>
        </defs>

        <g className="wv-w">
          {/* Far group first, so the near group covers it everywhere. */}
          <g className="wv-far">
            {FAR.map((s) => (
              <Strand key={`f${s.i}`} s={s} />
            ))}
            {FAR.map((s) => (
              <Pulse key={`fp${s.i}`} s={s} />
            ))}
          </g>

          <g className="wv-near">
            {NEAR.map((s) => (
              <Strand key={`n${s.i}`} s={s} />
            ))}
            {NEAR.map((s) => (
              <Pulse key={`np${s.i}`} s={s} />
            ))}
          </g>

          {/* And two of the far strands back over the top, in one field only.
              This overpaint is the entire weave. */}
          <g className="wv-tuck" clipPath="url(#wvTuck)">
            {TUCK.map((s) => (
              <Strand key={`t${s.i}`} s={s} />
            ))}
            {TUCK.map((s) => (
              <Pulse key={`tp${s.i}`} s={s} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
