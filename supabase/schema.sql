create extension if not exists "pgcrypto";

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  price numeric not null check (price >= 0),
  category text not null check (category in ('emlak', 'tarla', 'arsa')),
  location text not null,
  map_url text,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.listings
  add column if not exists map_url text;

create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  url text not null
);

create index if not exists listings_category_created_at_idx
  on public.listings (category, created_at desc);

create index if not exists listings_slug_idx
  on public.listings (slug);

create index if not exists images_listing_id_idx
  on public.images (listing_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-images',
  'listing-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.listings enable row level security;
alter table public.images enable row level security;

drop policy if exists "Public listings are readable" on public.listings;
create policy "Public listings are readable"
  on public.listings
  for select
  using (true);

drop policy if exists "Public listing images are readable" on public.images;
create policy "Public listing images are readable"
  on public.images
  for select
  using (true);

drop policy if exists "Public listing storage images are readable" on storage.objects;
create policy "Public listing storage images are readable"
  on storage.objects
  for select
  using (bucket_id = 'listing-images');

-- Insert, update, and delete are intentionally not opened to anon users.
-- The Next.js admin panel uses SUPABASE_SERVICE_ROLE_KEY on the server.
