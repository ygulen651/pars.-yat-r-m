export const metadata = {
  title: "İletişim",
  description: "Pars Yatırım ile iletişime geçin. Yatırım fırsatlarını konuşalım.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--void)" }}>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section 
        className="py-24 border-b"
        style={{ borderColor: "rgba(28,23,18,0.05)" }}
      >
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <p className="label-xs reveal-up" style={{ marginBottom: "2rem" }}>Bize Ulaşın</p>
          <h1 className="display-xl reveal-up delay-1">
            Yatırımınızı
            <br />
            <span className="text-gold-shimmer">Birlikte Planlayalım.</span>
          </h1>
        </div>
      </section>

      {/* ══ CONTENT ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto px-6 md:px-10" style={{ maxWidth: "1280px" }}>
          <div className="grid lg:grid-cols-2 gap-24">
            
            {/* Info */}
            <div className="reveal-up delay-2">
              <div className="flex flex-col gap-16">
                
                <div>
                  <h3 className="label-xs" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Yatırım Danışmanı</h3>
                  <p 
                    style={{ 
                      fontFamily: "var(--font-display)", 
                      fontSize: "2.5rem", 
                      lineHeight: "1.2",
                      color: "var(--ink)",
                      marginBottom: "1rem"
                    }}
                  >
                    Turhan Terlemez
                  </p>
                </div>

                <div>
                  <h3 className="label-xs" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Ofisimiz</h3>
                  <p 
                    style={{ 
                      fontFamily: "var(--font-ui)", 
                      fontSize: "1.1rem", 
                      lineHeight: "1.8",
                      color: "var(--ink-dim)",
                      maxWidth: "20rem"
                    }}
                  >
                    Kirişçi, 47. Sk. No:10/12, Kat 3 Daire 25 
                    <br />
                    70100 Merkez/Karaman, Türkiye
                  </p>
                </div>

                <div>
                  <h3 className="label-xs" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>Hızlı İletişim</h3>
                  <div className="flex flex-col gap-4">
                    <a 
                      href="tel:+905324514366" 
                      className="display-md hover:text-gold"
                      style={{ transition: "color 0.3s ease", fontSize: "2rem" }}
                    >
                      +90 532 451 43 66
                    </a>
                    <a 
                      href="mailto:bilgi@parsyatirim.com" 
                      className="display-md hover:text-gold"
                      style={{ transition: "color 0.3s ease", fontSize: "1.5rem" }}
                    >
                      bilgi@parsyatirim.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="reveal-left delay-3">
              <div 
                style={{ 
                  background: "var(--void-2)", 
                  padding: "4rem",
                  border: "1px solid rgba(28,23,18,0.06)"
                }}
              >
                <form className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="label-xs" style={{ opacity: 0.6 }}>Ad Soyad</label>
                    <input 
                      type="text" 
                      placeholder="Adınızı giriniz"
                      className="input-void" 
                      style={{ padding: "1rem", height: "3.5rem" }}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="label-xs" style={{ opacity: 0.6 }}>E-posta</label>
                    <input 
                      type="email" 
                      placeholder="e-posta@adresiniz.com"
                      className="input-void" 
                      style={{ padding: "1rem", height: "3.5rem" }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="label-xs" style={{ opacity: 0.6 }}>Mesajınız</label>
                    <textarea 
                      rows={5}
                      placeholder="Yatırım planlarınızdan bahsedin..."
                      className="input-void" 
                      style={{ padding: "1rem", resize: "none" }}
                    />
                  </div>

                  <button type="button" className="btn-primary w-full" style={{ height: "4rem" }}>
                    Mesaj Gönder
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
