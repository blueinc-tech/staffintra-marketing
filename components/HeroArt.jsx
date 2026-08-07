// Hero illustration: an isometric clock-in kiosk. A dashed shift-path runs from
// a doorway across a tiled floor to a wall terminal, with one worker already
// through the door and another arriving phone in hand.
//
// Coordinates are exactly as drawn and geometry-checked — nothing has moved.
// The drawing is only *grouped*: by build stage (--s), so it assembles from the
// floor upward rather than sliding in whole, and by moving part, so screens,
// arms, heads and the confirmation card keep their own loops afterwards.

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 520 340" fill="none" strokeLinecap="butt" strokeLinejoin="miter">
        {/* 1 — the ground goes down first */}
        <g className="illo-b" style={{ '--s': 0 }}>
          <polygon points="258,86 465.8,206 258,326 50.2,206" fill="#FFFFFF" stroke="#D9D9DF" strokeWidth="2" />
          <line x1="226.8" y1="104" x2="434.7" y2="224" stroke="#D9D9DF" strokeWidth="1.2" />
          <line x1="195.7" y1="122" x2="403.5" y2="242" stroke="#D9D9DF" strokeWidth="1.2" />
          <line x1="164.5" y1="140" x2="372.3" y2="260" stroke="#D9D9DF" strokeWidth="1.2" />
          <line x1="133.3" y1="158" x2="341.1" y2="278" stroke="#D9D9DF" strokeWidth="1.2" />
          <line x1="102.1" y1="176" x2="310" y2="296" stroke="#D9D9DF" strokeWidth="1.2" />
          <line x1="70.9" y1="194" x2="278.8" y2="314" stroke="#D9D9DF" strokeWidth="1.2" />
          <polygon points="220.6,122 226.8,125.6 170.7,158 164.5,154.4" fill="#ECE8FB" stroke="#D9D9DF" strokeWidth="1.5" />
        </g>

        {/* 2 — then the route across it, which keeps marching */}
        <g className="illo-b" style={{ '--s': 1 }}>
          <polyline points="198.8,141.8 105.2,195.8 200.8,251 287.1,201.2 307.9,213.2" stroke="#4024C0" strokeWidth="2.4" strokeDasharray="9 7" className="illo-march" />
        </g>

        {/* 3 — the doorway */}
        <g className="illo-b" style={{ '--s': 2 }}>
          <polygon points="235.1,120.8 235.1,20 162.4,62 162.4,162.8 170.7,158 170.7,69.2 226.8,36.8 226.8,125.6" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <polygon points="156.2,159.2 162.4,162.8 162.4,62 156.2,58.4" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <polygon points="228.9,16.4 235.1,20 162.4,62 156.2,58.4" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
        </g>

        {/* 4 — the terminal, plinth first then the housing */}
        <g className="illo-b" style={{ '--s': 3 }}>
          <polygon points="311,195.8 340.1,212.6 340.1,221 311,204.2" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <polygon points="369.2,195.8 340.1,212.6 340.1,221 369.2,204.2" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <polygon points="340.1,179 369.2,195.8 340.1,212.6 311,195.8" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
          <polygon points="326.6,194 343.2,203.6 343.2,154.4 326.6,144.8" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
          <polygon points="353.6,197.6 343.2,203.6 343.2,154.4 353.6,148.4" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
        </g>
        <g className="illo-b" style={{ '--s': 4 }}>
          <polygon points="312,138.8 353.6,162.8 353.6,129.2 312,105.2" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <polygon points="368.2,154.4 353.6,162.8 353.6,129.2 368.2,120.8" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
          <polygon points="326.6,96.8 368.2,120.8 353.6,129.2 312,105.2" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
        </g>

        {/* 5 — the screen wakes, and its readout keeps cycling */}
        <g className="illo-b" style={{ '--s': 5 }}>
          <polygon points="316.2,136.4 349.5,155.6 349.5,131.6 316.2,112.4" fill="#4024C0" stroke="#341DA0" strokeWidth="2" />
          <g className="illo-scan">
            <line x1="320.4" y1="136.4" x2="328.7" y2="119.6" stroke="#FFFFFF" strokeWidth="2.6" />
            <line x1="328.7" y1="141.2" x2="337" y2="124.4" stroke="#FFFFFF" strokeWidth="2.6" />
            <line x1="337" y1="146" x2="345.3" y2="129.2" stroke="#FFFFFF" strokeWidth="2.6" />
          </g>
          <polygon className="illo-pulse" points="320.4,142.4 345.3,156.8 345.3,154.4 320.4,140" fill="#4024C0" />
        </g>

        {/* 6 — the staff arrive, and keep moving */}
        <g className="illo-b" style={{ '--s': 6 }}>
          <polygon points="189.4,135.2 218.5,152 189.4,168.8 160.3,152" fill="#ECE8FB" />
          <polygon points="178.9,123 177.9,101 182.4,90 196.4,90 200.9,101 199.9,123" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
          <line x1="183" y1="123" x2="182" y2="152" stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
          <line x1="196" y1="123" x2="197" y2="152" stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
          <polyline className="illo-wave" points="199.5,97 203,109 200.5,120" stroke="#17171C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle className="illo-bob" cx="189.4" cy="80" r="9.5" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
        </g>

        <g className="illo-b" style={{ '--s': 7 }}>
          <polygon points="268.4,195.2 297.5,212 268.4,228.8 239.3,212" fill="#ECE8FB" />
          <polygon points="257.9,183 256.9,161 261.4,150 275.4,150 279.9,161 278.9,183" fill="#ECE8FB" stroke="#17171C" strokeWidth="2" />
          <line x1="262" y1="183" x2="261" y2="212" stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
          <line x1="275" y1="183" x2="276" y2="212" stroke="#17171C" strokeWidth="3" strokeLinecap="round" />
          <g className="illo-lift">
            <polyline points="277,154 285,160 289,149" stroke="#17171C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="284,146 295.3,152.5 295.3,133.5 284,127" fill="#4024C0" stroke="#341DA0" strokeWidth="1.6" />
            <g className="illo-scan illo-scan--fast">
              <line x1="286.5" y1="143" x2="290" y2="136" stroke="#FFFFFF" strokeWidth="1.8" />
              <line x1="290" y1="144.8" x2="293.5" y2="137.8" stroke="#FFFFFF" strokeWidth="1.8" />
            </g>
          </g>
          <circle className="illo-bob illo-bob--b" cx="268.4" cy="140" r="9.5" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
        </g>

        {/* 7 — the confirmation, last, and it keeps floating */}
        <g className="illo-b" style={{ '--s': 8 }}>
          <line className="illo-march-b" x1="325.6" y1="85.4" x2="325.6" y2="104.6" stroke="#4024C0" strokeWidth="2" strokeDasharray="4 4" />
          <g className="illo-hover">
            <polygon points="296.5,68.6 354.6,102.2 354.6,68.6 296.5,35" fill="#FFFFFF" stroke="#17171C" strokeWidth="2" />
            <polyline className="illo-tick" points="306.8,60.2 314.1,72.8 329.7,63.8" stroke="#4024C0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="336" y1="74.6" x2="350.5" y2="83" stroke="#D9D9DF" strokeWidth="3" />
            <line x1="336" y1="83" x2="346.3" y2="89" stroke="#D9D9DF" strokeWidth="3" />
          </g>
        </g>
      </svg>
    </div>
  );
}
