import { Calculator, ArrowDown, Check } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            number: '01',
            title: 'Gelir (Revenue)',
            description: 'KDV hariç, indirimler sonrası müşteriden tahsil edilen tutar.',
            example: '10.000₺',
            color: 'var(--color-info)',
        },
        {
            number: '02',
            title: 'Değişken Maliyetler',
            items: [
                { label: 'COGS (Ürün Maliyeti)', value: '4.000₺' },
                { label: 'Kargo Gideri', value: '1.500₺' },
                { label: 'Ödeme Komisyonları', value: '500₺' },
                { label: 'Birim Başı Operasyon', value: '500₺' },
            ],
            total: '6.500₺',
            color: 'var(--color-warning)',
        },
        {
            number: '03',
            title: 'Brüt Kâr (Gross Profit)',
            description: 'Gelir − Değişken Maliyetler',
            calculation: '10.000₺ − 6.500₺',
            result: '3.500₺',
            color: 'var(--color-success)',
        },
        {
            number: '04',
            title: 'POAS Hesaplama',
            description: 'Brüt Kâr / Reklam Harcaması',
            calculation: '3.500₺ / 2.000₺',
            result: '1.75x',
            resultLabel: 'POAS',
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
                        <Calculator size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            Hesaplama Mantığı
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">POAS</span> Nasıl Hesaplanır?
                    </h2>
                    <p className="section-subtitle">
                        POAS hesabı, brüt kârınızı reklam harcamanıza bölerek gerçek reklam verimliliğinizi ölçer.
                    </p>
                </div>

                {/* Steps */}
                <div
                    style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                    }}
                >
                    {steps.map((step, index) => (
                        <div key={index}>
                            <div
                                className="glass-card"
                                style={{
                                    padding: '1.5rem',
                                    marginBottom: index < steps.length - 1 ? '0' : '0',
                                    borderColor: step.color + '40',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1.5rem',
                                    }}
                                >
                                    {/* Step Number */}
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: step.color + '20',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            color: step.color,
                                            fontSize: '0.875rem',
                                            flexShrink: 0,
                                        }}
                                    >
                                        {step.number}
                                    </div>

                                    {/* Content */}
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ marginBottom: '0.5rem', color: step.color }}>
                                            {step.title}
                                        </h4>

                                        {step.description && (
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginBottom: '0.75rem' }}>
                                                {step.description}
                                            </p>
                                        )}

                                        {step.items && (
                                            <div style={{ marginBottom: '0.75rem' }}>
                                                {step.items.map((item, i) => (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            fontSize: '0.875rem',
                                                            padding: '0.25rem 0',
                                                            color: 'var(--color-text-secondary)',
                                                        }}
                                                    >
                                                        <span>{item.label}</span>
                                                        <span style={{ fontWeight: 600 }}>{item.value}</span>
                                                    </div>
                                                ))}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '0.875rem',
                                                        padding: '0.5rem 0',
                                                        borderTop: '1px solid var(--color-border)',
                                                        marginTop: '0.5rem',
                                                        color: step.color,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <span>Toplam</span>
                                                    <span>{step.total}</span>
                                                </div>
                                            </div>
                                        )}

                                        {step.calculation && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    flexWrap: 'wrap',
                                                }}
                                            >
                                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                                    {step.calculation}
                                                </span>
                                                <span style={{ color: 'var(--color-text-muted)' }}>=</span>
                                                <span
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        background: step.color + '20',
                                                        borderRadius: 'var(--radius-md)',
                                                        color: step.color,
                                                        fontWeight: 700,
                                                        fontSize: '1.25rem',
                                                    }}
                                                >
                                                    {step.result} {step.resultLabel && <span style={{ fontSize: '0.875rem' }}>({step.resultLabel})</span>}
                                                </span>
                                            </div>
                                        )}

                                        {step.example && (
                                            <span
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: step.color + '20',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: step.color,
                                                    fontWeight: 700,
                                                    fontSize: '1.25rem',
                                                }}
                                            >
                                                {step.example}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            {index < steps.length - 1 && (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        padding: '0.5rem 0',
                                    }}
                                >
                                    <ArrowDown size={20} style={{ color: 'var(--color-border-light)' }} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Formula Summary */}
                <div
                    style={{
                        maxWidth: '700px',
                        margin: '3rem auto 0',
                        padding: '2rem',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-xl)',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ fontSize: '0.875rem', opacity: 0.8, marginBottom: '0.5rem' }}>
                        POAS Formülü
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        POAS = (Gelir − Değişken Maliyetler) / Reklam Harcaması
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <Check size={16} />
                            <span>Gerçek kârlılık</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <Check size={16} />
                            <span>Tüm maliyetler dahil</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                            <Check size={16} />
                            <span>Doğru karar</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
