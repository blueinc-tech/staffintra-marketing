import { ELBOW, STROKE } from './weave';

/* Art for the closing banner, built from the logo rather than from isometric
   solids. Solids on a 30-degree axis are the reference's signature, and
   borrowing them was the wrong call.

   Six of the mark's own elbows on a grid, each a half turn from its
   neighbours, spaced four units tighter than their box so the strokes of one
   run into the gaps of the next. Two elbows carry brand colour and one carries
   the warm accent; the rest are drawn open. That is what gives the field a
   front and a back without needing a shadow to say so. */

const BOX = 24;
const S = 2;
const STEP = 44; // 48 wide, overlapped by 4

const TONES = ['open', 'accent', 'open', 'warm', 'open', 'accent'];

const GROUPS = Array.from({ length: 6 }, (_, i) => {
  const c = i % 3;
  const r = Math.floor(i / 3);
  return {
    key: i,
    x: c * STEP,
    y: r * STEP,
    spin: (r + c) % 2 ? 180 : 0,
    tone: TONES[i],
  };
});

export default function WorkforceArt() {
  return (
    <svg
      className="wf-svg"
      viewBox={`-5 -5 ${2 * STEP + BOX * S + 10} ${STEP + BOX * S + 10}`}
      fill="none"
      role="img"
      aria-label="A field of the StaffIntra weave, each group turned against its neighbours"
    >
      {GROUPS.map((g) => (
        <g key={g.key} className={`wa-${g.tone}`} transform={`translate(${g.x} ${g.y}) scale(${S})`}>
          <g transform={`rotate(${g.spin} 12 12)`} {...STROKE}>
            {ELBOW.map((d) => <path key={d} d={d} />)}
          </g>
        </g>
      ))}
    </svg>
  );
}
