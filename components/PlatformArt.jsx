/* Shift handover, the companion to the hero's clock-in kiosk.
   One worker holds the tablet out across the desk, the other reaches for it,
   and a dashed line marches along the path between their hands with the
   tablet riding its apex.

   Same drawing system as HeroArt so the pair read as one hand: isometric at
   dy/dx = 0.577, butt caps, mitred joins, 2px ink outlines, white and
   accent-soft fills, Brand Purple for the thing being passed. The figures are
   built exactly as the kiosk's are — shadow diamond, six-point torso, two
   round-capped legs, circle head — so they are recognisably the same people.

   This replaces three stacked isometric plates. Plates are abstract solids on
   a 30-degree axis, which is the reference's device; a scene is not.

   The first version failed three ways, all fixed here: the desk was a block
   tall enough to dominate the frame, the arms were single straight lines that
   read as poles, and neither hand reached the tablet, so nothing was actually
   being handed over. Arms now bend at an elbow and terminate exactly on the
   arc's endpoints. */

const ARC = { from: [200, 152], to: [320, 152], ctl: [260, 116] };
/* Apex of the quadratic at t=0.5, which is where the tablet sits. */
const APEX = [
  0.25 * ARC.from[0] + 0.5 * ARC.ctl[0] + 0.25 * ARC.to[0],
  0.25 * ARC.from[1] + 0.5 * ARC.ctl[1] + 0.25 * ARC.to[1],
];

function Worker({ x, feet, tone, elbow, hand }) {
  return (
    <g>
      <polygon
        points={`${x},${feet - 16.8} ${x + 29.1},${feet} ${x},${feet + 16.8} ${x - 29.1},${feet}`}
        fill="#ECE8FB"
      />
      <polygon
        points={`${x - 10.5},${feet - 29} ${x - 11.5},${feet - 51} ${x - 7},${feet - 62} ${x + 7},${feet - 62} ${x + 11.5},${feet - 51} ${x + 10.5},${feet - 29}`}
        fill={tone}
        stroke="#17171C"
        strokeWidth="2"
      />
      <line x1={x - 6.4} y1={feet - 29} x2={x - 7.4} y2={feet} stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
      <line x1={x + 6.6} y1={feet - 29} x2={x + 7.6} y2={feet} stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
      <circle cx={x} cy={feet - 72} r="9.5" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      {/* Shoulder, elbow, hand. The hand lands on the arc's end, so the reach
          and the path are the same gesture rather than two near-misses. */}
      <polyline
        points={`${x + (hand[0] > x ? 10 : -10)},${feet - 58} ${elbow[0]},${elbow[1]} ${hand[0]},${hand[1]}`}
        stroke="#17171C"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export default function PlatformArt() {
  return (
    <svg className="plat-art" viewBox="0 0 520 300" fill="none" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden="true">
      <polygon points="260,60 460,175 260,290 60,175" fill="#FFFFFF" stroke="#D9D9DF" strokeWidth="2" />
      <line x1="210" y1="88.75" x2="410" y2="203.75" stroke="#D9D9DF" strokeWidth="1.2" />
      <line x1="160" y1="117.5" x2="360" y2="232.5" stroke="#D9D9DF" strokeWidth="1.2" />
      <line x1="110" y1="146.25" x2="310" y2="261.25" stroke="#D9D9DF" strokeWidth="1.2" />

      {/* A desk, not a plinth: low enough that the people carry the frame. */}
      <polygon points="205,171.7 260,203.4 260,222 205,190.3" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      <polygon points="315,171.7 260,203.4 260,222 315,190.3" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
      <polygon points="260,140 315,171.7 260,203.4 205,171.7" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
      {/* the shift sheet lying on it */}
      <polygon points="243,166 262,177 279,167.2 260,156.2" fill="#FFFFFF" stroke="#17171C" strokeWidth="1.6" />
      <line x1="251" y1="166.5" x2="264" y2="174" stroke="#D9D9DF" strokeWidth="1.4" />
      <line x1="256" y1="163.6" x2="269" y2="171.1" stroke="#D9D9DF" strokeWidth="1.4" />

      <Worker x={150} feet={200} tone="#ECE8FB" elbow={[176, 150]} hand={ARC.from} />
      <Worker x={370} feet={200} tone="#FFFFFF" elbow={[344, 150]} hand={ARC.to} />

      <path
        className="plat-march"
        d={`M${ARC.from[0]} ${ARC.from[1]}Q${ARC.ctl[0]} ${ARC.ctl[1]} ${ARC.to[0]} ${ARC.to[1]}`}
        stroke="#4024C0"
        strokeWidth="2.4"
        strokeDasharray="2 6"
      />

      {/* the tablet, riding the apex of the path it travels */}
      <polygon
        points={`${APEX[0] - 9},${APEX[1] + 7} ${APEX[0] + 9},${APEX[1] + 17.4} ${APEX[0] + 9},${APEX[1] - 7} ${APEX[0] - 9},${APEX[1] - 17.4}`}
        fill="#4024C0"
        stroke="#341DA0"
        strokeWidth="1.8"
      />
      <line x1={APEX[0] - 4.5} y1={APEX[1] + 0.4} x2={APEX[0] + 3} y2={APEX[1] + 4.7} stroke="#FFFFFF" strokeWidth="1.8" />
      <line x1={APEX[0] - 4.5} y1={APEX[1] - 5.6} x2={APEX[0] + 3} y2={APEX[1] - 1.3} stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}
