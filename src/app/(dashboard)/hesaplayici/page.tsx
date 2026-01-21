'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Calculator,
    Target,
    TrendingUp,
    Save,
    Download,
    Info,
    Lightbulb,
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    LogIn,
    FileText
} from 'lucide-react';
import {
    calculateAll,
    calculateTargetPOAS,
    calculateROASTargets,
    interpretPOAS,
    POAS_PRESETS,
    DEFAULT_VALUES,
    suggestDefaults,
    type CalculatorInputs,
    type CalculatorOutputs,
    type TargetPOASOutputs,
    type ROASTargets
} from '@/lib/calculations';
import { CHANNELS, CURRENCIES } from '@/types';
import SaveScenarioModal from '@/components/calculator/SaveScenarioModal';
import CostBreakdownChart from '@/components/calculator/CostBreakdownChart';
import MarginSlider from '@/components/calculator/MarginSlider';
import SoftCTA from '@/components/calculator/SoftCTA';
import Tooltip from '@/components/ui/Tooltip';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Sector Presets - example values for different industries
const SECTOR_PRESETS = {
    none: { paymentFees: 0, shippingCost: 0 },
    ecommerce: { paymentFees: 0.025, shippingCost: 35 },
    dtc: { paymentFees: 0.03, shippingCost: 25 },
    marketplace: { paymentFees: 0.08, shippingCost: 0 },
    leadgen: { paymentFees: 0.02, shippingCost: 0 },
};

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
    const { language, setLanguage } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [currency, setCurrency] = useState(language === 'en' ? 'USD' : 'TRY');
    const currencySymbol = CURRENCIES.find(c => c.value === currency)?.symbol || (language === 'en' ? '$' : '₺');

    // Auto-switch currency when language changes
    useEffect(() => {
        setCurrency(language === 'en' ? 'USD' : 'TRY');
    }, [language]);

    // Labels for i18n
    const labels = language === 'tr' ? {
        pageTitle: 'POAS Hesaplayıcı',
        pageSubtitle: 'Reklamlarınızın gerçek kârlılığını hesaplayın',
        fillExample: 'Örnek Verileri Doldur',
        currency: 'Para Birimi',
        channel: 'Kanal',
        revenue: 'Gelir (Net)',
        adSpend: 'Reklam Harcaması',
        cogs: 'Ürün Maliyeti (COGS)',
        shipping: 'Kargo Gideri',
        paymentFees: 'Ödeme Komisyonları',
        handling: 'Paketleme & Operasyon',
        targetPoas: 'Hedef POAS',
        notes: 'Notlar',
        calculate: 'Hesapla',
        useSuggested: 'Önerilen Değerleri Kullan',
        results: 'Sonuçlar',
        grossProfit: 'Brüt Kâr',
        poas: 'POAS',
        roas: 'ROAS',
        contributionMargin: 'Katkı Marjı',
        variableCosts: 'Değişken Maliyetler',
        roasTargets: 'ROAS Hedefleri',
        breakeven: 'Başa Baş ROAS',
        margin10: '%10 Kar Marjı için ROAS',
        margin15: '%15 Kar Marjı için ROAS',
        margin20: '%20 Kar Marjı için ROAS',
        save: 'Kaydet',
        exportPdf: 'PDF İndir',
        waitingCalc: 'Hesaplama Bekleniyor',
        fillForm: 'Sol taraftaki formu doldurup "Hesapla" butonuna tıklayın.',
        sharingNote: 'Bu hesaplama POAS (Profit on Ad Spend) mantığı ile yapılmıştır.',
    } : {
        pageTitle: 'POAS Calculator',
        pageSubtitle: 'Calculate the true profitability of your ads',
        fillExample: 'Fill Example Data',
        currency: 'Currency',
        channel: 'Channel',
        revenue: 'Revenue (Net)',
        adSpend: 'Ad Spend',
        cogs: 'Product Cost (COGS)',
        shipping: 'Shipping Cost',
        paymentFees: 'Payment Fees',
        handling: 'Packaging & Operations',
        targetPoas: 'Target POAS',
        notes: 'Notes',
        calculate: 'Calculate',
        useSuggested: 'Use Suggested Values',
        results: 'Results',
        grossProfit: 'Gross Profit',
        poas: 'POAS',
        roas: 'ROAS',
        contributionMargin: 'Contribution Margin',
        variableCosts: 'Variable Costs',
        roasTargets: 'ROAS Targets',
        breakeven: 'Break-even ROAS',
        margin10: 'ROAS for 10% Margin',
        margin15: 'ROAS for 15% Margin',
        margin20: 'ROAS for 20% Margin',
        save: 'Save',
        exportPdf: 'Export PDF',
        waitingCalc: 'Waiting for Calculation',
        fillForm: 'Fill out the form on the left and click "Calculate".',
        sharingNote: 'This calculation uses POAS (Profit on Ad Spend) methodology.',
    };

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
    const [channel, setChannel] = useState<string>('All');
    const [isGoldenTest, setIsGoldenTest] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ adSpend?: string }>({});

    // Results
    const [outputs, setOutputs] = useState<CalculatorOutputs | null>(null);
    const [targetOutputs, setTargetOutputs] = useState<TargetPOASOutputs | null>(null);
    const [roasTargets, setRoasTargets] = useState<ROASTargets | null>(null);

    // Modals
    const [showSaveModal, setShowSaveModal] = useState(false);

    // ROAS Targets Accordion
    const [showRoasTargets, setShowRoasTargets] = useState(false);

    // Ref for results section (for PDF capture)
    const resultsRef = useRef<HTMLDivElement>(null);

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
        // Validate adSpend > 0
        if (inputs.adSpend === 0) {
            setValidationErrors({ adSpend: 'Reklam harcaması 0 olamaz.' });
            return;
        }
        setValidationErrors({});

        const result = calculateAll(inputs);
        setOutputs(result);

        // Calculate ROAS targets based on POAS/GrossProfit
        const roasResult = calculateROASTargets(inputs.revenue, result.grossProfit);
        setRoasTargets(roasResult);

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

    // Check if golden test matches
    const isGoldenTestValid = isGoldenTest && outputs &&
        Math.abs(outputs.grossProfit - GOLDEN_OUTPUT.grossProfit) < 0.01 &&
        Math.abs(outputs.poas - GOLDEN_OUTPUT.poas) < 0.01;

    const interpretation = outputs ? interpretPOAS(outputs.poas) : null;

    // PDF Export Function - A4 Portrait, Results Only, Full Page
    const handleExportPDF = async () => {
        if (!outputs) {
            alert(language === 'tr' ? 'Önce hesaplama yapın.' : 'Please calculate first.');
            return;
        }

        try {
            // Dynamic imports
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');
            const { default: ResultsExportPDF, PDF_WIDTH, PDF_HEIGHT } = await import('@/components/calculator/ResultsExportPDF');
            const { createRoot } = await import('react-dom/client');

            // Create offscreen container with A4 portrait dimensions
            const offscreenContainer = document.createElement('div');
            offscreenContainer.style.position = 'fixed';
            offscreenContainer.style.left = '-9999px';
            offscreenContainer.style.top = '0';
            offscreenContainer.style.width = `${PDF_WIDTH}px`;
            offscreenContainer.style.height = `${PDF_HEIGHT}px`;
            offscreenContainer.style.overflow = 'hidden';
            offscreenContainer.style.zIndex = '-9999';
            offscreenContainer.style.backgroundColor = '#0f172a';
            document.body.appendChild(offscreenContainer);

            // Render ResultsExportPDF component
            const root = createRoot(offscreenContainer);

            await new Promise<void>((resolve) => {
                root.render(
                    <ResultsExportPDF
                        inputs={inputs}
                        outputs={outputs}
                        targetOutputs={targetOutputs}
                        roasTargets={roasTargets}
                        channel={channel}
                        currency={currency}
                        language={language}
                        targetPoas={targetPoas ?? 1.0}
                    />
                );
                // Wait for render
                setTimeout(resolve, 150);
            });

            // Get the rendered container
            const pdfNode = offscreenContainer.querySelector('#pdf-export-container') as HTMLElement;

            if (!pdfNode) {
                throw new Error('PDF export container not found');
            }

            // Capture with html2canvas - A4 portrait dimensions
            const canvas = await html2canvas(pdfNode, {
                scale: 2,
                backgroundColor: '#0f172a',
                useCORS: true,
                logging: false,
                width: PDF_WIDTH,
                height: PDF_HEIGHT,
                windowWidth: PDF_WIDTH,
                windowHeight: PDF_HEIGHT,
            });

            // Cleanup
            root.unmount();
            document.body.removeChild(offscreenContainer);

            // Create PDF - A4 Portrait
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            // A4 portrait: 210mm x 297mm
            const pdfWidth = 210;
            const pdfHeight = 297;

            // Get image data
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Add image to fill entire page - 0 margin
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

            // Save
            pdf.save(`poas-${language === 'tr' ? 'rapor' : 'report'}-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('PDF export error:', error);
            alert(language === 'tr' ? 'PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred while creating PDF. Please try again.');
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
                        {labels.pageTitle}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {labels.pageSubtitle}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={applyGoldenTestCase}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem' }}
                    >
                        <Lightbulb size={16} />
                        <span>{labels.fillExample}</span>
                    </button>
                    <Link
                        href={language === 'tr' ? '/senaryolar' : '/scenarios'}
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem' }}
                    >
                        <FileText size={16} />
                        <span>{language === 'tr' ? 'Senaryolar' : 'Scenarios'}</span>
                    </Link>
                </div>
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
                                <label className="input-label">{labels.currency}</label>
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
                                <label className="input-label">{labels.channel}</label>
                                <select
                                    className="input"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    style={{ width: '100%' }}
                                >
                                    {CHANNELS.map(c => (
                                        <option key={c.value} value={c.value}>
                                            {language === 'en' && c.labelEn ? c.labelEn : c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Revenue & Ad Spend */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={20} style={{ color: 'var(--color-primary-light)' }} />
                            {language === 'tr' ? 'Gelir & Harcama' : 'Revenue & Spend'}
                        </h3>

                        <div className="input-group" style={{ marginBottom: '1rem' }}>
                            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {labels.revenue}
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
                            <label className="input-label">{labels.adSpend}</label>
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
                                {labels.variableCosts}
                            </h3>
                            {inputs.revenue > 0 && (
                                <button
                                    type="button"
                                    onClick={applySuggestedDefaults}
                                    className="btn btn-ghost btn-sm"
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    <Lightbulb size={14} />
                                    {language === 'tr' ? 'Varsayılan Öner' : 'Suggest Defaults'}
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
                                    {language === 'tr'
                                        ? 'Bazı maliyet verileri eksik. "Varsayılan Öner" butonuna tıklayarak sektör ortalamalarını kullanabilirsiniz.'
                                        : 'Some cost data is missing. Click "Suggest Defaults" to use industry averages.'}
                                </span>
                            </div>
                        )}

                        <div className="variable-costs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="input-group">
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {labels.cogs}
                                    <Tooltip content={language === 'tr' ? 'Ürünün tedarik veya üretim maliyeti.' : 'Product procurement or production cost.'} />
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${language === 'tr' ? '₺' : '$'} ${formatNumber(inputs.revenue * DEFAULT_VALUES.cogsRatio, 0)}`}
                                    value={inputs.cogs || ''}
                                    onChange={(e) => handleInputChange('cogs', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {labels.shipping}
                                    <Tooltip content={language === 'tr' ? 'Firmaya ait kargo bedelleri (müşteriden alınan hariç).' : 'Company shipping costs (excluding customer-paid).'} />
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${language === 'tr' ? '₺' : '$'} ${DEFAULT_VALUES.shippingCost}`}
                                    value={inputs.shippingCost || ''}
                                    onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {labels.paymentFees}
                                    <Tooltip content={language === 'tr' ? 'Sanal POS komisyonları, taksit farkları, ödeme sağlayıcı kesintileri.' : 'Virtual POS fees, installment fees, payment provider commissions.'} />
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${language === 'tr' ? '₺' : '$'} ${formatNumber(inputs.revenue * DEFAULT_VALUES.paymentFees, 0)}`}
                                    value={inputs.paymentFees || ''}
                                    onChange={(e) => handleInputChange('paymentFees', e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {labels.handling}
                                    <Tooltip content={language === 'tr' ? 'Kutu, ambalaj, işçilik, depo/fulfillment giderleri.' : 'Box, packaging, labor, warehouse/fulfillment costs.'} />
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`≈ ${language === 'tr' ? '₺' : '$'} ${DEFAULT_VALUES.handlingCost}`}
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
                                {language === 'tr' ? 'Net Profit Modu' : 'Net Profit Mode'}
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    {language === 'tr' ? '(Opsiyonel)' : '(Optional)'}
                                </span>
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={showNetProfit}
                                    onChange={(e) => setShowNetProfit(e.target.checked)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    {language === 'tr' ? 'Aktif' : 'Active'}
                                </span>
                            </label>
                        </div>

                        {showNetProfit && (
                            <div className="input-group">
                                <label className="input-label">
                                    {language === 'tr' ? 'Sabit Giderler (Maaş, Kira, Yazılım vb.)' : 'Fixed Costs (Salary, Rent, Software, etc.)'}
                                </label>
                                <input
                                    type="number"
                                    className="input"
                                    placeholder={`${language === 'tr' ? '₺' : '$'} 0`}
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
                            {labels.targetPoas}
                        </h3>

                        <div className="input-group" style={{ marginBottom: '1rem' }}>
                            <label className="input-label">
                                {language === 'tr' ? 'Hedef POAS Değeri' : 'Target POAS Value'}
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                className="input"
                                placeholder={language === 'tr' ? 'Örn: 1.5' : 'e.g. 1.5'}
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
                            {[
                                { value: 2.0, labelTr: 'Kısa Vadeli Kârlılık', labelEn: 'Short-term Profit' },
                                { value: 1.4, labelTr: 'Kontrollü Büyüme', labelEn: 'Controlled Growth' },
                                { value: 1.0, labelTr: 'Yeni Müşteri / Break-even', labelEn: 'New Customer / Break-even' },
                            ].map((preset) => (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => setTargetPoas(preset.value)}
                                    className={`btn btn-sm ${targetPoas === preset.value ? 'btn-primary' : 'btn-secondary'}`}
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    {preset.value}x - {language === 'tr' ? preset.labelTr : preset.labelEn}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>{labels.notes}</h3>
                        <textarea
                            className="input"
                            rows={3}
                            placeholder={language === 'tr' ? 'Kampanya hakkında notlarınız...' : 'Your notes about the campaign...'}
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
                        {labels.calculate}
                    </button>
                </div>

                {/* Right Column - Results */}
                <div
                    ref={resultsRef}
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
                                    {language === 'tr' ? 'POAS Değeriniz' : 'Your POAS'}
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
                                        {interpretation.status === 'excellent'
                                            ? (language === 'tr' ? 'Mükemmel kârlılık! Reklam harcamanız çok verimli çalışıyor.' : 'Excellent profitability! Your ad spend is very efficient.')
                                            : interpretation.status === 'good'
                                                ? (language === 'tr' ? 'İyi kârlılık. Kontrollü büyüme sağlıyorsunuz.' : 'Good profitability. You are achieving controlled growth.')
                                                : interpretation.status === 'warning'
                                                    ? (language === 'tr' ? 'Başabaş noktasındasınız. Müşteri kazanımı için kabul edilebilir.' : 'You are at break-even. Acceptable for customer acquisition.')
                                                    : (language === 'tr' ? 'Dikkat! Reklam harcamanız brüt kârınızdan fazla.' : 'Warning! Your ad spend exceeds your gross profit.')
                                        }
                                    </div>
                                )}
                            </div>

                            {/* Comparison with ROAS */}
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                    {language === 'tr' ? 'ROAS vs POAS Karşılaştırma' : 'ROAS vs POAS Comparison'}
                                </h3>
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
                                            {language === 'tr' ? 'Maliyetler hariç' : 'Excludes costs'}
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
                                            {language === 'tr' ? 'Gerçek kârlılık' : 'True profitability'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Results */}
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                    {language === 'tr' ? 'Detaylı Sonuçlar' : 'Detailed Results'}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>
                                            {language === 'tr' ? 'Gelir' : 'Revenue'}
                                        </span>
                                        <span style={{ fontWeight: 600 }}>{formatCurrency(inputs.revenue, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>
                                            {labels.variableCosts}
                                        </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-error)' }}>-{formatCurrency(outputs.variableOrderCosts, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', background: 'rgba(99, 102, 241, 0.1)', margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary-light)' }}>
                                            {labels.grossProfit}
                                        </span>
                                        <span style={{ fontWeight: 700, color: 'var(--color-primary-light)' }}>{formatCurrency(outputs.grossProfit, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>
                                            {labels.adSpend}
                                        </span>
                                        <span style={{ fontWeight: 600, color: 'var(--color-error)' }}>-{formatCurrency(inputs.adSpend, currencySymbol)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', background: 'rgba(16, 185, 129, 0.1)', margin: '0 -1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>
                                            {labels.contributionMargin}
                                        </span>
                                        <span style={{ fontWeight: 700, color: outputs.contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                            {formatCurrency(outputs.contributionMargin, currencySymbol)}
                                        </span>
                                    </div>

                                    {showNetProfit && outputs.netProfit !== null && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                            <span style={{ fontWeight: 600 }}>
                                                {language === 'tr' ? 'Net Kâr' : 'Net Profit'}
                                            </span>
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
                                        {language === 'tr' ? `Hedef POAS: ${targetPoas}x` : `Target POAS: ${targetPoas}x`}
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
                                                {language === 'tr' ? 'Bu brüt kâr için maksimum reklam harcaması' : 'Maximum ad spend for this gross profit'}
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
                                                {language === 'tr' ? 'Bu reklam harcamasıyla ulaşılması gereken minimum brüt kâr' : 'Minimum gross profit required for this ad spend'}
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
                                                {formatCurrency(targetOutputs.minGrossProfit, currencySymbol)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Cost Breakdown Chart */}
                            <CostBreakdownChart
                                cogs={inputs.cogs || 0}
                                shipping={inputs.shippingCost || 0}
                                paymentFees={inputs.paymentFees || 0}
                                handling={inputs.handlingCost || 0}
                                fixedCosts={inputs.fixedCosts || 0}
                                currency={currencySymbol}
                            />

                            {/* ROAS Hedefleri - Free for all logged-in users */}
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                                <button
                                    onClick={() => setShowRoasTargets(!showRoasTargets)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        padding: 0,
                                    }}
                                >
                                    <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                        <TrendingUp size={20} style={{ color: 'var(--color-warning)' }} />
                                        {language === 'tr' ? 'ROAS Hedefleri (POAS\'a göre)' : 'ROAS Targets (based on POAS)'}
                                    </h3>
                                    {showRoasTargets ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>

                                {/* ROAS Targets content - free for everyone */}
                                {showRoasTargets && roasTargets && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                            {language === 'tr'
                                                ? 'Bu ROAS hedefleri, girdiğiniz brüt kâr (POAS) yapısına göre hesaplanır.'
                                                : 'These ROAS targets are calculated based on your gross profit (POAS) structure.'}
                                        </p>

                                        {/* Breakeven ROAS */}
                                        <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                                    {labels.breakeven}
                                                </span>
                                                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>
                                                    {formatNumber(roasTargets.breakevenROAS)}x
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                                {language === 'tr'
                                                    ? 'Bu ROAS\'ta reklam harcaması brüt kârınıza eşittir.'
                                                    : 'At this ROAS, ad spend equals your gross profit.'}
                                            </div>
                                        </div>

                                        {/* Margin ROAS targets */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                            {/* 10% margin */}
                                            <div style={{ padding: '0.75rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                    {language === 'tr' ? '%10 Marj' : '10% Margin'}
                                                </div>
                                                {roasTargets.impossible10 ? (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                                                        {language === 'tr' ? 'Mümkün değil' : 'Not possible'}
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                        {formatNumber(roasTargets.roas10!)}x
                                                    </div>
                                                )}
                                            </div>
                                            {/* 15% margin */}
                                            <div style={{ padding: '0.75rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                    {language === 'tr' ? '%15 Marj' : '15% Margin'}
                                                </div>
                                                {roasTargets.impossible15 ? (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                                                        {language === 'tr' ? 'Mümkün değil' : 'Not possible'}
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                        {formatNumber(roasTargets.roas15!)}x
                                                    </div>
                                                )}
                                            </div>
                                            {/* 20% margin */}
                                            <div style={{ padding: '0.75rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                    {language === 'tr' ? '%20 Marj' : '20% Margin'}
                                                </div>
                                                {roasTargets.impossible20 ? (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>
                                                        {language === 'tr' ? 'Mümkün değil' : 'Not possible'}
                                                    </div>
                                                ) : (
                                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                        {formatNumber(roasTargets.roas20!)}x
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info tooltip */}
                                        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                                            <Info size={14} style={{ color: 'var(--color-primary-light)', flexShrink: 0, marginTop: '2px' }} />
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                {language === 'tr'
                                                    ? 'POAS kârlılığı ölçer, ROAS ise bu kârlılığa göre hedeflenmesi gereken reklam performansını gösterir.'
                                                    : 'POAS measures profitability, while ROAS shows ad performance needed to achieve that profit.'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Dynamic Margin Slider */}
                            <MarginSlider
                                revenue={inputs.revenue}
                                grossProfit={outputs.grossProfit}
                                onRoasChange={() => { }}
                            />

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button
                                    onClick={() => setShowSaveModal(true)}
                                    className="btn btn-primary"
                                    style={{ flex: 1 }}
                                >
                                    <Save size={18} />
                                    {language === 'tr' ? 'Senaryoyu Kaydet' : 'Save Scenario'}
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1 }}
                                    onClick={handleExportPDF}
                                >
                                    <Download size={18} />
                                    {labels.exportPdf}
                                </button>
                            </div>

                            {/* Soft CTA for Consulting */}
                            <SoftCTA />
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
                            <h3 style={{ marginBottom: '0.5rem' }}>{labels.waitingCalc}</h3>
                            <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px', margin: '0 auto' }}>
                                {labels.fillForm}
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
