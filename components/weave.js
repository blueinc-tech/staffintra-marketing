/* The Weave, reduced to paths.

   The logo is three parallel round-capped strokes that turn through ninety
   degrees, drawn twice and rotated a half turn so the two groups interlock.
   That is the whole vocabulary, and it is what every mark on this site is
   built from now — the isometric blocks that used to do this job are the
   reference's device, not ours.

   Geometry, in a 24 box: the three strokes share one turn centre, so their
   radii step by the same pitch as their spacing. Corner k sits at
   (2.6 + 5.6k, 21.4 - 5.6k) with radius 14 - 5.6k, which keeps all three
   inside the box and makes the curves nest the way the logo's do. */

export const PITCH = 5.6;

/* One elbow: in from the top edge, out through the right. */
export const ELBOW = [
  'M2.6 2V7.4Q2.6 21.4 16.6 21.4H21.4',
  'M8.2 2V7.4Q8.2 15.8 16.6 15.8H21.4',
  'M13.8 2V7.4Q13.8 10.2 16.6 10.2H21.4',
];

/* Three straight parallels, for where a turn would be too busy. */
export const BARS = ['M4.4 3.4V20.6', 'M12 2V22', 'M19.6 3.4V20.6'];

/* The interlock: the elbow and its half-turn, which is the mark itself. */
export const WEAVE = [...ELBOW, ...ELBOW.map(() => null)].filter(Boolean);

/* Shared stroke treatment. Round caps and joins are not a style choice here:
   the logo's strokes are capsules, and square ends read as a different mark. */
export const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/* Quarter-turn steps, so a set of marks can differ by orientation alone and
   still obviously belong to each other. */
export const SPINS = [0, 90, 180, 270];
