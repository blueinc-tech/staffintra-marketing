'use client';

import './HeroArt.css';

/* The Weave, at page scale.

   This replaces an isometric clock-in kiosk. Isometric blocks were the
   reference site's device, not ours, and drawing a physical terminal also
   said the wrong thing about a product whose whole point is that the record
   is one continuous thing rather than a machine on a wall.

   The mark is three parallel round-capped strands that turn ninety degrees
   and interlock with a second group running the other way. Enlarged, that
   motif becomes the argument the page is making: separate strands, entering
   from different directions, ending up as one fabric.

   Geometry: every strand is one path with a single ninety degree corner at
   radius R. Strands within a group are offset by PITCH along their own
   normal, so the group stays parallel through the turn, which is what makes
   it read as woven rather than as a bundle of pipes.

   Paint order is what does the weaving: group A, then group B, then the
   first two strands of A again over the top, so B passes under A on the left
   and over it on the right. */

const PITCH = 26;
const R = 34;
const W = 460;
const H = 300;

/* Down, then turn right. Drawn from a start point on the left edge. */
function strandDR(x, y, len) {
  return `M${x} ${y} L${x} ${y + len - R} Q${x} ${y + len} ${x + R} ${y + len} L${x + len + 90} ${y + len}`;
}

/* Right, then turn down. The mirror partner, so the two groups cross. */
function strandRD(x, y, len) {
  return `M${x} ${y} L${x + len - R} ${y} Q${x + len} ${y} ${x + len} ${y + R} L${x + len} ${y + len + 70}`;
}

const GROUP_A = [0, 1, 2].map((i) => strandDR(52 + i * PITCH, -20, 150 - i * PITCH));
const GROUP_B = [0, 1, 2].map((i) => strandRD(-20, 96 + i * PITCH, 210 - i * PITCH));

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" className="wv">
        <g
          className="wv-strands"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Group A: falls, then runs right. */}
          {GROUP_A.map((d, i) => (
            <path key={`a${i}`} d={d} className="wv-s" style={{ '--i': i }} />
          ))}

          {/* Group B: runs right, then falls. Crosses A. */}
          {GROUP_B.map((d, i) => (
            <path key={`b${i}`} d={d} className="wv-s wv-s--b" style={{ '--i': i + 3 }} />
          ))}

          {/* A's outer two, painted again so B tucks under them on the left.
              This overpaint is the entire weave illusion. */}
          {GROUP_A.slice(0, 2).map((d, i) => (
            <path key={`o${i}`} d={d} className="wv-s wv-s--over" style={{ '--i': i }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
