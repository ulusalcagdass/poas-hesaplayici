'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'POAS nedir ve ROAS\'tan farkı ne?',
        answer: 'ROAS (Return on Ad Spend) sadece gelir/reklam harcaması oranını gösterir. POAS (Profit on Ad Spend) ise brüt kâr/reklam harcaması oranını ölçer. POAS, ürün maliyeti, kargo, komisyon gibi tüm değişken maliyetleri hesaba katarak gerçek kârlılığınızı gösterir.',
    },
    {
        question: 'Brüt kâr nasıl hesaplanır?',
        answer: 'Brüt Kâr = Gelir − Değişken Sipariş Maliyetleri. Değişken maliyetler: COGS (ürün maliyeti), kargo gideri, ödeme komisyonları ve birim başı operasyon maliyetleridir. Gelir, KDV hariç ve indirimler sonrası tahsil edilen tutardır.',
    },
    {
        question: 'Kullanım için ücret veya kayıt gerekiyor mu?',
        answer: 'Hayır! POAS Hesaplayıcı tamamen ücretsizdir ve kayıt olmadan kullanabilirsiniz. Hesaplama ve PDF export özellikleri herkes için açıktır.',
    },
    {
        question: 'Hedef POAS değerimi nasıl belirlemeliyim?',
        answer: 'İş hedeflerinize bağlı: Yüksek kârlılık için POAS 2.0, kontrollü büyüme için POAS 1.4, yeni müşteri kazanımı veya break-even için POAS 1.0 hedeflenebilir. Hedef POAS girdiğinizde, sistem maksimum reklam bütçenizi otomatik hesaplar.',
    },
    {
        question: 'Bazı maliyet verilerim eksik, ne yapmalıyım?',
        answer: 'Endişelenmeyin! Uygulama eksik veriler için varsayılan değerler önerir. Örneğin: Ödeme komisyonu için gelirin %2\'si, kargo için sipariş başına 30₺ gibi yaygın değerler kullanabilirsiniz.',
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
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
                        <HelpCircle size={16} style={{ color: 'var(--color-primary-light)' }} />
                        <span style={{ color: 'var(--color-primary-light)', fontSize: '0.875rem', fontWeight: 600 }}>
                            Sıkça Sorulan Sorular
                        </span>
                    </div>

                    <h2 className="section-title">
                        <span className="text-gradient">SSS</span>
                    </h2>
                    <p className="section-subtitle">
                        POAS hakkında merak ettikleriniz
                    </p>
                </div>

                {/* FAQ Items */}
                <div
                    style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                    }}
                >
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="glass-card"
                            style={{
                                marginBottom: '1rem',
                                padding: 0,
                                overflow: 'hidden',
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem 1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    textAlign: 'left',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: 'var(--color-text-primary)',
                                    }}
                                >
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    style={{
                                        color: 'var(--color-text-muted)',
                                        flexShrink: 0,
                                        transition: 'transform 0.2s ease',
                                        transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}
                                />
                            </button>

                            {openIndex === index && (
                                <div
                                    style={{
                                        padding: '0 1.5rem 1.25rem',
                                        color: 'var(--color-text-secondary)',
                                        fontSize: '0.9375rem',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
