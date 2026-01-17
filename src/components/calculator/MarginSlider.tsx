'use client';

import { useState, useCallback } from 'react';
import { SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface MarginSliderProps {
    revenue: number;
    grossProfit: number;
    onRoasChange: (targetRoas: number, marginPercent: number) => void;
}

export default function MarginSlider({ revenue, grossProfit, onRoasChange }: MarginSliderProps) {
    const { language, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [marginPercent, setMarginPercent] = useState(15);

    const maxAchievableMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const isMarginAchievable = marginPercent <= maxAchievableMargin;

    const calculateTargetRoas = useCallback((margin: number) => {
        if (revenue <= 0 || grossProfit <= 0) return 0;
        const targetProfit = revenue * (margin / 100);
        const variableCosts = revenue - grossProfit;
        const allowedAdSpend = grossProfit - targetProfit;
        if (allowedAdSpend <= 0) return Infinity;
        return revenue / allowedAdSpend;
    }, [revenue, grossProfit]);

    const handleSliderChange = (value: number) => {
        setMarginPercent(value);
        const targetRoas = calculateTargetRoas(value);
        onRoasChange(targetRoas, value);
    };

    const targetRoas = calculateTargetRoas(marginPercent);
    const breakevenRoas = revenue > 0 && grossProfit > 0 ? revenue / grossProfit : 0;

    const formatNumber = (num: number) => {
        if (!isFinite(num) || num > 99999) return '∞';
        return new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    };

    return (
        <div
            className="glass-card"
            style={{
                padding: '1.5rem',
                marginTop: '1rem',
            }}
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <SlidersHorizontal size={18} style={{ color: 'var(--color-primary-light)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {t('results', 'adjustMargin')}
                    </span>
                </div>
                <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-primary-light)',
                    fontWeight: 600,
                }}>
                    %{marginPercent}
                </span>
            </button>

            {/* Slider Content */}
            {isOpen && (
                <div style={{ marginTop: '1.5rem' }}>
                    {/* Slider */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="1"
                            value={marginPercent}
                            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                            style={{
                                width: '100%',
                                height: '8px',
                                borderRadius: '4px',
                                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${marginPercent * 2}%, var(--color-border) ${marginPercent * 2}%, var(--color-border) 100%)`,
                                appearance: 'none',
                                cursor: 'pointer',
                            }}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '0.5rem',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                        }}>
                            <span>%0</span>
                            <span>%25</span>
                            <span>%50</span>
                        </div>
                    </div>

                    {/* Results */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                    }}>
                        <div
                            style={{
                                background: 'var(--color-surface)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem',
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                {t('results', 'breakeven')}
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>
                                {formatNumber(breakevenRoas)}x
                            </div>
                        </div>
                        <div
                            style={{
                                background: 'var(--color-surface)',
                                borderRadius: 'var(--radius-md)',
                                padding: '1rem',
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                                {t('results', 'targetRoas')} (%{marginPercent})
                            </div>
                            <div style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: isMarginAchievable ? 'var(--color-success)' : 'var(--color-error)',
                            }}>
                                {formatNumber(targetRoas)}x
                            </div>
                        </div>
                    </div>

                    {/* Warning if margin not achievable */}
                    {!isMarginAchievable && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                color: 'var(--color-error)',
                                fontSize: '0.875rem',
                            }}
                        >
                            <AlertTriangle size={16} />
                            <span>
                                {language === 'tr'
                                    ? `Bu marj mevcut maliyetlerle mümkün değil. Maksimum: %${maxAchievableMargin.toFixed(1)}`
                                    : `This margin is not achievable with current costs. Maximum: ${maxAchievableMargin.toFixed(1)}%`
                                }
                            </span>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
                input[type='range']::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </div>
    );
}
