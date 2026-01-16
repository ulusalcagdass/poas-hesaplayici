'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Target, Sparkles } from 'lucide-react';

export default function Hero() {
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
                                Kârlılık Odaklı Reklam Yönetimi
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
                            <span style={{ color: 'var(--color-text-primary)' }}>ROAS değil, </span>
                            <span className="text-gradient">POAS</span>
                            <br />
                            <span style={{ color: 'var(--color-text-primary)' }}>ile gerçek kârlılığı ölç.</span>
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
                            <strong style={{ color: 'var(--color-text-primary)', fontSize: '1.1rem' }}>POAS = Brüt Kâr / Reklam Harcaması</strong>
                            <br />
                            <span style={{ fontSize: '1rem', display: 'block', marginTop: '0.75rem' }}>
                                Kargo, komisyon ve operasyon maliyetlerini yok sayan ROAS yerine gerçek kârlılığa odaklan.
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
                            <Link href="/signup" className="btn btn-primary btn-lg">
                                Ücretsiz Kayıt Ol ve Hesapla
                                <ArrowRight size={18} />
                            </Link>
                            <Link href="/login" className="btn btn-secondary btn-lg">
                                Giriş Yap
                            </Link>
                        </div>

                        {/* Registration Note */}
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            marginTop: '1rem',
                            fontStyle: 'italic'
                        }}>
                            Hesaplayıcıyı kullanmak için ücretsiz hesap oluşturmanız gerekir.
                        </p>

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
                                    30sn
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Hızlı Hesaplama</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                    ∞
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Senaryo Kaydet</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                    PDF/CSV
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Export</div>
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
                                    <div style={{ fontWeight: 600 }}>POAS Hesaplayıcı</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                        Gerçek kârlılığını hesapla
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
                                        Eksik bilgi
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
                                        Gerçek kârlılık
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
                                    ROAS 3.5x görünse de, maliyetler dahil edildiğinde
                                    <strong style={{ color: 'var(--color-text-primary)' }}> gerçek kârlılık 1.8x</strong>
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
                            +180% Kâr
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
