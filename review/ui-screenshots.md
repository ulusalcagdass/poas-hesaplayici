# UI Screenshots & Açıklamalar

Bu döküman, POAS Hesaplayıcı uygulamasının kullanıcı arayüzündeki bölümleri ve içeriklerini açıklar.

---

## 1. Landing Page

### 1.1 Hero Section
**Görünen Metin:**
- Başlık: "ROAS değil, POAS ile kârlılığı yönet."
- Alt Başlık: "POAS = Brüt Kâr / Reklam Harcaması - Gerçek kârlılığınızı ölçün"
- CTA: "Ücretsiz Başla", "Nasıl Çalışır?"

**Formül:** Sadece görsel önizleme, hesaplama yok.

---

### 1.2 Neden ROAS Yetmez? (WhyNotROAS)
**Görünen Metin:**
- "ROAS sadece gelir/harcama oranını gösterir"
- "Değişken maliyetler hesaba katılmaz"
- Gizli maliyetler: COGS, Kargo, Komisyon, Operasyon

**Karşılaştırma Görseli:**
| ROAS | POAS |
|------|------|
| 10.000₺ / 2.000₺ = **5x** | 3.500₺ / 2.000₺ = **1.75x** |
| "Harika görünüyor!" | "Gerçek kârlılık" |

**Maliyet Dökümü:**
- COGS: 4.000₺
- Kargo: 1.500₺
- Komisyon: 500₺
- Operasyon: 500₺
- = Brüt Kâr: 3.500₺

---

### 1.3 POAS Nasıl Hesaplanır? (HowItWorks)
**Görünen Metin:**
4 adımlı açıklama:
1. **Gelir:** KDV hariç, indirimler sonrası tahsil edilen tutar (10.000₺)
2. **Değişken Maliyetler:** COGS + Kargo + Komisyon + Operasyon (6.500₺)
3. **Brüt Kâr:** Gelir - Değişken Maliyetler = 3.500₺
4. **POAS:** Brüt Kâr / Reklam Harcaması = 1.75x

**Formül Özeti:**
"POAS = (Gelir − Değişken Maliyetler) / Reklam Harcaması"

---

### 1.4 Hedef POAS Nedir? (POASTargets)
**Görünen Metin:**
| Hedef | POAS | Strateji |
|-------|------|----------|
| Kısa Vadeli Kârlılık | 2.0x | Yüksek kâr marjı |
| Kontrollü Büyüme | 1.4x | Dengeli büyüme |
| Break-even | 1.0x | Müşteri kazanımı |

---

### 1.5 SSS (FAQ)
**Görünen Sorular:**
1. "POAS nedir?" → POAS = Brüt Kâr / Reklam Harcaması açıklaması
2. "Brüt kâr nasıl hesaplanır?" → Formül ve maliyet kalemleri
3. "Hedef POAS nasıl belirlenir?" → Preset açıklamaları

---

## 2. Hesaplayıcı (Calculator)

### 2.1 Input Alanları
| Alan | Açıklama |
|------|----------|
| Gelir (Revenue) | KDV hariç, indirimler sonrası tutar |
| Reklam Harcaması | Toplam ad spend |
| COGS | Ürün maliyeti |
| Kargo Gideri | Gönderim maliyeti |
| Ödeme Komisyonları | Kredi kartı, PayPal vb. |
| Birim Başı Operasyon | Paketleme, handling |
| Sabit Giderler | (Opsiyonel) Net profit için |

### 2.2 Hedef POAS
Preset butonları:
- 2.0x - Kısa Vadeli Kârlılık
- 1.4x - Kontrollü Büyüme
- 1.0x - Break-even

---

## 3. Sonuç Ekranı (Results)

### 3.1 Ana POAS Göstergesi
- Büyük rakam: "2.35x"
- Yüzde: "(235%)"
- Renk kodu: Yeşil (mükemmel), Sarı (dikkat), Kırmızı (zararlı)
- Yorum: "Mükemmel! Her 1₺ reklam harcaması için 2.35₺ brüt kâr elde ediyorsunuz."

### 3.2 ROAS vs POAS Karşılaştırma
| ROAS | POAS |
|------|------|
| 5x | 2.35x |
| Maliyetler hariç | Gerçek kârlılık |

### 3.3 Detaylı Sonuçlar
| Metrik | Değer |
|--------|-------|
| Gelir | 50.000 ₺ |
| Değişken Maliyetler | -26.500 ₺ |
| **Brüt Kâr** | **23.500 ₺** |
| Reklam Harcaması | -10.000 ₺ |
| **Katkı Marjı** | **13.500 ₺** |

### 3.4 Hedef POAS Sonuçları
- "Bu brüt kâr için maksimum reklam harcaması: 11.750 ₺"
- "Bu reklam harcamasıyla minimum brüt kâr: 20.000 ₺"

---

## 4. Formül-UI Uyum Özeti

| UI Bölümü | Uygulanan Formül | Doğruluk |
|-----------|------------------|----------|
| Landing POAS açıklaması | POAS = Brüt Kâr / Reklam Harcaması | ✅ |
| Brüt Kâr hesabı | Gelir - Değişken Maliyetler | ✅ |
| Değişken Maliyetler | COGS + Kargo + Komisyon + Operasyon | ✅ |
| ROAS karşılaştırma | Gelir / Reklam Harcaması | ✅ |
| Katkı Marjı | Brüt Kâr - Reklam Harcaması | ✅ |
| Hedef POAS presetleri | 2.0x, 1.4x, 1.0x | ✅ |
