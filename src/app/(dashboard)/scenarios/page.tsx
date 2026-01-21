'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import SenaryolarPage from '../senaryolar/page';

export default function ScenariosPage() {
    const { setLanguage } = useLanguage();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setLanguage('en');
        setIsReady(true);
    }, [setLanguage]);

    if (!isReady) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px' }} />
            </div>
        );
    }

    return <SenaryolarPage />;
}
