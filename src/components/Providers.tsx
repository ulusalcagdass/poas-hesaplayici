'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { LanguageProvider, type Language } from '@/lib/i18n';

interface ProvidersProps {
    children: ReactNode;
    initialLocale?: Language;
}

export default function Providers({ children, initialLocale }: ProvidersProps) {
    return (
        <SessionProvider>
            <LanguageProvider initialLocale={initialLocale}>
                {children}
            </LanguageProvider>
        </SessionProvider>
    );
}
