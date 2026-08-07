// Isometric line-art for the hero, sitting beside the copy and behind the
// mockups. Parallel slabs converging along a dashed path — the Weave's idea
// (many strands resolving into one) rendered as architecture, without drawing
// the mark itself, which the brand guidelines forbid recolouring or rebuilding.
//
// Groups are split one-per-concern (slide-in vs idle float) so the entrance and
// the loop compose instead of fighting over one transform.

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 520 300" role="presentation">
        {/* ground path — slides in, then marches forever */}
        <g className="illo-line illo-line--a">
          <path d="M10 250 L510 118" className="illo-dash" opacity=".35" />
        </g>
        <g className="illo-line illo-line--b">
          <path d="M10 276 L510 144" className="illo-dash" opacity=".2" />
        </g>

        <g
          fill="none"
          stroke="#17171C"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        >
          {/* slab one — lowest */}
          <g className="illo-slab" style={{ '--i': 0 }}>
            <g className="illo-float">
              <path d="M96 214 L168 172 L240 214 L168 256 Z" fill="#ECE8FB" />
              <path d="M96 214 L96 236 L168 278 L168 256 Z" fill="#D9D2F5" />
              <path d="M240 214 L240 236 L168 278 L168 256 Z" fill="#C9BFF0" />
              <g strokeWidth="1.6" opacity=".5">
                <path d="M132 214 L168 193" />
                <path d="M150 224 L186 203" />
                <path d="M168 235 L204 214" />
              </g>
            </g>
          </g>

          {/* slab two — middle, brand purple */}
          <g className="illo-slab" style={{ '--i': 1 }}>
            <g className="illo-float illo-float--b">
              <path d="M186 166 L258 124 L330 166 L258 208 Z" fill="#4024C0" stroke="#341DA0" />
              <path d="M186 166 L186 188 L258 230 L258 208 Z" fill="#341DA0" stroke="#341DA0" />
              <path d="M330 166 L330 188 L258 230 L258 208 Z" fill="#2A1780" stroke="#341DA0" />
              <g strokeWidth="1.6" stroke="#FFFFFF" opacity=".7">
                <path d="M222 166 L258 145" />
                <path d="M240 176 L276 155" />
                <path d="M258 187 L294 166" />
              </g>
            </g>
          </g>

          {/* slab three — highest */}
          <g className="illo-slab" style={{ '--i': 2 }}>
            <g className="illo-float illo-float--c">
              <path d="M276 118 L348 76 L420 118 L348 160 Z" fill="#FFFFFF" />
              <path d="M276 118 L276 140 L348 182 L348 160 Z" fill="#F1EDFB" />
              <path d="M420 118 L420 140 L348 182 L348 160 Z" fill="#E4DDF7" />
              <g strokeWidth="1.6" opacity=".45">
                <path d="M312 118 L348 97" />
                <path d="M330 128 L366 107" />
                <path d="M348 139 L384 118" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
