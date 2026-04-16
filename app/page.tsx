import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ModelsSection from '@/components/sections/ModelsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ComparisonSection from '@/components/sections/ComparisonSection';

import PricingSection from '@/components/sections/PricingSection';
import BookingSection from '@/components/sections/BookingSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ModelsSection />
        <FeaturesSection />
        <ComparisonSection />
        <PricingSection />
        <BookingSection />
        <ContactSection />
      </main>
    </>
  );
}
