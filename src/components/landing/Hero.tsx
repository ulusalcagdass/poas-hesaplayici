'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Target, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
    const { language, t } = useLanguage();
    return (
        <section
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '72px',
            }}
        >
            {/* Background Effects */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    pointerEvents: 'none',
                }}
            />

            <div className="container">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center',
                    }}
                    className="hero-grid"
                >
                    {/* Left Content */}
                    <div className="animate-fade-in-up">
                        {/* Badge */}
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
                                {language === 'tr' ? 'Kârlılık Odaklı Reklam Yönetimi' : 'Profit-Focused Ad Management'}
                            </span>
                        </div>

                        {/* Title */}
                        <h1
                            style={{
                                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                fontWeight: 800,
                            }}
                        >
                            <span style={{ color: 'var(--color-text-primary)' }}>
                                {language === 'tr' ? 'ROAS değil, ' : 'Not ROAS, '}
                            </span>
                            <span className="text-gradient">POAS</span>
                            <br />
                            <span style={{ color: 'var(--color-text-primary)' }}>
                                {language === 'tr' ? 'ile gerçek kârlılığı ölç.' : 'measures true profitability.'}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p
                            style={{
                                fontSize: '1.25rem',
                                color: 'var(--color-text-secondary)',
                                marginBottom: '2rem',
                                maxWidth: '540px',
                                lineHeight: 1.7,
                            }}
                        >
                            <strong style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>
                                {language === 'tr' ? 'POAS = Brüt Kâr / Reklam Harcaması' : 'POAS = Gross Profit / Ad Spend'}
                            </strong>
                            <br />
                            <span style={{ fontSize: '1rem', display: 'block', marginTop: '0.75rem' }}>
                                {language === 'tr'
                                    ? 'Kargo, komisyon ve operasyon maliyetlerini yok sayan ROAS yerine gerçek kârlılığa odaklan.'
                                    : 'Focus on real profit instead of ROAS which ignores shipping, commission, and operational costs.'}
                            </span>
                        </p>

                        {/* CTA Buttons */}
                        <div
                            className="hero-cta-group"
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Link href="/hesaplayici" className="btn btn-primary btn-lg">
                                {language === 'tr' ? 'Ücretsiz Hesapla' : 'Calculate Free'}
                                <ArrowRight size={18} />
                            </Link>
                            <a href="#how-it-works" className="btn btn-secondary btn-lg">
                                {language === 'tr' ? 'Nasıl Çalışır?' : 'How It Works?'}
                            </a>
                        </div>

                        {/* Stats */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '2.5rem',
                                marginTop: '3rem',
                                paddingTop: '2rem',
                                borderTop: '1px solid var(--color-border)',
                            }}
                        >
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                    {language === 'tr' ? '30sn' : '30s'}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{language === 'tr' ? 'Hızlı Hesaplama' : 'Fast Calculation'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                    ∞
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{language === 'tr' ? 'Senaryo Kaydet' : 'Save Scenarios'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                    PDF/CSV
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{language === 'tr' ? 'Dışa Aktar' : 'Export'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Calculator Preview */}
                    <div
                        style={{
                            position: 'relative',
                        }}
                        className="hero-visual"
                    >
                        <div
                            className="animate-float glass-card"
                            style={{
                                padding: '2rem',
                                boxShadow: 'var(--shadow-glow)',
                            }}
                        >
                            {/* Preview Header */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--gradient-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Target size={20} color="white" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{language === 'tr' ? 'POAS Hesaplayıcı' : 'POAS Calculator'}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                        {language === 'tr' ? 'Gerçek kârlılığını hesapla' : 'Calculate your true profitability'}
                                    </div>
                                </div>
                            </div>

                            {/* Preview Stats */}
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1rem',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '1rem',
                                        background: 'var(--color-bg)',
                                        borderRadius: 'var(--radius-lg)',
                                    }}
                                >
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                        ROAS
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                                        3.5x
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-warning)' }}>
                                        {language === 'tr' ? 'Eksik bilgi' : 'Incomplete data'}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        borderRadius: 'var(--radius-lg)',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                    }}
                                >
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                        POAS
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                        1.8x
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>
                                        {language === 'tr' ? 'Gerçek kârlılık' : 'True profit'}
                                    </div>
                                </div>
                            </div>

                            {/* Insight */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: 'rgba(99, 102, 241, 0.1)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)',
                                }}
                            >
                                <TrendingUp size={20} style={{ color: 'var(--color-primary-light)', flexShrink: 0, marginTop: '2px' }} />
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    {language === 'tr'
                                        ? 'ROAS 3.5x görünse de, maliyetler dahil edildiğinde'
                                        : 'Even if ROAS shows 3.5x, when costs are included,'}
                                    <strong style={{ color: 'var(--color-text-primary)' }}>
                                        {language === 'tr' ? ' gerçek kârlılık 1.8x' : ' true profit is 1.8x'}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div
                            className="animate-float"
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                padding: '0.75rem 1rem',
                                background: 'var(--color-success)',
                                borderRadius: 'var(--radius-lg)',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                boxShadow: 'var(--shadow-lg)',
                                animationDelay: '0.5s',
                            }}
                        >
                            {language === 'tr' ? '+180% Kâr' : '+180% Profit'}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-visual {
            display: none;
          }
        }
      `}</style>
        </section>
    );
}
