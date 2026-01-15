'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Save, AlertCircle } from 'lucide-react';
import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculations';
import { CHANNELS } from '@/types';

interface SaveScenarioModalProps {
    onClose: () => void;
    inputs: CalculatorInputs;
    outputs: CalculatorOutputs;
    channel: string;
    currency: string;
    notes: string;
}

export default function SaveScenarioModal({
    onClose,
    inputs,
    outputs,
    channel,
    currency,
    notes,
}: SaveScenarioModalProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(channel);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/senaryolar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    channel: selectedChannel,
                    currency,
                    inputs,
                    outputs,
                    notes,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Bir hata oluştu');
            } else {
                router.push('/senaryolar');
                router.refresh();
            }
        } catch {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                padding: '1rem',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    padding: '2rem',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <h2 style={{ fontSize: '1.25rem' }}>Senaryoyu Kaydet</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                        }}
                    >
                        <X size={20} />
                    </button>
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

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group" style={{ marginBottom: '1rem' }}>
                        <label className="input-label" htmlFor="name">
                            Senaryo Adı *
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="input"
                            placeholder="Örn: Black Friday Kampanyası"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="input-label" htmlFor="channel">
                            Reklam Kanalı
                        </label>
                        <select
                            id="channel"
                            className="input"
                            value={selectedChannel}
                            onChange={(e) => setSelectedChannel(e.target.value)}
                        >
                            {CHANNELS.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Summary */}
                    <div
                        style={{
                            padding: '1rem',
                            background: 'var(--color-bg)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                            Kaydedilecek Veriler
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>POAS</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-success)' }}>
                                {outputs.poas.toFixed(2)}x
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Brüt Kâr</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                {outputs.grossProfit.toLocaleString('tr-TR')} {currency}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Katkı Marjı</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: outputs.contributionMargin >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
                                {outputs.contributionMargin.toLocaleString('tr-TR')} {currency}
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary"
                            style={{ flex: 1 }}
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading || !name.trim()}
                            style={{ flex: 1, opacity: isLoading || !name.trim() ? 0.7 : 1 }}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
