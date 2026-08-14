'use client';

import { useEffect } from 'react';

// Ordered list of vendor + main scripts, mirroring the original home-3.html load order.
const SCRIPTS = [
  'jquery-3.7.1.min.js',
  'bootstrap.bundle.min.js',
  'swiper.min.js',
  'wow.min.js',
  'appear.js',
  'imagesloaded.pkgd.min.js',
  'isotope.pkgd.min.js',
  'jquery.nice-select.min.js',
  'jquery.marquee.min.js',
  'jquery.magnific-popup.min.js',
  'jqueryui.js',
  'odometer.min.js',
  'parallaxie.js',
  'parallax.min.js',
  'parallax-scroll.js',
  'easing.min.js',
  'scrollspy.js',
  'plugin.js',
  'lenis.js',
  'main.js',
];

const BASE = '/sastik/assets/js/';

export default function SastikScripts() {
  useEffect(() => {
    // Add the body class the template relies on for CSS variables / container width.
    document.body.classList.add('automation-saas');

    let cancelled = false;
    const appended = [];

    function loadScript(src) {
      return new Promise((resolve) => {
        // Avoid double-injecting if already present.
        const existing = document.querySelector(`script[data-sastik="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const s = document.createElement('script');
        s.src = BASE + src;
        s.async = false;
        s.defer = false;
        s.setAttribute('data-sastik', src);
        s.onload = () => resolve();
        s.onerror = () => {
          // Resolve anyway so the chain continues; log for debugging.
          console.warn('[SastikScripts] failed to load', src);
          resolve();
        };
        document.body.appendChild(s);
        appended.push(s);
      });
    }

    (async () => {
      for (const src of SCRIPTS) {
        if (cancelled) return;
        await loadScript(src);
      }
      if (cancelled) return;
      // The template's main.js binds preloader + reveal animations to window 'load'.
      // In Next the page has already fired 'load' before these scripts run, so
      // dispatch it again to kick off the reveal / preloader sequence.
      window.dispatchEvent(new Event('load'));
    })();

    return () => {
      cancelled = true;
      document.body.classList.remove('automation-saas');
    };
  }, []);

  return null;
}
