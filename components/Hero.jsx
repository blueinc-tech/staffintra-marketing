import HeroMockup from './HeroMockup';
import HeroArt from './HeroArt';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow anim-in" style={{ '--d': 0 }}>
            <span className="eyebrow-dot" /> The connected workforce platform
          </span>
          <h1 className="anim-in" style={{ '--d': 1 }}>
            One workspace for
            <br />
            your <span className="accent">whole team</span>.
          </h1>
          <p className="hero-sub anim-in" style={{ '--d': 2 }}>
            How modern operators manage rotas, leave, onboarding, and time in one place.
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

        <div className="hero-visual anim-in" style={{ '--d': 5 }}>
          <HeroMockup />
        </div>
      </div>

      {/* Sits behind the copy, on the section's ground plane. */}
      <HeroArt />
    </section>
  );
}
