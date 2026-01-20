'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
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

export default function EnglishHome() {
    const { setLanguage } = useLanguage();

    // Set language to English when this page loads
    useEffect(() => {
        setLanguage('en');
    }, [setLanguage]);

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
