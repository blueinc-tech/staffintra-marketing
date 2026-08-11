/* Shift handover, to the concept as written: a loaded trolley rolls along a
   dashed isometric path from a clock-in terminal to a handover counter, where
   a tray has been set down and a mug is waiting. No people — the wheeled
   thing travelling a dashed path carrying something IS the subject.

   Same drawing system as the hero kiosk so the pair read as one hand:
   isometric at dy/dx = 0.577, butt caps, mitred joins, 2px ink outlines,
   white and accent-soft fills, Brand Purple on the faces that matter.

   The three objects sit exactly on the path rather than near it: each one's
   ground contact is solved from the line, so nothing floats. */

const K = 0.5774; // dy per dx on the isometric axis

/* Path: start, end, and a point at parameter t along it. */
const P0 = [25, 258];
const P1 = [405, 39];
const at = (t) => [P0[0] + (P1[0] - P0[0]) * t, P0[1] + (P1[1] - P0[1]) * t];

const TERMINAL = at(0.16);
const TROLLEY = at(0.52);
const COUNTER = at(0.87);

/* An isometric box given its TOP face centre. Side faces first, top last, so
   the lid always closes over them. */
function Box({ cx, cy, w, h, top = '#FFFFFF', left = '#FFFFFF', right = '#ECE8FB', sw = 2 }) {
  const d = w * K;
  return (
    <g stroke="#17171C" strokeWidth={sw}>
      <polygon points={`${cx - w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx - w},${cy + h}`} fill={left} />
      <polygon points={`${cx + w},${cy} ${cx},${cy + d} ${cx},${cy + d + h} ${cx + w},${cy + h}`} fill={right} />
      <polygon points={`${cx},${cy - d} ${cx + w},${cy} ${cx},${cy + d} ${cx - w},${cy}`} fill={top} />
    </g>
  );
}

export default function PlatformArt() {
  const [tx, ty] = TERMINAL;
  const [rx, ry] = TROLLEY;
  const [cx, cy] = COUNTER;

  return (
    <svg className="plat-art" viewBox="0 0 460 290" fill="none" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden="true">
      {/* the route, drawn first so everything rides on top of it */}
      <path
        className="plat-march"
        d={`M${P0[0]} ${P0[1]}L${P1[0]} ${P1[1]}`}
        stroke="#4024C0"
        strokeWidth="2.4"
        strokeDasharray="2 6"
      />

      {/* --- clock-in terminal --- */}
      <Box cx={tx} cy={ty - 10} w={30} h={10} right="#ECE8FB" />
      <Box cx={tx} cy={ty - 18} w={19} h={8} right="#ECE8FB" />
      <Box cx={tx} cy={ty - 51} w={5} h={33} right="#ECE8FB" />
      <polygon
        points={`${tx - 14},${ty - 61} ${tx + 12},${ty - 46} ${tx + 12},${ty - 76} ${tx - 14},${ty - 91}`}
        fill="#4024C0"
        stroke="#341DA0"
        strokeWidth="2"
      />
      <line x1={tx - 9} y1={ty - 67} x2={tx + 7} y2={ty - 58} stroke="#FFFFFF" strokeWidth="2" />
      <line x1={tx - 9} y1={ty - 73} x2={tx + 7} y2={ty - 64} stroke="#FFFFFF" strokeWidth="2" />
      <line x1={tx - 9} y1={ty - 79} x2={tx + 7} y2={ty - 70} stroke="#FFFFFF" strokeWidth="2" />

      {/* --- trolley --- */}
      {/* motion, behind it, along the axis it travels */}
      <g stroke="#4024C0" strokeWidth="2.2" strokeLinecap="round">
        <line x1={rx - 53} y1={ry + 2} x2={rx - 35} y2={ry - 8} />
        <line x1={rx - 57} y1={ry + 11} x2={rx - 39} y2={ry + 1} />
        <line x1={rx - 53} y1={ry + 20} x2={rx - 35} y2={ry + 10} />
      </g>
      {/* handle, up from the back corner */}
      <path
        d={`M${rx - 27} ${ry - 40}L${rx - 31} ${ry - 72}Q${rx - 31} ${ry - 80} ${rx - 21} ${ry - 80}`}
        stroke="#17171C"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* wheels */}
      <circle cx={rx - 19} cy={ry - 6} r="6.5" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      <circle cx={rx + 19} cy={ry - 6} r="6.5" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      {/* body: brand purple on the face turned to the viewer */}
      <Box cx={rx} cy={ry - 40} w={32} h={26} left="#4024C0" right="#ECE8FB" />
      <line x1={rx - 27} y1={ry - 27} x2={rx - 5} y2={ry - 14} stroke="#FFFFFF" strokeWidth="1.8" />
      <line x1={rx - 27} y1={ry - 20} x2={rx - 5} y2={ry - 7} stroke="#FFFFFF" strokeWidth="1.8" />
      {/* the load: three trays stacked */}
      <Box cx={rx} cy={ry - 46} w={27} h={6} right="#ECE8FB" />
      <Box cx={rx} cy={ry - 52} w={27} h={6} right="#ECE8FB" />
      <Box cx={rx} cy={ry - 58} w={27} h={6} right="#ECE8FB" />

      {/* --- handover counter --- */}
      <Box cx={cx} cy={cy - 26} w={42} h={26} right="#ECE8FB" />
      {/* the tray already set down */}
      <Box cx={cx - 14} cy={cy - 31} w={16} h={5} top="#ECE8FB" left="#DDD5F5" right="#DDD5F5" sw={1.6} />
      {/* and the mug waiting */}
      <path d={`M${cx + 11} ${cy - 34}v8a7 4 0 0 0 14 0v-8`} fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      <path d={`M${cx + 25} ${cy - 32}q6 3 0 6`} stroke="#17171C" strokeWidth="2" />
      <ellipse cx={cx + 18} cy={cy - 34} rx="7" ry="4" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
    </svg>
  );
}
