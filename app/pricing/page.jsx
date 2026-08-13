import { PageShell } from '../../components/PageBits';
import Pricing from '../../components/Pricing';

export const metadata = {
  title: 'StaffIntra: Pricing',
  description: 'Per person, per month pricing in naira, free to start with no card and no setup fee.',
};

export default function PricingPage() {
  return (
    <PageShell
      kicker="Pricing"
      title="Simple pricing that grows with you."
      lede="Per person, per month, in naira. Free to start, no card, and no setup fee."
      close={false}
    >
      <Pricing />
    </PageShell>
  );
}
