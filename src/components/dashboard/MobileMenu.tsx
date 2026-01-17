'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, Home } from 'lucide-react';

export default function MobileMenu() {
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
                }}
            >
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Menüyü aç"
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
                            POAS <span style={{ color: 'var(--color-primary-light)' }}>Hesap</span>
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
                            Ana Sayfa
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
                            Hesaplayıcı
                        </Link>
                    </nav>

                    {/* Footer */}
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        padding: '1rem'
                    }}>
                        Ücretsiz ve herkese açık
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
