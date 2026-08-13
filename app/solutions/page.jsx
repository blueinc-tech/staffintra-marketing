/* Solutions: the same platform read four ways. Each audience gets one
   page-section with a header and a single split, so the page scans as a
   menu: find your shape of team, see the three features that matter, move
   on. The consolidation section closes the argument for all four. */

import { PageShell, PageSplit } from '../../components/PageBits';
import PillarMoment from '../../components/PillarMoment';

export const metadata = {
  title: 'StaffIntra: Solutions',
  description:
    'How startups, mid-sized businesses, field teams and established organizations run time, productivity and operations on StaffIntra.',
};

export default function SolutionsPage() {
  return (
    <PageShell
      kicker="Solutions"
      title="Built for teams that don't work the same way."
      lede="However your business runs, StaffIntra bends to fit, not the other way round."
    >
      <section className="page-section" id="startups">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Startups</span>
            <h2>Ready before the chaos starts.</h2>
            <p className="sec-lede">Free to begin, and it grows as you do.</p>
          </header>
        </div>
        <PageSplit
          kicker="FIRST TEN HIRES"
          title="Time, tasks and pay from day one."
          visual={
            <PillarMoment
              moment={{
                shape: 'bars',
                title: 'Week one',
                meta: 'Set up in a day',
                rows: [
                  { label: 'People added', value: '12 of 12', p: 1 },
                  { label: 'Clock-in live', value: 'Day 1', p: 0.9 },
                  { label: 'First payroll', value: 'Ready', p: 0.7 },
                  { label: 'Cases modelled', value: '3 rules', p: 0.45 },
                ],
              }}
            />
          }
        >
          <p>
            A five-person team does not need an HR department, it needs
            defaults that work. StaffIntra starts free, sets up in a day, and
            gives every hire a clock-in, a task list and a timesheet before
            the first month closes.
          </p>
          <ul>
            <li>Smart clock-in from any phone, live on day one</li>
            <li>Tasks and simple approvals without an admin to run them</li>
            <li>Timesheets that arrive payroll-ready, in naira, every cycle</li>
          </ul>
          <p>
            Start on the free plan and switch nothing later. The workspace
            you set up this week is the one you scale on.
          </p>
        </PageSplit>
      </section>

      <section className="page-section" id="midsize">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Mid-sized businesses</span>
            <h2>Structure without the drag.</h2>
            <p className="sec-lede">Clear time, fair grades, approvals that route themselves.</p>
          </header>
        </div>
        <PageSplit
          flip
          kicker="FIFTY TO FIVE HUNDRED"
          title="Every team gets the same clear rules."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Approvals · this week',
                meta: 'Routed by rule',
                rows: [
                  {
                    name: 'Leave · Chidera A.',
                    meta: 'Team lead, then HR',
                    chip: 'Approved',
                    tone: 'ok',
                  },
                  {
                    name: 'Overtime · Lagos support',
                    meta: 'Sent to ops manager',
                    chip: 'Pending',
                    tone: 'warn',
                  },
                  {
                    name: 'Expense · site visit',
                    meta: '₦48,500 · finance queue',
                    chip: 'Routing',
                    tone: 'accent',
                  },
                ],
              }}
            />
          }
        >
          <p>
            At fifty people, informal stops working. StaffIntra gives each
            department its own view of time and output while leadership sees
            one picture, and every request finds its approver without a
            forwarding chain.
          </p>
          <ul>
            <li>Productivity grades from one transparent formula, visible to staff</li>
            <li>Approval flows that route by role, team and amount</li>
            <li>Leave balances and cover checked before a request lands</li>
          </ul>
          <p>
            Managers approve from their queue, staff see where things stand,
            and nobody chases a signature across three chat threads.
          </p>
        </PageSplit>
      </section>

      <section className="page-section" id="operations">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Field & operations teams</span>
            <h2>Built for work that happens on site.</h2>
            <p className="sec-lede">Shifts, cases and multi-step sign-offs, modelled as they really run.</p>
          </header>
        </div>
        <PageSplit
          kicker="CREWS AND SITES"
          title="Model your real operations, stage by stage."
          visual={
            <PillarMoment
              moment={{
                shape: 'steps',
                title: 'Site handover · Ikeja depot',
                pct: '50%',
                note: 'Your stages, in order · 4 steps',
                rows: [
                  { t: 'Crew clocked in on site', s: 'done' },
                  { t: 'Handover checklist completed', s: 'done' },
                  { t: 'Supervisor sign-off', s: 'current' },
                  { t: 'Client confirmation', s: '' },
                ],
              }}
            />
          }
        >
          <p>
            Depots, sites and crews do not run on office assumptions.
            StaffIntra knows who is where, with location context on every
            clock-in, and turns each job into a case that moves through your
            stages in order.
          </p>
          <ul>
            <li>Shift scheduling across sites, with cover gaps visible early</li>
            <li>Cases with multi-step sign-offs that cannot skip a stage</li>
            <li>Clock-in with device and location context for every crew</li>
          </ul>
          <p>
            A supervisor closes a stage from the field, and the next person
            in the chain sees it at once. That is the whole system.
          </p>
        </PageSplit>
      </section>

      <section className="page-section" id="enterprise">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Established organizations</span>
            <h2>One branded roof for the whole operation.</h2>
            <p className="sec-lede">HR, time, productivity and operations in a single record.</p>
          </header>
        </div>
        <PageSplit
          flip
          kicker="CONSOLIDATION AT SCALE"
          title="Retire the sprawl, keep the history."
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Legacy stack',
                meta: 'Consolidation tracker',
                rows: [
                  {
                    name: 'Standalone HR records',
                    meta: 'People data now in StaffIntra',
                    chip: 'Retired',
                    tone: 'quiet',
                  },
                  {
                    name: 'Clock-in spreadsheet',
                    meta: 'Replaced by smart clock-in',
                    chip: 'Retired',
                    tone: 'quiet',
                  },
                  {
                    name: 'Old case tracker',
                    meta: 'Cases moving stage by stage',
                    chip: 'Migrating',
                    tone: 'accent',
                  },
                ],
              }}
            />
          }
        >
          <p>
            Most large teams run on a stack that grew by accident: an HR
            system here, a clock-in tool there, spreadsheets in between.
            StaffIntra brings people records, time, productivity and
            operations into one workspace that carries your own brand.
          </p>
          <ul>
            <li>One employee record behind HR, time and performance</li>
            <li>Your logo, colors and domain on the workspace staff use daily</li>
            <li>Role-based access so each function sees exactly its slice</li>
          </ul>
          <p>
            Migrations run system by system, not in one risky weekend. Each
            tool retires only when its record already lives in StaffIntra.
          </p>
        </PageSplit>
      </section>

      <section className="page-section" id="consolidation">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">System consolidation</span>
            <h2>One roof, not another tool.</h2>
            <p className="sec-lede">Replace point tools with a single record, not another tab.</p>
          </header>
        </div>
        <PageSplit
          kicker="THE MATH OF ONE"
          title="Four subscriptions become one workspace."
          visual={
            <PillarMoment
              moment={{
                shape: 'timer',
                title: 'Stack after StaffIntra',
                site: '4 tools retired',
                time: '1',
                note: 'One workspace, one record',
                action: 'See the platform',
              }}
            />
          }
        >
          <p>
            Point tools each hold a slice of the truth: HR software knows who
            works for you, a time tracker knows when, spreadsheets hold the
            rest. StaffIntra replaces the set with one record, so a clock-in,
            a leave request and a payslip all describe the same person in the
            same place. See how the pieces fit on the{' '}
            <a href="/product">product page</a>.
          </p>
          <ul>
            <li>One record replacing HR files, time tracker and spreadsheets</li>
            <li>Reports drawn from one source, not a reconciliation project</li>
            <li>One bill in naira instead of four dollar subscriptions</li>
          </ul>
          <p>
            Fewer logins, fewer exports, fewer places for the numbers to
            disagree. The tool count goes down and the picture gets sharper.
          </p>
        </PageSplit>
      </section>
    </PageShell>
  );
}
