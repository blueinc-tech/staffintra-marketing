import Reveal from './Reveal';
import CountUp from './CountUp';

const NAMES = [
  'Northwind Care',
  'Harbor & Lane',
  'Brightline',
  'Fieldstone Group',
  'Cobalt Retail',
  'Veda Health',
];

export default function Logos() {
  return (
    <Reveal as="section" className="logos">
      <div className="container">
        <p className="logos-label">
          Trusted by <CountUp className="count-inline" value={900} suffix="+" /> operations teams
        </p>
        <div className="logos-row">
          {NAMES.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
