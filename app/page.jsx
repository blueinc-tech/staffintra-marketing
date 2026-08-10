import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Pillars from '../components/Pillars';
import Workforce from '../components/Workforce';
import Stories from '../components/Stories';
import Platform from '../components/Platform';
import Integrations from '../components/Integrations';
import Support from '../components/Support';
import Insights from '../components/Insights';
import Pricing from '../components/Pricing';
import CloseCta from '../components/CloseCta';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

/* Section order follows the reference, with pricing kept because we were asked
   for it and the demo form kept because the brief is lead generation. The old
   Splits, FeatureGrid, Stats and Quotes sections are superseded by Pillars,
   Platform and Stories; their files are still on disk but no longer rendered. */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Pillars />
        <Workforce />
        <Stories />
        <Platform />
        <Integrations />
        <Support />
        <Insights />
        <Pricing />
        <CloseCta />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
