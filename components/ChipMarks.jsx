import { ELBOW, BARS, STROKE } from './weave';

/* The chip above a feature heading. Built from the Weave like every other
   mark here: an elbow on a tinted tile, turned a different way per tone.
   It used to be an isometric block, which is the reference's device. */

const SPIN = { accent: 0, info: 90, warn: 180, ok: 270 };
const TINT = {
  accent: ['var(--accent-soft)', 'var(--accent)'],
  info: ['var(--info-soft)', 'var(--info)'],
  warn: ['var(--warn-soft)', 'var(--warn)'],
  ok: ['var(--ok-soft)', 'var(--ok)'],
};

export function ChipMark({ tone = 'accent', straight = false }) {
  const [bg, ink] = TINT[tone] ?? TINT.accent;
  return (
    <svg className="chip-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="40" height="40" rx="2" fill={bg} />
      <g transform={`translate(8 8) rotate(${SPIN[tone] ?? 0} 12 12)`} {...STROKE} stroke={ink}>
        {(straight ? BARS : ELBOW).map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  );
}

export default ChipMark;
