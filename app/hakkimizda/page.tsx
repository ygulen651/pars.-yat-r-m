import Image from "next/image";

export const metadata = {
  title: "Hakkımızda",
  description: "Pars Yatırım — Geçmişten geleceğe güvenle yatırım.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "var(--void)" }}>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section 
        className="relative py-32 overflow-hidden"
        style={{ borderBottom: "1px solid rgba(28,23,18,0.05)" }}
      >
        <div 
          aria-hidden 
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            fontSize: "30rem",
            opacity: 0.02,
            fontFamily: "var(--font-display)",
            pointerEvents: "none"
          }}
        >
          Pars
        </div>

        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <div className="max-w-3xl">
            <p className="label-xs reveal-up" style={{ marginBottom: "2rem" }}>Hikayemiz</p>
            <h1 className="display-xl reveal-up delay-1">
              Güvenle İnşa Edilen
              <br />
              <span className="text-gold-shimmer">Bir Gelecek.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20">
            
            <div className="reveal-up delay-2">
              <p 
                style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: "2rem", 
                  lineHeight: "1.4",
                  color: "var(--ink)",
                  marginBottom: "3rem"
                }}
              >
                Pars Yatırım, gayrimenkul dünyasında şeffaflık, prestij ve güveni 
                bir araya getirmek amacıyla kuruldu.
              </p>
              
              <div 
                style={{ 
                  color: "var(--ink-dim)", 
                  lineHeight: "2", 
                  fontSize: "1.1rem",
                  fontFamily: "var(--font-ui)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem"
                }}
              >
                <p>
                  Yılların verdiği tecrübe ile Türkiye genelinde en doğru yatırım 
                  fırsatlarını sizlerle buluşturuyoruz. Emlak, tarla ve arsa 
                  alanlarında uzmanlaşmış ekibimizle, sadece bir ilan sitesi değil, 
                  bir yatırım danışmanlığı köprüsü olmayı hedefliyoruz.
                </p>
                <p>
                  Her bir ilanımız, titizlikle incelenmiş ve gerçek bilgilerle 
                  donatılmıştır. Bizim için yatırım, sadece bir mülk edinmek değil, 
                  geleceği güvenle planlamaktır.
                </p>
              </div>

              {/* Vision / Mission */}
              <div className="grid sm:grid-cols-2 gap-12 mt-20">
                <div>
                  <h3 className="label-sm" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Vizyonumuz</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink-ghost)" }}>
                    Dijitalleşen dünyada gayrimenkul yatırımını en şeffaf ve 
                    ulaşılabilir hale getiren lider platform olmak.
                  </p>
                </div>
                <div>
                  <h3 className="label-sm" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Misyonumuz</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink-ghost)" }}>
                    Doğru lokasyonda, doğru fiyatla, güvenilir yatırım fırsatlarını 
                    sunarak müşterilerimizin birikimlerini korumak ve büyütmek.
                  </p>
                </div>
              </div>
            </div>

            {/* Side Asset */}
            <div className="hidden lg:block reveal-left delay-3">
              <div 
                style={{ 
                  border: "1px solid rgba(28,23,18,0.1)", 
                  padding: "4rem",
                  background: "var(--void-2)",
                  position: "sticky",
                  top: "8rem"
                }}
              >
                <Image 
                  src="/images/pars-logo.png" 
                  alt="Pars Yatırım" 
                  width={200} 
                  height={100}
                  style={{ width: "100%", height: "auto", opacity: 0.15, filter: "grayscale(1)" }}
                />
                <div style={{ marginTop: "4rem" }}>
                  <p className="label-xs" style={{ color: "var(--gold-deep)" }}>Kuruluş</p>
                  <p className="display-md" style={{ marginTop: "0.5rem" }}>2024</p>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <p className="label-xs" style={{ color: "var(--gold-deep)" }}>Lokasyon</p>
                  <p className="display-md" style={{ marginTop: "0.5rem" }}>Karaman, TR</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section 
        className="py-32 text-center"
        style={{ background: "var(--void-2)", borderTop: "1px solid rgba(28,23,18,0.05)" }}
      >
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <h2 className="display-lg" style={{ marginBottom: "2.5rem" }}>Sizin İçin Buradayız.</h2>
          <div className="flex justify-center gap-6">
            <a href="/iletisim" className="btn-primary">İletişime Geçin</a>
            <a href="/" className="btn-ghost">İlanları Gör</a>
          </div>
        </div>
      </section>
    </main>
  );
}
