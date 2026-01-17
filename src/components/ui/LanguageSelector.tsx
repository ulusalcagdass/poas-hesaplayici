'use client';

import { useLanguage, Language } from '@/lib/i18n';

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    const handleChange = (lang: Language) => {
        setLanguage(lang);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '0.25rem',
                border: '1px solid var(--color-border)',
            }}
        >
            <button
                type="button"
                onClick={() => handleChange('tr')}
                style={{
                    padding: '0.375rem 0.625rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: language === 'tr' ? 'var(--color-primary)' : 'transparent',
                    color: language === 'tr' ? 'white' : 'var(--color-text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
            >
                TR
            </button>
            <button
                type="button"
                onClick={() => handleChange('en')}
                style={{
                    padding: '0.375rem 0.625rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: language === 'en' ? 'var(--color-primary)' : 'transparent',
                    color: language === 'en' ? 'white' : 'var(--color-text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
            >
                EN
            </button>
        </div>
    );
}
