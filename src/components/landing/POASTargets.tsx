import { Target, TrendingUp, Rocket, Users } from 'lucide-react';

export default function POASTargets() {
    const targets = [
        {
            value: 2.0,
            label: 'Kısa Vadeli Kârlılık',
            description: 'Yüksek kâr marjı hedefliyorsunuz. Her 1₺ reklam harcamasına 2₺ brüt kâr.',
            icon: Target,
            color: 'var(--color-success)',
            bgColor: 'rgba(16, 185, 129, 0.15)',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            ideal: 'Olgun markalar, yüksek kar marjlı ürünler',
        },
        {
            value: 1.4,
            label: 'Kontrollü Büyüme',
            description: 'Kârlılık ve büyüme arasında denge. Sürdürülebilir ölçeklendirme.',
            icon: TrendingUp,
            color: 'var(--color-primary-light)',
            bgColor: 'rgba(99, 102, 241, 0.15)',
            borderColor: 'rgba(99, 102, 241, 0.3)',
            ideal: 'Büyüyen markalar, market share genişletme',
        },
        {
            value: 1.0,
            label: 'Yeni Müşteri / Break-even',
            description: 'Başabaş noktası. Müşteri kazanımı ve pazar payı öncelikli.',
            icon: Users,
            color: 'var(--color-warning)',
            bgColor: 'rgba(245, 158, 11, 0.15)',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            ideal: 'Yeni markalar, agresif büyüme, LTV odaklı strateji',
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
                            Hedef Belirleme
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">Örnek Hedefler</span> (Sektöre Göre Değişir)
                    </h2>
                    <p className="section-subtitle">
                        Marjınız ve operasyon giderleriniz hedefi belirler.
                        Break-even POAS = 1.0 (başabaş noktası).
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
                                {target.label}
                            </h4>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                                {target.description}
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
                                <span style={{ color: 'var(--color-text-muted)' }}>İdeal: </span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{target.ideal}</span>
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
                        <h4 style={{ marginBottom: '0.5rem' }}>Hedef POAS ile Planlama</h4>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            Hesaplayıcıda hedef POAS girdiğinizde, sistem size bu kârlılık için{' '}
                            <strong style={{ color: 'var(--color-text-primary)' }}>maksimum reklam harcamasını</strong> veya{' '}
                            <strong style={{ color: 'var(--color-text-primary)' }}>ulaşılması gereken minimum brüt kârı</strong>{' '}
                            otomatik hesaplar.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
