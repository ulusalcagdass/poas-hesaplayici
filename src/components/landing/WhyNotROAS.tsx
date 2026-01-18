'use client';

import { AlertTriangle, TrendingDown, DollarSign, Package, CreditCard, Truck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function WhyNotROAS() {
    const { t } = useLanguage();

    const problems = [
        {
            icon: Package,
            titleKey: 'cogsTitle',
            descKey: 'cogsDesc',
        },
        {
            icon: Truck,
            titleKey: 'shippingTitle',
            descKey: 'shippingDesc',
        },
        {
            icon: CreditCard,
            titleKey: 'feesTitle',
            descKey: 'feesDesc',
        },
        {
            icon: DollarSign,
            titleKey: 'discountsTitle',
            descKey: 'discountsDesc',
        },
    ];

    return (
        <section
            id="features"
            className="section"
            style={{
                background: 'var(--gradient-dark)',
            }}
        >
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(239, 68, 68, 0.15)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <AlertTriangle size={16} style={{ color: 'var(--color-error)' }} />
                        <span style={{ color: 'var(--color-error)', fontSize: '0.875rem', fontWeight: 600 }}>
                            {t('whyNotRoas', 'badge')}
                        </span>
                    </div>

                    <h2 className="section-title">
                        {t('whyNotRoas', 'title')} <span style={{ color: 'var(--color-error)' }}>{t('whyNotRoas', 'titleHighlight')}</span> {t('whyNotRoas', 'titleEnd')}
                    </h2>
                    <p className="section-subtitle">
                        {t('whyNotRoas', 'subtitle')}
                    </p>
                </div>

                {/* Comparison Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '4rem',
                    }}
                >
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{
                                background: 'rgba(239, 68, 68, 0.05)',
                                borderColor: 'rgba(239, 68, 68, 0.2)',
                            }}
                        >
                            <div
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: 'var(--radius-lg)',
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1rem',
                                }}
                            >
                                <problem.icon size={24} style={{ color: 'var(--color-error)' }} />
                            </div>
                            <h4 style={{ marginBottom: '0.5rem' }}>{t('whyNotRoas', problem.titleKey)}</h4>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                                {t('whyNotRoas', problem.descKey)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Visual Comparison */}
                <div
                    className="glass-card"
                    style={{
                        padding: '2rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr',
                            gap: '2rem',
                            alignItems: 'center',
                        }}
                        className="comparison-grid"
                    >
                        {/* ROAS Side */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {t('whyNotRoas', 'roasCalc')}
                            </div>
                            <div
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                }}
                            >
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                    {t('whyNotRoas', 'roasExample')}
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-error)' }}>
                                    5x
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                    {t('whyNotRoas', 'looksGreat')}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <TrendingDown size={20} style={{ color: 'var(--color-error)' }} />
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-error)', marginTop: '0.25rem' }}>
                                    {t('whyNotRoas', 'costsIgnored')}
                                </div>
                            </div>
                        </div>

                        {/* VS */}
                        <div
                            style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'var(--color-surface)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                color: 'var(--color-text-muted)',
                                border: '2px solid var(--color-border)',
                            }}
                        >
                            VS
                        </div>

                        {/* POAS Side */}
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--color-text-muted)',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {t('whyNotRoas', 'poasCalc')}
                            </div>
                            <div
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(16, 185, 129, 0.2)',
                                }}
                            >
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                    {t('whyNotRoas', 'poasExample')}
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                    1.75x
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                    {t('whyNotRoas', 'realProfit')}
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <DollarSign size={20} style={{ color: 'var(--color-success)' }} />
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', marginTop: '0.25rem' }}>
                                    {t('whyNotRoas', 'costsIncluded')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div
                        style={{
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'var(--color-bg)',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '0.875rem',
                        }}
                    >
                        <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                            {t('whyNotRoas', 'costBreakdown')}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                {t('whyNotRoas', 'cogs')}: <strong>4.000₺</strong>
                            </span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                {t('whyNotRoas', 'shipping')}: <strong>1.500₺</strong>
                            </span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                {t('whyNotRoas', 'commission')}: <strong>500₺</strong>
                            </span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                {t('whyNotRoas', 'operations')}: <strong>500₺</strong>
                            </span>
                            <span style={{ color: 'var(--color-primary-light)' }}>
                                = {t('whyNotRoas', 'grossProfit')}: <strong>3.500₺</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .comparison-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .comparison-grid > div:nth-child(2) {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}
