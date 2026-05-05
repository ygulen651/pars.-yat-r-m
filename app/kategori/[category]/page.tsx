import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { Pagination } from "@/components/Pagination";
import { getListings } from "@/lib/listings";
import { categories, type Category } from "@/lib/types";

function getCategory(value: string) {
  return categories.find((category) => category.value === value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const current = getCategory(category);
  if (!current) return {};

  return {
    title: `${current.label} İlanları`,
    description: `Güncel ${current.label.toLowerCase()} ilanlarını fiyat ve konum bilgileriyle inceleyin.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const current = getCategory(category);
  if (!current) notFound();

  const query = await searchParams;
  const page = Number(query.page || 1);
  const { listings, count, pageSize } = await getListings(page, current.value as Category);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-field">Kategori</p>
        <h1 className="mt-2 text-3xl font-bold">{current.label} İlanları</h1>
        <p className="mt-2 text-ink/65">
          {current.label} kategorisinde {count} ilan listeleniyor.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        count={count}
        basePath={`/kategori/${current.value}`}
      />
    </main>
  );
}
