/* Shared pieces for the nav subpages, so five pages stay one design.

   PageShell: nav, tinted title band on the hero's surface with the solid
   rails, then the page's own sections, then the demo CTA and footer. Every
   subpage is the deeper read of a homepage face, so the chrome never changes.

   Kicker + h1 sit flush to the frame's left line, same as the section
   headers on the home page. */

import Nav from './Nav';
import Footer from './Footer';
import Cta from './Cta';
import CloseCta from './CloseCta';
import './PageBits.css';

export function PageShell({ kicker, title, lede, children, close = true }) {
  return (
    <>
      <Nav />
      <main>
        <header className="page-hero has-rails">
          <div className="container">
            <span className="sec-eyebrow">{kicker}</span>
            <h1>{title}</h1>
            {lede ? <p className="page-lede">{lede}</p> : null}
          </div>
        </header>
        {children}
        {close ? <CloseCta /> : null}
        <Cta />
      </main>
      <Footer />
    </>
  );
}

/* A bordered feature split for subpage sections: copy one side, a visual the
   other, alternating. Wraps the existing frame vocabulary. */
export function PageSplit({ id, kicker, title, children, visual, flip = false }) {
  return (
    <section className="page-split" id={id}>
      <div className="container">
        <div className={`ps-box${flip ? ' ps-box--flip' : ''}`}>
          <div className="ps-copy">
            {kicker ? <span className="ps-kicker">{kicker}</span> : null}
            <h2>{title}</h2>
            {children}
          </div>
          <div className="ps-visual">{visual}</div>
        </div>
      </div>
    </section>
  );
}
