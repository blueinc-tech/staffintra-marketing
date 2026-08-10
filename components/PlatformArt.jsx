import { boxFaces, p } from './iso';

/* The drawing behind the platform panel: three thin plates, offset and stacked,
   with dashed guide lines running out along the isometric axes.

   Outline only and very faint, because it sits under live copy — the reference
   does the same with its line drawing. The plates are the argument: separate
   records, held in register, one above the other. */

/* Staggered along both plan axes as well as in height. Concentric plates read
   as one nested tray; offset ones read as a stack. Faces are filled rather
   than open, so a nearer plate hides the one behind it — three transparent
   plates on top of each other is just a mesh of lines. */
const PLATES = [
  { x0: 0, x1: 4.6, y0: 0, y1: 3.0, z0: 0, z1: 0.4 },
  { x0: 1.5, x1: 6.1, y0: 1.0, y1: 4.0, z0: 1.15, z1: 1.55 },
  { x0: 3.0, x1: 7.6, y0: 2.0, y1: 5.0, z0: 2.3, z1: 2.7 },
];

/* Long dashed runs along the +x axis, the device the reference uses to tie a
   drawing to the grid it sits on. */
const GUIDES = [
  [p(-2.4, 0.4, 0), p(9.6, 0.4, 0)],
  [p(-2.4, 2.6, 0), p(9.6, 2.6, 0)],
  [p(-2.4, 5.2, 0), p(9.6, 5.2, 0)],
];

export default function PlatformArt() {
  return (
    <svg className="plat-art" viewBox="-134 -32 372 232" fill="none" aria-hidden="true">
      <g className="pa-guide">
        {GUIDES.map(([a, b]) => {
          const [x1, y1] = a.split(',');
          const [x2, y2] = b.split(',');
          return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* Faces are filled here rather than in CSS: the fill is part of the
          drawing, and it is what makes a nearer plate hide the one behind it.
          Three open plates stacked on each other are just a mesh of lines. */}
      {PLATES.map((plate) => {
        const f = boxFaces(plate);
        return (
          <g className="pa-plate" key={plate.z0}>
            <polygon points={f.top} fill="var(--surface)" />
            <polygon points={f.right} fill="var(--surface-2)" />
            <polygon points={f.left} fill="var(--surface)" />
          </g>
        );
      })}
    </svg>
  );
}
