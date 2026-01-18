'use client';

import { useLanguage } from '@/lib/i18n';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface WhatIfAnalysisProps {
    currentPoas: number;
    currentGrossProfit: number;
    variableOrderCosts: number;
    revenue: number;
    adSpend: number;
    currencySymbol: string;
}

export default function WhatIfAnalysis({
    currentPoas,
    currentGrossProfit,
    variableOrderCosts,
    revenue,
    adSpend,
    currencySymbol,
}: WhatIfAnalysisProps) {
    const { language, t } = useLanguage();

    // Scenario 1: Costs decrease 10%
    const costsDown10 = variableOrderCosts * 0.9;
    const grossProfitCostsDown = revenue - costsDown10;
    const poasCostsDown = adSpend > 0 ? grossProfitCostsDown / adSpend : 0;

    // Scenario 2: AOV (revenue) increases 5%
    const revenueUp5 = revenue * 1.05;
    const grossProfitAovUp = revenueUp5 - variableOrderCosts;
    const poasAovUp = adSpend > 0 ? grossProfitAovUp / adSpend : 0;

    const formatNumber = (num: number, decimals: number = 2) => {
        return num.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    const formatCurrency = (num: number) => {
        return formatNumber(num, 0) + ' ' + currencySymbol;
    };

    return (
        <div
            className="glass-card"
            style={{
                padding: '1.5rem',
                marginTop: '1.5rem',
            }}
        >
            <h4 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                {t('whatIf', 'title')}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Scenario 1: Costs -10% */}
                <div
                    style={{
                        padding: '1rem',
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(16, 185, 129, 0.15)',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-success)',
                        fontWeight: 600,
                    }}>
                        <TrendingDown size={16} />
                        {t('whatIf', 'costDown10')}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>POAS</span>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-success)' }}>
                            {formatNumber(poasCostsDown)}x
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {language === 'tr' ? 'Brüt Kâr' : 'Gross Profit'}
                        </span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {formatCurrency(grossProfitCostsDown)}
                        </span>
                    </div>
                </div>

                {/* Scenario 2: AOV +5% */}
                <div
                    style={{
                        padding: '1rem',
                        background: 'rgba(99, 102, 241, 0.08)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(99, 102, 241, 0.15)',
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.8125rem',
                        color: 'var(--color-primary-light)',
                        fontWeight: 600,
                    }}>
                        <TrendingUp size={16} />
                        {t('whatIf', 'aovUp5')}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>POAS</span>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-light)' }}>
                            {formatNumber(poasAovUp)}x
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {language === 'tr' ? 'Brüt Kâr' : 'Gross Profit'}
                        </span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {formatCurrency(grossProfitAovUp)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Comparison with current */}
            <div style={{
                marginTop: '0.75rem',
                padding: '0.5rem 0.75rem',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <span>{t('whatIf', 'current')}: POAS {formatNumber(currentPoas)}x</span>
            </div>

            {/* Disclaimer */}
            <p style={{
                marginTop: '0.75rem',
                fontSize: '0.6875rem',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
            }}>
                {t('whatIf', 'disclaimer')}
            </p>
        </div>
    );
}
