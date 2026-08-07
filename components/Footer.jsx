const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Scheduling', href: '#product' },
      { label: 'Leave & approvals', href: '#product' },
      { label: 'Onboarding', href: '#product' },
      { label: 'Time tracking', href: '#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers', href: '#customers' },
      { label: 'Talk to sales', href: '#demo' },
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help centre', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/assets/StaffIntra_Logo_Horizontal_White.svg" alt="staffintra" height={26} />
            <p>One workspace for your whole team.</p>
          </div>
          <div className="footer-cols">
            {COLS.map((col) => (
              <div className="f-col" key={col.title}>
                <h4>{col.title}</h4>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 StaffIntra. All rights reserved.</span>
          <span className="footer-made">Made for teams who run on shifts.</span>
        </div>
      </div>
    </footer>
  );
}
