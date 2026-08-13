'use client';

import { useState } from 'react';
import Reveal from './Reveal';

const PLANS = [
  {
    name: 'Core',
    monthly: '₦1,500',
    yearly: '₦1,250',
    unit: 'per person / month',
    tagline: 'Get the workday out of the spreadsheet.',
    bestFor: 'One team leaving spreadsheets behind, usually 1 to 25 people',
    cta: 'Pilot with one team',
    featured: false,
    features: [
      'Smart clock-in from desktop or mobile, with location context built in',
      'Timesheets that build themselves from clock events, payroll-ready',
      'Activity insights beside clock-in data, transparent to staff by design',
      'Leave requests with balances and cover in view, so a fair answer takes seconds',
      'Hours, absence, and labour cost, exported in two clicks',
      'Manager and staff roles, so everyone sees what they should',
      'Your logo and colours on the staff app, so it reads as your workspace',
    ],
  },
  {
    name: 'Plus',
    monthly: '₦3,000',
    yearly: '₦2,500',
    unit: 'per person / month',
    tagline: 'The whole week, handled in one place.',
    bestFor: 'Where time, leave, and payroll land on one desk, usually 26 to 100 people',
    cta: 'Pilot with one team',
    featured: true,
    badge: 'Recommended for one busy site',
    features: [
      'Everything in Core',
      'Every team and site on one record, with activity and grades across them',
      'Leave that knows your policy: accrual, carry-over, and public holidays handled',
      'Onboarding journeys that route tasks to IT, payroll, and the hiring manager',
      'Policy sign-off tracked per person, with quiet nudges for anyone outstanding',
      'Branded emails and documents, so StaffIntra stays behind the scenes',
      'Payroll, HRIS, and calendar connected, so hours are entered once',
    ],
  },
  {
    name: 'Complete',
    monthly: '₦4,500',
    yearly: '₦3,750',
    unit: 'per person / month',
    tagline: 'Control and evidence across sites.',
    bestFor: 'Several sites with audit and access to keep straight, usually 101 to 500 people',
    cta: 'Pilot with one team',
    featured: false,
    secondary: 'Book a walkthrough',
    features: [
      'Everything in Plus',
      'Single sign-on with the identity provider you already use',
      'Permissions you define, role by role and site by site',
      'A full audit trail of who changed what, and when',
      'Labour cost broken down by site, team, and cost centre',
      'Priority support from a named contact who knows your setup',
    ],
  },
];

const ENTERPRISE = {
  name: 'Enterprise',
  price: 'Priced per group',
  tagline: 'Several organisations, one agreement.',
  bestFor: 'Groups running several brands or regions, usually 500+ people',
  cta: 'Talk to us',
  features: [
    'Everything in Complete',
    'A separate branded workspace for each brand, region, or site, with one report across all of them',
    'Custom payroll and HRIS integration work, scoped with your teams',
    'Security review, data processing agreement, and retention rules your team can sign off',
    'A written uptime commitment, backed by the 99.9% we run at',
    'A 30-minute walkthrough, and a written quote within a week',
  ],
};

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
    a: 'When you add a second team or site, not when you cross a usage limit. It is a date you can see coming rather than a bill that surprises you. You can change plan at any time: moving up applies the same day and we charge the difference pro rata, and moving down starts at your next renewal.',
  },
  {
    q: 'Where does the six hours a week come from?',
    a: 'It is the median across StaffIntra customers 90 days after go-live, measured against the time managers spent chasing hours, approvals, and timesheets beforehand. Medians move, so treat it as a guide rather than a guarantee. During your pilot we measure the same thing on your own team, and you get those numbers whether they flatter us or not.',
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">What it costs</span>
          <h2>Three plans, priced per person.</h2>
          <p>
            Pilot with one team free for 30 days, on any plan. Prices are per person, per month,
            with no minimum spend and no setup fee.
          </p>
        </Reveal>

        <Reveal>
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
          <p className="billing-note">Two months free when you pay for the year.</p>
        </Reveal>

        <div className="price-grid">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.name}
              className={`price-card${plan.featured ? ' featured' : ''}`}
              delay={i}
            >
              {plan.badge ? <span className="price-badge">{plan.badge}</span> : null}

              <div className="price-head">
                <h3 className="price-name">{plan.name}</h3>
                <p className="price-tagline">{plan.tagline}</p>
                <p className="price-amount">
                  <span className="price-value">{yearly ? plan.yearly : plan.monthly}</span>
                  <span className="price-unit">{plan.unit}</span>
                </p>
                <p className="price-best">{plan.bestFor}</p>
              </div>

              <a
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                href="#demo"
              >
                {plan.cta}
              </a>
              <p className="price-caption">Free for 30 days · No credit card needed</p>
              {plan.secondary ? (
                <a className="price-link" href="#demo">
                  {plan.secondary}
                </a>
              ) : null}

              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="price-note">
          Free for 30 days on any plan, with no card, no minimum spend, and no setup fee. Import
          from spreadsheets, and we run your first payroll month with you. Sixty people on Plus is
          ₦180,000 a month, or ₦150,000 a month paid for the year.
        </Reveal>

        {/* Quoted rather than published, so it sits outside the toggleable row. */}
        <Reveal className="enterprise">
          <div>
            <div className="enterprise-head">
              <h3>{ENTERPRISE.name}</h3>
              <span className="enterprise-price">{ENTERPRISE.price}</span>
            </div>
            <p className="enterprise-tagline">
              {ENTERPRISE.tagline} {ENTERPRISE.bestFor}.
            </p>
            <ul className="enterprise-features">
              {ENTERPRISE.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="enterprise-cta">
            <a className="btn btn-secondary btn-lg" href="#demo">
              {ENTERPRISE.cta}
            </a>
          </div>
        </Reveal>

        <div className="pricing-faq">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
