'use client';

import { useState, useCallback, useEffect } from 'react';
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
import UpgradeModal from '@/components/UpgradeModal';

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

    // Golden Test Case - PDF uyum doğrulama
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
        contributionMargin: 1500,
        roas: 5.0,
    };

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
    const [targetPoasError, setTargetPoasError] = useState<string | null>(null);
    const [showNetProfit, setShowNetProfit] = useState(false);
    const [notes, setNotes] = useState('');
    const [channel, setChannel] = useState<string>('Google');
    const [isGoldenTest, setIsGoldenTest] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ adSpend?: string }>({});

    // Results
    const [outputs, setOutputs] = useState<CalculatorOutputs | null>(null);
    const [targetOutputs, setTargetOutputs] = useState<TargetPOASOutputs | null>(null);

    // Modals
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    // Subscription check
    const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const res = await fetch('/api/subscription');
                if (res.ok) {
                    const data = await res.json();
                    setHasActiveSubscription(data.plan !== 'free' && data.status === 'active');
                } else {
                    setHasActiveSubscription(false);
                }
            } catch {
                setHasActiveSubscription(false);
            }
        };
        checkSubscription();
    }, []);

    // Handle input change
    const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
        const numValue = parseFloat(value) || 0;
        setInputs(prev => ({ ...prev, [field]: numValue }));
        setIsGoldenTest(false);
        // Clear validation errors when user types
        if (field === 'adSpend' && numValue > 0) {
            setValidationErrors(prev => ({ ...prev, adSpend: undefined }));
        }
    };

    // Handle target POAS change with validation
    const handleTargetPoasChange = (value: string) => {
        const numValue = parseFloat(value) || 0;
        if (numValue <= 0 && value !== '') {
            setTargetPoasError('Hedef POAS 0\'dan büyük olmalı.');
            setTargetPoas(null);
        } else {
            setTargetPoasError(null);
            setTargetPoas(numValue || null);
        }
    };

    // Apply Golden Test Case
    const applyGoldenTestCase = () => {
        setInputs({
            ...GOLDEN_INPUT,
            fixedCosts: undefined,
        });
        setIsGoldenTest(true);
        setValidationErrors({});
    };

    // Calculate results
    const handleCalculate = useCallback(() => {
        // PAYWALL: Check subscription before calculating
        if (hasActiveSubscription === false) {
            setShowUpgradeModal(true);
            return;
        }

        // Validate adSpend > 0
        if (inputs.adSpend === 0) {
            setValidationErrors({ adSpend: 'Reklam harcaması 0 olamaz.' });
            return;
        }
        setValidationErrors({});

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
    }, [inputs, targetPoas, hasActiveSubscription]);

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

    // Check if golden test matches
    const isGoldenTestValid = isGoldenTest && outputs &&
        Math.abs(outputs.grossProfit - GOLDEN_OUTPUT.grossProfit) < 0.01 &&
        Math.abs(outputs.poas - GOLDEN_OUTPUT.poas) < 0.01;

    const interpretation = outputs ? interpretPOAS(outputs.poas) : null;

    // PDF Export Function
    const handleExportPDF = async () => {
        if (!outputs) {
            alert('Önce hesaplama yapın.');
            return;
        }

        // PAYWALL: Check subscription before PDF export
        if (hasActiveSubscription === false) {
            setShowUpgradeModal(true);
            return;
        }

        try {
            // Dynamically import jsPDF to reduce bundle size
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();

            // Title
            doc.setFontSize(20);
            doc.setTextColor(99, 102, 241); // Primary color
            doc.text('POAS Hesaplayıcı - Senaryo Raporu', 20, 20);

            // Metadata
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`, 20, 30);
            doc.text(`Kanal: ${channel} | Para Birimi: ${currency}`, 20, 36);

            // Divider
            doc.setDrawColor(200, 200, 200);
            doc.line(20, 42, 190, 42);

            // Inputs Section
            doc.setFontSize(14);
            doc.setTextColor(50, 50, 50);
            doc.text('Girdiler', 20, 52);

            doc.setFontSize(11);
            doc.setTextColor(80, 80, 80);
            let y = 62;
            doc.text(`Gelir: ${formatCurrency(inputs.revenue, currencySymbol)}`, 25, y);
            doc.text(`Reklam Harcamasi: ${formatCurrency(inputs.adSpend, currencySymbol)}`, 25, y + 7);
            doc.text(`Urun Maliyeti (COGS): ${formatCurrency(inputs.cogs, currencySymbol)}`, 25, y + 14);
            doc.text(`Kargo Gideri: ${formatCurrency(inputs.shippingCost, currencySymbol)}`, 25, y + 21);
            doc.text(`Odeme Komisyonu: ${formatCurrency(inputs.paymentFees, currencySymbol)}`, 25, y + 28);
            doc.text(`Paketleme/Operasyon: ${formatCurrency(inputs.handlingCost, currencySymbol)}`, 25, y + 35);

            // Results Section
            doc.setFontSize(14);
            doc.setTextColor(50, 50, 50);
            doc.text('Sonuclar', 20, y + 52);

            doc.setFontSize(11);
            doc.setTextColor(80, 80, 80);
            y = y + 62;
            doc.text(`Degisken Maliyet: ${formatCurrency(outputs.variableOrderCosts, currencySymbol)}`, 25, y);
            doc.text(`Brut Kar: ${formatCurrency(outputs.grossProfit, currencySymbol)}`, 25, y + 7);

            // POAS highlight
            doc.setFontSize(16);
            doc.setTextColor(99, 102, 241);
            doc.text(`POAS: ${formatNumber(outputs.poas)}x`, 25, y + 18);

            doc.setFontSize(11);
            doc.setTextColor(80, 80, 80);
            doc.text(`ROAS: ${formatNumber(outputs.roas)}x`, 25, y + 28);
            doc.text(`Katki Payi: ${formatCurrency(outputs.contributionMargin, currencySymbol)}`, 25, y + 35);

            // Target POAS section (if exists)
            if (targetOutputs && targetPoas) {
                y = y + 50;
                doc.setFontSize(14);
                doc.setTextColor(50, 50, 50);
                doc.text('Hedef POAS Analizi', 20, y);

                doc.setFontSize(11);
                doc.setTextColor(80, 80, 80);
                doc.text(`Hedef POAS: ${formatNumber(targetPoas)}x`, 25, y + 10);
                doc.text(`Maks. Reklam Harcamasi: ${formatCurrency(targetOutputs.maxAdSpend, currencySymbol)}`, 25, y + 17);
                doc.text(`Min. Brut Kar Gereksinimi: ${formatCurrency(targetOutputs.minGrossProfit, currencySymbol)}`, 25, y + 24);
            }

            // Notes (if exists)
            if (notes) {
                y = targetOutputs ? y + 40 : y + 50;
                doc.setFontSize(12);
                doc.setTextColor(50, 50, 50);
                doc.text('Notlar:', 20, y);
                doc.setFontSize(10);
                doc.setTextColor(80, 80, 80);
                doc.text(notes.substring(0, 80), 25, y + 8);
            }

            // Footer
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text(`POAS Hesaplayici - ${new Date().getFullYear()} | poas-hesaplayici.onrender.com`, 20, 280);

            // Save PDF
            doc.save(`poas-rapor-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('PDF export error:', error);
            alert('PDF olusturulurken bir hata olustu. Lutfen tekrar deneyin.');
        }
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Page Header */}
            <div className="calculator-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        POAS Hesaplayıcı
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Reklamlarınızın gerçek kârlılığını hesaplayın
                    </p>
                </div>
                <button
                    onClick={applyGoldenTestCase}
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Lightbulb size={16} />
                    Örnek Verileri Doldur
                </button>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                }}
                className="calculator-grid"
            >
                {/* Left Column - Inputs */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        overflowX: 'hidden',
                    }}
                >
                    {/* Currency & Channel */}
                    <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <div style={{ flex: '1 1 140px', minWidth: '140px' }}>
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
                            <div style={{ flex: '1 1 140px', minWidth: '140px' }}>
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
                                    style={{
                                        paddingLeft: '2.5rem',
                                        ...(validationErrors.adSpend ? { borderColor: 'var(--color-error)' } : {})
                                    }}
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
                            {validationErrors.adSpend && (
                                <p style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {validationErrors.adSpend}
                                </p>
                            )}
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

                        <div className="variable-costs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Paketleme & Operasyon
                                    <span
                                        className="tooltip"
                                        data-tooltip="Kutu, etiket, dolgu, sipariş hazırlama"
                                        style={{ cursor: 'help' }}
                                    >
                                        <Info size={14} style={{ color: 'var(--color-text-muted)' }} />
                                    </span>
                                </label>
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
                                onChange={(e) => handleTargetPoasChange(e.target.value)}
                                style={targetPoasError ? { borderColor: 'var(--color-error)' } : {}}
                            />
                            {targetPoasError && (
                                <p style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                    {targetPoasError}
                                </p>
                            )}
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
                <div
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        overflowX: 'hidden',
                    }}
                >
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

                                {/* Golden Test Verification Badge */}
                                {isGoldenTest && (
                                    <div
                                        style={{
                                            marginTop: '1rem',
                                            padding: '0.75rem 1rem',
                                            background: isGoldenTestValid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                            borderRadius: 'var(--radius-md)',
                                            border: `1px solid ${isGoldenTestValid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                            fontSize: '0.875rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                        }}
                                    >
                                        {isGoldenTestValid ? (
                                            <>
                                                <span style={{ color: 'var(--color-success)' }}>✅</span>
                                                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                                                    Doğrulandı - PDF ile %100 uyumlu
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span style={{ color: 'var(--color-error)' }}>❌</span>
                                                <span style={{ color: 'var(--color-error)', fontWeight: 600 }}>
                                                    Beklenen: POAS 1.75x, Gross Profit 3,500₺
                                                </span>
                                            </>
                                        )}
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
                                    onClick={handleExportPDF}
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

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                reason="subscription_required"
            />

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
