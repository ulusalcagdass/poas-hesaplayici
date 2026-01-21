'use client';

import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function SoftCTA() {
    const { t } = useLanguage();

    return (
        <div
            style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                textAlign: 'center',
            }}
        >
            <p style={{
                fontSize: '0.8125rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '0.5rem',
            }}>
                {t('softCta', 'text')}
            </p>
            <a
                href="https://www.linkedin.com/in/ulusal-%C3%A7a%C4%9Fda%C5%9F-%C3%A7al%C4%B1m-2889281b4/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-primary-light)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'opacity 0.2s ease',
                }}
            >
                <Linkedin size={16} />
                {t('softCta', 'link')}
            </a>
            <a
                href="mailto:ulusalcagdass@gmail.com"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    marginTop: '0.5rem',
                    transition: 'opacity 0.2s ease',
                }}
            >
                <Mail size={14} />
                {t('softCta', 'email')}
            </a>
        </div>
    );
}
