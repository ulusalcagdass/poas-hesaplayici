'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Language = 'tr' | 'en';

// High-quality translations with proper finance/marketing terminology
export const translations = {
    // Common
    common: {
        tr: {
            calculate: 'Hesapla',
            results: 'Sonuçlar',
            export: 'PDF İndir',
            save: 'Kaydet',
            close: 'Kapat',
            free: 'Ücretsiz',
            open: 'Herkese Açık',
        },
        en: {
            calculate: 'Calculate',
            results: 'Results',
            export: 'Export PDF',
            save: 'Save',
            close: 'Close',
            free: 'Free',
            open: 'Open to All',
        },
    },

    // Navigation
    nav: {
        tr: {
            home: 'Ana Sayfa',
            calculator: 'Hesaplayıcı',
            features: 'Özellikler',
            howItWorks: 'Nasıl Çalışır',
            faq: 'SSS',
        },
        en: {
            home: 'Home',
            calculator: 'Calculator',
            features: 'Features',
            howItWorks: 'How It Works',
            faq: 'FAQ',
        },
    },

    // Hero Section
    hero: {
        tr: {
            title1: 'ROAS değil,',
            title2: 'POAS',
            title3: 'ile gerçek kârlılığı ölç.',
            subtitle: 'Kargo, komisyon ve operasyon maliyetlerini yok sayan ROAS yerine gerçek kârlılığa odaklan.',
            cta: 'Ücretsiz Hesapla',
            howItWorks: 'Nasıl Çalışır?',
        },
        en: {
            title1: 'Not ROAS,',
            title2: 'POAS',
            title3: 'measures true profitability.',
            subtitle: 'Focus on real profit instead of ROAS which ignores shipping, commission, and operational costs.',
            cta: 'Calculate Free',
            howItWorks: 'How It Works?',
        },
    },

    // Calculator Labels
    calculator: {
        tr: {
            revenue: 'Gelir (Net)',
            adSpend: 'Reklam Harcaması',
            cogs: 'Ürün Maliyeti (COGS)',
            shipping: 'Kargo Gideri',
            paymentFees: 'Ödeme Komisyonu',
            handling: 'Paketleme & Operasyon',
            channel: 'Kanal',
            currency: 'Para Birimi',
            targetPoas: 'Hedef POAS',
            notes: 'Notlar',
        },
        en: {
            revenue: 'Revenue (Net)',
            adSpend: 'Ad Spend',
            cogs: 'Cost of Goods Sold (COGS)',
            shipping: 'Shipping Cost',
            paymentFees: 'Payment Fees',
            handling: 'Packaging & Operations',
            channel: 'Channel',
            currency: 'Currency',
            targetPoas: 'Target POAS',
            notes: 'Notes',
        },
    },

    // Tooltips for cost fields
    tooltips: {
        tr: {
            cogs: 'Ürünün tedarik veya üretim maliyeti.',
            shipping: 'Firmaya ait kargo bedelleri (müşteriden alınan hariç).',
            paymentFees: 'Sanal POS komisyonları, taksit farkları, ödeme sağlayıcı kesintileri (iyzico, PayTR vb.).',
            handling: 'Kutu, ambalaj, işçilik, depo/fulfillment giderleri.',
            revenue: 'KDV hariç, indirimler sonrası tahsil edilen net tutar.',
            adSpend: 'Toplam reklam harcaması (Google, Meta, TikTok vb.).',
        },
        en: {
            cogs: 'Product procurement or manufacturing cost.',
            shipping: 'Shipping costs borne by your company (excluding customer-paid).',
            paymentFees: 'Payment gateway fees, installment charges, provider cuts (Stripe, PayPal, etc.).',
            handling: 'Packaging, labor, warehouse, and fulfillment costs.',
            revenue: 'Net revenue after discounts, excluding VAT.',
            adSpend: 'Total ad spend across platforms (Google, Meta, TikTok, etc.).',
        },
    },

    // Results
    results: {
        tr: {
            grossProfit: 'Brüt Kâr',
            poas: 'POAS',
            roas: 'ROAS',
            contributionMargin: 'Katkı Marjı',
            variableCosts: 'Değişken Maliyetler',
            roasTargets: 'ROAS Hedefleri',
            breakeven: 'Başa Baş ROAS',
            targetRoas: 'Hedef ROAS',
            margin10: '%10 Kar Marjı',
            margin15: '%15 Kar Marjı',
            margin20: '%20 Kar Marjı',
            customMargin: 'Özel Kar Marjı',
            adjustMargin: 'Hedef Kar Marjını Değiştir',
            sharingNote: 'Bu hesaplama POAS (Profit on Ad Spend) mantığı ile yapılmıştır.',
        },
        en: {
            grossProfit: 'Gross Profit',
            poas: 'POAS',
            roas: 'ROAS',
            contributionMargin: 'Contribution Margin',
            variableCosts: 'Variable Costs',
            roasTargets: 'ROAS Targets',
            breakeven: 'Break-even ROAS',
            targetRoas: 'Target ROAS',
            margin10: '10% Profit Margin',
            margin15: '15% Profit Margin',
            margin20: '20% Profit Margin',
            customMargin: 'Custom Profit Margin',
            adjustMargin: 'Adjust Target Margin',
            sharingNote: 'This calculation uses POAS (Profit on Ad Spend) methodology.',
        },
    },

    // Chart
    chart: {
        tr: {
            costBreakdown: 'Maliyet Dağılımı',
            productCost: 'Ürün Maliyeti',
            shippingCost: 'Kargo',
            operationCost: 'Operasyon',
            profit: 'Brüt Kâr',
        },
        en: {
            costBreakdown: 'Cost Breakdown',
            productCost: 'Product Cost',
            shippingCost: 'Shipping',
            operationCost: 'Operations',
            profit: 'Gross Profit',
        },
    },

    // Footer
    footer: {
        tr: {
            attribution: 'Bu araç',
            by: 'tarafından ücretsiz sunulmaktadır.',
            openToAll: 'Herkes için açık ve ücretsizdir.',
        },
        en: {
            attribution: 'This tool is provided free by',
            by: '',
            openToAll: 'Free and open to everyone.',
        },
    },

    // FAQ
    faq: {
        tr: {
            title: 'Sıkça Sorulan Sorular',
            subtitle: 'POAS hakkında merak ettikleriniz',
        },
        en: {
            title: 'Frequently Asked Questions',
            subtitle: 'Everything you need to know about POAS',
        },
    },

    // Interpretation
    interpretation: {
        tr: {
            excellent: 'Mükemmel kârlılık',
            good: 'İyi kârlılık',
            moderate: 'Orta düzey kârlılık',
            low: 'Düşük kârlılık',
            breakeven: 'Başa baş noktası',
            loss: 'Zarar',
        },
        en: {
            excellent: 'Excellent profitability',
            good: 'Good profitability',
            moderate: 'Moderate profitability',
            low: 'Low profitability',
            breakeven: 'Break-even point',
            loss: 'Loss',
        },
    },
};

// Language Context
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (section: keyof typeof translations, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('tr');

    const t = useCallback((section: keyof typeof translations, key: string): string => {
        const sectionData = translations[section];
        if (!sectionData) return key;

        const langData = sectionData[language] as Record<string, string>;
        if (!langData) return key;

        return langData[key] || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Hook to use language context
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
