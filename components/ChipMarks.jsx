import { boxFaces } from './iso';

/* The small isometric chip that sits above a feature heading. Same camera as
   every other drawing on the site, just one block instead of a scene: a light
   top, the tone on the face turned to the lower left, and a paler version of
   it on the face turned to the lower right. */

const BOX = { x0: 0, x1: 1.4, y0: 0, y1: 1.4, z0: 0, z1: 0.5 };

const TONES = {
  accent: ['var(--accent-soft)', 'var(--accent)', 'var(--info)'],
  info: ['var(--info-soft)', 'var(--info)', 'var(--accent-soft)'],
  warn: ['var(--warn-soft)', 'var(--warn)', 'var(--warn-soft)'],
  ok: ['var(--ok-soft)', 'var(--ok)', 'var(--ok-soft)'],
};

export function ChipMark({ tone = 'accent' }) {
  const f = boxFaces(BOX);
  const [top, left, right] = TONES[tone] ?? TONES.accent;
  return (
    <svg className="chip-mark" viewBox="-60 -27 120 96" fill="none" aria-hidden="true">
      <g stroke="var(--ink)" strokeWidth="1.4" strokeLinejoin="miter">
        <polygon points={f.top} fill={top} />
        <polygon points={f.right} fill={right} />
        <polygon points={f.left} fill={left} />
      </g>
    </svg>
  );
}

export default ChipMark;
