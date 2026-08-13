import Brand from './Brand';
import './Footer.css';

/* Column set follows navData, so the footer and the menu never drift apart.
   Every href is still a placeholder until the routes exist. */
const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Time & Attendance', href: '/product#time' },
      { label: 'Productivity', href: '/product#productivity' },
      { label: 'Performance', href: '/product#productivity' },
      { label: 'HR & Payroll', href: '/product#operations' },
      { label: 'Cases & Approvals', href: '/product#operations' },
      { label: 'Forms', href: '/product#operations' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Startups', href: '/solutions#startups' },
      { label: 'Mid-sized businesses', href: '/solutions#midsize' },
      { label: 'Field & operations', href: '/solutions#operations' },
      { label: 'Enterprises', href: '/solutions#enterprise' },
      { label: 'System consolidation', href: '/solutions#consolidation' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/resources#blog' },
      { label: 'Help center', href: '/resources#help' },
      { label: 'API docs', href: '/resources#api' },
      { label: 'Privacy & tracking policy', href: '#' },
      { label: 'Status', href: '/resources#status' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Customers', href: '/#customers-strip' },
      { label: 'Careers', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '/#demo' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
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
            <Brand className="foot-brand-logo" />
            <p>One workspace built around the way your business actually works.</p>
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
          <span>© StaffIntra 2026 · Blueinc Technologies. All rights reserved.</span>
          <span className="foot-legal-links">
            <LinkList links={LEGAL} />
          </span>
        </div>
      </div>
    </footer>
  );
}
