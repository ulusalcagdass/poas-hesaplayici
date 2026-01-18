'use client';

import { Target, TrendingUp, Rocket, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function POASTargets() {
    const { t } = useLanguage();

    const targets = [
        {
            value: 2.0,
            labelKey: 'target2Label',
            descKey: 'target2Desc',
            idealKey: 'target2Ideal',
            icon: Target,
            color: 'var(--color-success)',
            bgColor: 'rgba(16, 185, 129, 0.15)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
        },
        {
            value: 1.4,
            labelKey: 'target14Label',
            descKey: 'target14Desc',
            idealKey: 'target14Ideal',
            icon: TrendingUp,
            color: 'var(--color-primary-light)',
            bgColor: 'rgba(99, 102, 241, 0.15)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
        },
        {
            value: 1.0,
            labelKey: 'target1Label',
            descKey: 'target1Desc',
            idealKey: 'target1Ideal',
            icon: Users,
            color: 'var(--color-warning)',
            bgColor: 'rgba(245, 158, 11, 0.15)',
            borderColor: 'rgba(245, 158, 11, 0.3)',
        },
    ];

    return (
        <section
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
                            background: 'rgba(99, 102, 241, 0.15)',
                            borderRadius: 'var(--radius-full)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <Rocket size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            {t('poasTargets', 'badge')}
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">{t('poasTargets', 'title')}</span> {t('poasTargets', 'titleSuffix')}
                    </h2>
                    <p className="section-subtitle">
                        {t('poasTargets', 'subtitle')}
                    </p>
                </div>

                {/* Target Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem',
                    }}
                >
                    {targets.map((target, index) => (
                        <div
                            key={index}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                background: target.bgColor,
                                borderColor: target.borderColor,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: 'var(--radius-lg)',
                                        background: target.color + '20',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <target.icon size={28} style={{ color: target.color }} />
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontSize: '2rem',
                                            fontWeight: 800,
                                            color: target.color,
                                        }}
                                    >
                                        {target.value}x
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                        POAS
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <h4 style={{ marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                                {t('poasTargets', target.labelKey)}
                            </h4>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                                {t('poasTargets', target.descKey)}
                            </p>

                            {/* Ideal For */}
                            <div
                                style={{
                                    padding: '0.75rem 1rem',
                                    background: 'var(--color-bg)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.8125rem',
                                }}
                            >
                                <span style={{ color: 'var(--color-text-muted)' }}>{t('poasTargets', 'suitable')} </span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{t('poasTargets', target.idealKey)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div
                    className="glass-card"
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem',
                    }}
                >
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(99, 102, 241, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        <Target size={20} style={{ color: 'var(--color-primary-light)' }} />
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>{t('poasTargets', 'infoTitle')}</h4>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            {t('poasTargets', 'infoDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
