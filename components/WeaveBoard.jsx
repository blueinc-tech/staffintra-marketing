'use client';

import './WeaveBoard.css';

/* The integrations board, drawn as the Weave.

   This replaces a wiring diagram that was invented: six boxes routed
   orthogonally into a hub. Nothing in the product looks like that, and a made
   up schematic is a claim about architecture we cannot support.

   The Weave says the true thing instead, and it says it with our own mark.
   Two groups of strands enter from different edges, interlock, and leave as
   one cloth. That is exactly what the section argues: separate systems,
   one record. The strands carry the four real Tools Hub categories.

   The construction is the same as the mark's, so this reads as the logo at
   board scale rather than as a different drawing: every strand in a group
   shares ONE turn centre and the radii step by the same pitch as the
   spacing, which is what keeps a group parallel around its corner instead of
   splaying.

   The pulse travels BOTH ways here, unlike the hero's version. The record is
   shared in both directions, so a pulse that only ran one way would be a
   quiet lie about how the integration works. */

const W = 640;
const H = 400;

const PITCH = 26;
const R0 = 20;
const N = 5;
const RAD = Array.from({ length: N }, (_, i) => R0 + i * PITCH);

/* Turn centres, one per group. */
const A = { cx: 268, cy: 176 }; /* falls from the top, turns right  */
const B = { cx: 312, cy: 152 }; /* runs in from the left, turns down */

const A_TOP = [52, 30, 20, 14, 10];
const A_RIGHT = [432, 520, 556, 590, 622];
const B_LEFT = [150, 60, 40, 26, 16];
const B_BOTTOM = [286, 344, 362, 376, 388];

const NEAR = A_TOP.map((top, i) => ({
  i,
  d: `M${A.cx - RAD[i]} ${top}V${A.cy}A${RAD[i]} ${RAD[i]} 0 0 0 ${A.cx} ${A.cy + RAD[i]}H${A_RIGHT[i]}`,
  head: [A.cx - RAD[i], top],
}));

const FAR = B_LEFT.map((left, i) => ({
  i,
  d: `M${left} ${B.cy - RAD[i]}H${B.cx}A${RAD[i]} ${RAD[i]} 0 0 1 ${B.cx + RAD[i]} ${B.cy}V${B_BOTTOM[i]}`,
  head: [left, B.cy - RAD[i]],
}));

/* Two far strands painted again over the near group in the lower right only,
   so the crossing genuinely interlocks rather than stacking. */
const TUCK = FAR.filter((s) => s.i === 2 || s.i === 3);

/* Three strands a group carry a label, which is six: exactly the number of
   systems a Tools Hub category holds. The unlabelled two are the rest of the
   cloth, and the section never pretends they are named things. */
const LABELLED = [0, 2, 4];

function Strand({ s, group }) {
  return <path d={s.d} pathLength="1000" className={`wb-s wb-s--${group}`} style={{ '--i': s.i }} />;
}
function Pulse({ s, group, back }) {
  return (
    <path
      d={s.d}
      pathLength="1000"
      className={`wb-p wb-p--${group}${back ? ' wb-p--back' : ''}`}
      style={{ '--i': s.i }}
    />
  );
}

export default function WeaveBoard({ nodes, label }) {
  // Six names across the two groups' entry points.
  const nearNames = LABELLED.map((n, k) => ({ s: NEAR[n], t: nodes[k] }));
  const farNames = LABELLED.map((n, k) => ({ s: FAR[n], t: nodes[k + 3] }));

  return (
    <div className="wb">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label} systems woven into one record`}>
        <g className="wb-cloth">
          <g className="wb-far">
            {FAR.map((s) => <Strand key={`f${s.i}`} s={s} group="far" />)}
            {FAR.map((s) => <Pulse key={`fp${s.i}`} s={s} group="far" />)}
            {FAR.map((s) => <Pulse key={`fb${s.i}`} s={s} group="far" back />)}
          </g>

          <g className="wb-near">
            {NEAR.map((s) => <Strand key={`n${s.i}`} s={s} group="near" />)}
            {NEAR.map((s) => <Pulse key={`np${s.i}`} s={s} group="near" />)}
            {NEAR.map((s) => <Pulse key={`nb${s.i}`} s={s} group="near" back />)}
          </g>

          <g className="wb-tuck" clipPath="url(#wbTuck)">
            {TUCK.map((s) => <Strand key={`t${s.i}`} s={s} group="far" />)}
          </g>
        </g>

        <defs>
          <clipPath id="wbTuck">
            <rect x="-40" y="182" width="740" height="300" />
          </clipPath>
        </defs>

        {/* Entry markers and their names. Keyed on the category so the labels
            re-thread when the tab changes rather than cross-fading in place. */}
        <g className="wb-tags" key={label}>
          {nearNames.map(({ s, t }, k) => (
            <g className="wb-tag" key={`nt${k}`} style={{ '--k': k }}>
              <circle cx={s.head[0]} cy={s.head[1]} r="4.5" />
              <text x={s.head[0]} y={s.head[1] - 14} textAnchor="middle">{t}</text>
            </g>
          ))}
          {farNames.map(({ s, t }, k) => (
            <g className="wb-tag" key={`ft${k}`} style={{ '--k': k + 3 }}>
              <circle cx={s.head[0]} cy={s.head[1]} r="4.5" />
              <text x={s.head[0] + 10} y={s.head[1] - 12} textAnchor="start">{t}</text>
            </g>
          ))}
        </g>
      </svg>

      <p className="wb-caption">
        <span>Your tools</span>
        <i aria-hidden="true" />
        <span>One record, shared both ways</span>
      </p>
    </div>
  );
}
