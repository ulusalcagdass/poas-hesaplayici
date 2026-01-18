'use client';

import Link from 'next/link';
import { Calculator, Home, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function DashboardSidebar() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <aside
            style={{
                width: '260px',
                background: 'var(--color-bg-secondary)',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 40,
            }}
            className="sidebar"
        >
            {/* Logo */}
            <div
                style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <Link
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: 'var(--color-text-primary)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--gradient-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Calculator size={18} />
                    </div>
                    <span>POAS</span>
                    <span style={{ color: 'var(--color-primary-light)' }}>{t('sidebar', 'logo')}</span>
                </Link>
            </div>

            {/* Language Selector - Landing Page Style */}
            <div
                style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--color-border)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        background: 'var(--color-bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.25rem',
                        gap: '0.25rem',
                    }}
                >
                    <button
                        onClick={() => setLanguage('tr')}
                        style={{
                            flex: 1,
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                            background: language === 'tr' ? 'var(--color-primary)' : 'transparent',
                            color: language === 'tr' ? 'white' : 'var(--color-text-muted)',
                        }}
                    >
                        TR
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        style={{
                            flex: 1,
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s ease',
                            background: language === 'en' ? 'var(--color-primary)' : 'transparent',
                            color: language === 'en' ? 'white' : 'var(--color-text-muted)',
                        }}
                    >
                        EN
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '1rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <span
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            padding: '0 0.75rem',
                        }}
                    >
                        {t('sidebar', 'mainMenu')}
                    </span>
                </div>

                <Link
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        transition: 'all 0.2s ease',
                        marginBottom: '0.25rem',
                    }}
                    className="nav-link"
                >
                    <Home size={20} />
                    {t('sidebar', 'home')}
                </Link>

                <Link
                    href="/hesaplayici"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.9375rem',
                        transition: 'all 0.2s ease',
                    }}
                    className="nav-link"
                >
                    <Calculator size={20} />
                    {t('sidebar', 'calculator')}
                </Link>
            </nav>

            {/* Footer */}
            <div
                style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--color-border)',
                }}
            >
                <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    textAlign: 'center'
                }}>
                    {t('sidebar', 'freeAndOpen')}
                </p>
            </div>
        </aside>
    );
}
