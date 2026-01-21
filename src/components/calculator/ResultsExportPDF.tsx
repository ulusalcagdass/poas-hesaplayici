'use client';

import type { CalculatorInputs, CalculatorOutputs, TargetPOASOutputs, ROASTargets } from '@/lib/calculations';
import { interpretPOAS } from '@/lib/calculations';

interface ResultsExportPDFProps {
    inputs: CalculatorInputs;
    outputs: CalculatorOutputs;
    targetOutputs?: TargetPOASOutputs | null;
    roasTargets?: ROASTargets | null;
    channel: string;
    currency: string;
    language: 'tr' | 'en';
    targetPoas: number;
}

// A4 Portrait dimensions in pixels at 96dpi
export const PDF_WIDTH = 794;
export const PDF_HEIGHT = 1123;

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

export default function ResultsExportPDF({
    inputs,
    outputs,
    targetOutputs,
    roasTargets,
    channel,
    currency,
    language,
    targetPoas
}: ResultsExportPDFProps) {
    const symbol = getCurrencySymbol(currency);
    const interpretation = interpretPOAS(outputs.poas);

    const labels = language === 'tr' ? {
        title: 'POAS Hesaplama Sonuçları',
        channel: 'Kanal',
        date: 'Tarih',
        yourPoas: 'POAS Değeriniz',
        roas: 'ROAS',
        poas: 'POAS',
        roasVsPoas: 'ROAS vs POAS Karşılaştırması',
        roasDesc: 'Maliyetler dahil değil',
        poasDesc: 'Gerçek kârlılık',
        detailedResults: 'Detaylı Sonuçlar',
        revenue: 'Gelir',
        adSpend: 'Reklam Harcaması',
        cogs: 'Ürün Maliyeti (COGS)',
        shipping: 'Kargo',
        commission: 'Komisyon',
        handling: 'Operasyon',
        grossProfit: 'Brüt Kâr',
        contributionMargin: 'Katkı Marjı',
        costBreakdown: 'Maliyet Dağılımı',
        target: 'Hedef POAS',
        requiredProfit: 'Hedef Brüt Kâr',
        requiredRevenue: 'Hedef Gelir',
        roasTargets: 'ROAS Hedefleri',
        breakeven: 'Başabaş',
        margin10: '%10 Marj',
        margin15: '%15 Marj',
        margin20: '%20 Marj',
    } : {
        title: 'POAS Calculation Results',
        channel: 'Channel',
        date: 'Date',
        yourPoas: 'Your POAS',
        roas: 'ROAS',
        poas: 'POAS',
        roasVsPoas: 'ROAS vs POAS Comparison',
        roasDesc: 'Excludes costs',
        poasDesc: 'True profitability',
        detailedResults: 'Detailed Results',
        revenue: 'Revenue',
        adSpend: 'Ad Spend',
        cogs: 'Product Cost (COGS)',
        shipping: 'Shipping',
        commission: 'Commission',
        handling: 'Operations',
        grossProfit: 'Gross Profit',
        contributionMargin: 'Contribution Margin',
        costBreakdown: 'Cost Breakdown',
        target: 'Target POAS',
        requiredProfit: 'Required Profit',
        requiredRevenue: 'Required Revenue',
        roasTargets: 'ROAS Targets',
        breakeven: 'Breakeven',
        margin10: '10% Margin',
        margin15: '15% Margin',
        margin20: '20% Margin',
    };

    // Cost breakdown
    const totalCosts = inputs.cogs + inputs.shippingCost + inputs.paymentFees + inputs.handlingCost;
    const costItems = [
        { label: labels.cogs, value: inputs.cogs, color: '#6366f1' },
        { label: labels.adSpend, value: inputs.adSpend, color: '#f59e0b' },
        { label: labels.shipping, value: inputs.shippingCost, color: '#10b981' },
        { label: labels.commission, value: inputs.paymentFees, color: '#ef4444' },
        { label: labels.handling, value: inputs.handlingCost, color: '#8b5cf6' },
    ].filter(item => item.value > 0);

    const allCosts = totalCosts + inputs.adSpend;

    return (
        <div
            id="pdf-export-container"
            style={{
                width: `${PDF_WIDTH}px`,
                height: `${PDF_HEIGHT}px`,
                backgroundColor: '#0f172a',
                color: '#e2e8f0',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                lineHeight: 1.5,
                padding: '32px',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#818cf8' }}>
                        {labels.title}
                    </h1>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                        {labels.channel}: {channel} | {labels.date}: {new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                    </div>
                </div>
                {/* Main POAS Badge */}
                <div style={{
                    textAlign: 'center',
                    padding: '16px 32px',
                    background: `${interpretation.color}15`,
                    borderRadius: '16px',
                    border: `2px solid ${interpretation.color}`,
                }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{labels.yourPoas}</div>
                    <div style={{ fontSize: '42px', fontWeight: 800, color: interpretation.color }}>
                        {formatNumber(outputs.poas)}x
                    </div>
                </div>
            </div>

            {/* ROAS vs POAS Card */}
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#94a3b8' }}>
                    {labels.roasVsPoas}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '16px',
                        background: 'rgba(148, 163, 184, 0.1)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{labels.roas}</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#94a3b8' }}>
                            {formatNumber(outputs.roas)}x
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{labels.roasDesc}</div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        padding: '16px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>{labels.poas}</div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
                            {formatNumber(outputs.poas)}x
                        </div>
                        <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>{labels.poasDesc}</div>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Left: Detailed Results */}
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#94a3b8' }}>
                        {labels.detailedResults}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.revenue}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.revenue, symbol)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.adSpend}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.adSpend, symbol)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.cogs}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.cogs, symbol)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.shipping}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.shippingCost, symbol)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.commission}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.paymentFees, symbol)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>{labels.handling}</span>
                            <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.handlingCost, symbol)}</span>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8', fontWeight: 600 }}>{labels.grossProfit}</span>
                                <span style={{ fontWeight: 700, color: outputs.grossProfit >= 0 ? '#10b981' : '#ef4444' }}>
                                    {formatCurrency(outputs.grossProfit, symbol)}
                                </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <span style={{ color: '#94a3b8', fontWeight: 600 }}>{labels.contributionMargin}</span>
                                <span style={{ fontWeight: 700, color: outputs.contributionMargin >= 0 ? '#10b981' : '#ef4444' }}>
                                    {formatCurrency(outputs.contributionMargin, symbol)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Cost Breakdown */}
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#94a3b8' }}>
                        {labels.costBreakdown}
                    </h3>
                    {/* Visual Bar */}
                    <div style={{ display: 'flex', gap: '2px', height: '32px', marginBottom: '16px', borderRadius: '8px', overflow: 'hidden' }}>
                        {costItems.map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    flex: item.value,
                                    backgroundColor: item.color,
                                    minWidth: '4px',
                                }}
                            />
                        ))}
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {costItems.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '3px',
                                        backgroundColor: item.color,
                                    }} />
                                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>{item.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 500, fontSize: '13px' }}>{formatCurrency(item.value, symbol)}</span>
                                    <span style={{ color: '#64748b', fontSize: '12px' }}>
                                        ({((item.value / allCosts) * 100).toFixed(0)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Target POAS & ROAS Targets Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                {/* Target POAS */}
                {targetOutputs && (
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                            {labels.target}: {formatNumber(targetPoas)}x
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{labels.requiredProfit}</div>
                                <div style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>
                                    {formatCurrency(inputs.adSpend * targetPoas, symbol)}
                                </div>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{labels.requiredRevenue}</div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#6366f1' }}>
                                    {formatCurrency((inputs.adSpend * targetPoas) + inputs.cogs + inputs.shippingCost + inputs.paymentFees + inputs.handlingCost, symbol)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ROAS Targets */}
                {roasTargets && (
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>
                            {labels.roasTargets}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                            <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{labels.breakeven}</div>
                                <div style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444' }}>
                                    {formatNumber(roasTargets.breakevenROAS)}x
                                </div>
                            </div>
                            {roasTargets.roas10 && (
                                <div style={{ padding: '10px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{labels.margin10}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b' }}>
                                        {formatNumber(roasTargets.roas10)}x
                                    </div>
                                </div>
                            )}
                            {roasTargets.roas15 && (
                                <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{labels.margin15}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#10b981' }}>
                                        {formatNumber(roasTargets.roas15)}x
                                    </div>
                                </div>
                            )}
                            {roasTargets.roas20 && (
                                <div style={{ padding: '10px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{labels.margin20}</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#6366f1' }}>
                                        {formatNumber(roasTargets.roas20)}x
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
