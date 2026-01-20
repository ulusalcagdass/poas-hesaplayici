'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import HesaplayiciPage from '@/app/(dashboard)/hesaplayici/page';

export default function CalculatorPage() {
    const { setLanguage } = useLanguage();

    // Set language to English when this page loads
    useEffect(() => {
        setLanguage('en');
    }, [setLanguage]);

    return <HesaplayiciPage />;
}
