'use client';

import { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface CopyShareButtonsProps {
    poas: number;
    grossProfit: number;
    breakevenRoas: number;
    currencySymbol: string;
}

export default function CopyShareButtons({
    poas,
    grossProfit,
    breakevenRoas,
    currencySymbol,
}: CopyShareButtonsProps) {
    const { language, t } = useLanguage();
    const [copied, setCopied] = useState(false);

    const formatNumber = (num: number, decimals: number = 2) => {
        return num.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    const formatCurrency = (num: number) => {
        return formatNumber(num, 0) + ' ' + currencySymbol;
    };

    const handleCopy = async () => {
        const date = new Date().toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US');

        const text = language === 'tr'
            ? `📊 POAS Hesaplama Sonucu
━━━━━━━━━━━━━━━━
POAS: ${formatNumber(poas)}x
Brüt Kâr: ${formatCurrency(grossProfit)}
Başa Baş ROAS: ${formatNumber(breakevenRoas)}x
Tarih: ${date}
━━━━━━━━━━━━━━━━
POAS Hesaplayıcı: poas-hesaplayici.onrender.com`
            : `📊 POAS Calculation Result
━━━━━━━━━━━━━━━━
POAS: ${formatNumber(poas)}x
Gross Profit: ${formatCurrency(grossProfit)}
Break-even ROAS: ${formatNumber(breakevenRoas)}x
Date: ${date}
━━━━━━━━━━━━━━━━
POAS Calculator: poas-hesaplayici.onrender.com`;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1rem',
        }}>
            <button
                onClick={handleCopy}
                className="btn btn-secondary btn-sm"
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? t('copyShare', 'copied') : t('copyShare', 'copyResult')}
            </button>
            <button
                className="btn btn-secondary btn-sm"
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}
                onClick={() => {
                    // For now, show alert - PNG export would need html2canvas
                    alert(language === 'tr'
                        ? 'Görsel paylaşım özelliği yakında eklenecek!'
                        : 'Image sharing feature coming soon!');
                }}
            >
                <Share2 size={16} />
                {t('copyShare', 'shareImage')}
            </button>
        </div>
    );
}
