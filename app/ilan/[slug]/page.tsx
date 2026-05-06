import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, formatPrice } from "@/lib/format";
import { getListingBySlug } from "@/lib/listings";
import { ShareButton } from "@/components/ShareButton";
import { ImageGallery } from "@/components/ImageGallery";
import { VideoPlayer } from "@/components/VideoPlayer";

function mapHrefForListing(listing: { map_url: string | null; location: string; title: string }) {
  if (listing.map_url) return listing.map_url;
  const query = encodeURIComponent(`${listing.location} ${listing.title}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};

  return {
    title: `${listing.title} | Karaman Pars Yatırım`,
    description: `Karaman ${listing.location} konumunda satılık ${listing.category}. ${formatPrice(listing.price)}. Karaman'da yatırımın adresi Pars Yatırım.`,
  };
}

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const images = listing.images || [];
  const mapHref = mapHrefForListing(listing);

  return (
    <main style={{ background: "var(--void)", minHeight: "100vh" }}>
      
      {/* ══ TOP NAVIGATION SPACER ══════════════════════════ */}
      <div className="h-12" />

      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1440px" }}>
        
        {/* ══ HEADER ══════════════════════════════════════════ */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6 reveal-up">
            <svg style={{ width: "1rem", height: "1rem", color: "var(--gold)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span className="label-xs" style={{ opacity: 0.6 }}>{listing.location}</span>
          </div>
          <h1 className="display-lg reveal-up delay-1" style={{ maxWidth: "30ch" }}>
            {listing.title}
          </h1>
        </header>

        {/* ══ MAIN CONTENT GRID ══════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 pb-32">
          
          {/* Left Column (Photos & Description) */}
          <div className="flex flex-col gap-12">
            
            {/* ══ INTERACTIVE GALLERY ════════════════════════ */}
            <ImageGallery images={images} title={listing.title} />

            {/* ══ VIDEO SECTION ══════════════════════════════ */}
            <VideoPlayer url={listing.video_url} />

            {/* Description */}
            <div className="reveal-up pt-12 border-t" style={{ borderColor: "rgba(28,23,18,0.06)" }}>
              <h2 className="display-md mb-8">İlan Açıklaması</h2>
              <p 
                style={{ 
                  lineHeight: "2", 
                  fontSize: "1.15rem", 
                  color: "var(--ink-dim)", 
                  fontFamily: "var(--font-ui)",
                  whiteSpace: "pre-line"
                }}
              >
                {listing.description}
              </p>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="relative">
            <div className="lg:sticky lg:top-32 flex flex-col gap-8 reveal-left">
              
              {/* Financial Card */}
              <div 
                className="p-6 lg:p-14"
                style={{ 
                  background: "var(--void-2)", 
                  border: "1px solid rgba(28,23,18,0.06)",
                }}
              >
                <div className="flex flex-col gap-8">
                  <div>
                    <p className="label-xs opacity-50 mb-4">Satış Fiyatı</p>
                    <p className="text-gold-grad display-lg" style={{ fontSize: "3rem", lineHeight: 1 }}>
                      {formatPrice(listing.price)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 border-t pt-8" style={{ borderColor: "rgba(28,23,18,0.1)" }}>
                    <div className="flex justify-between items-center">
                      <span className="label-xs opacity-40">Kategori</span>
                      <span className="font-bold uppercase tracking-wide text-xs">{listing.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="label-xs opacity-40">İlan No</span>
                      <span className="font-mono text-xs opacity-60">#P{listing.id.slice(0, 5).toUpperCase()}</span>
                    </div>
                  </div>

                  <a 
                    href={mapHref} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-ghost w-full justify-center py-4"
                  >
                    Haritada Gör
                  </a>
                </div>
              </div>

              {/* Advisor Card */}
              <div 
                className="p-8 lg:p-12"
                style={{ 
                  background: "#fff", 
                  border: "1px solid rgba(28,23,18,0.08)",
                }}
              >
                <p className="label-xs color-gold mb-8">Yatırım Danışmanı</p>
                <div className="flex flex-col gap-6">
                  <h3 className="display-md" style={{ fontSize: "1.8rem" }}>Turhan Terlemez</h3>
                  <a href="tel:+905324514366" className="btn-primary w-full justify-center">
                    Bize Ulaşın
                  </a>
                  <p className="text-center label-xs opacity-50">+90 532 451 43 66</p>
                </div>
              </div>

              <ShareButton />
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
