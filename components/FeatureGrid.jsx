import Reveal from './Reveal';

const FEATURES = [
  {
    title: 'Time tracking',
    body: 'Clock in from phone or kiosk. Timesheets build themselves, ready for payroll.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    title: 'Security & permissions',
    body: 'SSO, role-based access, and a full audit trail. Everyone sees exactly what they should.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
        <path d="M9.5 12l1.8 1.8L15 10" />
      </svg>
    ),
  },
  {
    title: 'Reports & insights',
    body: 'Hours, absence, and labour cost at a glance — export anything in two clicks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 19V10M10 19V5M16 19v-8M21 19H3" />
      </svg>
    ),
  },
  {
    title: 'Your brand, your workspace',
    body: 'Your logo and colours front the staff experience. StaffIntra stays behind the scenes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
  {
    title: 'Policy sign-off',
    body: 'Publish a policy once; track who has read and signed it, with automatic nudges.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 7h13M8 12h13M8 17h13" />
        <path d="M3.5 7l1 1 2-2M3.5 12l1 1 2-2M3.5 17l1 1 2-2" />
      </svg>
    ),
  },
  {
    title: 'Integrations',
    body: 'Connects to your payroll, HRIS, and calendar — data flows once, correctly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 8V5a2 2 0 0 1 4 0v3M15 8v8a4 4 0 0 1-8 0v-2" />
        <path d="M5 8h14" />
      </svg>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className="grid-section" id="features">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">And everything around it</span>
          <h2>Small features that add up to calm.</h2>
          <p>
            The details that make the workspace feel like it was built for your team — down to
            your logo and colours.
          </p>
        </Reveal>
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} className="f-card" delay={i}>
              <div className="f-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
