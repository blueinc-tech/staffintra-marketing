import { PageShell, PageSplit } from '../../components/PageBits';
import PillarMoment from '../../components/PillarMoment';

export const metadata = {
  title: 'StaffIntra: Product',
  description: 'The full StaffIntra platform: time and attendance, productivity and performance, payroll and people operations in one place.',
};

/* The deeper read of the product story: three groups that mirror the
   homepage pillars. Time gets the real footage, productivity and operations
   get drawn cards, and every anchor here is a target the nav and the other
   subpages link to. */
export default function Product() {
  return (
    <PageShell
      kicker="Product"
      title="Everything your team needs, and complete visibility."
      lede="One platform for the entire employee workday, from clock-in to payslip."
    >
      <section className="page-section" id="time">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Time &amp; Attendance</span>
            <h2>From clock-in to payslip.</h2>
            <p className="sec-lede">Every hour captured once, then carried through to payroll untouched.</p>
          </header>
        </div>

        <PageSplit
          kicker="Clock-in"
          title="Smart clock-in"
          visual={
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              src="/assets/time-tracking.mp4"
              poster="/assets/time-tracking-poster.jpg"
              aria-label="StaffIntra clock-in screen recording a verified session"
            />
          }
        >
          <p>
            One tap starts the day, from a desktop at head office or a phone on
            site. Each session records device health and location context as it
            happens, so nobody has to vouch for an entry after the fact.
          </p>
          <ul>
            <li>Verified sessions: device and location captured at the moment of clock-in.</li>
            <li>Streaks make consistent attendance visible, to staff first.</li>
            <li>Late flags raise themselves, against the schedule you set.</li>
          </ul>
          <p>The workday starts with one tap, and the record starts with it.</p>
        </PageSplit>

        <PageSplit
          flip
          kicker="Timesheets"
          title="Timesheets that build themselves"
          visual={
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              src="/assets/timesheets.mp4"
              poster="/assets/timesheets-poster.jpg"
              aria-label="StaffIntra timesheet building itself from clock events"
            />
          }
        >
          <p>
            Clock events become payroll-ready timesheets on their own. Nothing
            is re-entered, nobody chases a spreadsheet on the 26th, and the
            number payroll sees is the number the clock recorded.
          </p>
          <ul>
            <li>Variance flags catch the weeks that need a second look.</li>
            <li>Sign-off is a click, with the evidence attached.</li>
            <li>Weeks build themselves as the days close.</li>
          </ul>
          <p>By the time payroll asks, the timesheet already exists.</p>
        </PageSplit>

        <PageSplit
          kicker="Leave"
          title="Leave without the paperwork"
          visual={
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              src="/assets/leave-requests.mp4"
              poster="/assets/leave-requests-poster.jpg"
              aria-label="StaffIntra leave request routing to the right approver"
            />
          }
        >
          <p>
            A request routes itself by the rules you wrote, and balances stay
            right without anyone keeping a tally. No printed form, no hallway
            approval that never gets recorded.
          </p>
          <ul>
            <li>Rule-based routing: rule §4 sends anything over five days to HR, automatically.</li>
            <li>Balance and team cover sit in view before anyone approves.</li>
            <li>One-tap approval, logged with who and when.</li>
          </ul>
          <p>The policy does the routing, so managers only do the deciding.</p>
        </PageSplit>
      </section>

      <section className="page-section" id="productivity">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">Productivity &amp; Performance</span>
            <h2>One transparent formula for everyone.</h2>
            <p className="sec-lede">The same numbers, visible to the person being measured.</p>
          </header>
        </div>

        <PageSplit
          kicker="Activity"
          title="Activity insights"
          visual={
            <PillarMoment
              moment={{
                shape: 'bars',
                title: 'Activity · today',
                meta: 'No screenshots, ever',
                rows: [
                  { label: 'Focused', value: '5h 40m', p: 0.82 },
                  { label: 'Meetings', value: '1h 10m', p: 0.35 },
                  { label: 'Admin', value: '0h 55m', p: 0.24 },
                  { label: 'Idle', value: '0h 50m', p: 0.18 },
                ],
              }}
            />
          }
        >
          <p>
            Real activity sits beside clock-in data, so a present day and a
            productive day stop being the same claim. Focused and idle hours
            show up hour by hour, not as a monthly guess.
          </p>
          <ul>
            <li>Transparent to staff by design: everyone sees their own numbers.</li>
            <li>Focused versus idle, hour by hour, next to attendance.</li>
            <li>No screenshots, ever. Patterns, not surveillance.</li>
          </ul>
          <p>Attendance says who showed up. This says what the day held.</p>
        </PageSplit>

        <PageSplit
          flip
          kicker="Grades"
          title="Performance grades"
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Grade · August',
                meta: '82 / 100',
                rows: [
                  { name: 'Attendance', meta: '96% on time', chip: 'A', tone: 'ok' },
                  { name: 'Activity', meta: '5h 40m focused daily', chip: 'B', tone: 'accent' },
                  { name: 'Approved output', meta: '14 work logs signed off', chip: 'A', tone: 'ok' },
                ],
              }}
            />
          }
        >
          <p>
            Attendance times activity times approved output. One formula,
            published to everyone, applied to everyone. A grade you can argue
            with is a grade you can trust.
          </p>
          <ul>
            <li>Three inputs, all of them numbers the person already sees.</li>
            <li>No manager mood, no end-of-year surprise.</li>
            <li>Every grade traces back to the days that made it.</li>
          </ul>
          <p>When the formula is public, the review meeting gets short.</p>
        </PageSplit>

        <PageSplit
          kicker="Work logs"
          title="Work logs"
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Work logs · this week',
                meta: 'Counts toward the grade',
                rows: [
                  { name: 'KYC validation states', meta: 'Delivered and approved', chip: 'Approved', tone: 'ok' },
                  { name: 'Payout webhook retries', meta: '2h 10m tracked', chip: 'Open', tone: 'warn' },
                  { name: 'Empty-state designs', meta: 'Sent for review', chip: 'In review', tone: 'accent' },
                ],
              }}
            />
          }
        >
          <p>
            Hours say how long. Work logs say what was actually delivered, task
            by task, with a reviewer's sign-off attached. Approved output is
            the third input to the grade, and the hardest one to fake.
          </p>
          <ul>
            <li>Each log names the task, the time it took, and its state.</li>
            <li>Review and approval happen in the same place the work is logged.</li>
            <li>Approved logs feed the grade. Open ones just wait.</li>
          </ul>
          <p>The week ends with a list of what shipped, not a feeling about it.</p>
        </PageSplit>
      </section>

      <section className="page-section" id="operations">
        <div className="container">
          <header className="sec-head sec-head--tight">
            <span className="sec-eyebrow">People &amp; Operations</span>
            <h2>Payroll, people and process in one place.</h2>
            <p className="sec-lede">The back office runs on the same record the workday wrote.</p>
          </header>
        </div>

        <PageSplit
          kicker="Payroll"
          title="Payroll, connected"
          visual={
            <PillarMoment
              moment={{
                shape: 'timer',
                title: 'August payroll',
                site: '312 staff · 2 of 2 approvals',
                time: '₦48.2m',
                note: 'Statutory deductions handled',
                action: 'Run scheduled · 28 Aug',
              }}
            />
          }
        >
          <p>
            Payroll reads the timesheets it was already given. Approved hours,
            approved leave and approved expenses arrive as one run, with PAYE,
            pension and NHF handled before anyone opens a calculator.
          </p>
          <ul>
            <li>Every naira traces to a signed-off timesheet or an approved case.</li>
            <li>Statutory deductions applied by rule, not by memory.</li>
            <li>Approvals collected before the run, not after the complaints.</li>
          </ul>
          <p>Month end becomes a review, not a reconstruction.</p>
        </PageSplit>

        <PageSplit
          flip
          kicker="Lifecycle"
          title="Staff lifecycle"
          visual={
            <PillarMoment
              moment={{
                shape: 'list',
                title: 'Lifecycle',
                meta: 'One continuous record',
                rows: [
                  { name: 'Town hall Friday', meta: 'Announcement', chip: '14 read', tone: 'quiet' },
                  { name: 'New analyst onboarding', meta: 'Day 2 of 5', chip: 'On track', tone: 'ok' },
                  { name: 'Exit checklist · contractor', meta: '3 items left', chip: 'Open', tone: 'warn' },
                ],
              }}
            />
          }
        >
          <p>
            Onboarding, announcements, documents and exits live on one
            continuous record per person. Day one starts with a checklist that
            already exists, and the last day closes one that cannot be skipped.
          </p>
          <ul>
            <li>Onboarding plans with owners and due days, visible to the new hire.</li>
            <li>Announcements with read receipts, so "nobody told me" retires.</li>
            <li>Exit checklists that hold laptops, access and final pay together.</li>
          </ul>
          <p>The employee file is the system, not a folder beside it.</p>
        </PageSplit>

        <PageSplit
          kicker="Cases"
          title="Cases &amp; approvals"
          visual={
            <PillarMoment
              moment={{
                shape: 'steps',
                title: 'Expense above ₦50k',
                pct: '75%',
                note: 'Your rule, enforced · 4 steps',
                rows: [
                  { t: 'Submitted with receipts', s: 'done' },
                  { t: 'Team lead review', s: 'done' },
                  { t: 'Finance check', s: 'current' },
                  { t: 'CEO sign-off', s: '' },
                ],
              }}
            />
          }
        >
          <p>
            Write the rule once: expenses above ₦50k take four steps, ending at
            the CEO. Every case follows it, shows where it stands, and names
            who it is waiting on. Forms feed the same engine, so any form your
            team fills becomes a case with a route and a deadline.
          </p>
          <ul>
            <li>Approval chains follow your rules, with no quiet exceptions.</li>
            <li>Each case shows its step, its owner and its age.</li>
            <li>Any form becomes a case: requests, incidents, purchases.</li>
          </ul>
          <p>Process stops living in someone's head and starts living in the record.</p>
        </PageSplit>
      </section>
    </PageShell>
  );
}
