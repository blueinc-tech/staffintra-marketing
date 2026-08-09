import Reveal from './Reveal';

const QUOTES = [
  {
    text: 'The rota used to take my Sunday evening. Now it takes twenty minutes on Friday, and nobody messages me asking when they work.',
    name: 'Maya Adeyemi',
    role: 'Operations lead · Northwind Care',
    ava: 'M',
    avaClass: '',
  },
  {
    text: "Approvals stopped being a pile in my inbox. I see the balance, the cover, and I decide in one tap. It's honestly boring now, in the best way.",
    name: 'James Whitfield',
    role: 'HR manager · Cobalt Retail',
    ava: 'J',
    avaClass: 'alt',
  },
  {
    text: 'Our last three hires walked in on day one with everything signed, a plan for the week, and their team expecting them. That never happened before.',
    name: 'Lena Baros',
    role: 'People & culture · Brightline',
    ava: 'L',
    avaClass: 'alt2',
  },
];

export default function Quotes() {
  return (
    <section className="quotes" id="customers">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">Customers</span>
          <h2>People notice the difference.</h2>
        </Reveal>
        <div className="quote-row">
          {QUOTES.map((q, i) => (
            <Reveal as="figure" key={q.name} className="quote-card" delay={i}>
              <blockquote>&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption>
                <span className={`q-ava ${q.avaClass}`.trim()}>{q.ava}</span>
                <div>
                  <strong>{q.name}</strong>
                  <span>{q.role}</span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
