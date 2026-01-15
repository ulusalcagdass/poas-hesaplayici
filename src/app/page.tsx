import {
  Navbar,
  Hero,
  WhyNotROAS,
  HowItWorks,
  POASTargets,
  UseCases,
  Pricing,
  FAQ,
  Footer,
} from '@/components/landing';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyNotROAS />
      <HowItWorks />
      <POASTargets />
      <UseCases />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
