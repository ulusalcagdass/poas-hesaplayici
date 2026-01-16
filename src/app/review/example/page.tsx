import { CheckCircle, ArrowRight } from 'lucide-react';

// Golden Test Case - Fixed values for verification
const GOLDEN_INPUT = {
    revenue: 10000,
    adSpend: 2000,
    cogs: 4000,
    shippingCost: 1500,
    paymentFees: 500,
    handlingCost: 500,
};

const GOLDEN_OUTPUT = {
    variableOrderCosts: 6500,
    grossProfit: 3500,
    poas: 1.75,
    poasPercentage: 175,
    contributionMargin: 1500,
    roas: 5.0,
};

export default function ExamplePage() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Örnek POAS Hesaplama
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Aşağıda tam bir POAS hesaplama örneği, ara adımları ve beklenen sonuçlarıyla birlikte gösterilmektedir.
            </p>

            {/* Input Values */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-info)' }}>
                    📥 Girdi Değerleri (Input)
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Gelir (Revenue)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.revenue.toLocaleString('tr-TR')} ₺</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Reklam Harcaması</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.adSpend.toLocaleString('tr-TR')} ₺</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>COGS (Ürün Maliyeti)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.cogs.toLocaleString('tr-TR')} ₺</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Kargo Gideri</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.shippingCost.toLocaleString('tr-TR')} ₺</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Ödeme Komisyonları</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.paymentFees.toLocaleString('tr-TR')} ₺</div>
                    </div>
                    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Paketleme & Operasyon</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{GOLDEN_INPUT.handlingCost.toLocaleString('tr-TR')} ₺</div>
                    </div>
                </div>
            </section>

            {/* Calculation Steps */}
            <section className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-warning)' }}>
                    🔢 Hesaplama Adımları
                </h2>

                {/* Step 1 */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Adım 1: Değişken Sipariş Maliyetleri</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        Variable Order Costs = COGS + Shipping + Payment Fees + Handling
                    </div>
                    <div style={{ fontFamily: 'monospace', marginTop: '0.5rem' }}>
                        = {GOLDEN_INPUT.cogs.toLocaleString('tr-TR')} + {GOLDEN_INPUT.shippingCost.toLocaleString('tr-TR')} + {GOLDEN_INPUT.paymentFees.toLocaleString('tr-TR')} + {GOLDEN_INPUT.handlingCost.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-warning)', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.variableOrderCosts.toLocaleString('tr-TR')} ₺
                    </div>
                </div>

                {/* Step 2 */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Adım 2: Brüt Kâr (Gross Profit)</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        Gross Profit = Revenue − Variable Order Costs
                    </div>
                    <div style={{ fontFamily: 'monospace', marginTop: '0.5rem' }}>
                        = {GOLDEN_INPUT.revenue.toLocaleString('tr-TR')} − {GOLDEN_OUTPUT.variableOrderCosts.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-success)', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.grossProfit.toLocaleString('tr-TR')} ₺
                    </div>
                </div>

                {/* Step 3 */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary-light)' }}>Adım 3: POAS Hesaplama</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        POAS = Gross Profit / Ad Spend
                    </div>
                    <div style={{ fontFamily: 'monospace', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.grossProfit.toLocaleString('tr-TR')} / {GOLDEN_INPUT.adSpend.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary-light)', fontSize: '1.25rem', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.poas}x ({GOLDEN_OUTPUT.poasPercentage}%)
                    </div>
                </div>

                {/* Step 4 */}
                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Adım 4: Katkı Marjı (Contribution Margin)</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        Contribution Margin = Gross Profit − Ad Spend
                    </div>
                    <div style={{ fontFamily: 'monospace', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.grossProfit.toLocaleString('tr-TR')} − {GOLDEN_INPUT.adSpend.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-success)', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.contributionMargin.toLocaleString('tr-TR')} ₺
                    </div>
                </div>

                {/* Step 5: ROAS Comparison */}
                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-error)' }}>Karşılaştırma: ROAS</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
                        ROAS = Revenue / Ad Spend
                    </div>
                    <div style={{ fontFamily: 'monospace', marginTop: '0.5rem' }}>
                        = {GOLDEN_INPUT.revenue.toLocaleString('tr-TR')} / {GOLDEN_INPUT.adSpend.toLocaleString('tr-TR')}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-error)', marginTop: '0.5rem' }}>
                        = {GOLDEN_OUTPUT.roas}x (maliyetleri yok sayar!)
                    </div>
                </div>
            </section>

            {/* Output Summary */}
            <section className="glass-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📤 Sonuçlar (Output)
                    <CheckCircle size={20} style={{ marginLeft: 'auto' }} />
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>POAS</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary-light)' }}>{GOLDEN_OUTPUT.poas}x</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-success)' }}>✅ Kârlı</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>ROAS</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>{GOLDEN_OUTPUT.roas}x</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-error)' }}>⚠️ Yanıltıcı</div>
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '0.5rem 0', color: 'var(--color-text-secondary)' }}>Değişken Maliyetler</td>
                                <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 600 }}>{GOLDEN_OUTPUT.variableOrderCosts.toLocaleString('tr-TR')} ₺</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '0.5rem 0', color: 'var(--color-text-secondary)' }}>Brüt Kâr</td>
                                <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--color-success)' }}>{GOLDEN_OUTPUT.grossProfit.toLocaleString('tr-TR')} ₺</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.5rem 0', color: 'var(--color-text-secondary)' }}>Katkı Marjı</td>
                                <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 600, color: 'var(--color-success)' }}>{GOLDEN_OUTPUT.contributionMargin.toLocaleString('tr-TR')} ₺</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
