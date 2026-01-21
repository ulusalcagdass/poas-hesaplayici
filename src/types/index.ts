import type { CalculatorInputs, CalculatorOutputs } from '@/lib/calculations';

export interface User {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Scenario {
    id: string;
    userId: string;
    name: string;
    channel: 'Google' | 'Meta' | 'TikTok' | 'Diğer';
    currency: string;
    inputs: CalculatorInputs;
    outputs: CalculatorOutputs;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type Channel = 'All' | 'Google' | 'Meta' | 'TikTok' | 'Diğer';

export const CHANNELS: { value: Channel; label: string; labelEn?: string }[] = [
    { value: 'All', label: 'Tüm Kanallar', labelEn: 'All Channels' },
    { value: 'Google', label: 'Google Ads' },
    { value: 'Meta', label: 'Meta (Facebook/Instagram)' },
    { value: 'TikTok', label: 'TikTok Ads' },
    { value: 'Diğer', label: 'Diğer', labelEn: 'Other' },
];

export const CURRENCIES = [
    { value: 'TRY', label: '₺ TRY', symbol: '₺' },
    { value: 'USD', label: '$ USD', symbol: '$' },
    { value: 'EUR', label: '€ EUR', symbol: '€' },
] as const;

export type Currency = typeof CURRENCIES[number]['value'];
