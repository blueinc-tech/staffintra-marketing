/* Shared isometric projection.

   One camera for every drawing on the site, so the hero kiosk, the closing
   banner's beams, and the platform panel's plates all sit in the same world:
   a 30° axis pair, dy/dx = tan 30° = 0.577.

     A  half the width of a plan cell
     B  half its height, A * tan(30°)
     C  one unit of height, equal to the projected length of the plan axes,
        so a 1×1×1 block reads as a true cube */

export const A = 40;
export const B = 23.094;
export const C = 46.188;

export const p = (x, y, z) =>
  `${((x - y) * A).toFixed(2)},${((x + y) * B - z * C).toFixed(2)}`;

/* The three faces a box turns toward this camera: the top, the +x face on the
   lower right, and the +y face on the lower left. The other three are behind
   it and are never drawn. */
export function boxFaces({ x0, x1, y0, y1, z0, z1 }) {
  return {
    top: `${p(x0, y0, z1)} ${p(x1, y0, z1)} ${p(x1, y1, z1)} ${p(x0, y1, z1)}`,
    right: `${p(x1, y0, z1)} ${p(x1, y1, z1)} ${p(x1, y1, z0)} ${p(x1, y0, z0)}`,
    left: `${p(x0, y1, z1)} ${p(x1, y1, z1)} ${p(x1, y1, z0)} ${p(x0, y1, z0)}`,
  };
}
