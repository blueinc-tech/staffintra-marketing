import Reveal from './Reveal';

export default function Splits() {
  return (
    <section className="splits" id="product">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">The workspace</span>
          <h2>Run the whole week from one place.</h2>
          <p>
            Rotas, requests, and first days — the everyday work of running a team, without the
            spreadsheet sprawl.
          </p>
        </Reveal>

        {/* Split 1: Scheduling */}
        <Reveal className="split">
          <div className="split-copy">
            <span className="split-tag tag-purple">Scheduling &amp; shifts</span>
            <h3>Every shift, visible to everyone.</h3>
            <p>
              Build the rota in minutes, not evenings. Drag shifts into place, catch conflicts
              before they happen, and publish to everyone&apos;s phone at once.
            </p>
            <ul className="checklist">
              <li>Drag-and-drop rota builder with conflict warnings</li>
              <li>Open shifts your team can claim in one tap</li>
              <li>Changes sync instantly — no more screenshot rotas</li>
            </ul>
          </div>
          <div className="split-visual">
            <div className="vis-card vis-rota">
              <div className="vr-head">
                <span>Week of 10 Aug</span>
                <span className="m-chip chip-purple">Publish</span>
              </div>
              <div className="vr-grid">
                <div className="vr-row">
                  <span className="vr-day">Mon</span>
                  <span className="vr-shift s-a" style={{ '--l': '0.06', '--w': '0.38' }}>Morning</span>
                  <span className="vr-shift s-b" style={{ '--l': '0.50', '--w': '0.42' }}>Late</span>
                </div>
                <div className="vr-row">
                  <span className="vr-day">Tue</span>
                  <span className="vr-shift s-b" style={{ '--l': '0.06', '--w': '0.52' }}>Open · claim</span>
                  <span className="vr-shift s-c" style={{ '--l': '0.64', '--w': '0.30' }}>Close</span>
                </div>
                <div className="vr-row">
                  <span className="vr-day">Wed</span>
                  <span className="vr-shift s-a" style={{ '--l': '0.14', '--w': '0.44' }}>Morning</span>
                </div>
                <div className="vr-row">
                  <span className="vr-day">Thu</span>
                  <span className="vr-shift s-c" style={{ '--l': '0.06', '--w': '0.34' }}>Early</span>
                  <span className="vr-shift s-warn" style={{ '--l': '0.46', '--w': '0.40' }}>⚠ Overlap</span>
                </div>
                <div className="vr-row">
                  <span className="vr-day">Fri</span>
                  <span className="vr-shift s-b" style={{ '--l': '0.22', '--w': '0.48' }}>Floor team</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Split 2: Leave & approvals */}
        <Reveal className="split split-flip">
          <div className="split-copy">
            <span className="split-tag tag-green">Leave &amp; approvals</span>
            <h3>Approvals that don&apos;t sit in inboxes.</h3>
            <p>
              Requests come with the context to decide — balances, cover, and policy — so a fair
              answer takes seconds, and nothing gets lost in email.
            </p>
            <ul className="checklist">
              <li>One-tap approvals with balances and cover in view</li>
              <li>Policy-aware — accrual and carry-over handled for you</li>
              <li>Everyone sees the same calendar, always up to date</li>
            </ul>
          </div>
          <div className="split-visual">
            <div className="vis-card vis-approve">
              <div className="va-item">
                <div className="va-ava">S</div>
                <div className="va-txt">
                  <strong>Sofia Reyes</strong>
                  <span>Annual leave · 12–14 Aug · 9 days left</span>
                </div>
                <div className="va-actions">
                  <span className="m-chip chip-ok">Approve</span>
                  <span className="m-chip chip-plain">Decline</span>
                </div>
              </div>
              <div className="va-item">
                <div className="va-ava alt">T</div>
                <div className="va-txt">
                  <strong>Tunde Okafor</strong>
                  <span>Shift swap with Marcus · Sat 15 Aug</span>
                </div>
                <div className="va-actions">
                  <span className="m-chip chip-ok">Approve</span>
                  <span className="m-chip chip-plain">Decline</span>
                </div>
              </div>
              <div className="va-item approved">
                <div className="va-ava ok">✓</div>
                <div className="va-txt">
                  <strong>Priya Sharma</strong>
                  <span>Overtime · approved just now</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Split 3: Onboarding */}
        <Reveal className="split">
          <div className="split-copy">
            <span className="split-tag tag-warm">Onboarding journeys</span>
            <h3>Day one, already sorted.</h3>
            <p>
              Turn new-hire chaos into a guided journey. Paperwork, policy sign-off, kit, and
              introductions — sequenced automatically before they walk in.
            </p>
            <ul className="checklist">
              <li>Guided journeys with automated policy sign-off</li>
              <li>Tasks route themselves to IT, payroll, and managers</li>
              <li>New hires arrive with a plan, not a pile of forms</li>
            </ul>
          </div>
          <div className="split-visual">
            <div className="vis-card vis-onboard">
              <div className="vo-head">
                <div className="va-ava alt2">K</div>
                <div className="va-txt">
                  <strong>Kofi Mensah</strong>
                  <span>Starts Monday · Floor supervisor</span>
                </div>
                <span className="vo-pct">80%</span>
              </div>
              <div className="vo-bar">
                <span style={{ '--p': '80%' }} />
              </div>
              <div className="vo-step done"><span className="vo-tick">✓</span> Contract signed</div>
              <div className="vo-step done"><span className="vo-tick">✓</span> Policies acknowledged</div>
              <div className="vo-step done"><span className="vo-tick">✓</span> Payroll details verified</div>
              <div className="vo-step current"><span className="vo-tick">4</span> Meet your team — scheduled</div>
              <div className="vo-step"><span className="vo-tick">5</span> First-week shadow shifts</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
