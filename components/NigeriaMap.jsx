/* Nigeria, shaded the way the reference shades the United States: one outline
   filled with cells at varying weight, so the country reads as coverage
   rather than as a plain silhouette.

   The border is a STYLISED trace, not survey data. It is built from about
   fifty lon/lat waypoints, enough to carry the shape everyone recognises —
   the Lake Chad notch at the north east, the delta pushing south, the narrow
   south east down to Calabar — but it is a diagram and should never be read
   as a boundary reference.

   Cell weights come from the cell's own coordinates, not from a random
   number: this renders on the server, and anything random would paint a
   different map on rehydration. */

const LON0 = 2.6;
const LAT0 = 14.0;
const K = 24;

const px = (lon, lat) => [(lon - LON0) * K, (LAT0 - lat) * K];

// Clockwise from the north west corner.
const BORDER = [
  [4.1, 13.5], [4.6, 13.7], [5.5, 13.9], [6.4, 13.6], [7.3, 13.4], [8.4, 13.2],
  [9.5, 13.0], [10.6, 13.2], [11.8, 13.3], [12.7, 13.4], [13.3, 13.7],
  [14.0, 13.3], [14.6, 12.8], [14.2, 12.3], [13.7, 12.0], [13.6, 11.4],
  [13.2, 10.6], [12.9, 9.9], [13.1, 9.3], [12.6, 8.6], [12.0, 7.8],
  [11.4, 7.0], [10.8, 6.8], [10.2, 7.0], [9.6, 6.5], [9.1, 6.3], [8.9, 5.8],
  [8.9, 5.0], [8.4, 4.6], [7.9, 4.5], [7.3, 4.4], [6.8, 4.3], [6.3, 4.3],
  [5.9, 4.6], [5.6, 5.3], [5.2, 5.5], [4.8, 5.9], [4.3, 6.2], [3.6, 6.3],
  [2.9, 6.4], [2.75, 6.9], [2.7, 7.6], [2.8, 8.4], [3.1, 9.0], [3.6, 9.5],
  [3.7, 10.3], [3.6, 11.1], [3.8, 11.9], [4.0, 12.6],
];

const OUTLINE = BORDER.map(([lon, lat]) => px(lon, lat).map((n) => n.toFixed(1)).join(',')).join(' ');

const W = (14.8 - LON0) * K;
const H = (LAT0 - 4.0) * K;
const STEP = 13;
const GAP = 1.6;

const CELLS = [];
for (let y = 0; y < H; y += STEP) {
  for (let x = 0; x < W; x += STEP) {
    const w = (Math.floor(x / STEP) * 7 + Math.floor(y / STEP) * 13) % 5;
    CELLS.push({ x, y, o: 0.16 + w * 0.16 });
  }
}

/* A few markers, placed on real cities so the diagram has anchors. */
const PINS = [
  [3.38, 6.52],  // Lagos
  [7.49, 9.06],  // Abuja
  [8.52, 11.99], // Kano
  [7.05, 4.85],  // Port Harcourt approach
  [12.0, 11.85], // Maiduguri
];

export default function NigeriaMap() {
  return (
    <svg
      className="ng-map"
      viewBox={`-6 -6 ${W + 12} ${H + 12}`}
      fill="none"
      role="img"
      aria-label="Coverage across Nigeria, shown as a shaded diagram of the country"
    >
      <defs>
        <clipPath id="ng-clip">
          <polygon points={OUTLINE} />
        </clipPath>
      </defs>

      <g clipPath="url(#ng-clip)">
        <rect x="0" y="0" width={W} height={H} fill="var(--accent)" fillOpacity=".1" />
        {CELLS.map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x + GAP / 2}
            y={c.y + GAP / 2}
            width={STEP - GAP}
            height={STEP - GAP}
            fill="var(--accent)"
            fillOpacity={c.o}
          />
        ))}
      </g>

      <polygon
        className="ng-edge"
        points={OUTLINE}
        fill="none"
        stroke="var(--accent-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {PINS.map(([lon, lat]) => {
        const [x, y] = px(lon, lat);
        return <circle key={`${lon}-${lat}`} cx={x} cy={y} r="3.4" fill="var(--accent-ink)" />;
      })}
    </svg>
  );
}
