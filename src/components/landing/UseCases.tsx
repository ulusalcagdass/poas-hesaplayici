'use client';

import { Building2, ShoppingBag, BarChart3, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function UseCases() {
    const { t } = useLanguage();

    const cases = [
        {
            icon: Building2,
            titleKey: 'agencyTitle',
            descKey: 'agencyDesc',
            features: ['agencyF1', 'agencyF2', 'agencyF3'],
        },
        {
            icon: ShoppingBag,
            titleKey: 'ecomTitle',
            descKey: 'ecomDesc',
            features: ['ecomF1', 'ecomF2', 'ecomF3'],
        },
        {
            icon: BarChart3,
            titleKey: 'productTitle',
            descKey: 'productDesc',
            features: ['productF1', 'productF2', 'productF3'],
        },
        {
            icon: Layers,
            titleKey: 'budgetTitle',
            descKey: 'budgetDesc',
            features: ['budgetF1', 'budgetF2', 'budgetF3'],
        },
    ];

    return (
        <section className="section" style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(14, 165, 233, 0.15)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <Layers size={16} style={{ color: 'var(--color-secondary)' }} />
                        <span style={{ color: 'var(--color-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                            {t('useCases', 'badge')}
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">{t('useCases', 'title')}</span> {t('useCases', 'titleEnd')}
                    </h2>
                    <p className="section-subtitle">
                        {t('useCases', 'subtitle')}
                    </p>
                </div>

                {/* Use Case Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {cases.map((useCase, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'var(--gradient-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.25rem',
                                }}
                            >
                                <useCase.icon size={28} color="white" />
                            </div>

                            {/* Content */}
                            <h4 style={{ marginBottom: '0.75rem' }}>{t('useCases', useCase.titleKey)}</h4>
                            <p
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9375rem',
                                    lineHeight: 1.6,
                                    marginBottom: '1.25rem',
                                    flex: 1,
                                }}
                            >
                                {t('useCases', useCase.descKey)}
                            </p>

                            {/* Features */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                }}
                            >
                                {useCase.features.map((featureKey, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            background: 'var(--color-bg)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            color: 'var(--color-text-muted)',
                                        }}
                                    >
                                        {t('useCases', featureKey)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
