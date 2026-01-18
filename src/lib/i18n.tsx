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
            paymentFees: 'Sanal POS komisyonları, taksit farkları, ödeme sağlayıcı kesintileri.',
            handling: 'Kutu, ambalaj, işçilik, depo/fulfillment giderleri.',
            revenue: 'KDV hariç, indirimler sonrası tahsil edilen net tutar.',
            adSpend: 'Toplam reklam harcaması (Google, Meta, TikTok vb.).',
            netProfit: 'Katkı Marjı - Sabit Giderler. Sabit gider girilmeden hesaplanamaz.',
            fixedCosts: 'Maaş, kira, yazılım abonelikleri gibi aylık sabit giderler.',
        },
        en: {
            cogs: 'Product procurement or manufacturing cost.',
            shipping: 'Shipping costs borne by your company (excluding customer-paid).',
            paymentFees: 'Payment gateway fees, installment charges, provider commissions.',
            handling: 'Packaging, labor, warehouse, and fulfillment costs.',
            revenue: 'Net revenue after discounts, excluding VAT.',
            adSpend: 'Total ad spend across platforms (Google, Meta, TikTok, etc.).',
            netProfit: 'Contribution Margin - Fixed Costs. Requires fixed costs input.',
            fixedCosts: 'Monthly fixed expenses like salary, rent, software subscriptions.',
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
            paymentFees: 'Ödeme Komisyonu',
            operationCost: 'Paketleme/Operasyon',
            fixedCosts: 'Sabit Giderler',
        },
        en: {
            costBreakdown: 'Cost Breakdown',
            productCost: 'Product Cost',
            shippingCost: 'Shipping',
            paymentFees: 'Payment Fees',
            operationCost: 'Packaging/Ops',
            fixedCosts: 'Fixed Costs',
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

    // Interpretation - tempered, non-advisory language
    interpretation: {
        tr: {
            loss: 'Mevcut maliyet yapısında reklam harcamanız kâr üretmiyor.',
            breakeven: 'Reklam getirisi maliyetleri karşılıyor, net kâr sıfıra yakın.',
            low: 'Kârlılığa yakın bir yapı var, ancak maliyetler sonucu baskılıyor.',
            moderate: 'Bu kampanya mevcut verilerle kârlı görünüyor.',
            good: 'Mevcut verilere göre kârlı bir reklam performansı gözlemleniyor.',
            excellent: 'Veriler güçlü bir kârlılık yapısına işaret ediyor.',
        },
        en: {
            loss: 'With the current cost structure, your ad spend is not generating profit.',
            breakeven: 'Ad revenue covers costs, net profit is near zero.',
            low: 'Near profitability, but costs are pressuring results.',
            moderate: 'This campaign appears profitable with current data.',
            good: 'A profitable ad performance is observed based on current data.',
            excellent: 'Data indicates a strong profitability structure.',
        },
    },

    // Sector Presets
    sectorPresets: {
        tr: {
            label: 'Sektör Örneği',
            ecommerce: 'E-ticaret',
            dtc: 'DTC (Doğrudan Satış)',
            marketplace: 'Marketplace',
            leadgen: 'Lead Gen',
            note: 'Bu değerler örnektir. Her işletme için farklılık gösterebilir.',
            consultNote: 'Gerçek hedefler danışmanlık sürecinde belirlenir.',
        },
        en: {
            label: 'Sector Example',
            ecommerce: 'E-commerce',
            dtc: 'DTC (Direct to Consumer)',
            marketplace: 'Marketplace',
            leadgen: 'Lead Gen',
            note: 'These are example values. May vary by business.',
            consultNote: 'Actual targets are determined during consulting.',
        },
    },

    // What-If Analysis
    whatIf: {
        tr: {
            title: 'Eğer... Ne Olur?',
            costDown10: 'Maliyetler %10 düşerse',
            aovUp5: 'AOV %5 artarsa',
            current: 'Mevcut Durum',
            scenario: 'Senaryo',
            disclaimer: 'Bu bir simülasyondur. Gerçek dünyada farklılık gösterebilir.',
        },
        en: {
            title: 'What If...?',
            costDown10: 'Costs decrease 10%',
            aovUp5: 'AOV increases 5%',
            current: 'Current',
            scenario: 'Scenario',
            disclaimer: 'This is a simulation. Real results may differ.',
        },
    },

    // Copy/Share
    copyShare: {
        tr: {
            copyResult: 'Sonucu Kopyala',
            shareImage: 'Görsel Paylaş',
            copied: 'Kopyalandı!',
            imageFooter: 'POAS Hesaplayıcı – poas-hesaplayici.onrender.com',
        },
        en: {
            copyResult: 'Copy Result',
            shareImage: 'Share as Image',
            copied: 'Copied!',
            imageFooter: 'POAS Calculator – poas-hesaplayici.onrender.com',
        },
    },

    // Soft CTA
    softCta: {
        tr: {
            text: 'POAS\'ınızı artırmak için işletmenize özel bir yol haritası istiyorsanız:',
            link: 'Ulusal Çağdaş Çalım ile iletişime geçin.',
        },
        en: {
            text: 'If you want a custom roadmap to improve your POAS:',
            link: 'Contact Ulusal Çağdaş Çalım.',
        },
    },

    // Max Budget Info
    maxBudget: {
        tr: {
            label: 'Bu hedefle maksimum reklam bütçeniz:',
        },
        en: {
            label: 'With this target, your maximum ad budget is:',
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
