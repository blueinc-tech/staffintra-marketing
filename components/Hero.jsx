export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow anim-in" style={{ '--d': 0 }}>
            <span className="eyebrow-dot" /> New · Onboarding journeys
          </span>
          <h1 className="anim-in" style={{ '--d': 1 }}>
            One workspace for
            <br />
            your <span className="accent">whole team</span>.
          </h1>
          <p className="hero-sub anim-in" style={{ '--d': 2 }}>
            StaffIntra brings scheduling, leave, approvals, and onboarding into a single workspace,
            so your people spend less time on admin and more time on the work that matters.
          </p>
          <div className="hero-ctas anim-in" style={{ '--d': 3 }}>
            <a className="btn btn-primary btn-lg btn-swap" href="#demo">
              <span className="swap">
                <span>Book a demo</span>
                <span aria-hidden="true">Book a demo</span>
              </span>
            </a>
            <a className="btn btn-secondary btn-lg" href="#product">
              See how it works
            </a>
          </div>
          <p className="hero-note anim-in" style={{ '--d': 4 }}>
            Free 30-day pilot · No credit card needed
          </p>
        </div>

        {/* Product mockup, built in markup so it stays crisp */}
        <div className="mockup anim-in" style={{ '--d': 5 }} aria-hidden="true">
          <div className="mockup-window">
            <div className="mockup-sidebar">
              <img src="/assets/StaffIntra_Logo_Mark_Purple.svg" alt="" width={26} height={26} />
              <div className="msb-item active" />
              <div className="msb-item" />
              <div className="msb-item" />
              <div className="msb-item" />
            </div>
            <div className="mockup-main">
              <div className="mockup-topbar">
                <div>
                  <div className="m-title">Good morning, Amara</div>
                  <div className="m-sub">Thursday · 12 people on shift today</div>
                </div>
                <div className="m-avatar">A</div>
              </div>
              <div className="mockup-grid">
                <div className="m-card m-schedule">
                  <div className="m-card-head">Today&apos;s schedule</div>
                  <div className="m-shift">
                    <span className="m-time">07:00</span>
                    <span className="m-bar bar-a" style={{ '--w': '72%' }}>
                      Front desk · Tunde, Sofia
                    </span>
                  </div>
                  <div className="m-shift">
                    <span className="m-time">09:00</span>
                    <span className="m-bar bar-b" style={{ '--w': '88%' }}>
                      Floor team · 6 people
                    </span>
                  </div>
                  <div className="m-shift">
                    <span className="m-time">14:00</span>
                    <span className="m-bar bar-c" style={{ '--w': '56%' }}>
                      Late shift · Priya, Marcus
                    </span>
                  </div>
                  <div className="m-shift">
                    <span className="m-time">18:00</span>
                    <span className="m-bar bar-d" style={{ '--w': '40%' }}>
                      Close · Dana
                    </span>
                  </div>
                </div>
                <div className="m-card m-approvals">
                  <div className="m-card-head">Waiting on you</div>
                  <div className="m-req">
                    <div className="m-req-txt">
                      <strong>Leave request</strong>
                      <span>Sofia · 12–14 Aug</span>
                    </div>
                    <span className="m-chip chip-ok">Approve</span>
                  </div>
                  <div className="m-req">
                    <div className="m-req-txt">
                      <strong>Shift swap</strong>
                      <span>Tunde ⇄ Marcus</span>
                    </div>
                    <span className="m-chip chip-ok">Approve</span>
                  </div>
                  <div className="m-req done">
                    <div className="m-req-txt">
                      <strong>Overtime</strong>
                      <span>Priya · 2h</span>
                    </div>
                    <span className="m-chip chip-done">✓ Done</span>
                  </div>
                </div>
                <div className="m-card m-clock">
                  <div className="m-card-head">On the clock</div>
                  <div className="m-clock-time">07:32:18</div>
                  <div className="m-clock-sub">8 clocked in · 0 late</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mockup-float mf-1">
            <span className="mf-icon ok">✓</span>
            <div>
              <strong>Leave approved</strong>
              <span>Dana is off 21–22 Aug</span>
            </div>
          </div>
          <div className="mockup-float mf-2">
            <span className="mf-icon info">👋</span>
            <div>
              <strong>Kofi starts Monday</strong>
              <span>Onboarding 80% complete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
