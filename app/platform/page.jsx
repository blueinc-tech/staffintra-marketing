import { PageShell, PageSplit } from '../../components/PageBits';
import PillarMoment from '../../components/PillarMoment';
import Integrations from '../../components/Integrations';
import Support from '../../components/Support';

export const metadata = {
  title: 'StaffIntra: Platform',
  description:
    'One command center for the whole workday: a morning briefing, a work queue, quick actions, integrations, and audit-ready security.',
};

/* The platform page is the deeper read of the home screen itself: the command
   center everyone lands on, then the wiring (integrations), then the paperwork
   (security), then support. Anchors: #home, #integrations, #security, #support. */
export default function Platform() {
  return (
    <PageShell
      kicker="The platform"
      title="One home for the whole workday."
      lede="Every person starts their day on a personal command center: clock, work queue, team pulse and quick actions in one calm surface."
    >
      <section className="page-section" id="home">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Command center</span>
            <h2>The day, already sorted.</h2>
            <p className="sec-lede">Open the app and the day is already arranged around you.</p>
          </header>
        </div>

        <PageSplit
          kicker="Morning brief"
          title="Your morning, briefed."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'My Work',
                meta: '5 things need you',
                rows: [
                  {
                    name: 'Task overdue · payout webhook retries',
                    meta: '≈6 min to clear',
                    chip: 'Open',
                    tone: 'warn',
                  },
                  {
                    name: 'Leave request · Jemimah, Thu to Fri',
                    meta: 'rule §4 routed',
                    chip: 'Approve',
                    tone: 'ok',
                  },
                  {
                    name: 'August payroll run',
                    meta: 'Scheduled 28 Aug',
                    chip: 'Ready',
                    tone: 'accent',
                  },
                ],
              }}
            />
          }
        >
          <p>
            Sign in and the day is laid out for you. A briefing strip reads NOW, TODAY, THIS
            WEEK and ELSEWHERE, so the next shift, the waiting approval and the payroll
            deadline are on screen before the first meeting.
          </p>
          <p>
            Below it, My Work queues everything that needs you, each item with a suggested
            next step and a rough time to clear. Work the list top to bottom and the day is
            handled.
          </p>
          <ul>
            <li>NOW: who is on site and what is running late</li>
            <li>TODAY: approvals, tasks and handovers due before close</li>
            <li>THIS WEEK: hours tracked and deadlines coming up</li>
            <li>ELSEWHERE: what your other sites need from you</li>
          </ul>
        </PageSplit>

        <PageSplit
          kicker="Quick actions"
          title="Quick actions, one tap."
          flip
          visual={
            <PillarMoment
              moment={{
                shape: 'bars',
                title: 'Team today',
                meta: '14 of 16 clocked in',
                rows: [
                  { label: 'In office', value: '11', p: 0.69 },
                  { label: 'Remote', value: '3', p: 0.19 },
                  { label: 'On leave', value: '1', p: 0.06 },
                  { label: 'Not in yet', value: '1', p: 0.06 },
                ],
              }}
            />
          }
        >
          <p>
            The things people reach for every day sit one tap from home: request leave,
            claim an expense, open my timesheet, review approvals. No hunting through menus,
            no asking HR where the form lives.
          </p>
          <p>
            A team pulse sits alongside, fed live by clock-ins: who is in, who is remote,
            who is on leave, who has not arrived yet.
          </p>
          <ul>
            <li>Request leave with your balance shown before you submit</li>
            <li>Claim an expense by photographing the receipt</li>
            <li>Open your timesheet and flag a missed punch</li>
            <li>Clear approvals in one pass, oldest first</li>
          </ul>
        </PageSplit>
      </section>

      <div id="integrations">
        <Integrations />
      </div>

      <section className="page-section" id="security">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Security & compliance</span>
            <h2>Ready for your auditors.</h2>
            <p className="sec-lede">
              The answers your IT and legal reviews will ask for, prepared in advance.
            </p>
          </header>
        </div>

        <PageSplit
          kicker="Controls"
          title="Built for the review after the demo."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Controls',
                meta: 'Reviewed quarterly',
                rows: [
                  { name: 'SOC 2 Type 2', meta: 'Independent audit', chip: 'Ready', tone: 'ok' },
                  { name: 'ISO 27001', meta: 'Control alignment', chip: 'Aligned', tone: 'ok' },
                  { name: 'NDPR', meta: 'Nigerian data protection', chip: 'Compliant', tone: 'ok' },
                ],
              }}
            />
          }
        >
          <p>
            StaffIntra runs security as a standing program, not a page on a website. SOC 2
            Type 2 readiness, ISO 27001 control alignment and NDPR compliance are reviewed
            quarterly, with evidence your auditors can take away.
          </p>
          <p>
            Inside the product, role-based permissions decide who can see salaries,
            documents and reports, and every change lands in an audit trail: who did what,
            when, and from where.
          </p>
          <ul>
            <li>SOC 2 Type 2 readiness backed by independent audit</li>
            <li>ISO 27001 aligned controls across the platform</li>
            <li>NDPR compliant handling of Nigerian employee data</li>
            <li>Role-based permissions with full audit trails</li>
          </ul>
        </PageSplit>
      </section>

      <div id="support">
        <Support />
      </div>
    </PageShell>
  );
}
