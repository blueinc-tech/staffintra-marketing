import Globe from './Globe';
import Reveal from './motion/Reveal';
import { TurnArrow } from './PillarMarks';
import './Coverage.css';

/* Coverage. Replaces the flat Nigeria map that used to sit in the support
   section with the real globe, and says something the map could not.

   Every claim here is checkable in the product: a clock event stores the
   place it happened and an IANA timezone, a conversation shows the other
   person's local time, and a geofence belongs to a site. That is what makes
   this globe honest rather than decorative: the product genuinely thinks in
   places and timezones, not just in hours. */

const FACTS = [
  { k: 'On every clock event', v: 'Place and IANA timezone' },
  { k: 'On every conversation', v: 'That person’s local time' },
  { k: 'On every site', v: 'Its own geofence' },
];

export default function Coverage() {
  return (
    <section className="cov" id="coverage">
      <Globe className="cov-globe" />

      <div className="container cov-inner">
        <div className="cov-copy">
          <Reveal as="span" className="sec-eyebrow cov-eyebrow" distance={10}>Coverage</Reveal>
          <Reveal as="h2" delay={90} distance={16}>Wherever the work happens.</Reveal>
          <Reveal as="p" delay={190} distance={14}>
            A shift on a site in Lagos and a laptop in another timezone are the same record
            here. StaffIntra stores where a clock event happened and which timezone it
            happened in, so the hours reconcile no matter where the person was standing.
          </Reveal>

          {/* Each row on its own beat: the list reads as filling in rather
              than as a block that was always there. */}
          <dl className="cov-facts">
            {FACTS.map((f, i) => (
              <Reveal key={f.k} delay={300 + i * 90} distance={12}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={600} distance={12}>
            <a className="turn-link cov-link" href="/geofencing">
              <TurnArrow />
              How geofencing works
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
