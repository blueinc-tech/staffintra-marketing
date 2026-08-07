'use client';

import PillNav from './PillNav';

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#features', label: 'Features' },
  { href: '#customers', label: 'Customers' },
];

export default function Nav() {
  return (
    <header id="top">
      <PillNav
        logo={<img src="/assets/StaffIntra_Logo_Horizontal_Purple.svg" alt="StaffIntra" />}
        logoAlt="StaffIntra"
        items={LINKS}
        activeHref="#product"
        className="site-pill-nav"
        ease="cubic-bezier(.22,.61,.36,1)"
        baseColor="#ffffff"
        pillColor="#4024C0"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#17171C"
        theme="light"
        initialLoadAnimation={false}
      />
    </header>
  );
}
