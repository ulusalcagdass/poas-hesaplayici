import { Building2, ShoppingBag, BarChart3, Layers } from 'lucide-react';

export default function UseCases() {
    const cases = [
        {
            icon: Building2,
            title: 'Ajans Raporlama',
            description: 'Müşterilerinize POAS bazlı raporlar sunun. Gerçek kârlılığı gösterin, güven kazanın.',
            features: ['Müşteri bazlı POAS takibi', 'Otomatik PDF raporlar', 'Kanal karşılaştırması'],
        },
        {
            icon: ShoppingBag,
            title: 'E-Ticaret Kampanyaları',
            description: 'Her kampanyanın gerçek kârlılığını ölçün. ROAS\'ın yanıltıcı olduğu yerde POAS gerçeği gösterir.',
            features: ['Kampanya bazlı analiz', 'Sezonsal karşılaştırma', 'Maliyet detayları'],
        },
        {
            icon: BarChart3,
            title: 'Ürün Bazlı Kârlılık',
            description: 'Hangi ürünler gerçekten kârlı? Ürün kategorisi bazında POAS analizi yapın.',
            features: ['Ürün grubu analizi', 'Margin optimizasyonu', 'SKU performansı'],
        },
        {
            icon: Layers,
            title: 'Bütçe Planlama',
            description: 'Hedef POAS ile maksimum reklam bütçenizi veya minimum kâr hedefinizi belirleyin.',
            features: ['Bütçe simülasyonu', 'Break-even analizi', 'Senaryo karşılaştırma'],
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
                            Kullanım Alanları
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">POAS</span> Nerede Kullanılır?
                    </h2>
                    <p className="section-subtitle">
                        E-ticaret, ajans raporlaması ve bütçe planlamasında POAS ile doğru kararlar verin.
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
                            <h4 style={{ marginBottom: '0.75rem' }}>{useCase.title}</h4>
                            <p
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9375rem',
                                    lineHeight: 1.6,
                                    marginBottom: '1.25rem',
                                    flex: 1,
                                }}
                            >
                                {useCase.description}
                            </p>

                            {/* Features */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem',
                                }}
                            >
                                {useCase.features.map((feature, i) => (
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
                                        {feature}
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
