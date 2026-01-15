# POAS Hesaplayıcı - Formül Dokümantasyonu

Bu dosya, POAS Hesaplayıcı uygulamasında kullanılan tüm formülleri ve tanımları açıklar.

---

## 📐 Ana Formüller

### 1. POAS (Profit on Ad Spend)

```
POAS = Brüt Kâr / Reklam Harcaması
```

**Açıklama:** POAS, reklam harcamasının gerçek kârlılığını ölçer. ROAS'tan farklı olarak, gelir yerine brüt kârı baz alır.

**Örnek:**
- Brüt Kâr: 3.500 ₺
- Reklam Harcaması: 2.000 ₺
- POAS = 3.500 / 2.000 = **1.75x** (veya %175)

---

### 2. Brüt Kâr (Gross Profit)

```
Brüt Kâr = Gelir - Değişken Sipariş Maliyetleri
```

**Değişken Sipariş Maliyetleri kalem kalem:**
| Kalem | Açıklama |
|-------|----------|
| COGS (Cost of Goods Sold) | Ürünün alış/üretim maliyeti (landed cost) |
| Kargo Gideri | Müşteriye gönderim maliyeti |
| Ödeme Komisyonları | Kredi kartı, PayPal vb. komisyonlar (%2-4 arası) |
| Birim Başı Operasyon | Paketleme, depo işçiliği, etiketleme vb. |

**Formül:**
```
Değişken Sipariş Maliyetleri = COGS + Kargo + Komisyon + Operasyon
```

---

### 3. Gelir (Revenue) Tanımı

```
Gelir = Müşteriden tahsil edilen net tutar
```

**Önemli notlar:**
- ✅ KDV **HARİÇ** tutar
- ✅ İndirimler **SONRASI** tutar
- ✅ İadeler **DÜŞÜLMİŞ** tutar

**Yanlış:** 10.000 ₺ satış + %20 KDV = 12.000 ₺ (KDV dahil)
**Doğru:** 10.000 ₺ (KDV hariç, net gelir)

---

### 4. Katkı Marjı (Contribution Margin)

```
Katkı Marjı = Brüt Kâr - Reklam Harcaması
```

**Açıklama:** Her satışın, reklam harcaması düşüldükten sonra işletmeye kalan katkısı.

**Örnek:**
- Brüt Kâr: 3.500 ₺
- Reklam Harcaması: 2.000 ₺
- Katkı Marjı = 3.500 - 2.000 = **1.500 ₺**

---

### 5. Net Kâr (Opsiyonel)

```
Net Kâr = Katkı Marjı - Sabit Giderler
```

**Sabit Giderler:** Maaşlar, kira, yazılım abonelikleri vb.

---

### 6. ROAS (Karşılaştırma İçin)

```
ROAS = Gelir / Reklam Harcaması
```

**ROAS vs POAS Farkı:**
| Metrik | Formül | Ne Ölçer |
|--------|--------|----------|
| ROAS | Gelir / Harcama | Gelir çarpanı (yanıltıcı olabilir) |
| POAS | Brüt Kâr / Harcama | Gerçek kârlılık çarpanı |

---

## 🎯 Hedef POAS Presetleri

| Preset | Değer | Strateji |
|--------|-------|----------|
| Kısa Vadeli Kârlılık | 2.0x | Her 1₺ reklam için 2₺ brüt kâr |
| Kontrollü Büyüme | 1.4x | Kârlılık ve büyüme dengesi |
| Break-even | 1.0x | Yeni müşteri kazanımı öncelikli |

---

## ✅ PDF Uyumu

Bu formüller, POAS metodolojisi PDF dökümanındaki tanımlarla **%100 uyumludur**:

1. ✅ POAS = Gross Profit / Ad Spend
2. ✅ Gross Profit = Revenue - Variable Order Costs
3. ✅ Revenue = Net (KDV hariç, indirimler sonrası)
4. ✅ Variable Costs = COGS + Shipping + Payment Fees + Handling
5. ✅ Contribution Margin = Gross Profit - Ad Spend
