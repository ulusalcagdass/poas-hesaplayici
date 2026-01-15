# POAS Hesaplayıcı - İnceleme Paketi

Bu klasör, harici inceleyicilerin (ChatGPT, ekip üyeleri vb.) uygulamayı değerlendirebilmesi için hazırlanmıştır.

---

## 📁 Dosya İçeriği

| Dosya | Açıklama |
|-------|----------|
| `poas-formulas.md` | Tüm POAS formülleri ve tanımları |
| `calculation-example.json` | Örnek hesaplama (input → output) |
| `ui-screenshots.md` | UI bölümleri ve metin açıklamaları |

---

## 🔗 Hızlı Linkler

- **Public URL:** [Vercel'de deploy edilecek]
- **Demo Login:**
  - Email: `demo@poas.app`
  - Şifre: `demo1234`

---

## ✅ İnceleme Kontrol Listesi

### Landing Page
- [ ] "POAS = Brüt Kâr / Reklam Harcaması" ifadesi mevcut mu?
- [ ] "ROAS gelir odaklıdır, POAS kârlılık odaklıdır" ifadesi mevcut mu?
- [ ] Revenue ve Gross Profit tanımları açık mı?

### Hesaplama Motoru
- [ ] Formüller PDF dökümanıyla uyumlu mu?
- [ ] Değişken maliyetler eksiksiz mi? (COGS, Kargo, Komisyon, Operasyon)
- [ ] Hedef POAS presetleri doğru mu? (2.0x, 1.4x, 1.0x)

### UI/UX
- [ ] Sonuç ekranında POAS ve ROAS karşılaştırması var mı?
- [ ] Renk kodları anlamlı mı? (yeşil=iyi, kırmızı=kötü)
- [ ] Katkı marjı gösteriliyor mu?

---

## 📐 Formül Özeti

```
POAS = Brüt Kâr / Reklam Harcaması

Brüt Kâr = Gelir - Değişken Sipariş Maliyetleri

Değişken Sipariş Maliyetleri = COGS + Kargo + Komisyon + Operasyon

Gelir = KDV hariç, indirimler sonrası, iadeler düşülmüş tutar

Katkı Marjı = Brüt Kâr - Reklam Harcaması
```

---

## 📝 Hesaplama Dosyası

Ana hesaplama motoru: `/src/lib/poasCalculator.ts`

Bu dosyada her formülün üstünde:
- Yorum satırıyla açıklama
- PDF uyumu işareti (✅)
- Örnek kullanım

---

## 🎯 Hedef POAS Presetleri

| Preset | Değer | Kullanım |
|--------|-------|----------|
| Kısa Vadeli Kârlılık | 2.0x | Yüksek kâr marjı hedefi |
| Kontrollü Büyüme | 1.4x | Kâr-büyüme dengesi |
| Break-even | 1.0x | Müşteri kazanımı öncelikli |
