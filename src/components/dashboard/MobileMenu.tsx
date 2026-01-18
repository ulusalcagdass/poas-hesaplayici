'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, Home, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function MobileMenu() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Header */}
            <header
                className="mobile-header"
                style={{
                    display: 'none',
                    padding: '1rem',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'var(--color-bg-secondary)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 40,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label={language === 'tr' ? 'Menüyü aç' : 'Open menu'}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        minWidth: '44px',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Menu size={24} />
                </button>

                {/* Language Toggle in Header */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                        onClick={() => setLanguage('tr')}
                        style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: language === 'tr' ? 'var(--gradient-primary)' : 'var(--color-surface)',
                            color: language === 'tr' ? 'white' : 'var(--color-text-muted)',
                        }}
                    >
                        TR
                    </button>
                    <button
                        onClick={() => setLanguage('en')}
                        style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: language === 'en' ? 'var(--gradient-primary)' : 'var(--color-surface)',
                            color: language === 'en' ? 'white' : 'var(--color-text-muted)',
                        }}
                    >
                        EN
                    </button>
                </div>
            </header>

            {/* Full-screen Mobile Menu Overlay */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.98)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeMenu();
                    }}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label={language === 'tr' ? 'Menüyü kapat' : 'Close menu'}
                        style={{
                            alignSelf: 'flex-end',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-primary)',
                            padding: '0.75rem',
                            cursor: 'pointer',
                            minWidth: '48px',
                            minHeight: '48px',
                        }}
                    >
                        <X size={24} />
                    </button>

                    {/* Logo */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Calculator size={22} />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>
                            POAS <span style={{ color: 'var(--color-primary-light)' }}>{t('sidebar', 'logo')}</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                        <Link
                            href="/"
                            onClick={closeMenu}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                                fontSize: '1.125rem',
                                borderRadius: 'var(--radius-md)',
                                transition: 'background 0.2s',
                            }}
                        >
                            <Home size={22} />
                            {t('sidebar', 'home')}
                        </Link>
                        <Link
                            href="/hesaplayici"
                            onClick={closeMenu}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem',
                                color: 'var(--color-text-secondary)',
                                textDecoration: 'none',
                                fontSize: '1.125rem',
                                borderRadius: 'var(--radius-md)',
                                transition: 'background 0.2s',
                            }}
                        >
                            <Calculator size={22} />
                            {t('sidebar', 'calculator')}
                        </Link>
                    </nav>

                    {/* Language Selector in Menu */}
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <Globe size={16} style={{ color: 'var(--color-text-muted)' }} />
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                                {language === 'tr' ? 'Dil' : 'Language'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setLanguage('tr')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    background: language === 'tr' ? 'var(--gradient-primary)' : 'var(--color-surface)',
                                    color: language === 'tr' ? 'white' : 'var(--color-text-muted)',
                                }}
                            >
                                🇹🇷 Türkçe
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    background: language === 'en' ? 'var(--gradient-primary)' : 'var(--color-surface)',
                                    color: language === 'en' ? 'white' : 'var(--color-text-muted)',
                                }}
                            >
                                🇬🇧 English
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        padding: '1rem'
                    }}>
                        {t('sidebar', 'freeAndOpen')}
                    </p>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-header {
                        display: flex !important;
                    }
                }
            `}</style>
        </>
    );
}
