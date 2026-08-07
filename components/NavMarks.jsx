// Geometric line marks derived from the Weave: parallel strokes at the mark's
// 45° angle, square-cut ends, no curves and no rounded joins. One family, so a
// menu full of them reads as a system rather than a pile of icons.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
};

// Three parallel strokes — the plain Weave rhythm.
export const MarkStripes = () => (
  <svg {...base}>
    <path d="M4 16.5 10.5 4M9.5 16.5 16 4M15 16.5 21.5 4" />
  </svg>
);

// Parallel strokes stepped out of phase — a rota's staggered shifts.
export const MarkStagger = () => (
  <svg {...base}>
    <path d="M3.5 13 10 3M9 20.5 15.5 10.5M14.5 13 21 3" />
  </svg>
);

// Strokes converging to a point — many things becoming one.
export const MarkConverge = () => (
  <svg {...base}>
    <path d="M3 4.5 12 13.5 21 4.5M7 12 12 17M17 12 12 17" />
  </svg>
);

// Stacked angles — a sequence of steps.
export const MarkSteps = () => (
  <svg {...base}>
    <path d="M3 9.5 8.5 4 14 9.5M3 19.5 8.5 14 14 19.5M17.5 4v16" />
  </svg>
);

// Crossed strokes — two things meeting.
export const MarkCross = () => (
  <svg {...base}>
    <path d="M4 4.5 20 19.5M20 4.5 4 19.5" />
  </svg>
);

// A stroke interrupted — a gap, a break, an exception.
export const MarkBreak = () => (
  <svg {...base}>
    <path d="M4 19.5 10 9M14 15 20 4.5M4 9h6M14 15h6" />
  </svg>
);

// Enclosed strokes — something held inside a boundary.
export const MarkEnclose = () => (
  <svg {...base}>
    <path d="M3.5 4.5h17v15h-17zM8 15.5 13 8.5M13 15.5 18 8.5" />
  </svg>
);

// A single rule with parallel ticks — a record, a line of entries.
export const MarkLedger = () => (
  <svg {...base}>
    <path d="M3.5 5.5h17M3.5 12h17M3.5 18.5h11M6 3v5M13 9.5v5M19 16v5" />
  </svg>
);

// Nested angles pointing forward — progress through stages.
export const MarkAdvance = () => (
  <svg {...base}>
    <path d="M4 4.5 11.5 12 4 19.5M12.5 4.5 20 12l-7.5 7.5" />
  </svg>
);

// A frame with a diagonal — a plan, a document.
export const MarkPlan = () => (
  <svg {...base}>
    <path d="M4 3.5h16v17H4zM4 8.5h16M8.5 8.5v12M12 13h5M12 16.5h5" />
  </svg>
);

// Diverging strokes — one thing branching out.
export const MarkBranch = () => (
  <svg {...base}>
    <path d="M4 12h6M10 12 17 5M10 12l7 7M17 3v4h4M17 21v-4h4" />
  </svg>
);

// Layered planes — several sites, one view.
export const MarkLayers = () => (
  <svg {...base}>
    <path d="M12 3 21 8l-9 5-9-5zM3 13.5l9 5 9-5" />
  </svg>
);
