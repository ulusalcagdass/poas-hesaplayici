import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';

export default function Pricing() {
    const plans = [
        {
            name: 'Ücretsiz',
            price: '0',
            description: 'Başlamak için ideal',
            features: [
                'POAS Hesaplayıcı',
                'Sınırsız hesaplama',
                '10 senaryo kaydetme',
                'PDF export',
                'Hedef POAS modu',
            ],
            cta: 'Ücretsiz Başla',
            href: '/signup',
            popular: false,
        },
        {
            name: 'Pro',
            price: '49',
            period: '/ay',
            description: 'Profesyonel kullanım için',
            features: [
                'Tüm ücretsiz özellikler',
                'Sınırsız senaryo',
                'CSV export',
                'Kanal bazlı analiz',
                'Net Profit modu',
                'Ekip paylaşımı (yakında)',
                'API erişimi (yakında)',
            ],
            cta: 'Pro\'ya Geç',
            href: '/signup?plan=pro',
            popular: true,
        },
    ];

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
                        <Sparkles size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            Fiyatlandırma
                        </span>
                    </div>

                    <h2 className="section-title">
                        Basit ve <span className="text-gradient">Şeffaf</span> Fiyatlandırma
                    </h2>
                    <p className="section-subtitle">
                        Başlamak tamamen ücretsiz. İhtiyacınız büyüdükçe Pro&apos;ya geçin.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                position: 'relative',
                                borderColor: plan.popular ? 'var(--color-primary)' : undefined,
                                boxShadow: plan.popular ? 'var(--shadow-glow)' : undefined,
                            }}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        right: '24px',
                                        padding: '0.25rem 1rem',
                                        background: 'var(--gradient-primary)',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    Popüler
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 style={{ marginBottom: '0.5rem' }}>{plan.name}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div style={{ marginBottom: '2rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: 800 }}>{plan.price}₺</span>
                                {plan.period && (
                                    <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>{plan.period}</span>
                                )}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href={plan.href}
                                className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ width: '100%', marginBottom: '2rem' }}
                            >
                                {plan.cta}
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
                                            padding: '0.5rem 0',
                                            color: 'var(--color-text-secondary)',
                                            fontSize: '0.9375rem',
                                        }}
                                    >
                                        <Check size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Money Back */}
                <p
                    style={{
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem',
                        marginTop: '2rem',
                    }}
                >
                    Pro plan için 14 gün ücretsiz deneme. Memnun kalmazsanız iade garantisi.
                </p>
            </div>
        </section>
    );
}
