import { boxFaces } from './iso';

/* Line drawing inside the story panel's cut shape.

   The reference masks a customer photograph in here. We have none, and an
   empty colour block is not a design, so the cut carries a drawing instead:
   three isometric columns of different heights, which is a week read as a
   chart. Outline only, in the panel's own ink. */

const COLUMNS = [
  { x0: 0, x1: 1.6, y0: 0, y1: 1.6, z0: 0, z1: 1.0 },
  { x0: 2.1, x1: 3.7, y0: 0, y1: 1.6, z0: 0, z1: 1.6 },
  { x0: 4.2, x1: 5.8, y0: 0, y1: 1.6, z0: 0, z1: 0.7 },
];

export default function StoryArt() {
  return (
    <svg className="story-art" viewBox="-76 -58 316 240" fill="none" aria-hidden="true">
      {COLUMNS.map((box) => {
        const f = boxFaces(box);
        /* Faces take the panel's own colour, set as `color` on the cut, so a
           nearer column hides the one behind it. Open outlines here read as a
           wireframe tangle, the same trap the platform plates fell into. */
        return (
          <g key={box.x0}>
            <polygon points={f.top} fill="currentColor" />
            <polygon points={f.right} fill="currentColor" />
            <polygon points={f.left} fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}
