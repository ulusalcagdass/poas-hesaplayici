'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
    FileText,
    Plus,
    Trash2,
    Copy,

    Search,
    Filter,
    Calendar,
    AlertCircle,
    Check
} from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculations';
import { CHANNELS, CURRENCIES } from '@/types';
import { useLanguage } from '@/lib/i18n';

interface Scenario {
    id: string;
    name: string;
    channel: string;
    currency: string;
    inputs: CalculatorInputs;
    outputs: CalculatorOutputs;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
}

// i18n labels
const labels = {
    tr: {
        pageTitle: 'Senaryolarım',
        pageSubtitle: 'Kayıtlı POAS hesaplamalarınız',
        newCalculation: 'Yeni Hesaplama',
        searchPlaceholder: 'Senaryo ara...',
        allChannels: 'Tüm Kanallar',

        noScenarios: 'Henüz Senaryo Yok',
        noScenariosDesc: 'İlk POAS hesaplamanızı yapın ve senaryolarınızı kaydedin.',
        firstCalculation: 'İlk Hesaplamanı Yap',
        noResults: 'Sonuç Bulunamadı',
        noResultsDesc: 'Arama kriterlerinize uygun senaryo bulunamadı.',
        currency: 'Para Birimi',
        poas: 'POAS',
        grossProfit: 'Brüt Kâr',
        contributionMargin: 'Katkı Marjı',
        revenue: 'Gelir',
        adSpend: 'Reklam Harcaması',
        cogs: 'Ürün Maliyeti (COGS)',
        shipping: 'Kargo',
        commission: 'Komisyon',
        roas: 'ROAS',
        copy: 'Kopyala',
        delete: 'Sil',
        cancel: 'İptal',
        copied: 'Kopyalandı!',
        errorLoad: 'Senaryolar yüklenirken bir hata oluştu',
        errorDelete: 'Senaryo silinirken bir hata oluştu',
        calculatorLink: '/hesaplayici',
    },
    en: {
        pageTitle: 'My Scenarios',
        pageSubtitle: 'Your saved POAS calculations',
        newCalculation: 'New Calculation',
        searchPlaceholder: 'Search scenarios...',
        allChannels: 'All Channels',

        noScenarios: 'No Scenarios Yet',
        noScenariosDesc: 'Create your first POAS calculation and save your scenarios.',
        firstCalculation: 'Create First Calculation',
        noResults: 'No Results Found',
        noResultsDesc: 'No scenarios match your search criteria.',
        currency: 'Currency',
        poas: 'POAS',
        grossProfit: 'Gross Profit',
        contributionMargin: 'Contribution Margin',
        revenue: 'Revenue',
        adSpend: 'Ad Spend',
        cogs: 'Product Cost (COGS)',
        shipping: 'Shipping',
        commission: 'Commission',
        roas: 'ROAS',
        copy: 'Copy',
        delete: 'Delete',
        cancel: 'Cancel',
        copied: 'Copied!',
        errorLoad: 'An error occurred while loading scenarios',
        errorDelete: 'An error occurred while deleting scenario',
        calculatorLink: '/calculator',
    }
};

export default function SenaryolarPage() {
    const { language, setLanguage } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const t = labels[language];

    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [channelFilter, setChannelFilter] = useState<string>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Fetch scenarios from localStorage
    useEffect(() => {
        try {
            const storedScenarios = localStorage.getItem('poas_scenarios_v1');
            if (storedScenarios) {
                setScenarios(JSON.parse(storedScenarios));
            }
        } catch {
            setError(t.errorLoad);
        } finally {
            setIsLoading(false);
        }
    }, [t.errorLoad]);

    // Delete scenario from localStorage
    const handleDelete = (id: string) => {
        try {
            const updatedScenarios = scenarios.filter(s => s.id !== id);
            localStorage.setItem('poas_scenarios_v1', JSON.stringify(updatedScenarios));
            setScenarios(updatedScenarios);
            setDeleteConfirm(null);
        } catch {
            setError(t.errorDelete);
        }
    };

    // Copy scenario to clipboard
    const handleCopy = async (scenario: Scenario) => {
        const symbol = getCurrencySymbol(scenario.currency);
        const text = `${scenario.name}
${language === 'tr' ? 'Kanal' : 'Channel'}: ${scenario.channel}
${language === 'tr' ? 'Tarih' : 'Date'}: ${formatDate(scenario.createdAt)}

POAS: ${scenario.outputs.poas.toFixed(2)}x
${t.grossProfit}: ${scenario.outputs.grossProfit.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
${t.contributionMargin}: ${scenario.outputs.contributionMargin.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}

${t.revenue}: ${scenario.inputs.revenue.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
${t.adSpend}: ${scenario.inputs.adSpend.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
${t.cogs}: ${scenario.inputs.cogs.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
${t.shipping}: ${scenario.inputs.shippingCost.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
${t.commission}: ${scenario.inputs.paymentFees.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ${symbol}
ROAS: ${scenario.outputs.roas.toFixed(2)}x`;

        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for iOS Safari
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            setCopiedId(scenario.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };



    // Filter scenarios
    const filteredScenarios = scenarios.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesChannel = channelFilter === 'all' || s.channel === channelFilter;
        return matchesSearch && matchesChannel;
    });

    const getCurrencySymbol = (currency: string) => {
        return CURRENCIES.find(c => c.value === currency)?.symbol || '₺';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px' }} />
            </div>
        );
    }

    return (
        <div>
            {/* Toast notification */}
            {copiedId && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--color-success)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        zIndex: 9999,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        animation: 'fadeIn 0.2s ease',
                    }}
                >
                    <Check size={18} />
                    {t.copied}
                </div>
            )}

            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        {t.pageTitle}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {t.pageSubtitle}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href={t.calculatorLink} className="btn btn-primary">
                        <Plus size={18} />
                        {t.newCalculation}
                    </Link>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        color: 'var(--color-error)',
                        fontSize: '0.875rem',
                    }}
                >
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            {scenarios.length === 0 ? (
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
                        <FileText size={40} style={{ color: 'var(--color-primary-light)' }} />
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>{t.noScenarios}</h3>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                        {t.noScenariosDesc}
                    </p>
                    <Link href={t.calculatorLink} className="btn btn-primary">
                        <Plus size={18} />
                        {t.firstCalculation}
                    </Link>
                </div>
            ) : (
                <>
                    {/* Filters */}
                    <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Search */}
                            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    className="input"
                                    placeholder={t.searchPlaceholder}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>

                            {/* Channel Filter */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Filter size={18} style={{ color: 'var(--color-text-muted)' }} />
                                <select
                                    className="input"
                                    value={channelFilter}
                                    onChange={(e) => setChannelFilter(e.target.value)}
                                    style={{ width: 'auto' }}
                                >
                                    <option value="all">{t.allChannels}</option>
                                    {CHANNELS.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>


                        </div>
                    </div>

                    {/* Scenarios List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {filteredScenarios.map((scenario) => (
                            <div
                                key={scenario.id}
                                className="glass-card"
                                style={{ padding: '1.5rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                                    {/* Left - Info */}
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.125rem' }}>{scenario.name}</h3>
                                            <span className="badge">{scenario.channel}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={14} />
                                                {formatDate(scenario.createdAt)}
                                            </span>
                                            <span>
                                                {t.currency}: {getCurrencySymbol(scenario.currency)}
                                            </span>
                                        </div>
                                        {scenario.notes && (
                                            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                                {scenario.notes}
                                            </p>
                                        )}
                                    </div>

                                    {/* Center - Metrics */}
                                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                {t.poas}
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: scenario.outputs.poas >= 1 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                {scenario.outputs.poas.toFixed(2)}x
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                {t.grossProfit}
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                                {scenario.outputs.grossProfit.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                {t.contributionMargin}
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: scenario.outputs.contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                {scenario.outputs.contributionMargin.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            title={t.copy}
                                            onClick={() => handleCopy(scenario)}
                                            style={{ color: copiedId === scenario.id ? 'var(--color-success)' : undefined }}
                                        >
                                            {copiedId === scenario.id ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                        {deleteConfirm === scenario.id ? (
                                            <>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ background: 'var(--color-error)', color: 'white' }}
                                                    onClick={() => handleDelete(scenario.id)}
                                                >
                                                    {t.delete}
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => setDeleteConfirm(null)}
                                                >
                                                    {t.cancel}
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                title={t.delete}
                                                onClick={() => setDeleteConfirm(scenario.id)}
                                                style={{ color: 'var(--color-error)' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Expandable Details */}
                                <div
                                    style={{
                                        marginTop: '1rem',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid var(--color-border)',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                        gap: '1rem',
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.revenue}</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.revenue.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.adSpend}</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.adSpend.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.cogs}</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.cogs.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.shipping}</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.shippingCost.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.commission}</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.paymentFees.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t.roas}</div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{scenario.outputs.roas.toFixed(2)}x</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredScenarios.length === 0 && (
                        <div
                            className="glass-card"
                            style={{
                                padding: '3rem 2rem',
                                textAlign: 'center',
                            }}
                        >
                            <Search size={40} style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
                            <h3 style={{ marginBottom: '0.5rem' }}>{t.noResults}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                {t.noResultsDesc}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
