import './Footer.css';

/* Column set follows navData, so the footer and the menu never drift apart.
   Every href is still a placeholder until the routes exist. */
const COLS = [
  {
    title: 'Products',
    links: [
      { label: 'Scheduling & shifts', href: '#product' },
      { label: 'Leave & approvals', href: '#product' },
      { label: 'Onboarding journeys', href: '#product' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Rota builder', href: '#product' },
      { label: 'Open shifts', href: '#product' },
      { label: 'Shift swaps', href: '#product' },
      { label: 'Time tracking', href: '#features' },
      { label: 'Timesheets', href: '#features' },
      { label: 'Leave requests', href: '#product' },
      { label: 'Balances & accrual', href: '#product' },
      { label: 'Cover', href: '#product' },
      { label: 'Approvals inbox', href: '#product' },
      { label: 'Absence reporting', href: '#features' },
      { label: 'Guided journeys', href: '#product' },
      { label: 'Policy sign-off', href: '#features' },
      { label: 'Task routing', href: '#product' },
      { label: 'Documents', href: '#product' },
    ],
  },
  {
    title: 'Platform',
    groups: [
      {
        links: [
          { label: 'Integrations', href: '#features' },
          { label: 'Support', href: '#demo' },
          { label: 'Security & permissions', href: '#features' },
        ],
      },
      {
        heading: 'Solutions',
        links: [
          { label: 'Compliance', href: '#features' },
          { label: 'Labour cost', href: '#features' },
          { label: 'System consolidation', href: '#features' },
          { label: 'Multi-site operations', href: '#pricing' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Guides', href: '#' },
          { label: 'Events', href: '#' },
          { label: 'Help centre', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Partnerships', href: '#' },
      { label: 'Customer stories', href: '#customers' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Talk to sales', href: '#demo' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of service', href: '#' },
  { label: 'Security', href: '#' },
];

function LinkList({ links }) {
  return links.map((l) => (
    <a key={l.label + l.href} href={l.href}>
      {l.label}
    </a>
  ));
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* Full page width, not the nav bar's: the footer is the one block that
          is allowed to use the whole page. */}
      <div className="foot-wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img
              src="/assets/StaffIntra_Logo_Horizontal_Purple.svg"
              alt="StaffIntra"
              height={26}
            />
            <p>One workspace for your whole team.</p>
          </div>

          <div className="foot-cols">
            {COLS.map((col) => (
              <nav className="foot-col" key={col.title} aria-label={col.title}>
                <h4>{col.title}</h4>
                {col.links ? <LinkList links={col.links} /> : null}
                {col.groups
                  ? col.groups.map((g) => (
                      <div className="foot-group" key={g.heading ?? 'first'}>
                        {g.heading ? <h5>{g.heading}</h5> : null}
                        <LinkList links={g.links} />
                      </div>
                    ))
                  : null}
              </nav>
            ))}
          </div>
        </div>

        <form
          className="foot-sub"
          onSubmit={undefined}
          action="#"
          aria-label="Newsletter signup"
        >
          <label htmlFor="foot-email">Get the latest from StaffIntra</label>
          <div className="foot-sub-row">
            <input id="foot-email" type="email" name="email" placeholder="Work email" required />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </div>
        </form>

        <div className="foot-legal">
          <span>© 2026 StaffIntra. All rights reserved.</span>
          <span className="foot-legal-links">
            <LinkList links={LEGAL} />
          </span>
        </div>
      </div>
    </footer>
  );
}
