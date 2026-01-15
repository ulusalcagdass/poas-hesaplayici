# POAS Hesaplayıcı

Türkçe bir SaaS web uygulaması: **POAS (Profit on Ad Spend) Hesaplayıcı**. Reklamlarınızın gerçek kârlılığını ölçün.

## 🎯 Neden POAS?

**ROAS** (Return on Ad Spend) sadece gelir/harcama oranını gösterir ve yanıltıcı olabilir.

**POAS** (Profit on Ad Spend) ise brüt kâr/harcama oranını ölçer - tüm değişken maliyetleri dahil ederek gerçek kârlılığı gösterir.

```
POAS = Brüt Kâr / Reklam Harcaması
Brüt Kâr = Gelir - (COGS + Kargo + Komisyon + Paketleme)
```

## ✨ Özellikler

- 📊 **POAS Hesaplayıcı** - Tüm değişken maliyetleri dahil eden gerçek kârlılık hesabı
- 🎯 **Hedef POAS** - Maksimum reklam bütçesi ve minimum brüt kâr hedefleri
- 💾 **Senaryo Kaydetme** - Hesaplamalarınızı kaydedin ve karşılaştırın
- 📥 **Export** - CSV formatında dışa aktarım
- 🔐 **Auth** - Güvenli kullanıcı yönetimi
- 🌙 **Dark Mode** - Modern, göz yormayan tasarım
- 📱 **Responsive** - Mobil uyumlu arayüz

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya pnpm

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Değişkenleri

`.env` dosyası zaten mevcut. Prodüksiyon için `AUTH_SECRET` değerini değiştirin:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-super-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Veritabanı Kurulumu

```bash
# Migration uygula
npm run db:migrate

# Prisma client oluştur
npx prisma generate

# Demo veri ekle (opsiyonel)
npm run db:seed
```

### 4. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 🧪 Demo Hesabı

Seed çalıştırıldıysa:

- **Email:** demo@poas.app
- **Şifre:** demo1234

## 📁 Proje Yapısı

```
poas-hesaplayici/
├── prisma/
│   ├── schema.prisma      # Veritabanı şeması
│   ├── seed.ts            # Demo veri
│   └── migrations/        # DB migrations
├── src/
│   ├── app/
│   │   ├── (auth)/        # Login, Signup sayfaları
│   │   ├── (dashboard)/   # Hesaplayıcı, Senaryolar
│   │   ├── api/           # API endpoints
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   ├── landing/       # Landing page bileşenleri
│   │   └── calculator/    # Hesaplayıcı bileşenleri
│   ├── lib/
│   │   ├── calculations.ts # POAS hesaplama fonksiyonları
│   │   ├── auth.ts        # NextAuth config
│   │   └── validations.ts # Zod schemas
│   └── types/
└── vitest.config.ts       # Test config
```

## 🧮 POAS Hesaplama Formülleri

### Temel Formüller

```typescript
// Değişken Sipariş Maliyetleri
VariableOrderCosts = COGS + Kargo + Komisyon + Paketleme

// Brüt Kâr
GrossProfit = Gelir - VariableOrderCosts

// POAS
POAS = GrossProfit / AdSpend

// Katkı Marjı
ContributionMargin = GrossProfit - AdSpend

// Net Kâr (opsiyonel)
NetProfit = ContributionMargin - SabitGiderler
```

### Hedef POAS Presetleri

| Hedef | POAS | Açıklama |
|-------|------|----------|
| Kısa Vadeli Kârlılık | 2.0x | Yüksek kâr marjı |
| Kontrollü Büyüme | 1.4x | Dengeli büyüme |
| Break-even | 1.0x | Müşteri kazanımı öncelikli |

## 🧪 Testler

```bash
# Testleri çalıştır
npm run test

# Tek seferlik test
npm run test:run
```

## 🚢 Deploy (Vercel)

1. Projeyi GitHub'a push edin
2. [Vercel](https://vercel.com)'de import edin
3. Environment variables ekleyin:
   - `DATABASE_URL` - Vercel Postgres veya Supabase URL
   - `AUTH_SECRET` - `npx auth secret` ile oluşturun
4. Deploy!

### Prodüksiyon Veritabanı

SQLite yerine PostgreSQL kullanmak için:

1. `prisma/schema.prisma` dosyasında provider'ı değiştirin:
   ```prisma
   datasource db {
     provider = "postgresql"
   }
   ```

2. `.env` dosyasında DATABASE_URL'i güncelleyin

3. Migration'ları yeniden oluşturun:
   ```bash
   npx prisma migrate dev --name init
   ```

## 📄 Lisans

MIT

## 🙏 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır!

---

Made with 💜 in Türkiye
