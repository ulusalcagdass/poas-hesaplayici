import { CheckCircle, GitBranch, AlertTriangle } from 'lucide-react';

const changes = [
    {
        date: '2026-01-16',
        version: 'v1.1.0',
        category: 'PDF Uyumu',
        items: [
            'Revenue tanımına kargo notu eklendi: "Müşteriden kargo ücreti alıyorsanız gelire dahil edilmelidir"',
            '"Birim Başı Operasyon" → "Paketleme & Operasyon" olarak yeniden adlandırıldı',
            'Hero mesajı güncellendi: "ROAS değil, POAS ile gerçek kârlılığı ölç"',
            'Calculator tooltip\'leri eklendi',
        ],
    },
    {
        date: '2026-01-16',
        version: 'v1.1.0',
        category: 'Hesaplama Şeffaflığı',
        items: [
            '/lib/poasCalculator.ts dosyası oluşturuldu (konsolide hesaplama motoru)',
            'Her formülün üstüne PDF uyumu yorumu eklendi',
            '/review klasörüne poas-formulas.md, calculation-example.json, ui-texts.md eklendi',
        ],
    },
    {
        date: '2026-01-16',
        version: 'v1.1.0',
        category: 'Edge Case Kontrolleri',
        items: [
            'adSpend = 0 durumunda güvenli Infinity dönüşü (NaN engellendi)',
            'Negatif değerler Zod validation ile engellendi',
            'targetPoas <= 0 durumunda 0 döndürme (validation kontrolü)',
        ],
    },
    {
        date: '2026-01-16',
        version: 'v1.1.0',
        category: 'Public Review Sayfaları',
        items: [
            '/review/poas-formulas - Tüm formül tanımları',
            '/review/example - Örnek hesaplama ve ara adımlar',
            '/review/changelog - Bu değişiklik listesi',
        ],
    },
    {
        date: '2026-01-15',
        version: 'v1.0.0',
        category: 'İlk Sürüm',
        items: [
            'POAS Hesaplayıcı temel işlevselliği',
            'Landing page tasarımı',
            'Kullanıcı kayıt ve giriş sistemi',
            'Senaryo kaydetme ve listeleme',
            'CSV dışa aktarma',
        ],
    },
];

export default function ChangelogPage() {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                Değişiklik Geçmişi
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                POAS PDF dökümanına uyum için yapılan tüm değişiklikler aşağıda listelenmiştir.
            </p>

            {changes.map((release, index) => (
                <div key={index} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div
                            style={{
                                padding: '0.25rem 0.75rem',
                                background: index === 0 ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-surface)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: index === 0 ? 'var(--color-success)' : 'var(--color-text-muted)',
                            }}
                        >
                            {release.version}
                        </div>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{release.date}</span>
                        <span
                            style={{
                                marginLeft: 'auto',
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.75rem',
                                color: 'var(--color-primary-light)',
                            }}
                        >
                            {release.category}
                        </span>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                        {release.items.map((item, itemIndex) => (
                            <li
                                key={itemIndex}
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    marginBottom: '0.5rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Summary */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                }}
            >
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-success)' }}>
                    <CheckCircle size={20} />
                    PDF Uyum Özeti
                </h3>
                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                    <li style={{ marginBottom: '0.5rem' }}>✅ POAS = Gross Profit / Ad Spend</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Gross Profit = Revenue - (COGS + Shipping + Fees + Handling)</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Contribution Margin = Gross Profit - Ad Spend</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Revenue tanımı KDV hariç, kargo notu mevcut</li>
                    <li style={{ marginBottom: '0.5rem' }}>✅ Target POAS presetleri: 2.0x, 1.4x, 1.0x</li>
                    <li>✅ Edge case kontrolleri: adSpend=0, negatif değerler, targetPoas&lt;=0</li>
                </ul>
            </div>
        </div>
    );
}
