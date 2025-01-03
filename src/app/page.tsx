import Benefits from "@/components/landing-page/benefits";
import CTA from "@/components/landing-page/cta";
import FAQ from "@/components/landing-page/faq";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";
import HowItWorks from "@/components/landing-page/how-it-works";
import Pricing from "@/components/landing-page/pricing";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
