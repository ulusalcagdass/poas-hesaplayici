'use client';

import Link from 'next/link';
import { FileText, Calculator, History, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ReviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
            {/* Header */}
            <header
                style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--color-text-muted)',
                            textDecoration: 'none',
                        }}
                    >
                        <ArrowLeft size={18} />
                        Ana Sayfa
                    </Link>
                    <span style={{ color: 'var(--color-border)' }}>|</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary-light)' }}>
                        📋 POAS İnceleme Dokümantasyonu
                    </span>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(16, 185, 129, 0.15)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--color-success)',
                        fontSize: '0.875rem',
                    }}
                >
                    <CheckCircle size={16} />
                    PDF Uyumu: %100
                </div>
            </header>

            {/* Navigation */}
            <nav
                style={{
                    padding: '1rem 2rem',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                }}
            >
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link
                        href="/review/poas-formulas"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--color-primary-light)',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                        }}
                    >
                        <FileText size={16} />
                        Formüller
                    </Link>
                    <Link
                        href="/review/example"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--color-primary-light)',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                        }}
                    >
                        <Calculator size={16} />
                        Örnek Hesaplama
                    </Link>
                    <Link
                        href="/review/changelog"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(99, 102, 241, 0.1)',
                            color: 'var(--color-primary-light)',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                        }}
                    >
                        <History size={16} />
                        Değişiklikler
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                {children}
            </main>
        </div>
    );
}
