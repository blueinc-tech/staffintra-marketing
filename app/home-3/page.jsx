import Header from '@/components/sastik/Header';
import Hero from '@/components/sastik/Hero';
import Problem from '@/components/sastik/Problem';
import Solution from '@/components/sastik/Solution';
import Feature from '@/components/sastik/Feature';
import Work from '@/components/sastik/Work';
import Integration from '@/components/sastik/Integration';
import Introduction from '@/components/sastik/Introduction';
import Pricing from '@/components/sastik/Pricing';
import Testimonials from '@/components/sastik/Testimonials';
import Security from '@/components/sastik/Security';
import Faq from '@/components/sastik/Faq';
import Cta from '@/components/sastik/Cta';
import Brand from '@/components/sastik/Brand';
import Footer from '@/components/sastik/Footer';
import SastikScripts from '@/components/sastik/SastikScripts';

export const metadata = {
  title: 'AI Automation for Faster Business Operations',
  description:
    'Automate repetitive business operations with AI. Join 1,000+ businesses growing with confidence — faster workflows, smarter integrations, and secure automation.',
  openGraph: {
    title: 'AI Automation for Faster Business Operations',
    description:
      'Automate repetitive business operations with AI. Join 1,000+ businesses growing with confidence — faster workflows, smarter integrations, and secure automation.',
    type: 'website',
  },
  icons: {
    icon: '/sastik/assets/img/favicon.svg',
  },
};

const SASTIK_CSS = [
  'bootstrap.min.css',
  'fontawesome.css',
  'animate.css',
  'swiper.min.css',
  'odometer.css',
  'nice-select.css',
  'custom-fonts.css',
  'magnific-popup.css',
  'jquery-ui.css',
  'main.css',
  'sastik-overrides.css',
];

export default function Home3Page() {
  return (
    <>
      {SASTIK_CSS.map((href) => (
        <link key={href} rel="stylesheet" href={`/sastik/assets/css/${href}`} />
      ))}

      {/* backtotop-start */}
      <div className="xb-backtotop">
        <a href="#" className="scroll">
          <i className="far fa-arrow-up"></i>
        </a>
      </div>
      {/* backtotop-end */}

      {/* Preloader - Start */}
      <div id="preloader" className="xb-loader">
        <div className="xb-loader-inner">
          <div className="xb-loader-logo">
            <img src="/sastik/assets/img/logo/comparison-logo.svg" alt="logo" />
          </div>
        </div>
      </div>
      {/* Preloader - End */}

      <div className="body_wrap">
        <Header />

        <div className="body-overlay"></div>

        <main>
          <Hero />

          <div className="as-body-inner mxw-1339 mb-120">
            {/* site line */}
            <div className="as-site-line">
              <div className="line line--1">
                <img src="/sastik/assets/img/shape/side-stroke.png" alt="line shape" />
              </div>
              <div className="line line--2">
                <img src="/sastik/assets/img/shape/side-stroke.png" alt="line shape" />
              </div>
            </div>

            <Problem />
            <Solution />
            <Feature />
            <Work />
            <Integration />
            <Introduction />
          </div>

          <Pricing />

          <div className="as-body-inner mxw-1339 mt-120 mb-120">
            {/* site line */}
            <div className="as-site-line">
              <div className="line line--1">
                <img src="/sastik/assets/img/shape/side-stroke.png" alt="line shape" />
              </div>
              <div className="line line--2">
                <img src="/sastik/assets/img/shape/side-stroke.png" alt="line shape" />
              </div>
            </div>

            <Testimonials />
            <Security />
            <Faq />
          </div>

          <Cta />
          <Brand />
        </main>

        <Footer />
      </div>

      <SastikScripts />
    </>
  );
}
