'use client';

import { useEffect, useState } from 'react';
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
    const { language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    // Set language to English when this page loads
    useEffect(() => {
        setLanguage('en');
        setMounted(true);
    }, [setLanguage]);

    // Show loading until language is set to prevent flash of Turkish content
    if (!mounted || language !== 'en') {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg)'
            }}>
                <div style={{ color: 'var(--color-text-muted)' }}>Loading...</div>
            </div>
        );
    }

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
