// POAS Hesaplayıcı - Çekirdek Hesaplama Fonksiyonları
// Tüm formüller POAS® metodolojisine göre hesaplanır

export interface CalculatorInputs {
    revenue: number;           // Gelir (KDV hariç, indirim sonrası)
    adSpend: number;           // Reklam harcaması
    cogs: number;              // Ürün maliyeti (COGS)
    shippingCost: number;      // Kargo gideri
    paymentFees: number;       // Ödeme komisyonları
    handlingCost: number;      // Birim başı operasyon maliyeti
    fixedCosts?: number;       // Sabit giderler (opsiyonel, net profit için)
}

export interface CalculatorOutputs {
    variableOrderCosts: number;    // Değişken sipariş maliyetleri
    grossProfit: number;           // Brüt kâr
    poas: number;                  // POAS (x)
    poasPercentage: number;        // POAS (%)
    contributionMargin: number;    // Katkı marjı
    netProfit: number | null;      // Net kâr (opsiyonel)
    roas: number;                  // ROAS (karşılaştırma için)
}

export interface TargetPOASInputs {
    grossProfit: number;
    adSpend: number;
    targetPoas: number;
}

export interface TargetPOASOutputs {
    maxAdSpend: number;        // Bu kârlılık için maksimum reklam harcaması
    minGrossProfit: number;    // Bu reklam harcamasıyla ulaşılması gereken minimum brüt kâr
}

// POAS Hedef Presetleri
export const POAS_PRESETS = {
    shortTermProfit: { value: 2.0, label: 'Kısa Vadeli Kârlılık', description: 'Yüksek kâr marjı hedefi' },
    controlledGrowth: { value: 1.4, label: 'Kontrollü Büyüme', description: 'Dengeli büyüme ve kârlılık' },
    breakEven: { value: 1.0, label: 'Yeni Müşteri / Break-even', description: 'Başabaş noktası, müşteri kazanımı öncelikli' },
} as const;

// Varsayılan değerler (veri eksikse kullanılacak)
export const DEFAULT_VALUES = {
    paymentFees: 0.02,        // Gelirin %2'si
    handlingCost: 5,          // Sipariş başına 5 TL
    shippingCost: 30,         // Sipariş başına 30 TL
    cogsRatio: 0.4,           // Gelirin %40'ı
} as const;

/**
 * Değişken sipariş maliyetlerini hesaplar
 * Variable Order Costs = COGS + Shipping + Payment Fees + Handling/Packaging
 */
export function calculateVariableOrderCosts(
    cogs: number,
    shippingCost: number,
    paymentFees: number,
    handlingCost: number
): number {
    return cogs + shippingCost + paymentFees + handlingCost;
}

/**
 * Brüt kârı hesaplar
 * Gross Profit = Revenue - Variable Order Costs
 */
export function calculateGrossProfit(
    revenue: number,
    variableOrderCosts: number
): number {
    return revenue - variableOrderCosts;
}

/**
 * POAS değerini hesaplar
 * POAS = Gross Profit / Ad Spend
 * Reklam harcaması 0 ise Infinity döner
 */
export function calculatePOAS(grossProfit: number, adSpend: number): number {
    if (adSpend === 0) return grossProfit > 0 ? Infinity : 0;
    return grossProfit / adSpend;
}

/**
 * ROAS değerini hesaplar (karşılaştırma için)
 * ROAS = Revenue / Ad Spend
 */
export function calculateROAS(revenue: number, adSpend: number): number {
    if (adSpend === 0) return revenue > 0 ? Infinity : 0;
    return revenue / adSpend;
}

/**
 * Katkı marjını hesaplar
 * Contribution Margin = Gross Profit - Marketing Spend (Ad Spend)
 */
export function calculateContributionMargin(
    grossProfit: number,
    adSpend: number
): number {
    return grossProfit - adSpend;
}

/**
 * Net kârı hesaplar
 * Net Profit = Contribution Margin - Fixed Costs
 */
export function calculateNetProfit(
    contributionMargin: number,
    fixedCosts: number
): number {
    return contributionMargin - fixedCosts;
}

/**
 * Tüm hesaplamaları tek seferde yapar
 */
export function calculateAll(inputs: CalculatorInputs): CalculatorOutputs {
    const variableOrderCosts = calculateVariableOrderCosts(
        inputs.cogs,
        inputs.shippingCost,
        inputs.paymentFees,
        inputs.handlingCost
    );

    const grossProfit = calculateGrossProfit(inputs.revenue, variableOrderCosts);
    const poas = calculatePOAS(grossProfit, inputs.adSpend);
    const roas = calculateROAS(inputs.revenue, inputs.adSpend);
    const contributionMargin = calculateContributionMargin(grossProfit, inputs.adSpend);

    const netProfit = inputs.fixedCosts !== undefined
        ? calculateNetProfit(contributionMargin, inputs.fixedCosts)
        : null;

    return {
        variableOrderCosts,
        grossProfit,
        poas,
        poasPercentage: poas * 100,
        contributionMargin,
        netProfit,
        roas,
    };
}

/**
 * Hedef POAS için gerekli değerleri hesaplar
 */
export function calculateTargetPOAS(inputs: TargetPOASInputs): TargetPOASOutputs {
    const { grossProfit, adSpend, targetPoas } = inputs;

    // Bu kârlılık için maksimum reklam harcaması
    const maxAdSpend = targetPoas > 0 ? grossProfit / targetPoas : 0;

    // Bu reklam harcamasıyla ulaşılması gereken minimum brüt kâr
    const minGrossProfit = adSpend * targetPoas;

    return {
        maxAdSpend,
        minGrossProfit,
    };
}

// ROAS Targets Interface
export interface ROASTargets {
    breakevenROAS: number;           // Başa baş ROAS = Revenue / GrossProfit
    roas10: number | null;           // %10 marj ROAS = Revenue / (GrossProfit - 0.10 * Revenue)
    roas15: number | null;           // %15 marj ROAS
    roas20: number | null;           // %20 marj ROAS
    impossible10: boolean;           // %10 marj mümkün değil mi?
    impossible15: boolean;           // %15 marj mümkün değil mi?
    impossible20: boolean;           // %20 marj mümkün değil mi?
}

/**
 * ROAS hedeflerini hesaplar (POAS'a dayalı)
 * Breakeven ROAS = Revenue / GrossProfit
 * Margin ROAS = Revenue / (GrossProfit - margin * Revenue)
 */
export function calculateROASTargets(revenue: number, grossProfit: number): ROASTargets {
    // Başa baş ROAS: Bu ROAS'ta reklam harcaması brüt kâra eşit
    const breakevenROAS = grossProfit > 0 ? revenue / grossProfit : Infinity;

    // Marj bazlı ROAS hesaplamaları
    const calculateMarginROAS = (marginPercent: number): { value: number | null; impossible: boolean } => {
        const denominator = grossProfit - (marginPercent * revenue);
        if (denominator <= 0) {
            return { value: null, impossible: true };
        }
        return { value: revenue / denominator, impossible: false };
    };

    const margin10 = calculateMarginROAS(0.10);
    const margin15 = calculateMarginROAS(0.15);
    const margin20 = calculateMarginROAS(0.20);

    return {
        breakevenROAS,
        roas10: margin10.value,
        roas15: margin15.value,
        roas20: margin20.value,
        impossible10: margin10.impossible,
        impossible15: margin15.impossible,
        impossible20: margin20.impossible,
    };
}

/**
 * Eksik veri için varsayılan değerleri önerir
 */
export function suggestDefaults(revenue: number, orderCount: number = 1): Partial<CalculatorInputs> {
    return {
        cogs: revenue * DEFAULT_VALUES.cogsRatio,
        shippingCost: DEFAULT_VALUES.shippingCost * orderCount,
        paymentFees: revenue * DEFAULT_VALUES.paymentFees,
        handlingCost: DEFAULT_VALUES.handlingCost * orderCount,
    };
}

/**
 * POAS değerini yorumlar
 */
export function interpretPOAS(poas: number): {
    status: 'excellent' | 'good' | 'warning' | 'critical';
    message: string;
    color: string;
} {
    if (poas >= 2) {
        return {
            status: 'excellent',
            message: 'Mükemmel kârlılık! Reklam harcamanız çok verimli çalışıyor.',
            color: '#10b981', // green
        };
    } else if (poas >= 1.4) {
        return {
            status: 'good',
            message: 'İyi kârlılık. Kontrollü büyüme sağlıyorsunuz.',
            color: '#3b82f6', // blue
        };
    } else if (poas >= 1) {
        return {
            status: 'warning',
            message: 'Başabaş noktasındasınız. Müşteri kazanımı için kabul edilebilir.',
            color: '#f59e0b', // amber
        };
    } else {
        return {
            status: 'critical',
            message: 'Dikkat! Reklam harcamanız brüt kârınızdan fazla.',
            color: '#ef4444', // red
        };
    }
}
