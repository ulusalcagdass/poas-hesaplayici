import {
    Navbar,
    Hero,
    WhyNotROAS,
    HowItWorks,
    POASTargets,
    UseCases,
    FAQ,
    Footer,
} from '@/components/landing';

export default function LocaleHome() {
    return (
        <main>
            <Navbar />
            <Hero />
            <WhyNotROAS />
            <HowItWorks />
            <POASTargets />
            <UseCases />
            <FAQ />
            <Footer />
        </main>
    );
}
