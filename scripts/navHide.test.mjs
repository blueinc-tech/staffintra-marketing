import { decide, armPoint, ARM_FLOOR } from '../components/motion/navHide.js';

// The home hero measures 666px; that is the arm point the browser reports.
const ARM = 666;

const run = (seq, busyAt = []) => {
  let s = { hidden: false, last: 0 };
  seq.forEach((y, i) => {
    s = decide({ y, last: s.last, hidden: s.hidden, busy: busyAt.includes(i), armAt: ARM });
  });
  return s.hidden;
};

const T = [
  // The reported bug: down the page, then drift back to the top in shrinking
  // steps so the final movements fall under the noise floor.
  ['back to top with tiny final steps', [0, 400, 900, 600, 300, 120, 40, 12, 6, 3, 0], false],
  ['back to top in one jump',           [0, 900, 0], false],
  ['still at the very top',             [0, 3, 1, 0], false],
  ['scrolling inside the hero',         [0, 120, 300, 500, 640], false],
  ['scrolling down past the hero',      [0, 300, 700, 1200], true],
  ['down then a real scroll up',        [0, 900, 1200, 700, 300], false],
  ['jitter mid-page keeps it hidden',   [0, 900, 1200, 1203, 1201, 1204], true],
  ['back inside the hero',              [0, 1400, 640], false],
  ['just past the hero, going up',      [0, 1400, 900], false],
];

let bad = 0;
for (const [name, seq, want] of T) {
  const got = run(seq);
  const ok = got === want;
  if (!ok) bad++;
  console.log(`  ${ok ? 'pass' : 'FAIL'}  ${name.padEnd(36)} hidden=${got} want=${want}`);
}

// A menu open must always show, at any depth.
const menuOpen = run([0, 900, 1400], [2]);
console.log(`  ${menuOpen === false ? 'pass' : 'FAIL'}  ${'menu open holds it visible'.padEnd(36)} hidden=${menuOpen} want=false`);
if (menuOpen !== false) bad++;

console.log(bad ? `\n  ${bad} FAILING` : '\n  all pass');
process.exit(bad ? 1 : 0);
