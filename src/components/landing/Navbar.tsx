'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#features', label: 'Özellikler' },
        { href: '#how-it-works', label: 'Nasıl Çalışır' },
        { href: '#pricing', label: 'Fiyatlandırma' },
        { href: '#faq', label: 'SSS' },
    ];

    return (
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
                        <span style={{ color: 'var(--color-primary-light)' }}>Hesaplayıcı</span>
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
                            <Link href="/login" className="btn btn-ghost">
                                Giriş Yap
                            </Link>
                            <Link href="/signup" className="btn btn-primary">
                                Ücretsiz Başla
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            display: 'none',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-primary)',
                            cursor: 'pointer',
                            padding: '0.5rem',
                        }}
                        className="mobile-menu-btn"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '72px',
                            left: 0,
                            right: 0,
                            background: 'rgba(15, 23, 42, 0.98)',
                            backdropFilter: 'blur(12px)',
                            borderBottom: '1px solid rgba(71, 85, 105, 0.5)',
                            padding: '1.5rem',
                        }}
                        className="mobile-menu"
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        color: 'var(--color-text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        padding: '0.5rem 0',
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0.5rem 0' }} />
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    padding: '0.5rem 0',
                                }}
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                href="/signup"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn btn-primary"
                                style={{ marginTop: '0.5rem' }}
                            >
                                Ücretsiz Başla
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
        </nav>
    );
}
