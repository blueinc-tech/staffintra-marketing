import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Pillars from '../components/Pillars';
import Audiences from '../components/Audiences';
import Snapshot from '../components/Snapshot';
import Integrations from '../components/Integrations';
import CloseCta from '../components/CloseCta';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

/* Section order follows the v3 landing: hero, trusted band, products,
   audiences, platform snapshot, integrations, closing CTA. The demo form
   stays because the brief is lead generation; pricing moved to /pricing.
   Superseded sections (Workforce, Stories, Platform trio, Support, Insights)
   stay on disk; Support and Insights render on the subpages instead. */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Pillars />
        <Audiences />
        <Snapshot />
        <Integrations />
        <CloseCta />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
