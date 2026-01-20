'use client';

import { Calculator, Target, Layers, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function HowItWorks() {
    const { language } = useLanguage();

    const benefits = language === 'tr'
        ? [
            {
                icon: Calculator,
                title: 'Gerçek brüt kârı gör',
                description: 'Kargo, komisyon ve operasyon dahil tüm maliyetleri hesaba kat.',
                color: 'var(--color-info)',
            },
            {
                icon: Target,
                title: 'Hedef POAS\'a göre bütçe öğren',
                description: 'Maksimum reklam harcaman ne kadar olmalı? Anında hesapla.',
                color: 'var(--color-success)',
            },
            {
                icon: Layers,
                title: 'Senaryoları karşılaştır',
                description: 'Farklı kampanya senaryolarını kaydet ve yan yana karşılaştır.',
                color: 'var(--color-warning)',
            },
            {
                icon: FileText,
                title: 'Profesyonel raporla',
                description: 'PDF export ile yönetim ve müşterilerine sunumlar hazırla.',
                color: 'var(--color-primary)',
            },
        ]
        : [
            {
                icon: Calculator,
                title: 'See true gross profit',
                description: 'Account for all costs including shipping, fees, and operations.',
                color: 'var(--color-info)',
            },
            {
                icon: Target,
                title: 'Learn budget by target POAS',
                description: 'What should your maximum ad spend be? Calculate instantly.',
                color: 'var(--color-success)',
            },
            {
                icon: Layers,
                title: 'Compare scenarios',
                description: 'Save different campaign scenarios and compare them side by side.',
                color: 'var(--color-warning)',
            },
            {
                icon: FileText,
                title: 'Professional reporting',
                description: 'Create presentations for management and clients with PDF export.',
                color: 'var(--color-primary)',
            },
        ];

    return (
        <section
            id="how-it-works"
            className="section"
            style={{
                background: 'var(--color-bg)',
            }}
        >
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(99, 102, 241, 0.15)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <Calculator size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            {language === 'tr' ? 'Nasıl Çalışır' : 'How It Works'}
                        </span>
                    </div>

                    <h2 className="section-title">
                        {language === 'tr'
                            ? <>Kârlı kampanyayı <span className="text-gradient">30 saniyede</span> ayır.</>
                            : <>Identify profitable campaigns in <span className="text-gradient">30 seconds</span>.</>
                        }
                    </h2>
                    <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {language === 'tr'
                            ? 'Hesaplama değil, asıl değer: senaryo, hedef, rapor ve zaman kazancı.'
                            : 'Not just calculation—the real value: scenarios, targets, reports, and time savings.'}
                    </p>
                </div>

                {/* Formula Box */}
                <div
                    style={{
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                        padding: '1.5rem 2rem',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-xl)',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                        {language === 'tr' ? 'POAS Formülü' : 'POAS Formula'}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                        {language === 'tr'
                            ? 'POAS = Brüt Kâr / Reklam Harcaması'
                            : 'POAS = Gross Profit / Ad Spend'}
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem' }}>
                        {language === 'tr'
                            ? 'Brüt Kâr = Gelir − (Ürün Mly. + Kargo + Komisyon + Operasyon)'
                            : 'Gross Profit = Revenue − (Product Cost + Shipping + Fees + Ops)'}
                    </div>
                </div>

                {/* Benefits Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '1000px',
                        margin: '0 auto',
                    }}
                >
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    borderColor: benefit.color + '30',
                                }}
                            >
                                <div
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: 'var(--radius-lg)',
                                        background: benefit.color + '20',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <Icon size={24} style={{ color: benefit.color }} />
                                </div>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>
                                    {benefit.title}
                                </h4>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* ROAS vs POAS Comparison */}
                <div
                    style={{
                        maxWidth: '700px',
                        margin: '3rem auto 0',
                        textAlign: 'center',
                    }}
                >
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                        {language === 'tr' ? 'Neden ROAS değil POAS?' : 'Why POAS, not ROAS?'}
                    </h3>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                        }}
                        className="comparison-grid"
                    >
                        <div
                            className="glass-card"
                            style={{
                                padding: '1.25rem',
                                borderColor: 'var(--color-error)',
                                background: 'rgba(239, 68, 68, 0.05)',
                            }}
                        >
                            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-error)' }}>
                                ❌ ROAS
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {language === 'tr'
                                    ? 'Sadece gelire bakar. 5x ROAS ile zarar edebilirsin.'
                                    : 'Only looks at revenue. You can lose money with 5x ROAS.'}
                            </p>
                        </div>
                        <div
                            className="glass-card"
                            style={{
                                padding: '1.25rem',
                                borderColor: 'var(--color-success)',
                                background: 'rgba(16, 185, 129, 0.05)',
                            }}
                        >
                            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-success)' }}>
                                ✅ POAS
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {language === 'tr'
                                    ? 'Tüm maliyetleri hesaba katar. 1.5x POAS ile kâr edersin.'
                                    : 'Accounts for all costs. With 1.5x POAS, you profit.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link href={language === 'en' ? '/en/calculator' : '/tr/hesaplayici'} className="btn btn-primary btn-lg">
                        {language === 'tr' ? 'Hemen Hesapla' : 'Calculate Now'}
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
