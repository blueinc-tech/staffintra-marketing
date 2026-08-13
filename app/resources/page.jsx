import Insights from '../../components/Insights';
import { PageShell, PageSplit } from '../../components/PageBits';
import PillarMoment from '../../components/PillarMoment';

export const metadata = {
  title: 'StaffIntra: Resources',
  description: 'Guides, support, API documentation and platform status for teams running operations on StaffIntra.',
};

export default function ResourcesPage() {
  return (
    <PageShell
      kicker="Resources"
      title="Guidance for the people who run operations."
      lede="Practical reading, help when you need it, and a platform you can build on."
    >
      <div id="blog">
        <Insights />
      </div>

      <section className="page-section" id="help">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Help center</span>
            <h2>Real people, real answers.</h2>
            <p className="sec-lede">Support that picks up, from onboarding to month end.</p>
          </header>
        </div>
        <PageSplit
          kicker="SUPPORT"
          title="Help that starts with a person, not a ticket queue."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Help center',
                meta: 'Answers in minutes',
                rows: [
                  { name: 'Getting set up', meta: '12 guides', chip: 'Read', tone: 'quiet' },
                  { name: 'Payroll month end', meta: '8 guides', chip: 'Read', tone: 'quiet' },
                  { name: 'Talk to support', meta: 'Phone, email, chat', chip: 'Open', tone: 'accent' },
                ],
              }}
            />
          }
        >
          <p>
            Every StaffIntra account starts with hands-on onboarding: a real person walks your
            team through setup, imports your records, and stays on the line until your first
            payroll run closes clean. After that, help is wherever you are.
          </p>
          <ul>
            <li>Phone support during Nigerian business hours, with a person who knows your account.</li>
            <li>Email and in-app chat for everything else, answered by the support team, not a bot.</li>
            <li>A written guide for every workflow, from clock-in rules to end-of-year filings.</li>
          </ul>
        </PageSplit>
      </section>

      <section className="page-section" id="api">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">API</span>
            <h2>Build on the record.</h2>
            <p className="sec-lede">The same data the app runs on, open to your own tools.</p>
          </header>
        </div>
        <PageSplit
          kicker="DEVELOPERS"
          title="A REST API for everything StaffIntra knows."
          flip
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'API',
                meta: 'Build on the record',
                rows: [
                  { name: 'REST endpoints', meta: 'People, time, pay', chip: 'v1', tone: 'accent' },
                  { name: 'Webhooks', meta: 'Clock events, approvals', chip: 'Live', tone: 'ok' },
                  { name: 'Sandbox', meta: 'Test with sample data', chip: 'Free', tone: 'quiet' },
                ],
              }}
            />
          }
        >
          <p>
            People, time entries, leave balances, pay runs: every record in StaffIntra is
            reachable over a documented REST API. Pull data into your warehouse, push it into
            your accounting stack, or build the internal tool your operation actually needs.
          </p>
          <ul>
            <li>Webhooks fire on clock events and approvals, so your systems react in real time.</li>
            <li>A free sandbox with sample data, so you can build before you buy.</li>
            <li>Token-based access with per-scope permissions, revocable in one click.</li>
          </ul>
        </PageSplit>
      </section>

      <section className="page-section" id="status">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Status</span>
            <h2>Uptime, in the open.</h2>
            <p className="sec-lede">A public status page, because your payroll depends on ours.</p>
          </header>
        </div>
        <PageSplit
          kicker="RELIABILITY"
          title="When you run payroll on a platform, you deserve to see how it is running."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Status',
                meta: 'Last 90 days',
                rows: [
                  { name: 'App', meta: '99.98% uptime', chip: 'Operational', tone: 'ok' },
                  { name: 'API', meta: '99.99% uptime', chip: 'Operational', tone: 'ok' },
                  { name: 'Notifications', meta: 'Email and in-app', chip: 'Operational', tone: 'ok' },
                ],
              }}
            />
          }
        >
          <p>
            StaffIntra publishes live uptime and a full incident history for the app, the API,
            and notifications. No account required to read it. If something breaks, you see what
            we see, and you see when it is fixed.
          </p>
          <ul>
            <li>Live status for every service, updated the moment an incident opens.</li>
            <li>Incident history with plain-language postmortems, kept for the record.</li>
            <li>Subscribe by email to hear about incidents before your staff do.</li>
          </ul>
        </PageSplit>
      </section>
    </PageShell>
  );
}
