'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calculator, FileText, LogOut, User, Home } from 'lucide-react';

interface MobileMenuProps {
    userName: string | null;
    userEmail: string | null;
}

export default function MobileMenu({ userName, userEmail }: MobileMenuProps) {
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

                    {/* User Info */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <User size={20} />
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <div
                                style={{
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {userName || 'Kullanıcı'}
                            </div>
                            <div
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--color-text-muted)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {userEmail}
                            </div>
                        </div>
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
                        <Link
                            href="/senaryolar"
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
                            <FileText size={22} />
                            Senaryolarım
                        </Link>
                    </nav>

                    {/* Logout Button */}
                    <form action="/api/auth/signout" method="POST">
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                padding: '1rem',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-muted)',
                                fontSize: '1rem',
                                cursor: 'pointer',
                            }}
                        >
                            <LogOut size={18} />
                            Çıkış Yap
                        </button>
                    </form>
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
