'use client';

import type { CalculatorInputs, CalculatorOutputs, TargetPOASOutputs, ROASTargets } from '@/lib/calculations';
import { interpretPOAS } from '@/lib/calculations';

interface PdfCaptureViewProps {
    inputs: CalculatorInputs;
    outputs: CalculatorOutputs;
    targetOutputs?: TargetPOASOutputs | null;
    roasTargets?: ROASTargets | null;
    channel: string;
    currency: string;
    language: 'tr' | 'en';
}

// A4 landscape ratio: 297/210 = 1.414
// Container: 1400px width → 990px height
const PDF_WIDTH = 1400;
const PDF_HEIGHT = 990;

const formatNumber = (num: number, decimals: number = 2): string => {
    if (!isFinite(num)) return '∞';
    return num.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const formatCurrency = (num: number, symbol: string): string => {
    return `${num.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${symbol}`;
};

const getCurrencySymbol = (currency: string): string => {
    const symbols: Record<string, string> = { TRY: '₺', USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || '₺';
};

export default function PdfCaptureView({
    inputs,
    outputs,
    targetOutputs,
    roasTargets,
    channel,
    currency,
    language
}: PdfCaptureViewProps) {
    const symbol = getCurrencySymbol(currency);
    const interpretation = interpretPOAS(outputs.poas);

    const labels = language === 'tr' ? {
        title: 'POAS Hesaplayıcı - Senaryo Raporu',
        channel: 'Kanal',
        currency: 'Para Birimi',
        date: 'Tarih',
        yourPoas: 'POAS Değeriniz',
        metrics: 'Temel Metrikler',
        revenue: 'Gelir',
        adSpend: 'Reklam Harcaması',
        cogs: 'Ürün Maliyeti',
        shipping: 'Kargo',
        commission: 'Komisyon',
        handling: 'Operasyon',
        grossProfit: 'Brüt Kâr',
        contributionMargin: 'Katkı Marjı',
        roas: 'ROAS',
        poas: 'POAS',
        costBreakdown: 'Maliyet Dağılımı',
        targets: 'Hedef POAS',
        targetBreakeven: 'Başabaş',
        targetGrowth: 'Büyüme',
        targetProfit: 'Kârlılık',
        targetMaxProfit: 'Maksimum',
        minRoas: 'Minimum ROAS',
        maxAdSpend: 'Maksimum Reklam',
    } : {
        title: 'POAS Calculator - Scenario Report',
        channel: 'Channel',
        currency: 'Currency',
        date: 'Date',
        yourPoas: 'Your POAS',
        metrics: 'Key Metrics',
        revenue: 'Revenue',
        adSpend: 'Ad Spend',
        cogs: 'Product Cost (COGS)',
        shipping: 'Shipping',
        commission: 'Commission',
        handling: 'Operations',
        grossProfit: 'Gross Profit',
        contributionMargin: 'Contribution Margin',
        roas: 'ROAS',
        poas: 'POAS',
        costBreakdown: 'Cost Breakdown',
        targets: 'Target POAS',
        targetBreakeven: 'Break-even',
        targetGrowth: 'Growth',
        targetProfit: 'Profit',
        targetMaxProfit: 'Maximum',
        minRoas: 'Minimum ROAS',
        maxAdSpend: 'Max Ad Spend',
    };

    // Cost breakdown for pie chart simulation
    const totalCosts = inputs.cogs + inputs.shippingCost + inputs.paymentFees + inputs.handlingCost + inputs.adSpend;
    const costItems = [
        { label: labels.cogs, value: inputs.cogs, percent: (inputs.cogs / totalCosts * 100).toFixed(1) },
        { label: labels.adSpend, value: inputs.adSpend, percent: (inputs.adSpend / totalCosts * 100).toFixed(1) },
        { label: labels.shipping, value: inputs.shippingCost, percent: (inputs.shippingCost / totalCosts * 100).toFixed(1) },
        { label: labels.commission, value: inputs.paymentFees, percent: (inputs.paymentFees / totalCosts * 100).toFixed(1) },
        { label: labels.handling, value: inputs.handlingCost, percent: (inputs.handlingCost / totalCosts * 100).toFixed(1) },
    ].filter(item => item.value > 0);

    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

    return (
        <div
            id="pdf-capture-container"
            style={{
                width: `${PDF_WIDTH}px`,
                height: `${PDF_HEIGHT}px`,
                backgroundColor: '#0f172a',
                color: '#e2e8f0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '13px',
                lineHeight: 1.4,
                padding: '24px',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 700, margin: 0, color: '#818cf8' }}>
                        {labels.title}
                    </h1>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                        {labels.channel}: {channel} | {labels.currency}: {symbol} | {labels.date}: {new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                    </div>
                </div>
                {/* POAS Badge */}
                <div style={{
                    textAlign: 'center',
                    padding: '12px 24px',
                    background: `${interpretation.color}20`,
                    borderRadius: '12px',
                    border: `2px solid ${interpretation.color}`,
                }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '2px' }}>{labels.yourPoas}</div>
                    <div style={{ fontSize: '32px', fontWeight: 800, color: interpretation.color }}>
                        {formatNumber(outputs.poas)}x
                    </div>
                </div>
            </div>

            {/* Main Content - 2 Column Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                height: 'calc(100% - 100px)',
            }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Key Metrics Card */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                            {labels.metrics}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{labels.revenue}</div>
                                <div style={{ fontSize: '16px', fontWeight: 600 }}>{formatCurrency(inputs.revenue, symbol)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{labels.adSpend}</div>
                                <div style={{ fontSize: '16px', fontWeight: 600 }}>{formatCurrency(inputs.adSpend, symbol)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{labels.grossProfit}</div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: outputs.grossProfit >= 0 ? '#10b981' : '#ef4444' }}>
                                    {formatCurrency(outputs.grossProfit, symbol)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{labels.contributionMargin}</div>
                                <div style={{ fontSize: '16px', fontWeight: 600, color: outputs.contributionMargin >= 0 ? '#10b981' : '#ef4444' }}>
                                    {formatCurrency(outputs.contributionMargin, symbol)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cost Details Table */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        flex: 1,
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                            {labels.costBreakdown}
                        </h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                            <tbody>
                                {costItems.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '2px',
                                                backgroundColor: colors[idx % colors.length],
                                                display: 'inline-block',
                                            }} />
                                            {item.label}
                                        </td>
                                        <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 500 }}>
                                            {formatCurrency(item.value, symbol)}
                                        </td>
                                        <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b', width: '60px' }}>
                                            {item.percent}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* ROAS vs POAS Comparison */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{
                                textAlign: 'center',
                                padding: '12px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '8px',
                            }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{labels.roas}</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#94a3b8' }}>
                                    {formatNumber(outputs.roas)}x
                                </div>
                                <div style={{ fontSize: '10px', color: '#ef4444' }}>
                                    {language === 'tr' ? 'Maliyetler hariç' : 'Excludes costs'}
                                </div>
                            </div>
                            <div style={{
                                textAlign: 'center',
                                padding: '12px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '8px',
                            }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{labels.poas}</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#10b981' }}>
                                    {formatNumber(outputs.poas)}x
                                </div>
                                <div style={{ fontSize: '10px', color: '#10b981' }}>
                                    {language === 'tr' ? 'Gerçek kârlılık' : 'True profitability'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Target POAS - shows max ad spend for current target */}
                    {targetOutputs && (
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                                {labels.targets}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div style={{ padding: '10px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{labels.maxAdSpend}</div>
                                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#6366f1' }}>{formatCurrency(targetOutputs.maxAdSpend, symbol)}</div>
                                </div>
                                <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{language === 'tr' ? 'Min Brüt Kâr' : 'Min Gross Profit'}</div>
                                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>{formatCurrency(targetOutputs.minGrossProfit, symbol)}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ROAS Targets */}
                    {roasTargets && (
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            padding: '16px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            flex: 1,
                        }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                                {language === 'tr' ? 'ROAS Hedefleri' : 'ROAS Targets'}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
                                <div style={{ padding: '8px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>{language === 'tr' ? 'Başabaş' : 'Breakeven'}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444' }}>{formatNumber(roasTargets.breakevenROAS)}x</div>
                                </div>
                                {roasTargets.roas10 && (
                                    <div style={{ padding: '8px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>%10 {language === 'tr' ? 'Marj' : 'Margin'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>{formatNumber(roasTargets.roas10)}x</div>
                                    </div>
                                )}
                                {roasTargets.roas15 && (
                                    <div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>%15 {language === 'tr' ? 'Marj' : 'Margin'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#10b981' }}>{formatNumber(roasTargets.roas15)}x</div>
                                    </div>
                                )}
                                {roasTargets.roas20 && (
                                    <div style={{ padding: '8px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '9px', color: '#94a3b8' }}>%20 {language === 'tr' ? 'Marj' : 'Margin'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#6366f1' }}>{formatNumber(roasTargets.roas20)}x</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Visual Bar Chart for costs */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        flex: 1,
                    }}>
                        <div style={{ display: 'flex', gap: '4px', height: '24px', marginBottom: '8px' }}>
                            {costItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        flex: item.value,
                                        backgroundColor: colors[idx % colors.length],
                                        borderRadius: '4px',
                                        minWidth: '4px',
                                    }}
                                />
                            ))}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '10px' }}>
                            {costItems.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '2px',
                                        backgroundColor: colors[idx % colors.length],
                                    }} />
                                    {item.label}: {item.percent}%
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { PDF_WIDTH, PDF_HEIGHT };
