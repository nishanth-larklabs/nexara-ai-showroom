import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        {/* Placeholder sections — each will become a full component */}
        <section id="models" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Our Models
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>

        <section id="features" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Features
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>

        <section id="comparison" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Compare Models
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>

        <section id="pricing" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Pricing
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>

        <section id="booking" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Book a Test Drive
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>

        <section id="contact" className="section-container">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground">Coming soon…</p>
        </section>
      </main>
    </>
  );
}
