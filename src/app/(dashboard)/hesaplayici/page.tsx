'use client';

import { useState, useCallback } from 'react';
import {
    Calculator,
    Target,
    TrendingUp,
    Save,
    Download,
    Info,
    Lightbulb,
    AlertTriangle
} from 'lucide-react';
import {
    calculateAll,
    calculateTargetPOAS,
    interpretPOAS,
    POAS_PRESETS,
    DEFAULT_VALUES,
    suggestDefaults,
    type CalculatorInputs,
    type CalculatorOutputs,
    type TargetPOASOutputs
} from '@/lib/calculations';
import { CHANNELS, CURRENCIES } from '@/types';
import SaveScenarioModal from '@/components/calculator/SaveScenarioModal';

const formatNumber = (num: number, decimals: number = 2): string => {
    if (!isFinite(num)) return '∞';
    return num.toLocaleString('tr-TR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

const formatCurrency = (num: number, symbol: string = '₺'): string => {
    return `${formatNumber(num, 0)} ${symbol}`;
};

export default function HesaplayiciPage() {
    const [currency, setCurrency] = useState('TRY');
    const currencySymbol = CURRENCIES.find(c => c.value === currency)?.symbol || '₺';

    // Form state
    const [inputs, setInputs] = useState<CalculatorInputs>({
        revenue: 0,
        adSpend: 0,
        cogs: 0,
        shippingCost: 0,
        paymentFees: 0,
        handlingCost: 0,
        fixedCosts: undefined,
    });

    const [targetPoas, setTargetPoas] = useState<number | null>(null);
    const [showNetProfit, setShowNetProfit] = useState(false);
    const [notes, setNotes] = useState('');
    const [channel, setChannel] = useState<string>('Google');

    // Results
    const [outputs, setOutputs] = useState<CalculatorOutputs | null>(null);
    const [targetOutputs, setTargetOutputs] = useState<TargetPOASOutputs | null>(null);

    // Modal
    const [showSaveModal, setShowSaveModal] = useState(false);

    // Handle input change
    const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
        const numValue = parseFloat(value) || 0;
        setInputs(prev => ({ ...prev, [field]: numValue }));
    };

    // Calculate results
    const handleCalculate = useCallback(() => {
        const result = calculateAll(inputs);
        setOutputs(result);

        if (targetPoas && targetPoas > 0) {
            const targetResult = calculateTargetPOAS({
                grossProfit: result.grossProfit,
                adSpend: inputs.adSpend,
                targetPoas,
            });
            setTargetOutputs(targetResult);
        } else {
            setTargetOutputs(null);
        }
    }, [inputs, targetPoas]);

    // Use suggested defaults
    const applySuggestedDefaults = () => {
        if (inputs.revenue > 0) {
            const suggestions = suggestDefaults(inputs.revenue);
            setInputs(prev => ({
                ...prev,
                cogs: prev.cogs || suggestions.cogs || 0,
                shippingCost: prev.shippingCost || suggestions.shippingCost || 0,
                paymentFees: prev.paymentFees || suggestions.paymentFees || 0,
                handlingCost: prev.handlingCost || suggestions.handlingCost || 0,
            }));
        }
    };

    const interpretation = outputs ? interpretPOAS(outputs.poas) : null;

    return (
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                    POAS Hesaplayıcı
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Reklamlarınızın gerçek kârlılığını hesaplayın
                </p>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2rem',
                }}
                className="calculator-grid"
            >
                {/* Left Column - Inputs */}
                <div>
                    {/* Currency & Channel */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label className="input-label">Para Birimi</label>
                                <select
                                    className="input"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    {CURRENCIES.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="input-label">Reklam Kanalı</label>
                                <select
                                    className="input"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    {CHANNELS.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Revenue & Ad Spend */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={20} style={{ color: 'var(--color-primary-light)' }} />
                            Gelir & Harcama
                        </h3>

                        <div className="input-group" style={{ marginBottom: '1rem' }}>
                            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Gelir (Revenue)
                                <span
                                    className="tooltip"
                                    data-tooltip="KDV hariç, indirimler sonrası tahsil edilen tutar"
                                    style={{ cursor: 'help' }}
                                >
                                    <Info size={14} style={{ color: 'var(--color-text-muted)' }} />
                                </span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="0"
                                    value={inputs.revenue || ''}
                                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {currencySymbol}
                                </span>
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Reklam Harcaması (Ad Spend)</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="0"
                                    value={inputs.adSpend || ''}
                                    onChange={(e) => handleInputChange('adSpend', e.target.value)}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    {currencySymbol}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Variable Costs */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calculator size={20} style={{ color: 'var(--color-warning)' }} />
                                Değişken Maliyetler
                            </h3>
                            {inputs.revenue > 0 && (
                                <button
                                    type="button"
                                    onClick={applySuggestedDefaults}
                                    className="btn btn-ghost btn-sm"
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    <Lightbulb size={14} />
                                    Varsayılan Öner
                                </button>
                            )}
                        </div>

                        {/* Suggestion Banner */}
                        {inputs.revenue > 0 && (inputs.cogs === 0 || inputs.shippingCost === 0) && (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    background: 'rgba(245, 158, 11, 0.1)',
                                    border: '1px solid rgba(245, 158, 11, 0.2)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: '1rem',
                                    fontSize: '0.8125rem',
                                    color: 'var(--color-warning)',
                                }}
                            >
                                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>
                                    Bazı maliyet verileri eksik. &quot;Varsayılan Öner&quot; butonuna tıklayarak
                                    sektör ortalamalarını kullanabilirsiniz.
                                </span>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    COGS
                                    <span
                                        className="tooltip"
                                        data-tooltip="Ürün maliyeti (landed cost)"
                                        style={{ cursor: 'help' }}
                                    >
                                        <Info size={14} style={{ color: 'var(--color-text-muted)' }} />
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${formatNumber(inputs.revenue * DEFAULT_VALUES.cogsRatio, 0)}`}
                                    value={inputs.cogs || ''}
                                    onChange={(e) => handleInputChange('cogs', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Kargo Gideri</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${DEFAULT_VALUES.shippingCost}`}
                                    value={inputs.shippingCost || ''}
                                    onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Ödeme Komisyonları</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${formatNumber(inputs.revenue * DEFAULT_VALUES.paymentFees, 0)}`}
                                    value={inputs.paymentFees || ''}
                                    onChange={(e) => handleInputChange('paymentFees', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Birim Başı Operasyon</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${DEFAULT_VALUES.handlingCost}`}
                                    value={inputs.handlingCost || ''}
                                    onChange={(e) => handleInputChange('handlingCost', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Net Profit Mode */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: showNetProfit ? '1rem' : 0 }}>
                            <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Net Profit Modu
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>(Opsiyonel)</span>
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={showNetProfit}
                                    onChange={(e) => setShowNetProfit(e.target.checked)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Aktif</span>
                            </label>
                        </div>

                        {showNetProfit && (
                            <div className="input-group">
                                <label className="input-label">Sabit Giderler (Maaş, Kira, Yazılım vb.)</label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder="0"
                                    value={inputs.fixedCosts || ''}
                                    onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Target POAS */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Target size={20} style={{ color: 'var(--color-success)' }} />
                            Hedef POAS
                        </h3>

                        <div className="input-group" style={{ marginBottom: '1rem' }}>
                            <label className="input-label">Hedef POAS Değeri</label>
                            <input
                                type="number"
                                step="0.1"
                                className="input"
                                placeholder="Örn: 1.5"
                                value={targetPoas || ''}
                                onChange={(e) => setTargetPoas(parseFloat(e.target.value) || null)}
                            />
                        </div>

                        {/* Preset Buttons */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {Object.values(POAS_PRESETS).map((preset) => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => setTargetPoas(preset.value)}
                                    className={`btn btn-sm ${targetPoas === preset.value ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    {preset.value}x - {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Not</h3>
                        <textarea
                            className="input"
                            rows={3}
                            placeholder="Kampanya hakkında notlarınız..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    {/* Calculate Button */}
                    <button
                        onClick={handleCalculate}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%' }}
                    >
                        <Calculator size={20} />
                        Hesapla
                    </button>
                </div>

                {/* Right Column - Results */}
                <div>
                    {outputs ? (
                        <>
                            {/* Main POAS Result */}
                            <div
                                className="glass-card"
                                style={{
                                    padding: '2rem',
                                    marginBottom: '1.5rem',
                                    textAlign: 'center',
                                    borderColor: interpretation?.color + '40',
                                }}
                            >
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                    POAS Değeriniz
                                </div>
                                <div
                                    style={{
                                        fontSize: '4rem',
                                        fontWeight: 800,
                                        color: interpretation?.color,
                                        lineHeight: 1,
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {formatNumber(outputs.poas)}x
                                </div>
                                <div style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                                    ({formatNumber(outputs.poasPercentage, 0)}%)
                                </div>

                                {interpretation && (
                                    <div
                                        style={{
                                            padding: '0.75rem 1rem',
                                            background: interpretation.color + '15',
                                            borderRadius: 'var(--radius-md)',
                                            color: interpretation.color,
                                            fontSize: '0.9375rem',
                                        }}
                                    >
                                        {interpretation.message}
                                    </div>
                                )}
                            </div>

                            {/* Comparison with ROAS */}
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>ROAS vs POAS Karşılaştırma</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                            ROAS
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                                            {formatNumber(outputs.roas)}x
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                                            Maliyetler hariç
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            borderRadius: 'var(--radius-md)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                            POAS
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                            {formatNumber(outputs.poas)}x
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>
                                            Gerçek kârlılık
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Results */}
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Detaylı Sonuçlar</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Gelir</span>
                                        <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.revenue, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Değişken Maliyetler</span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-error)' }}>-{formatCurrency(outputs.variableOrderCosts, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', background: 'rgba(99, 102, 241, 0.1)', margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary-light)' }}>Brüt Kâr</span>
                                        <span style={{ fontWeight: 700, color: 'var(--color-primary-light)' }}>{formatCurrency(outputs.grossProfit, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Reklam Harcaması</span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-error)' }}>-{formatCurrency(inputs.adSpend, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', background: 'rgba(16, 185, 129, 0.1)', margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Katkı Marjı</span>
                                        <span style={{ fontWeight: 700, color: outputs.contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                            {formatCurrency(outputs.contributionMargin, currencySymbol)}
                                        </span>
                                    </div>

                                    {showNetProfit && outputs.netProfit !== null && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                            <span style={{ fontWeight: 600 }}>Net Kâr</span>
                                            <span style={{ fontWeight: 700, color: outputs.netProfit >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                {formatCurrency(outputs.netProfit, currencySymbol)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Target POAS Results */}
                            {targetOutputs && targetPoas && (
                                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Target size={20} style={{ color: 'var(--color-success)' }} />
                                        Hedef POAS: {targetPoas}x
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div
                                            style={{
                                                padding: '1rem',
                                                background: 'rgba(99, 102, 241, 0.1)',
                                                borderRadius: 'var(--radius-md)',
                                            }}
                                        >
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                Bu brüt kâr için maksimum reklam harcaması
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                                                {formatCurrency(targetOutputs.maxAdSpend, currencySymbol)}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                padding: '1rem',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                borderRadius: 'var(--radius-md)',
                                            }}
                                        >
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                Bu reklam harcamasıyla ulaşılması gereken minimum brüt kâr
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                                {formatCurrency(targetOutputs.minGrossProfit, currencySymbol)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setShowSaveModal(true)}
                                    className="btn btn-primary"
                                    style={{ flex: 1 }}
                                >
                                    <Save size={18} />
                                    Senaryoyu Kaydet
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                >
                                    <Download size={18} />
                                    PDF İndir
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div
                            className="glass-card"
                            style={{
                                padding: '4rem 2rem',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem',
                                }}
                            >
                                <Calculator size={40} style={{ color: 'var(--color-primary-light)' }} />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Hesaplama Bekleniyor</h3>
                            <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                                Sol taraftaki formu doldurup &quot;Hesapla&quot; butonuna tıklayın.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Modal */}
            {showSaveModal && outputs && (
                <SaveScenarioModal
                    onClose={() => setShowSaveModal(false)}
                    inputs={inputs}
                    outputs={outputs}
                    channel={channel}
                    currency={currency}
                    notes={notes}
                />
            )}

            <style jsx>{`
        @media (max-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
