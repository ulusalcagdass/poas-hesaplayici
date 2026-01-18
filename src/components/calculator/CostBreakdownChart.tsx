'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from '@/lib/i18n';

interface CostBreakdownChartProps {
    cogs: number;
    shipping: number;
    paymentFees: number;
    handling: number;
    fixedCosts?: number;
    currency: string;
}

const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#64748b'];

export default function CostBreakdownChart({
    cogs,
    shipping,
    paymentFees,
    handling,
    fixedCosts = 0,
    currency,
}: CostBreakdownChartProps) {
    const { language, t } = useLanguage();

    // Build data array with only cost items (no profit)
    const data = [
        { name: t('chart', 'productCost'), value: cogs, color: COLORS[0] },
        { name: t('chart', 'shippingCost'), value: shipping, color: COLORS[1] },
        { name: t('chart', 'paymentFees'), value: paymentFees, color: COLORS[2] },
        { name: t('chart', 'operationCost'), value: handling, color: COLORS[3] },
        ...(fixedCosts > 0 ? [{ name: t('chart', 'fixedCosts'), value: fixedCosts, color: COLORS[4] }] : []),
    ].filter(item => item.value > 0);

    const formatValue = (value: number) => {
        return new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value) + ' ' + currency;
    };

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                    }}
                >
                    <p style={{ color: payload[0].payload.color, fontWeight: 600 }}>
                        {payload[0].name}
                    </p>
                    <p style={{ color: 'var(--color-text-primary)' }}>
                        {formatValue(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCustomLabel = (props: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
        if (percent < 0.05) return null;
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '0.75rem', fontWeight: 600 }}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (data.length === 0) return null;

    return (
        <div
            className="glass-card"
            style={{
                padding: '1.5rem',
                marginBottom: '1.5rem',
            }}
        >
            <h4 style={{
                marginBottom: '1rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)'
            }}>
                {t('chart', 'costBreakdown')}
            </h4>

            <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={80}
                            innerRadius={40}
                            dataKey="value"
                            animationDuration={500}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{
                                fontSize: '0.8125rem',
                                paddingTop: '1rem',
                            }}
                            formatter={(value) => (
                                <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
