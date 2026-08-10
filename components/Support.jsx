import { CoverageArt, SetupArt } from './SupportArt';
import './Support.css';

/* Label in its own narrow column at the frame's edge, everything else in a
   column beside it. It is the one section on the page laid out that way, and
   the reference does the same. */
export default function Support() {
  return (
    <section className="support">
      <div className="container">
        <div className="sup-row">
          <span className="sec-eyebrow sup-label">Support</span>

          <div className="sup-main">
            <h2>Get answers in minutes, not weeks.</h2>

            <div className="sup-cards">
              <article className="sup-card">
                <h3>UK-based support</h3>
                <p>
                  Our support team answers from the UK, with hands-on onboarding and training,
                  and fast replies by phone, email, or in-app chat.
                </p>
                <div className="sup-art">
                  <CoverageArt />
                </div>
              </article>

              <article className="sup-card">
                <h3>Managed setup</h3>
                <p>
                  We import your people, build your first rota alongside you, and stay on the
                  line until the first pay run has landed.
                </p>
                <div className="sup-art">
                  <SetupArt />
                </div>
              </article>
            </div>

            <a className="band-bar sup-bar" href="#demo">
              <span>Meet your support team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
