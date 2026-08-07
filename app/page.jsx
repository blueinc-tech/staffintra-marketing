import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Splits from '../components/Splits';
import FeatureGrid from '../components/FeatureGrid';
import Stats from '../components/Stats';
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
        <Splits />
        <FeatureGrid />
        <Stats />
        <Quotes />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
