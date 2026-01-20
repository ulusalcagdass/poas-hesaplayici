'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator } from 'lucide-react';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/lib/i18n';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle language change with URL redirect
    const handleLanguageChange = (lang: 'tr' | 'en') => {
        setLanguage(lang);
        if (lang === 'en') {
            if (pathname === '/' || pathname === '/en') router.push('/en');
            else if (pathname === '/hesaplayici' || pathname === '/calculator') router.push('/calculator');
        } else {
            if (pathname === '/' || pathname === '/en') router.push('/');
            else if (pathname === '/hesaplayici' || pathname === '/calculator') router.push('/hesaplayici');
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle ESC key to close menu
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        if (isMobileMenuOpen) {
            window.addEventListener('keydown', handleEsc);
            // Scroll lock
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const navLinks = language === 'tr'
        ? [
            { href: '#features', label: 'Özellikler' },
            { href: '#how-it-works', label: 'Nasıl Çalışır' },
            { href: '#faq', label: 'SSS' },
        ]
        : [
            { href: '#features', label: 'Features' },
            { href: '#how-it-works', label: 'How It Works' },
            { href: '#faq', label: 'FAQ' },
        ];

    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    transition: 'all 0.3s ease',
                    background: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    borderBottom: isScrolled ? '1px solid rgba(71, 85, 105, 0.5)' : 'none',
                }}
            >
                <div className="container">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: '72px',
                        }}
                    >
                        {/* Logo */}
                        <Link
                            href="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                textDecoration: 'none',
                                color: 'var(--color-text-primary)',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                            }}
                        >
                            <div
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Calculator size={20} />
                            </div>
                            <span>POAS</span>
                            <span style={{ color: 'var(--color-primary-light)' }}>{language === 'tr' ? 'Hesaplayıcı' : 'Calculator'}</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem',
                            }}
                            className="desktop-nav"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                }}
                            >
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        style={{
                                            color: 'var(--color-text-secondary)',
                                            textDecoration: 'none',
                                            fontSize: '0.9375rem',
                                            fontWeight: 500,
                                            transition: 'color 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                }}
                            >
                                <LanguageSelector />
                                <Link href={language === 'tr' ? '/hesaplayici' : '/calculator'} className="btn btn-primary">
                                    {language === 'tr' ? 'Hesapla' : 'Calculate'}
                                </Link>
                            </div>
                        </div>

                        {/* Mobile: Language Toggle (next to logo) */}
                        <div
                            style={{
                                display: 'none',
                                alignItems: 'center',
                                marginLeft: '0.75rem',
                            }}
                            className="mobile-lang-toggle"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    background: 'var(--color-bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.2rem',
                                    gap: '0.15rem',
                                }}
                            >
                                <button
                                    onClick={() => handleLanguageChange('tr')}
                                    style={{
                                        padding: '0.35rem 0.6rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: language === 'tr' ? 'var(--color-primary)' : 'transparent',
                                        color: language === 'tr' ? 'white' : 'var(--color-text-muted)',
                                    }}
                                >
                                    TR
                                </button>
                                <button
                                    onClick={() => handleLanguageChange('en')}
                                    style={{
                                        padding: '0.35rem 0.6rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: language === 'en' ? 'var(--color-primary)' : 'transparent',
                                        color: language === 'en' ? 'white' : 'var(--color-text-muted)',
                                    }}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        {/* Mobile: Hamburger Menu Button (far right) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                            aria-expanded={isMobileMenuOpen}
                            style={{
                                display: 'none',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-text-primary)',
                                cursor: 'pointer',
                                padding: '0.75rem',
                                minWidth: '48px',
                                minHeight: '48px',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                            }}
                            className="mobile-menu-btn"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Full-screen Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeMobileMenu();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gezinme menüsü"
                >
                    {/* Close button */}
                    <button
                        onClick={closeMobileMenu}
                        aria-label="Menüyü kapat"
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

                    {/* Navigation Links */}
                    <div className="mobile-menu-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mobile-menu-cta">
                        <Link
                            href={language === 'tr' ? '/hesaplayici' : '/calculator'}
                            onClick={closeMobileMenu}
                            className="btn btn-primary btn-lg"
                        >
                            {language === 'tr' ? 'Hesapla' : 'Calculate'}
                        </Link>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                    }
                }
            `}</style>
        </>
    );
}

