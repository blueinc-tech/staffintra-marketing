import Reveal from './Reveal';
import CountUp from './CountUp';

const STATS = [
  { value: 6, suffix: '', label: 'hours saved per manager, per week' },
  { value: 94, suffix: '%', label: 'of approvals cleared within a day' },
  { value: 80, suffix: '%', label: 'fewer rota messages to managers' },
  { value: 99.9, suffix: '%', label: 'uptime, month after month' },
];

export default function Stats() {
  return (
    <Reveal as="section" className="stats">
      <div className="container stats-inner">
        <div className="stats-copy">
          <img src="/assets/StaffIntra_Logo_Mark_White.svg" alt="" width={36} height={36} />
          <h2>Teams run smoother on StaffIntra.</h2>
          <p>
            Across care, retail, logistics, and hospitality, the pattern is the same: less
            chasing, fewer surprises, calmer weeks.
          </p>
        </div>
        <div>
          <div className="stats-nums">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp className="stat-num" value={s.value} suffix={s.suffix} />
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="stats-note">Medians across StaffIntra customers after 90 days.</p>
        </div>
      </div>
    </Reveal>
  );
}
