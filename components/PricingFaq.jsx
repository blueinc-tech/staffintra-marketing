import './PricingFaq.css';

/* The objections, kept as prose because they are genuinely prose answers.
   Two columns rather than the old single stack: after a long matrix the page
   needs to change rhythm, and these are short enough to pair. */

const FAQ = [
  {
    q: 'What counts as a person on the bill?',
    a: 'Anyone who clocks in, requests leave, or is paid during that month. Bank and seasonal staff only count in the months they actually work, and admin-only logins for payroll or IT are free. Someone who leaves stops counting from the next month, and their old records and timesheets stay searchable at no cost.',
  },
  {
    q: 'What happens when the 30-day pilot ends?',
    a: 'Nothing automatic. The pilot runs on one team, there is no card on file, so nothing switches off on day 31 and nothing charges. Your workspace waits until you pick a plan, and the records, policies, and people you set up during the pilot are all still there when you come back.',
  },
  {
    q: 'When would we move up a plan?',
    a: 'When you add a second site, or when approvals and payroll start landing on the same desk, not when you cross a usage limit. It is a date you can see coming rather than a bill that surprises you. Moving up applies the same day and we charge the difference pro rata; moving down starts at your next renewal.',
  },
  {
    q: 'Can we get a quote instead?',
    a: 'Enterprise is quoted because the work is: a workspace per brand or region, custom payroll integration, a security review and retention rules your team signs off. Everything below Enterprise is the published price, and the matrix above is the whole product. We do not hold features back to force a call.',
  },
];

export default function PricingFaq() {
  return (
    <section className="pfaq" id="pricing-faq">
      <div className="container">
        <h2>Before you ask.</h2>
        <div className="pfaq-grid">
          {FAQ.map((item) => (
            <div className="pfaq-item" key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
