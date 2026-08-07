// Isometric line-art for the hero's ground plane, sitting behind the copy.
// Parallel slabs converging along a dashed path — the Weave's idea (many
// strands resolving into one) rendered as architecture, without drawing the
// mark itself, which the brand guidelines forbid recolouring or rebuilding.

export default function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 520 300" role="presentation">
        {/* ground path */}
        <path
          d="M10 250 L510 118"
          stroke="#17171C"
          strokeWidth="1.5"
          strokeDasharray="7 9"
          strokeLinecap="butt"
          fill="none"
          opacity=".35"
        />
        <path
          d="M10 276 L510 144"
          stroke="#17171C"
          strokeWidth="1.5"
          strokeDasharray="7 9"
          strokeLinecap="butt"
          fill="none"
          opacity=".2"
        />

        <g fill="none" stroke="#17171C" strokeWidth="2" strokeLinejoin="miter" strokeLinecap="butt">
          {/* slab one — lowest, filled soft */}
          <path d="M96 214 L168 172 L240 214 L168 256 Z" fill="#ECE8FB" />
          <path d="M96 214 L96 236 L168 278 L168 256 Z" fill="#D9D2F5" />
          <path d="M240 214 L240 236 L168 278 L168 256 Z" fill="#C9BFF0" />

          {/* slab two — middle, brand purple face */}
          <path d="M186 166 L258 124 L330 166 L258 208 Z" fill="#4024C0" stroke="#341DA0" />
          <path d="M186 166 L186 188 L258 230 L258 208 Z" fill="#341DA0" stroke="#341DA0" />
          <path d="M330 166 L330 188 L258 230 L258 208 Z" fill="#2A1780" stroke="#341DA0" />

          {/* slab three — highest, outline only */}
          <path d="M276 118 L348 76 L420 118 L348 160 Z" fill="#FFFFFF" />
          <path d="M276 118 L276 140 L348 182 L348 160 Z" fill="#F1EDFB" />
          <path d="M420 118 L420 140 L348 182 L348 160 Z" fill="#E4DDF7" />

          {/* converging strands across the top face of each slab */}
          <g strokeWidth="1.6" opacity=".55">
            <path d="M132 214 L168 193" />
            <path d="M150 224 L186 203" />
            <path d="M168 235 L204 214" />
          </g>
          <g strokeWidth="1.6" stroke="#FFFFFF" opacity=".7">
            <path d="M222 166 L258 145" />
            <path d="M240 176 L276 155" />
            <path d="M258 187 L294 166" />
          </g>
          <g strokeWidth="1.6" opacity=".45">
            <path d="M312 118 L348 97" />
            <path d="M330 128 L366 107" />
            <path d="M348 139 L384 118" />
          </g>
        </g>
      </svg>
    </div>
  );
}
