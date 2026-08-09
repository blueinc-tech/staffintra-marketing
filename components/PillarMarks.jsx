/* Marks for the pillar section.

   TabMark is a pair of isometric blocks, drawn on the same 0.577 axis ratio as
   the hero kiosk so the two illustrations belong to one drawing system. The
   lower block is drawn last because in isometric the nearer solid occludes.
   Colour comes from currentColor, so each tab tints its own mark. */

function Cube({ x, y, s = 5, d = 4 }) {
  const w = s * 0.577; // 30° axis, same as the hero illustration
  const top = `${x},${y} ${x + s},${y + w} ${x},${y + w * 2} ${x - s},${y + w}`;
  const left = `${x - s},${y + w} ${x},${y + w * 2} ${x},${y + w * 2 + d} ${x - s},${y + w + d}`;
  const right = `${x + s},${y + w} ${x},${y + w * 2} ${x},${y + w * 2 + d} ${x + s},${y + w + d}`;
  return (
    <g stroke="currentColor" strokeWidth="0.9" strokeLinejoin="miter">
      <polygon points={top} fill="#fff" />
      <polygon points={left} fill="currentColor" fillOpacity=".92" />
      <polygon points={right} fill="currentColor" fillOpacity=".5" />
    </g>
  );
}

export function TabMark() {
  return (
    <svg className="pt-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <Cube x={9} y={3.5} />
      <Cube x={15} y={10.5} />
    </svg>
  );
}

/* The eyebrow chip glyph. Three shapes so the pillars stay distinguishable
   without relying on colour alone. */
const GLYPHS = {
  a: <rect x="3.5" y="3.5" width="7" height="7" fill="currentColor" />,
  b: <polygon points="7,2.6 11.4,7 7,11.4 2.6,7" fill="currentColor" />,
  c: <polygon points="7,2.8 11.5,10.6 2.5,10.6" fill="currentColor" />,
};

export function EyebrowGlyph({ tone }) {
  return (
    <svg className="pe-glyph" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {GLYPHS[tone] ?? GLYPHS.a}
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
