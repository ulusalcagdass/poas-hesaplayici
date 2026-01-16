# POAS Hesaplayıcı - UI Metinleri

Bu dosya, uygulama genelinde kullanılan tüm kritik metinleri ve copy'leri listeler.
Harici denetim için POAS PDF dökümanıyla uyum kontrolü yapılabilir.

---

## 🏠 Landing Page

### Hero Section
**Başlık:**
```
ROAS değil, POAS ile gerçek kârlılığı ölç.
```

**Alt Metin:**
```
POAS = Brüt Kâr / Reklam Harcaması
Kargo, komisyon ve operasyon maliyetlerini yok sayan ROAS yerine gerçek kârlılığa odaklan.
```

**CTA Butonları:**
- "Ücretsiz Hesapla"
- "Örnek Hesaplamayı Gör"

---

### Revenue Tanımı (KRİTİK - PDF UYUMU)
**Kullanıldığı Yerler:** Landing Page, Calculator Tooltip, FAQ

```
Gelir (Revenue):
KDV hariç, indirimler sonrası müşteriden tahsil edilen tutar.
⚠️ Müşteriden kargo ücreti alıyorsanız gelire dahil edin.
```

**PDF Uyumu:** ✅ 
- KDV/VAT hariç ✓
- İndirimler sonrası ✓
- Kargo notu eklendi ✓

---

### Brüt Kâr Bileşenleri
**Değişken Sipariş Maliyetleri:**
| Bileşen | Açıklama |
|---------|----------|
| COGS (Ürün Maliyeti) | Ürünün alış/üretim maliyeti (landed cost) |
| Kargo Gideri | Müşteriye gönderim maliyeti |
| Ödeme Komisyonları | Kredi kartı, PayPal vb. (%2-4) |
| Paketleme & Operasyon | Kutu, etiket, dolgu, sipariş hazırlama |

**Not:**
```
Bu maliyetler sipariş sayısına göre değiştiği için brüt kâr hesabına dahildir.
```

---

### POAS vs ROAS Karşılaştırma

| Metrik | ROAS | POAS |
|--------|------|------|
| **Formül** | Revenue / Ad Spend | Gross Profit / Ad Spend |
| **Ölçtüğü** | Gelir çarpanı | Kârlılık çarpanı |
| **Maliyetler** | Yok sayar | Dahil eder |
| **Yanıltıcılık** | Yüksek | Düşük |
| **Örnek** | 5x görünebilir | 1.75x gerçek |

---

### Hedef POAS Presetleri

| Preset | Değer | Strateji | Açıklama |
|--------|-------|----------|----------|
| Kısa Vadeli Kârlılık | 2.0x | Yüksek kâr | Her 1₺ harcama için 2₺ brüt kâr |
| Kontrollü Büyüme | 1.4x | Denge | Kârlılık ve büyüme dengesi |
| Break-even | 1.0x | Müşteri kazanımı | Başabaş noktası, pazar payı öncelikli |

---

## 🧮 Hesaplayıcı

### Input Label'ları

| Alan | Label | Tooltip |
|------|-------|---------|
| revenue | Gelir (Revenue) | KDV hariç, indirimler sonrası. Kargo tahsil ediyorsanız dahil edin. |
| adSpend | Reklam Harcaması | Toplam reklam harcamanız |
| cogs | COGS (Ürün Maliyeti) | Ürünün alış/üretim maliyeti |
| shippingCost | Kargo Gideri | Müşteriye gönderim maliyeti |
| paymentFees | Ödeme Komisyonları | Kredi kartı, PayPal vb. komisyonlar |
| handlingCost | Paketleme & Operasyon | Kutu, etiket, sipariş hazırlama |
| fixedCosts | Sabit Giderler | (Opsiyonel) Maaş, kira, yazılım |

### Eksik Veri Uyarısı
```
💡 Mükemmel veri şart değil! Tahmini değer bile ROAS'tan daha doğrudur.
```

### Validasyon Mesajları
- Reklam harcaması 0 olamaz
- Negatif değer girilemez
- Para birimi: TRY (varsayılan)

---

### Sonuç Ekranı Label'ları

| Metrik | Label | Renk Kodu |
|--------|-------|-----------|
| POAS ≥ 2.0 | Mükemmel | Yeşil |
| POAS ≥ 1.4 | İyi | Mavi |
| POAS ≥ 1.0 | Dikkat | Sarı |
| POAS < 1.0 | Kritik | Kırmızı |

---

## ❓ FAQ Metinleri

**S: POAS nedir?**
```
POAS (Profit on Ad Spend), reklam harcamanızın gerçek kârlılığını ölçen bir metriktir.
Formül: POAS = Brüt Kâr / Reklam Harcaması
```

**S: Brüt kâr nasıl hesaplanır?**
```
Brüt Kâr = Gelir − Değişken Sipariş Maliyetleri
Değişken maliyetler: COGS, kargo gideri, ödeme komisyonları ve paketleme/operasyon maliyetleridir.
```

**S: Hedef POAS nasıl belirlenir?**
```
- POAS 2.0: Kısa vadeli kârlılık odaklı
- POAS 1.4: Kontrollü büyüme
- POAS 1.0: Break-even / müşteri kazanımı
```

---

## ✅ PDF Uyum Kontrol Listesi

| Tanım | Uygulama | PDF | Uyum |
|-------|----------|-----|------|
| POAS = Gross Profit / Ad Spend | ✓ | ✓ | ✅ |
| Revenue = Net (KDV hariç, indirim sonrası) | ✓ | ✓ | ✅ |
| Variable Costs = COGS + Shipping + Fees + Handling | ✓ | ✓ | ✅ |
| Gross Profit = Revenue - Variable Costs | ✓ | ✓ | ✅ |
| Contribution Margin = Gross Profit - Ad Spend | ✓ | ✓ | ✅ |
| Target POAS presets (2.0, 1.4, 1.0) | ✓ | ✓ | ✅ |
