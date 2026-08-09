import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Pillars from '../components/Pillars';
import Workforce from '../components/Workforce';
import FeatureGrid from '../components/FeatureGrid';
import Stats from '../components/Stats';
import Pricing from '../components/Pricing';
import Quotes from '../components/Quotes';
import Cta from '../components/Cta';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Pillars />
        <Workforce />
        <FeatureGrid />
        <Stats />
        <Pricing />
        <Quotes />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
