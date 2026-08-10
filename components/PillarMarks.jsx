import { ELBOW, BARS, STROKE } from './weave';

/* Marks for the pillar section, built from the Weave rather than from
   isometric blocks. Each pillar gets the same elbow at a different quarter
   turn, so the three read as one family that has been rotated rather than
   three unrelated icons. Colour comes from currentColor, so each tab tints
   its own mark. */

const SPIN = { a: 0, b: 90, c: 270 };

export function TabMark({ tone = 'a' }) {
  return (
    <svg className="pt-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g transform={`rotate(${SPIN[tone] ?? 0} 12 12)`} {...STROKE}>
        {ELBOW.map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  );
}

/* The eyebrow chip. Same motif at chip scale: two pillars turn, one runs
   straight, so they stay tellable apart without relying on colour. */
export function EyebrowGlyph({ tone }) {
  const straight = tone === 'b';
  return (
    <svg className="pe-glyph" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g transform={`rotate(${SPIN[tone] ?? 0} 12 12)`} {...STROKE} strokeWidth="3.8">
        {(straight ? BARS : ELBOW).map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  );
}

/* The down-then-right arrow the reference uses on its "Learn more" links. */
export function TurnArrow() {
  return (
    <svg className="pl-turn" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.2 1.4v5.4h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
      <path d="M6.9 4.3 9.5 6.8 6.9 9.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="square" />
    </svg>
  );
}

export function StoryArrow() {
  return (
    <svg className="ps-arrow" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M2.9 8.1 8.1 2.9" stroke="currentColor" strokeWidth="0.9" strokeLinecap="square" />
      <path d="M3.78 2.75H8.25v4.47" stroke="currentColor" strokeWidth="0.825" strokeLinecap="square" />
    </svg>
  );
}
