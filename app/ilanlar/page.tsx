import Link from "next/link";
import { getListings } from "@/lib/listings";
import { ListingCard } from "@/components/ListingCard";
import { Pagination } from "@/components/Pagination";
import type { Category } from "@/lib/types";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.q?.trim() || "";
  const category = (params.category || undefined) as Category | undefined;

  const { listings, count, pageSize } = await getListings(
    page,
    category,
    search
  );

  const title = category 
    ? (category === "emlak" ? "Konut" : category.charAt(0).toUpperCase() + category.slice(1))
    : search ? `Arama: ${search}` : "Tüm İlanlar";

  return (
    <main style={{ background: "var(--void)", minHeight: "100vh" }}>
      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header className="py-24 border-b" style={{ borderColor: "rgba(28,23,18,0.06)" }}>
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-xs" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Pars Yatırım Portföy</p>
              <h1 className="display-xl" style={{ lineHeight: 1 }}>{title}</h1>
            </div>
            
            <div className="flex flex-col gap-4 items-start md:items-end">
              <span 
                className="font-ui font-medium" 
                style={{ fontSize: "0.9rem", color: "var(--ink-ghost)" }}
              >
                <span style={{ color: "var(--ink)", fontWeight: 700 }}>{count}</span> İlan Bulundu
              </span>
              <div className="flex flex-wrap gap-2">
                <Link href="/ilanlar" className={`search-tag ${!category && !search ? "active" : ""}`}>Tümü</Link>
                <Link href="/ilanlar?category=emlak" className={`search-tag ${category === "emlak" ? "active" : ""}`}>Konut</Link>
                <Link href="/ilanlar?category=tarla" className={`search-tag ${category === "tarla" ? "active" : ""}`}>Tarla</Link>
                <Link href="/ilanlar?category=arsa" className={`search-tag ${category === "arsa" ? "active" : ""}`}>Arsa</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ LISTINGS GRID ═══════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          {listings.length > 0 ? (
            <>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing, i) => (
                  <div key={listing.id} className="reveal-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
              
              <div className="mt-20">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  count={count}
                  basePath={`/ilanlar?${category ? `category=${category}&` : ""}${search ? `q=${search}&` : ""}`}
                />
              </div>
            </>
          ) : (
            <div className="py-32 text-center border bg-void-2/30" style={{ borderColor: "rgba(28,23,18,0.05)" }}>
              <p className="display-md opacity-10 mb-6" style={{ fontSize: "5rem" }}>∅</p>
              <h2 className="display-md opacity-60">Şu an ilanımız bulunmamaktadır</h2>
              <p className="text-ink-ghost mt-4 mb-10">Kriterlerinize uygun bir sonuç bulamadık.</p>
              <Link href="/ilanlar" className="btn-primary" style={{ background: "var(--ink)", color: "#fff", padding: "1rem 2.5rem" }}>
                Tüm İlanları Gör
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
