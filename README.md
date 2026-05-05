# Pars Emlak

Tek kullanıcı tarafından yönetilen emlak, tarla ve arsa ilan sitesi.

## Stack

- Next.js App Router
- Supabase Database
- Tailwind CSS
- Vercel

## Özellikler

- Ziyaretçiler ilanları ve kategori sayfalarını görüntüler.
- Admin panelden ilan ekleme, düzenleme ve silme yapılır.
- Her ilan için SEO title ve meta description üretilir.
- Listeleme sayfalarında pagination vardır.
- Fotoğraflar admin panelden dosya olarak yüklenir, Supabase Storage içinde tutulur.
- Fotoğraflar Next Image ile optimize edilir ve lazy loading kullanılır.

## Kurulum

Bağımlılıkları yükle:

```bash
npm install
```

Supabase SQL Editor içinde şemayı çalıştır:

```bash
supabase/schema.sql
```

Admin panel için `.env.local` içinde şu değerleri doldur:

```env
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

Geliştirme sunucusu:

```bash
npm run dev
```

## URL Yapısı

- `/`
- `/kategori/emlak`
- `/kategori/tarla`
- `/kategori/arsa`
- `/ilan/[slug]`
- `/admin`

## Supabase Tabloları

### listings

- `id`
- `title`
- `description`
- `price`
- `category`
- `location`
- `slug`
- `created_at`

### images

- `id`
- `listing_id`
- `url`

## Storage

Fotoğraflar `listing-images` bucket içine yüklenir. Bucket ve public read policy `supabase/schema.sql` ile oluşturulur.

## Notlar

Admin işlemleri server tarafında `SUPABASE_SERVICE_ROLE_KEY` ile yapılır. Bu key kesinlikle browser tarafına verilmemelidir.
