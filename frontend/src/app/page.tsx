import { AppShell } from '@/components/layout/AppShell';
import { HeroBanner } from '@/components/home/HeroBanner';
import { MarketplaceHero } from '@/components/home/MarketplaceHero';
import { OffersSection } from '@/components/home/OffersSection';
import { BrandSection } from '@/components/home/BrandSection';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ReferralBanner } from '@/components/home/ReferralBanner';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <AppShell>
      <main className="space-y-0 bg-[#f7f5f3] text-slate-900">
        <MarketplaceHero />
        <OffersSection />
        <BrandSection />
        <BenefitsSection />
        <HowItWorks />
        <ReferralBanner />
        <FAQSection />
      </main>
    </AppShell>
  );
}
