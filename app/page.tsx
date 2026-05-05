import Link from "next/link";
import Image from "next/image";
import { ListingCard } from "@/components/ListingCard";
import { Pagination } from "@/components/Pagination";
import { getListings } from "@/lib/listings";

const popularSearches = [
  "Karaman tarla",
  "Satılık arsa",
  "Yatırımlık arazi",
  "Merkez emlak",
  "Uygun fiyatlı",
];

const regionItems = [
  { title: "Konut",          tag: "Merkez",      num: "01", side: "left",  category: "emlak" },
  { title: "Tarla",          tag: "Yatırım",     num: "02", side: "right", category: "tarla" },
  { title: "Fabrika",        tag: "Sanayi",      num: "03", side: "left",  category: "emlak" },
  { title: "Arsa",           tag: "İmarlı",      num: "04", side: "right", category: "arsa" },
  { title: "Bahçe",          tag: "Hobi",        num: "05", side: "left",  category: "tarla" },
  { title: "Ticari",         tag: "İşyeri",      num: "06", side: "right", category: "emlak" },
  { title: "Arsa Kiralık",   tag: "Depo",        num: "07", side: "left",  category: "arsa" },
  { title: "Enerji Alanı",   tag: "Tahsis",      num: "08", side: "right", category: "arsa" },
];

const categoryMeta = {
  emlak: {
    icon: "◈",
    desc: "Konut, daire, villa ve ticari mülkler",
    stat: "En çok tercih edilen",
  },
  tarla: {
    icon: "◇",
    desc: "Tarım arazileri ve çiftlik alanları",
    stat: "Yüksek yatırım getirisi",
  },
  arsa: {
    icon: "◉",
    desc: "İmarlı ve yatırımlık arsalar",
    stat: "Hızla değer kazanıyor",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const search = params.q?.trim() || "";
  const category = (params.category || undefined) as any;
  const { listings, count, pageSize } = await getListings(
    page,
    category,
    search
  );

  return (
    <main style={{ background: "var(--void)" }}>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(140,100,45,0.08) 0%, transparent 65%), var(--void)",
        }}
      >
        {/* Large BG number */}
        <div
          aria-hidden
          className="absolute select-none pointer-events-none hidden xl:block"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18rem, 22vw, 28rem)",
            fontWeight: 300,
            color: "rgba(28,23,18,0.02)",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            right: "-2rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          01
        </div>

        {/* Vertical accent line */}
        <div
          aria-hidden
          className="absolute left-0 hidden lg:block"
          style={{
            top: "6rem",
            bottom: "6rem",
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, var(--gold) 30%, var(--gold) 70%, transparent)",
            opacity: 0.25,
          }}
        />

        <div
          className="relative mx-auto w-full px-6 md:px-10"
          style={{ maxWidth: "1280px" }}
        >
          <div className="grid lg:grid-cols-[1fr_420px] gap-20 items-center">

            {/* Left */}
            <div>
              {/* Eyebrow */}
              <div
                className="reveal-up flex items-center gap-4"
                style={{ marginBottom: "2.5rem" }}
              >
                <div style={{ width: "2.5rem", height: "1px", background: "var(--gold)" }} />
                <span className="label-xs">
                  Türkiye&apos;nin Prestijli İlan Platformu
                </span>
              </div>

              {/* Headline */}
              <h1 className="reveal-up delay-1 display-xl flex flex-col gap-2">
                <span className="block">Yatırımınıza</span>
                <span className="block italic text-gold-shimmer">En İyi Adres.</span>
              </h1>

              <p
                className="reveal-up delay-2"
                style={{
                  marginTop: "2rem",
                  color: "var(--ink-dim)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "1rem",
                  lineHeight: "2",
                  maxWidth: "30rem",
                }}
              >
                Güncel satılık emlak, tarla ve arsa ilanlarını şeffaflık ve
                güvenle inceleyin. Prestijli lokasyonlar, net bilgiler.
              </p>

              {/* Search */}
              <form
                action="/"
                className="reveal-up delay-3"
                style={{
                  marginTop: "2.5rem",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <div className="relative" style={{ flex: 1, minWidth: "200px" }}>
                  <svg
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1rem",
                      height: "1rem",
                      color: "var(--ink-ghost)",
                      pointerEvents: "none",
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    name="q"
                    defaultValue={search}
                    placeholder="Konum, başlık veya ilan ara..."
                    className="input-void"
                    style={{ width: "100%", height: "3.5rem", paddingLeft: "3rem", paddingRight: "1.25rem" }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ height: "3.5rem", padding: "0 2rem" }}>
                  Ara
                </button>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  style={{ height: "3.5rem", padding: "0 1.25rem" }}
                >
                  <svg style={{ width: "1rem", height: "1rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Harita
                </a>
              </form>

              {/* Tags */}
              <div
                className="reveal-up delay-4"
                style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
              >
                {popularSearches.map((item) => (
                  <Link
                    key={item}
                    href={`/?q=${encodeURIComponent(item)}`}
                    className="search-tag"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Logo monument */}
            <div
              className="scale-in delay-3 hidden lg:flex flex-col items-center"
              style={{ gap: "2rem" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "radial-gradient(ellipse at center, rgba(140,100,45,0.1) 0%, transparent 70%)",
                  padding: "3rem",
                }}
              >
                <Image
                  src="/images/pars-logo.png"
                  alt="Pars Yatırım"
                  width={360}
                  height={230}
                  style={{ width: "100%", maxWidth: "320px", height: "auto" }}
                  priority
                />
              </div>

              {/* Stats */}
              <div
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  border: "1px solid rgba(28,23,18,0.1)",
                }}
              >
                {[
                  ["500+", "Aktif İlan"],
                  ["12", "Şehir"],
                  ["100%", "Güven"],
                ].map(([val, lbl], i) => (
                  <div
                    key={lbl}
                    style={{
                      padding: "1.25rem",
                      textAlign: "center",
                      borderRight: i < 2 ? "1px solid rgba(28,23,18,0.1)" : "none",
                    }}
                  >
                    <p
                      className="text-gold-grad"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.8rem",
                        fontWeight: 500,
                      }}
                    >
                      {val}
                    </p>
                    <p
                      className="label-xs"
                      style={{ color: "var(--ink-ghost)", opacity: 0.6, marginTop: "0.25rem" }}
                    >
                      {lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="reveal-up delay-7"
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span className="label-xs" style={{ opacity: 0.3 }}>Kaydır</span>
          <div
            className="animate-float"
            style={{
              width: "1px",
              height: "2rem",
              background: "linear-gradient(to bottom, rgba(180,140,75,0.5), transparent)",
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CATEGORIES — Bento Grid
      ═══════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(28,23,18,0.05)",
          background: "var(--void-2)",
        }}
      >
        <div
          className="mx-auto px-6 py-24 md:px-10"
          style={{ maxWidth: "1280px" }}
        >
          {/* Header */}
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: "4rem" }}
          >
            <div>
              <p className="label-xs" style={{ marginBottom: "1rem" }}>
                Ne Arıyorsunuz?
              </p>
              <h2 className="display-lg">Kategoriler</h2>
            </div>
            <div className="hidden md:block line-gold-left" />
          </div>

          {/* Bento */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1px",
              background: "rgba(28,23,18,0.08)",
            }}
          >
            {/* Card: Emlak (3 cols, tall) */}
            <Link
              href="/ilanlar?category=emlak"
              className="bento-card"
              style={{
                gridColumn: "span 3",
                padding: "3.5rem",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                className="bento-ghost-num"
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "2rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "8rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                01
              </span>
              <div>
                <span style={{ fontSize: "2.5rem", color: "var(--gold)", opacity: 0.7, display: "block", marginBottom: "1.5rem" }}>
                  {categoryMeta.emlak.icon}
                </span>
                <h3 className="bento-title display-md" style={{ marginBottom: "0.75rem" }}>
                  Emlak
                </h3>
                <p style={{ color: "var(--ink-ghost)", fontSize: "0.875rem" }}>
                  {categoryMeta.emlak.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
                <span style={{ color: "var(--gold-deep)", fontFamily: "var(--font-ui)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                  {categoryMeta.emlak.stat}
                </span>
                <span className="bento-arrow" style={{ fontSize: "1.25rem" }}>→</span>
              </div>
            </Link>

            {/* Card: Tarla (2 cols, tall) */}
            <Link
              href="/ilanlar?category=tarla"
              className="bento-card"
              style={{
                gridColumn: "span 2",
                padding: "3rem",
                minHeight: "320px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                aria-hidden
                className="bento-ghost-num"
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1.5rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "6rem",
                  fontWeight: 300,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                02
              </span>
              <div>
                <span style={{ fontSize: "2rem", color: "var(--gold)", opacity: 0.7, display: "block", marginBottom: "1.5rem" }}>
                  {categoryMeta.tarla.icon}
                </span>
                <h3 className="bento-title display-md" style={{ marginBottom: "0.75rem" }}>
                  Tarla
                </h3>
                <p style={{ color: "var(--ink-ghost)", fontSize: "0.875rem" }}>
                  {categoryMeta.tarla.desc}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
                <span style={{ color: "var(--gold-deep)", fontFamily: "var(--font-ui)", fontSize: "0.72rem", letterSpacing: "0.1em" }}>
                  {categoryMeta.tarla.stat}
                </span>
                <span className="bento-arrow" style={{ fontSize: "1.25rem" }}>→</span>
              </div>
            </Link>

            {/* Card: Arsa (full width strip) */}
            <Link
              href="/ilanlar?category=arsa"
              className="bento-card"
              style={{
                gridColumn: "span 5",
                padding: "2.5rem 3.5rem",
                minHeight: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <span style={{ fontSize: "1.75rem", color: "var(--gold)", opacity: 0.7 }}>
                  {categoryMeta.arsa.icon}
                </span>
                <div>
                  <h3
                    className="bento-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 400,
                    }}
                  >
                    Arsa
                  </h3>
                  <p style={{ color: "var(--ink-ghost)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                    {categoryMeta.arsa.desc}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                <span
                  className="hidden md:block"
                  style={{ color: "var(--gold-deep)", fontFamily: "var(--font-ui)", fontSize: "0.72rem", letterSpacing: "0.1em" }}
                >
                  {categoryMeta.arsa.stat}
                </span>
                <span className="bento-arrow" style={{ fontSize: "1.5rem" }}>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LISTINGS
      ═══════════════════════════════════════════════ */}
      <section
        style={{ background: "var(--void)", maxWidth: "1280px", margin: "0 auto", padding: "6rem 2.5rem" }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p className="label-xs" style={{ marginBottom: "1rem" }}>
                {search ? "Arama Sonuçları" : "Son İlanlar"}
              </p>
              <h2 className="display-lg">
                {search ? (
                  <>
                    <span className="text-gold-grad">&ldquo;{search}&rdquo;</span>{" "}
                    <span style={{ color: "var(--ink-dim)", fontWeight: 300 }}>için</span>
                  </>
                ) : (
                  "Vitrindeki İlanlar"
                )}
              </h2>
            </div>
            <span className="listing-count">{count} İlan</span>
          </div>
          <div className="line-gold-left" style={{ opacity: 0.5 }} />
        </div>

        {listings.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {listings.map((listing, i) => (
                <div
                  key={listing.id}
                  className="reveal-up"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
            <Pagination
              page={page}
              pageSize={pageSize}
              count={count}
              basePath={search ? `/?q=${encodeURIComponent(search)}` : "/"}
            />
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 2rem",
              border: "1px solid rgba(28,23,18,0.05)",
              background: "var(--void-2)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                opacity: 0.12,
                marginBottom: "1.5rem",
              }}
            >
              ∅
            </p>
            <h3 className="display-md" style={{ opacity: 0.6, marginBottom: "0.75rem" }}>
              Şu an ilanımız bulunmamaktadır
            </h3>
            <p style={{ color: "var(--ink-ghost)", fontSize: "0.875rem", marginBottom: "2.5rem" }}>
              Seçtiğiniz kategori veya arama için kriterlere uygun sonuç bulunamadı.
            </p>
            <Link href="/" className="btn-primary" style={{ background: "var(--ink)", color: "#fff" }}>
              Tüm İlanları Gör
            </Link>
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════
          MODERN REGIONS (Editorial Typographic Flow)
      ═══════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(28,23,18,0.05)",
          background: "var(--void)",
          padding: "10rem 0",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1280px", padding: "0 2.5rem" }}>
          
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
            
            {/* Left: Sticky Title */}
            <div className="md:sticky md:top-32 self-start">
              <h2 className="display-lg" style={{ lineHeight: 0.9 }}>
                Yatırım
                <br />
                <span className="text-gold-grad">Atlası</span>
              </h2>
              <div 
                style={{ 
                  marginTop: "3rem", 
                  width: "1px", 
                  height: "100px", 
                  background: "linear-gradient(to bottom, var(--gold), transparent)",
                  opacity: 0.4
                }} 
              />
            </div>

            {/* Right: Typographic List */}
            <div className="flex flex-col">
              {regionItems.map((reg) => (
                <Link
                  key={reg.title}
                  href={`/ilanlar?category=${encodeURIComponent(reg.category || "")}&q=${encodeURIComponent(reg.title === reg.category ? "" : reg.title)}`}
                  className="modern-region-item group"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2.5rem 0",
                    borderBottom: "1px solid rgba(28,23,18,0.08)",
                    transition: "padding 0.4s var(--ease-out-expo)"
                  }}
                >
                  <div className="flex items-center gap-12 md:gap-20">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.9rem",
                        color: "var(--gold)",
                        opacity: 0.5,
                        width: "2rem"
                      }}
                    >
                      {reg.num}
                    </span>
                    <h3 
                      className="display-md group-hover:text-gold"
                      style={{ 
                        fontSize: "clamp(2rem, 4vw, 3.5rem)", 
                        transition: "all 0.4s ease",
                        letterSpacing: "-0.02em"
                      }}
                    >
                      {reg.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8">
                    <span 
                      className="label-xs hidden lg:block opacity-0 group-hover:opacity-100"
                      style={{ 
                        transition: "all 0.4s ease", 
                        transform: "translateX(10px)",
                      }}
                    >
                      {reg.tag}
                    </span>
                    <span 
                      style={{ 
                        fontSize: "1.5rem", 
                        transition: "transform 0.4s var(--ease-out-expo)",
                        color: "var(--gold)"
                      }}
                      className="group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA — Editorial statement
      ═══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          borderTop: "1px solid rgba(28,23,18,0.05)",
          background: "var(--void)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(140,100,40,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(180,140,75,0.2), transparent)",
          }}
        />

        <div
          className="relative mx-auto px-6 md:px-10"
          style={{ maxWidth: "1280px", padding: "8rem 2.5rem", textAlign: "center" }}
        >
          <p className="label-xs" style={{ marginBottom: "2.5rem" }}>
            Pars Yatırım
          </p>

          <h2 className="display-xl mx-auto flex flex-col gap-4" style={{ maxWidth: "20ch" }}>
            <span className="block">Geleceğinize</span>
            <span className="block text-gold-shimmer" style={{ fontStyle: "italic", padding: "0.2em 0" }}>
              Güvenle
            </span> 
            <span className="block">Yatırım Yapın.</span>
          </h2>

          <p
            style={{
              margin: "2.5rem auto 0",
              fontSize: "1rem",
              lineHeight: "2",
              maxWidth: "28rem",
              color: "var(--ink-dim)",
              fontFamily: "var(--font-ui)",
            }}
          >
            Türkiye&apos;nin dört bir yanında prestijli emlak fırsatlarını
            keşfedin. Güvenilir platform, şeffaf bilgiler.
          </p>

          <div
            style={{
              marginTop: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" className="btn-primary" style={{ padding: "1rem 3rem" }}>
              İlanları İnceleyin
            </Link>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
              style={{ padding: "1rem 2rem" }}
            >
              Haritada Ara
            </a>
          </div>

          {/* Faded logo watermark */}
          <div style={{ marginTop: "5rem", opacity: 0.07, display: "flex", justifyContent: "center" }}>
            <Image
              src="/images/pars-logo.png"
              alt=""
              width={200}
              height={100}
              aria-hidden
              style={{ width: "12rem", height: "auto" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
