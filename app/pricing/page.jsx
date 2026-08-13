import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Cta from '../../components/Cta';
import PricingMatrix from '../../components/PricingMatrix';
import PricingFaq from '../../components/PricingFaq';

export const metadata = {
  title: 'StaffIntra: Pricing',
  description:
    'Per person, per month pricing in naira, free to start with no card and no setup fee. Compare Core, Plus, Complete and Enterprise.',
};

/* Deliberately not on PageShell.

   A buyer here is comparing tiers, not being introduced to the product, so
   this page is built around the matrix instead of around prose blocks: a
   tight header, then the comparison, then the objections. The tinted title
   band and the bordered feature splits both belong to the pages that explain
   things, and using them here would put 400px of preamble above the thing
   the visitor came for. */
export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <header className="pricing-hero">
          <div className="container">
            <span className="sec-eyebrow">Pricing</span>
            <h1>Pick the tier, not the sales call.</h1>
            <p>
              Every plan priced per person, per month, in naira. Free for 30 days on any of them,
              with no card and no setup fee. The full comparison is below, nothing held back for a
              quote.
            </p>
          </div>
        </header>

        <PricingMatrix />
        <PricingFaq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
