import { CheckCircle, Info } from 'lucide-react';

export default function POASFormulasPage() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                POAS Formülleri ve Tanımları
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Bu sayfa, POAS Hesaplayıcı&apos;nın kullandığı tüm formülleri ve tanımları içerir.
                <br />
                <span style={{ color: 'var(--color-success)' }}>✅ Tüm formüller POAS PDF dökümanıyla %100 uyumludur.</span>
            </p>

            {/* Revenue Definition */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-info)' }}>1.</span> Gelir (Revenue)
                </h2>
                <div
                    style={{
                        padding: '1rem',
                        background: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        marginBottom: '1rem',
                    }}
                >
                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                        Gelir (Revenue): KDV/vergiler hariç, indirimlerden sonra müşteriden tahsil edilen tutar.
                    </p>
                    <p style={{ color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Info size={16} />
                        ⚠️ Müşteriden kargo ücreti alıyorsanız gelire dahil edilmelidir.
                    </p>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem' }}>
                    <strong>Not:</strong> İadeler ve iptal edilen siparişler gelirden düşülmelidir.
                </p>
            </section>

            {/* Variable Order Costs */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-warning)' }}>2.</span> Değişken Sipariş Maliyetleri
                </h2>
                <div
                    style={{
                        padding: '1rem',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'monospace',
                        marginBottom: '1rem',
                    }}
                >
                    Variable Order Costs = COGS + Shipping + Payment Fees + Handling
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Bileşen</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Açıklama</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '0.75rem' }}>COGS</td>
                            <td style={{ padding: '0.75rem', color: 'var(--color-text-secondary)' }}>Ürün maliyeti (Cost of Goods Sold / Landed Cost)</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '0.75rem' }}>Shipping</td>
                            <td style={{ padding: '0.75rem', color: 'var(--color-text-secondary)' }}>Müşteriye gönderim maliyeti</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '0.75rem' }}>Payment Fees</td>
                            <td style={{ padding: '0.75rem', color: 'var(--color-text-secondary)' }}>Kredi kartı, PayPal vb. komisyonlar (%2-4)</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '0.75rem' }}>Handling/Packaging</td>
                            <td style={{ padding: '0.75rem', color: 'var(--color-text-secondary)' }}>Kutu, etiket, dolgu, sipariş hazırlama</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Gross Profit */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-success)' }}>3.</span> Brüt Kâr (Gross Profit)
                    <CheckCircle size={18} style={{ color: 'var(--color-success)', marginLeft: 'auto' }} />
                </h2>
                <div
                    style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'monospace',
                        fontSize: '1.125rem',
                        textAlign: 'center',
                    }}
                >
                    <strong>Gross Profit = Revenue − Variable Order Costs</strong>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', fontSize: '0.9375rem' }}>
                    <strong>PDF Uyumu:</strong> ✅ &ldquo;Gross Profit = Revenue - Variable Order Costs&rdquo;
                </p>
            </section>

            {/* POAS */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-primary-light)' }}>4.</span> POAS (Profit on Ad Spend)
                    <CheckCircle size={18} style={{ color: 'var(--color-success)', marginLeft: 'auto' }} />
                </h2>
                <div
                    style={{
                        padding: '1.5rem',
                        background: 'rgba(99, 102, 241, 0.15)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'monospace',
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        fontWeight: 700,
                        color: 'var(--color-primary-light)',
                    }}
                >
                    POAS = Gross Profit / Ad Spend
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', fontSize: '0.9375rem' }}>
                    <strong>PDF Uyumu:</strong> ✅ &ldquo;POAS = Gross Profit / Ad Spend&rdquo;
                </p>
                <div
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-md)',
                    }}
                >
                    <strong>ROAS vs POAS farkı:</strong>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--color-text-secondary)' }}>
                        <li>ROAS = Revenue / Ad Spend (maliyetleri yok sayar)</li>
                        <li>POAS = Gross Profit / Ad Spend (gerçek kârlılığı ölçer)</li>
                    </ul>
                </div>
            </section>

            {/* Contribution Margin */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-success)' }}>5.</span> Katkı Marjı (Contribution Margin)
                    <CheckCircle size={18} style={{ color: 'var(--color-success)', marginLeft: 'auto' }} />
                </h2>
                <div
                    style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'monospace',
                        fontSize: '1.125rem',
                        textAlign: 'center',
                    }}
                >
                    <strong>Contribution Margin = Gross Profit − Ad Spend</strong>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', fontSize: '0.9375rem' }}>
                    <strong>PDF Uyumu:</strong> ✅ &ldquo;Contribution Margin = Gross Profit - Ad Spend&rdquo;
                </p>
            </section>

            {/* Net Profit */}
            <section className="glass-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>6.</span> Net Kâr (Opsiyonel)
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>İsteğe bağlı</span>
                </h2>
                <div
                    style={{
                        padding: '1rem',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-md)',
                        fontFamily: 'monospace',
                        fontSize: '1.125rem',
                        textAlign: 'center',
                    }}
                >
                    <strong>Net Profit = Contribution Margin − Fixed Costs</strong>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem', fontSize: '0.9375rem' }}>
                    <strong>Fixed Costs:</strong> Maaşlar, kira, yazılım abonelikleri, sigorta vb. sabit giderler.
                </p>
            </section>
        </div>
    );
}
