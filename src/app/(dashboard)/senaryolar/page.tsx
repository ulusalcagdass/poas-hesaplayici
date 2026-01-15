'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    FileText,
    Plus,
    Trash2,
    Copy,
    Download,
    Search,
    Filter,
    Calendar,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculations';
import { CHANNELS, CURRENCIES } from '@/types';

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

export default function SenaryolarPage() {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [channelFilter, setChannelFilter] = useState<string>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Fetch scenarios
    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const response = await fetch('/api/senaryolar');
                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || 'Senaryolar yüklenirken bir hata oluştu');
                } else {
                    setScenarios(data);
                }
            } catch {
                setError('Senaryolar yüklenirken bir hata oluştu');
            } finally {
                setIsLoading(false);
            }
        };

        fetchScenarios();
    }, []);

    // Delete scenario
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/senaryolar/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setScenarios(scenarios.filter(s => s.id !== id));
                setDeleteConfirm(null);
            }
        } catch {
            setError('Senaryo silinirken bir hata oluştu');
        }
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = ['Ad', 'Kanal', 'Tarih', 'Gelir', 'Reklam Harcaması', 'COGS', 'Kargo', 'Komisyon', 'Operasyon', 'Brüt Kâr', 'POAS', 'Katkı Marjı'];
        const rows = filteredScenarios.map(s => [
            s.name,
            s.channel,
            new Date(s.createdAt).toLocaleDateString('tr-TR'),
            s.inputs.revenue,
            s.inputs.adSpend,
            s.inputs.cogs,
            s.inputs.shippingCost,
            s.inputs.paymentFees,
            s.inputs.handlingCost,
            s.outputs.grossProfit,
            s.outputs.poas.toFixed(2),
            s.outputs.contributionMargin,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `poas-senaryolar-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
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
        return new Date(dateString).toLocaleDateString('tr-TR', {
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
            {/* Page Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                        Senaryolarım
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Kayıtlı POAS hesaplamalarınız
                    </p>
                </div>
                <Link href="/hesaplayici" className="btn btn-primary">
                    <Plus size={18} />
                    Yeni Hesaplama
                </Link>
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
                    <h3 style={{ marginBottom: '0.5rem' }}>Henüz Senaryo Yok</h3>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                        İlk POAS hesaplamanızı yapın ve senaryolarınızı kaydedin.
                    </p>
                    <Link href="/hesaplayici" className="btn btn-primary">
                        <Plus size={18} />
                        İlk Hesaplamanı Yap
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
                                    placeholder="Senaryo ara..."
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
                                    <option value="all">Tüm Kanallar</option>
                                    {CHANNELS.map(c => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Export */}
                            <button onClick={exportToCSV} className="btn btn-secondary btn-sm">
                                <Download size={16} />
                                CSV İndir
                            </button>
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
                                                Para Birimi: {getCurrencySymbol(scenario.currency)}
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
                                                POAS
                                            </div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: scenario.outputs.poas >= 1 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                {scenario.outputs.poas.toFixed(2)}x
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                Brüt Kâr
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                                {scenario.outputs.grossProfit.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                                Katkı Marjı
                                            </div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: scenario.outputs.contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                                {scenario.outputs.contributionMargin.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Actions */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            title="Kopyala"
                                            onClick={() => {
                                                // TODO: Implement copy to calculator
                                            }}
                                        >
                                            <Copy size={16} />
                                        </button>
                                        {deleteConfirm === scenario.id ? (
                                            <>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ background: 'var(--color-error)', color: 'white' }}
                                                    onClick={() => handleDelete(scenario.id)}
                                                >
                                                    Sil
                                                </button>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => setDeleteConfirm(null)}
                                                >
                                                    İptal
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                title="Sil"
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
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Gelir</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.revenue.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Reklam Harcaması</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.adSpend.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>COGS</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.cogs.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Kargo</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.shippingCost.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Komisyon</div>
                                        <div style={{ fontWeight: 600 }}>{scenario.inputs.paymentFees.toLocaleString('tr-TR')} {getCurrencySymbol(scenario.currency)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ROAS</div>
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
                            <h3 style={{ marginBottom: '0.5rem' }}>Sonuç Bulunamadı</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                Arama kriterlerinize uygun senaryo bulunamadı.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
