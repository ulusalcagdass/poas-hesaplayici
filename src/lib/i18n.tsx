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

    // Why Not ROAS Section
    whyNotRoas: {
        tr: {
            badge: 'Dikkat: ROAS Yanıltıcı Olabilir',
            title: 'Neden',
            titleHighlight: 'ROAS',
            titleEnd: 'Yetmez?',
            subtitle: 'ROAS sadece gelir/harcama oranını gösterir. Gerçek kârlılığınızı anlamak için tüm maliyetleri hesaba katmalısınız.',
            cogsTitle: 'Ürün Maliyeti (COGS)',
            cogsDesc: 'ROAS, ürünün alış maliyetini hesaba katmaz. 100₺\'ye sattığınız ürünün 60₺\'ye mal olduğunu görmezden gelir.',
            shippingTitle: 'Kargo Giderleri',
            shippingDesc: 'Müşteriye kargo ücretsiz göründüğünde bile, siz taşıyıcıya ödeme yapıyorsunuz. Bu maliyet ROAS\'ta yok.',
            feesTitle: 'Ödeme Komisyonları',
            feesDesc: 'Kredi kartı, PayPal veya diğer ödeme yöntemlerinin %2-4 komisyonu ROAS hesabında görünmez.',
            discountsTitle: 'İndirimler & Kuponlar',
            discountsDesc: '%20 indirim yaptığınızda gelir azalır ama ROAS bunu yansıtmaz. Gerçek kârlılığınız düşer.',
            roasCalc: 'ROAS Hesabı',
            poasCalc: 'POAS Hesabı',
            roasExample: '10.000₺ Gelir / 2.000₺ Harcama',
            poasExample: '3.500₺ Brüt Kâr / 2.000₺ Harcama',
            looksGreat: '"Harika görünüyor!"',
            realProfit: '"Gerçek kârlılık"',
            costsIgnored: 'Maliyetler yok sayılıyor',
            costsIncluded: 'Tüm maliyetler dahil',
            costBreakdown: 'Maliyetler (10.000₺ gelirden düşülen):',
            cogs: 'Ürün Mly.',
            shipping: 'Kargo',
            commission: 'Komisyon',
            operations: 'Operasyon',
            grossProfit: 'Brüt Kâr',
        },
        en: {
            badge: 'Caution: ROAS Can Be Misleading',
            title: 'Why',
            titleHighlight: 'ROAS',
            titleEnd: 'Alone Falls Short?',
            subtitle: 'ROAS only shows revenue/spend ratio. To understand true profitability, you must account for all costs.',
            cogsTitle: 'Cost of Goods Sold (COGS)',
            cogsDesc: 'ROAS ignores product cost. It overlooks that your $100 sale actually costs $60 to produce.',
            shippingTitle: 'Shipping Costs',
            shippingDesc: 'Even when shipping appears free to customers, you\'re paying the carrier. This cost is invisible to ROAS.',
            feesTitle: 'Payment Processing Fees',
            feesDesc: 'The 2-4% commission from credit cards, PayPal, or other payment methods doesn\'t appear in ROAS.',
            discountsTitle: 'Discounts & Coupons',
            discountsDesc: 'A 20% discount reduces revenue, but ROAS doesn\'t reflect this. Your actual profitability drops.',
            roasCalc: 'ROAS Calculation',
            poasCalc: 'POAS Calculation',
            roasExample: '$10,000 Revenue / $2,000 Spend',
            poasExample: '$3,500 Gross Profit / $2,000 Spend',
            looksGreat: '"Looks great!"',
            realProfit: '"True profitability"',
            costsIgnored: 'Costs are ignored',
            costsIncluded: 'All costs included',
            costBreakdown: 'Costs (deducted from $10,000 revenue):',
            cogs: 'Product',
            shipping: 'Shipping',
            commission: 'Fees',
            operations: 'Ops',
            grossProfit: 'Gross Profit',
        },
    },

    // POAS Targets Section
    poasTargets: {
        tr: {
            badge: 'Hedef Belirleme',
            title: 'Örnek Hedefler',
            titleSuffix: '(Sektöre Göre Değişir)',
            subtitle: 'Marjınız ve operasyon giderleriniz hedefi belirler. Break-even POAS = 1.0 (başabaş noktası).',
            target2Label: 'Kısa Vadeli Kârlılık',
            target2Desc: 'Yüksek kâr marjı hedefliyorsunuz. Her 1₺ reklam harcamasına 2₺ brüt kâr.',
            target2Ideal: 'Olgun markalar, yüksek kar marjlı ürünler',
            target14Label: 'Kontrollü Büyüme',
            target14Desc: 'Kârlılık ve büyüme arasında denge. Sürdürülebilir ölçeklendirme.',
            target14Ideal: 'Büyüyen markalar, market share genişletme',
            target1Label: 'Yeni Müşteri / Break-even',
            target1Desc: 'Başabaş noktası. Müşteri kazanımı ve pazar payı öncelikli.',
            target1Ideal: 'Yeni markalar, agresif büyüme, LTV odaklı strateji',
            suitable: 'Uygun:',
            infoTitle: 'Hedef POAS ile Planlama',
            infoDesc: 'Hesaplayıcıda hedef POAS girdiğinizde, sistem size bu kârlılık için maksimum reklam harcamasını veya ulaşılması gereken minimum brüt kârı otomatik hesaplar.',
            maxAdSpend: 'maksimum reklam harcamasını',
            minGrossProfit: 'ulaşılması gereken minimum brüt kârı',
        },
        en: {
            badge: 'Target Setting',
            title: 'Example Targets',
            titleSuffix: '(Varies by Industry)',
            subtitle: 'Your margins and operational costs determine the target. Break-even POAS = 1.0.',
            target2Label: 'Short-term Profitability',
            target2Desc: 'Targeting high profit margin. $2 gross profit for every $1 ad spend.',
            target2Ideal: 'Mature brands, high-margin products',
            target14Label: 'Controlled Growth',
            target14Desc: 'Balance between profitability and growth. Sustainable scaling.',
            target14Ideal: 'Growing brands, market share expansion',
            target1Label: 'Customer Acquisition / Break-even',
            target1Desc: 'Break-even point. Customer acquisition and market share prioritized.',
            target1Ideal: 'New brands, aggressive growth, LTV-focused strategy',
            suitable: 'Suitable for:',
            infoTitle: 'Planning with Target POAS',
            infoDesc: 'When you enter target POAS in the calculator, the system automatically calculates maximum ad spend or minimum gross profit required for that profitability level.',
            maxAdSpend: 'maximum ad spend',
            minGrossProfit: 'minimum gross profit required',
        },
    },

    // Dashboard Sidebar
    sidebar: {
        tr: {
            mainMenu: 'Ana Menü',
            home: 'Ana Sayfa',
            calculator: 'Hesaplayıcı',
            freeAndOpen: 'Ücretsiz ve herkese açık',
            logo: 'Hesaplayıcı',
        },
        en: {
            mainMenu: 'Main Menu',
            home: 'Home',
            calculator: 'Calculator',
            freeAndOpen: 'Free and open to everyone',
            logo: 'Calculator',
        },
    },

    // Calculator Results - additional
    calcResults: {
        tr: {
            yourPoas: 'POAS Değeriniz',
            goodProfit: 'İyi kârlılık. Kontrollü büyüme sağlıyorsunuz.',
            verified: 'Doğrulandı - PDF ile %100 uyumlu',
            roasVsPoas: 'ROAS vs POAS Karşılaştırma',
            excludesCosts: 'Maliyetler hariç',
            trueProfit: 'Gerçek kârlılık',
            detailedResults: 'Detaylı Sonuçlar',
        },
        en: {
            yourPoas: 'Your POAS',
            goodProfit: 'Good profitability. Sustainable growth achieved.',
            verified: 'Verified - 100% accurate with PDF',
            roasVsPoas: 'ROAS vs POAS Comparison',
            excludesCosts: 'Excludes costs',
            trueProfit: 'True profitability',
            detailedResults: 'Detailed Results',
        },
    },

    // Use Cases Section
    useCases: {
        tr: {
            badge: 'Kullanım Alanları',
            title: 'POAS',
            titleEnd: 'Nerede Kullanılır?',
            subtitle: 'E-ticaret, ajans raporlaması ve bütçe planlamasında POAS ile doğru kararlar verin.',
            // Card 1 - Agency
            agencyTitle: 'Ajans Raporlama',
            agencyDesc: 'Müşterilerinize POAS bazlı raporlar sunun. Gerçek kârlılığı gösterin, güven kazanın.',
            agencyF1: 'Müşteri bazlı POAS takibi',
            agencyF2: 'Otomatik PDF raporlar',
            agencyF3: 'Kanal karşılaştırması',
            // Card 2 - Ecommerce
            ecomTitle: 'E-Ticaret Kampanyaları',
            ecomDesc: 'Her kampanyanın gerçek kârlılığını ölçün. ROAS\'ın yanıltıcı olduğu yerde POAS gerçeği gösterir.',
            ecomF1: 'Kampanya bazlı analiz',
            ecomF2: 'Sezonsal karşılaştırma',
            ecomF3: 'Maliyet detayları',
            // Card 3 - Product
            productTitle: 'Ürün Bazlı Kârlılık',
            productDesc: 'Hangi ürünler gerçekten kârlı? Ürün kategorisi bazında POAS analizi yapın.',
            productF1: 'Ürün grubu analizi',
            productF2: 'Margin optimizasyonu',
            productF3: 'SKU performansı',
            // Card 4 - Budget
            budgetTitle: 'Bütçe Planlama',
            budgetDesc: 'Hedef POAS ile maksimum reklam bütçenizi veya minimum kâr hedefinizi belirleyin.',
            budgetF1: 'Bütçe simülasyonu',
            budgetF2: 'Break-even analizi',
            budgetF3: 'Senaryo karşılaştırma',
        },
        en: {
            badge: 'Use Cases',
            title: 'POAS',
            titleEnd: 'Where Is It Used?',
            subtitle: 'Make informed decisions in e-commerce, agency reporting, and budget planning with POAS.',
            // Card 1 - Agency
            agencyTitle: 'Agency Reporting',
            agencyDesc: 'Deliver POAS-based reports to clients. Show true profitability, build trust.',
            agencyF1: 'Client-level POAS tracking',
            agencyF2: 'Automated PDF reports',
            agencyF3: 'Channel comparison',
            // Card 2 - Ecommerce
            ecomTitle: 'E-Commerce Campaigns',
            ecomDesc: 'Measure true profitability of each campaign. POAS reveals the truth where ROAS misleads.',
            ecomF1: 'Campaign-level analysis',
            ecomF2: 'Seasonal comparison',
            ecomF3: 'Cost breakdown',
            // Card 3 - Product
            productTitle: 'Product-Level Profitability',
            productDesc: 'Which products are truly profitable? Run POAS analysis by product category.',
            productF1: 'Product group analysis',
            productF2: 'Margin optimization',
            productF3: 'SKU performance',
            // Card 4 - Budget
            budgetTitle: 'Budget Planning',
            budgetDesc: 'Set your maximum ad budget or minimum profit target using target POAS.',
            budgetF1: 'Budget simulation',
            budgetF2: 'Break-even analysis',
            budgetF3: 'Scenario comparison',
        },
    },

    // Footer Content
    footerContent: {
        tr: {
            logo: 'Hesaplayıcı',
            tagline: 'ROAS değil, POAS ile reklamlarınızın gerçek kârlılığını ölçün.',
            product: 'Ürün',
            resources: 'Kaynaklar',
            company: 'Şirket',
            copyright: '© 2024 POAS Hesaplayıcı. Tüm hakları saklıdır.',
        },
        en: {
            logo: 'Calculator',
            tagline: 'Measure true ad profitability with POAS, not just ROAS.',
            product: 'Product',
            resources: 'Resources',
            company: 'Company',
            copyright: '© 2024 POAS Calculator. All rights reserved.',
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
