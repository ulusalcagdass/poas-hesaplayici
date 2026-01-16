'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Shield, CreditCard, Lock } from 'lucide-react';

const PLANS = {
    solo: {
        name: 'Solo',
        tagline: 'Tek marka için hızlı kârlılık kontrolü.',
        monthlyPrice: 499,
        yearlyPrice: 5090,
        users: 1,
        features: [
            '30 senaryo/ay',
            'PDF export',
            'Temel hedef POAS göstergesi',
            'Standart destek',
        ],
        popular: false,
    },
    pro: {
        name: 'Pro',
        tagline: 'Büyüme ve ekip kullanımı için ideal.',
        monthlyPrice: 999,
        yearlyPrice: 10190,
        users: 3,
        features: [
            'Sınırsız senaryo',
            'Hedef POAS + gelişmiş çıktılar',
            'CSV + PDF export',
            'Senaryo karşılaştırma',
            'Detaylı örnek hesaplama ekranı',
            'Öncelikli destek',
        ],
        popular: true,
    },
    agency: {
        name: 'Ajans',
        tagline: 'Ajanslar için müşteri bazlı raporlama.',
        monthlyPrice: 2499,
        yearlyPrice: 25490,
        users: 10,
        features: [
            'Sınırsız senaryo',
            'Workspace / müşteri bazlı organizasyon',
            'White-label rapor (logo ekleme)',
            '10 kullanıcı',
            'API erişimi (yakında)',
            'Öncelikli destek',
        ],
        popular: false,
    },
};

const formatPrice = (price: number): string => {
    return price.toLocaleString('tr-TR');
};

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const getPrice = (plan: typeof PLANS.solo) => {
        if (billingCycle === 'monthly') {
            return plan.monthlyPrice;
        }
        return Math.round(plan.yearlyPrice / 12);
    };

    const getFullPrice = (plan: typeof PLANS.solo) => {
        if (billingCycle === 'monthly') {
            return plan.monthlyPrice;
        }
        return plan.yearlyPrice;
    };

    return (
        <section
            id="pricing"
            className="section"
            style={{
                background: 'var(--gradient-dark)',
            }}
        >
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
                        <Sparkles size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            Fiyatlandırma
                        </span>
                    </div>

                    <h2 className="section-title">
                        İhtiyacınıza Uygun <span className="text-gradient">Plan</span> Seçin
                    </h2>
                    <p className="section-subtitle">
                        İstediğiniz zaman plan değiştirin veya iptal edin.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '3rem',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            background: 'var(--color-surface)',
                            borderRadius: 'var(--radius-full)',
                            padding: '4px',
                            gap: '4px',
                        }}
                    >
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            style={{
                                padding: '0.625rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: billingCycle === 'monthly' ? 'var(--gradient-primary)' : 'transparent',
                                color: billingCycle === 'monthly' ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            Aylık
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            style={{
                                padding: '0.625rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                background: billingCycle === 'yearly' ? 'var(--gradient-primary)' : 'transparent',
                                color: billingCycle === 'yearly' ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600,
                                fontSize: '0.9375rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            Yıllık
                            <span
                                style={{
                                    background: billingCycle === 'yearly' ? 'rgba(255,255,255,0.2)' : 'var(--color-success)',
                                    color: 'white',
                                    padding: '2px 8px',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                }}
                            >
                                %15 indirim
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '1100px',
                        margin: '0 auto',
                    }}
                    className="pricing-grid"
                >
                    {Object.entries(PLANS).map(([key, plan]) => (
                        <div
                            key={key}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                position: 'relative',
                                borderColor: plan.popular ? 'var(--color-primary)' : undefined,
                                boxShadow: plan.popular ? 'var(--shadow-glow)' : undefined,
                                transform: plan.popular ? 'scale(1.02)' : undefined,
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        padding: '0.25rem 1rem',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    En Popüler
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{plan.name}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', minHeight: '40px' }}>
                                {plan.tagline}
                            </p>

                            {/* Price */}
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>₺{formatPrice(getPrice(plan))}</span>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>/ay</span>
                            </div>

                            {/* Yearly breakdown */}
                            {billingCycle === 'yearly' && (
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                                    Yıllık ₺{formatPrice(getFullPrice(plan))} olarak faturalandırılır
                                </p>
                            )}
                            {billingCycle === 'monthly' && (
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                                    Aylık faturalandırma
                                </p>
                            )}

                            {/* Users */}
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                {plan.users} kullanıcı
                            </p>

                            {/* CTA Button */}
                            <Link
                                href={`/signup?plan=${key}&cycle=${billingCycle}`}
                                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ width: '100%', marginBottom: '1.5rem' }}
                            >
                                Planı Seç
                            </Link>

                            {/* Features */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.4rem 0',
                                            color: 'var(--color-text-secondary)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        <Check size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        marginTop: '3rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        <Shield size={18} style={{ color: 'var(--color-success)' }} />
                        <span>İptal istediğin zaman</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        <CreditCard size={18} style={{ color: 'var(--color-success)' }} />
                        <span>Güvenli ödeme</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                        <Lock size={18} style={{ color: 'var(--color-success)' }} />
                        <span>Verilerin korunur</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 900px) {
                    .pricing-grid {
                        grid-template-columns: 1fr !important;
                        max-width: 400px !important;
                    }
                }
            `}</style>
        </section>
    );
}
