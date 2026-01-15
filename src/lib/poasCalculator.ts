/**
 * POAS Calculator - Ana Hesaplama Modülü
 * 
 * Bu dosya, POAS Hesaplayıcı uygulamasındaki tüm hesaplama fonksiyonlarını içerir.
 * Her formül, POAS metodolojisi dökümanıyla %100 uyumludur.
 * 
 * @author POAS Hesaplayıcı Ekibi
 * @version 1.0.0
 * @see /review/poas-formulas.md - Formül dokümantasyonu
 */

// ============================================================================
// TİP TANIMLARI
// ============================================================================

/**
 * Hesaplayıcı Girdi Değerleri
 */
export interface POASInputs {
    /** Gelir: KDV hariç, indirimler sonrası tahsil edilen tutar */
    revenue: number;

    /** Reklam Harcaması: Toplam ad spend */
    adSpend: number;

    /** COGS: Ürün maliyeti (Cost of Goods Sold / Landed Cost) */
    cogs: number;

    /** Kargo Gideri: Müşteriye gönderim maliyeti */
    shippingCost: number;

    /** Ödeme Komisyonları: Kredi kartı, PayPal vb. komisyonlar */
    paymentFees: number;

    /** Birim Başı Operasyon: Paketleme, depo işçiliği, etiketleme vb. */
    handlingCost: number;

    /** Sabit Giderler: Maaş, kira, yazılım (opsiyonel, net profit için) */
    fixedCosts?: number;
}

/**
 * Hesaplayıcı Çıktı Değerleri
 */
export interface POASOutputs {
    /** Değişken Sipariş Maliyetleri = COGS + Kargo + Komisyon + Operasyon */
    variableOrderCosts: number;

    /** Brüt Kâr = Gelir - Değişken Sipariş Maliyetleri */
    grossProfit: number;

    /** POAS = Brüt Kâr / Reklam Harcaması */
    poas: number;

    /** POAS % = POAS × 100 */
    poasPercentage: number;

    /** Katkı Marjı = Brüt Kâr - Reklam Harcaması */
    contributionMargin: number;

    /** Net Kâr = Katkı Marjı - Sabit Giderler (opsiyonel) */
    netProfit: number | null;

    /** ROAS = Gelir / Reklam Harcaması (karşılaştırma için) */
    roas: number;
}

/**
 * Hedef POAS Hesabı Girdileri
 */
export interface TargetPOASInputs {
    grossProfit: number;
    adSpend: number;
    targetPoas: number;
}

/**
 * Hedef POAS Hesabı Çıktıları
 */
export interface TargetPOASOutputs {
    /** Bu brüt kârla hedef POAS'a ulaşmak için maksimum reklam harcaması */
    maxAdSpend: number;

    /** Bu reklam harcamasıyla hedef POAS'a ulaşmak için minimum brüt kâr */
    minGrossProfit: number;
}

/**
 * POAS Yorumlama Sonucu
 */
export interface POASInterpretation {
    status: 'excellent' | 'good' | 'warning' | 'critical';
    color: string;
    message: string;
}

// ============================================================================
// HEDEF POAS PRESETLERİ
// PDF Dökümanındaki stratejik hedeflerle uyumludur
// ============================================================================

export const POAS_PRESETS = {
    /** Kısa vadeli kârlılık odaklı - Her 1₺ harcama için 2₺ brüt kâr */
    PROFITABILITY: { value: 2.0, label: 'Kısa Vadeli Kârlılık', description: 'Yüksek kâr marjı hedefli' },

    /** Dengeli büyüme - Kârlılık ve büyüme dengesi */
    GROWTH: { value: 1.4, label: 'Kontrollü Büyüme', description: 'Kâr-büyüme dengesi' },

    /** Break-even - Müşteri kazanımı öncelikli, kâr yok zarar yok */
    BREAKEVEN: { value: 1.0, label: 'Break-even', description: 'Yeni müşteri kazanımı' },
};

// ============================================================================
// VARSAYILAN DEĞERLER
// Sektör ortalamaları baz alınarak belirlenmiştir
// ============================================================================

export const DEFAULT_VALUES = {
    /** COGS oranı: Gelirin %40'ı (e-ticaret ortalaması) */
    cogsRatio: 0.40,

    /** Ödeme komisyon oranı: Gelirin %2'si */
    paymentFees: 0.02,

    /** Ortalama kargo ücreti (TL, sipariş başına) */
    shippingCost: 30,

    /** Ortalama birim başı operasyon maliyeti (TL, sipariş başına) */
    handlingCost: 5,
};

// ============================================================================
// HESAPLAMA FONKSİYONLARI
// ============================================================================

/**
 * Değişken Sipariş Maliyetlerini Hesapla
 * 
 * FORMÜL: COGS + Kargo + Komisyon + Operasyon
 * 
 * @param cogs - Ürün maliyeti
 * @param shippingCost - Kargo gideri
 * @param paymentFees - Ödeme komisyonları
 * @param handlingCost - Birim başı operasyon maliyeti
 * @returns Toplam değişken sipariş maliyetleri
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
 * Brüt Kâr (Gross Profit) Hesapla
 * 
 * FORMÜL: Gelir - Değişken Sipariş Maliyetleri
 * 
 * PDF UYUMU: ✅ "Gross Profit = Revenue - Variable Order Costs"
 * 
 * @param revenue - Gelir (KDV hariç, indirimler sonrası)
 * @param variableOrderCosts - Değişken sipariş maliyetleri
 * @returns Brüt kâr
 */
export function calculateGrossProfit(
    revenue: number,
    variableOrderCosts: number
): number {
    return revenue - variableOrderCosts;
}

/**
 * POAS (Profit on Ad Spend) Hesapla
 * 
 * FORMÜL: Brüt Kâr / Reklam Harcaması
 * 
 * PDF UYUMU: ✅ "POAS = Gross Profit / Ad Spend"
 * 
 * ROAS'tan FARKI: ROAS gelir/harcama oranıdır ve yanıltıcı olabilir.
 * POAS ise brüt kâr/harcama oranıdır ve gerçek kârlılığı gösterir.
 * 
 * @param grossProfit - Brüt kâr
 * @param adSpend - Reklam harcaması
 * @returns POAS değeri (örn: 1.75 = %175)
 */
export function calculatePOAS(grossProfit: number, adSpend: number): number {
    if (adSpend === 0) {
        return grossProfit > 0 ? Infinity : 0;
    }
    return grossProfit / adSpend;
}

/**
 * ROAS (Return on Ad Spend) Hesapla
 * 
 * FORMÜL: Gelir / Reklam Harcaması
 * 
 * NOT: Bu metrik sadece karşılaştırma için kullanılır.
 * ROAS maliyetleri hesaba katmaz ve yanıltıcı olabilir!
 * 
 * @param revenue - Gelir
 * @param adSpend - Reklam harcaması
 * @returns ROAS değeri
 */
export function calculateROAS(revenue: number, adSpend: number): number {
    if (adSpend === 0) {
        return revenue > 0 ? Infinity : 0;
    }
    return revenue / adSpend;
}

/**
 * Katkı Marjı (Contribution Margin) Hesapla
 * 
 * FORMÜL: Brüt Kâr - Reklam Harcaması
 * 
 * PDF UYUMU: ✅ "Contribution Margin = Gross Profit - Ad Spend"
 * 
 * ANLAMI: Her satışın, reklam harcaması düşüldükten sonra işletmeye kalan katkısı.
 * 
 * @param grossProfit - Brüt kâr
 * @param adSpend - Reklam harcaması
 * @returns Katkı marjı
 */
export function calculateContributionMargin(
    grossProfit: number,
    adSpend: number
): number {
    return grossProfit - adSpend;
}

/**
 * Net Kâr Hesapla (Opsiyonel)
 * 
 * FORMÜL: Katkı Marjı - Sabit Giderler
 * 
 * @param contributionMargin - Katkı marjı
 * @param fixedCosts - Sabit giderler (maaş, kira, yazılım vb.)
 * @returns Net kâr
 */
export function calculateNetProfit(
    contributionMargin: number,
    fixedCosts: number
): number {
    return contributionMargin - fixedCosts;
}

/**
 * Tüm POAS Metriklerini Hesapla
 * 
 * Ana hesaplama fonksiyonu. Tüm girdileri alır, tüm metrikleri döndürür.
 * 
 * @param inputs - Hesaplayıcı girdileri
 * @returns Tüm hesaplama sonuçları
 */
export function calculateAll(inputs: POASInputs): POASOutputs {
    // Adım 1: Değişken sipariş maliyetlerini hesapla
    const variableOrderCosts = calculateVariableOrderCosts(
        inputs.cogs,
        inputs.shippingCost,
        inputs.paymentFees,
        inputs.handlingCost
    );

    // Adım 2: Brüt kârı hesapla
    const grossProfit = calculateGrossProfit(inputs.revenue, variableOrderCosts);

    // Adım 3: POAS hesapla
    const poas = calculatePOAS(grossProfit, inputs.adSpend);

    // Adım 4: Katkı marjını hesapla
    const contributionMargin = calculateContributionMargin(grossProfit, inputs.adSpend);

    // Adım 5: Net kâr (opsiyonel)
    const netProfit = inputs.fixedCosts !== undefined
        ? calculateNetProfit(contributionMargin, inputs.fixedCosts)
        : null;

    // Adım 6: ROAS (karşılaştırma için)
    const roas = calculateROAS(inputs.revenue, inputs.adSpend);

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
 * Hedef POAS Hesabı
 * 
 * Belirlenen POAS hedefine ulaşmak için gereken değerleri hesaplar.
 * 
 * FORMÜLLER:
 * - Maks. Reklam Harcaması = Brüt Kâr / Hedef POAS
 * - Min. Brüt Kâr = Reklam Harcaması × Hedef POAS
 * 
 * @param inputs - Hedef POAS girdileri
 * @returns Hedef POAS için gereken değerler
 */
export function calculateTargetPOAS(inputs: TargetPOASInputs): TargetPOASOutputs {
    const { grossProfit, adSpend, targetPoas } = inputs;

    if (targetPoas <= 0) {
        return { maxAdSpend: 0, minGrossProfit: 0 };
    }

    return {
        // Bu brüt kârla hedef POAS'a ulaşmak için maksimum harcama
        maxAdSpend: grossProfit / targetPoas,

        // Bu harcamayla hedef POAS'a ulaşmak için minimum brüt kâr
        minGrossProfit: adSpend * targetPoas,
    };
}

/**
 * POAS Değerini Yorumla
 * 
 * POAS değerine göre durum ve öneri mesajı üret.
 * 
 * YORUMLAMA KRİTERLERİ:
 * - >= 2.0: Mükemmel (excellent) - Çok kârlı
 * - >= 1.4: İyi (good) - Dengeli büyüme için uygun
 * - >= 1.0: Dikkat (warning) - Break-even noktası
 * - < 1.0: Kritik (critical) - Zararlı
 * 
 * @param poas - POAS değeri
 * @returns Yorum objesi (durum, renk, mesaj)
 */
export function interpretPOAS(poas: number): POASInterpretation {
    if (poas >= POAS_PRESETS.PROFITABILITY.value) {
        return {
            status: 'excellent',
            color: '#10b981', // green
            message: `Mükemmel! Her 1₺ reklam harcaması için ${poas.toFixed(2)}₺ brüt kâr elde ediyorsunuz.`,
        };
    }

    if (poas >= POAS_PRESETS.GROWTH.value) {
        return {
            status: 'good',
            color: '#3b82f6', // blue
            message: `İyi! Kontrollü büyüme için uygun bir POAS değeri (${poas.toFixed(2)}x).`,
        };
    }

    if (poas >= POAS_PRESETS.BREAKEVEN.value) {
        return {
            status: 'warning',
            color: '#f59e0b', // amber
            message: `Dikkat! POAS ${poas.toFixed(2)}x break-even noktasına yakın. Maliyetleri gözden geçirin.`,
        };
    }

    return {
        status: 'critical',
        color: '#ef4444', // red
        message: `Kritik! POAS ${poas.toFixed(2)}x - Reklam harcaması brüt kârı aşıyor, zararlısınız.`,
    };
}

/**
 * Varsayılan Değer Önerileri
 * 
 * Gelir tutarına göre sektör ortalamalarını kullanarak varsayılan maliyetleri öner.
 * 
 * @param revenue - Gelir tutarı
 * @param orderCount - Sipariş sayısı (opsiyonel, varsayılan 1)
 * @returns Önerilen maliyet değerleri
 */
export function suggestDefaults(
    revenue: number,
    orderCount: number = 1
): Partial<POASInputs> {
    return {
        cogs: revenue * DEFAULT_VALUES.cogsRatio,
        paymentFees: revenue * DEFAULT_VALUES.paymentFees,
        shippingCost: DEFAULT_VALUES.shippingCost * orderCount,
        handlingCost: DEFAULT_VALUES.handlingCost * orderCount,
    };
}
