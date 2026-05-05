import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pars Yatırım — Prestijli Gayrimenkul",
    template: "%s — Pars Yatırım",
  },
  description:
    "Türkiye genelinde satılık emlak, tarla ve arsa ilanları. Pars Yatırım ile güvenilir yatırım fırsatları.",
};

const navCategories = [
  { label: "Emlak", href: "/ilanlar?category=emlak" },
  { label: "Tarla", href: "/ilanlar?category=tarla" },
  { label: "Arsa", href: "/ilanlar?category=arsa" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

const footerCategories = [
  { label: "Emlak", href: "/ilanlar?category=emlak" },
  { label: "Tarla", href: "/ilanlar?category=tarla" },
  { label: "Arsa", href: "/ilanlar?category=arsa" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        {/* ══ NAVBAR ══════════════════════════════════════════ */}
        <header className="glass-dark fixed top-0 left-0 right-0 z-50">
          <div
            className="mx-auto flex items-center justify-between px-6 py-4 md:px-10"
            style={{ maxWidth: "1280px" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/pars-logo.png"
                alt="Pars Yatırım"
                width={110}
                height={52}
                className="h-11 w-auto"
                priority
              />
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navCategories.map((cat) => (
                <Link key={cat.href} href={cat.href} className="nav-link">
                  {cat.label}
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-6">
              <Link href="/admin" className="nav-link hidden md:block">
                Yönetim
              </Link>
              <Link href="/ilanlar" className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.7rem" }}>
                Tüm İlanlar
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{ paddingTop: "73px" }}>{children}</div>

        {/* ══ FOOTER ══════════════════════════════════════════ */}
        <footer
          style={{
            background: "var(--void-2)",
            borderTop: "1px solid rgba(28,23,18,0.05)",
          }}
        >
          <div className="mx-auto" style={{ maxWidth: "1280px", padding: "0 2.5rem" }}>
            <div className="line-gold" />
          </div>

          <div
            className="mx-auto"
            style={{ maxWidth: "1280px", padding: "5rem 2.5rem" }}
          >
            <div className="grid md:grid-cols-[2.5fr_1fr_1fr] gap-16">
              {/* Brand */}
              <div>
                <Image
                  src="/images/pars-logo.png"
                  alt="Pars Yatırım"
                  width={130}
                  height={61}
                  className="h-14 w-auto mb-8"
                  style={{ opacity: 0.9 }}
                />
                <p
                  className="text-sm max-w-xs"
                  style={{
                    color: "var(--ink-dim)",
                    lineHeight: "1.9",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  Türkiye genelinde prestijli emlak, tarla ve arsa yatırım
                  fırsatlarını şeffaf ve güvenilir bir platformda sunuyoruz.
                </p>
                <div className="mt-8 flex flex-col gap-2">
                   <p className="label-xs" style={{ color: "var(--gold-deep)" }}>Turan Terlemez</p>
                   <a href="tel:+905324514366" className="text-sm hover:text-gold" style={{ color: "var(--ink-dim)" }}>
                     +90 532 451 43 66
                   </a>
                </div>
                <div className="mt-8 line-gold-left" style={{ opacity: 0.6 }} />
              </div>

              {/* Categories */}
              <div>
                <p className="label-xs mb-8">Kategoriler</p>
                <div className="flex flex-col gap-4">
                  {footerCategories.map((cat) => (
                    <Link key={cat.href} href={cat.href} className="footer-link">
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div>
                <p className="label-xs mb-8">Hızlı Erişim</p>
                <div className="flex flex-col gap-4">
                  <Link href="/hakkimizda" className="footer-link">
                    Hakkımızda
                  </Link>
                  <Link href="/iletisim" className="footer-link">
                    İletişim
                  </Link>
                  <Link href="/admin" className="footer-link">
                    Yönetim Paneli
                  </Link>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div
              className="mt-20 pt-8 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(28,23,18,0.04)" }}
            >
              <p
                className="text-xs tracking-wide"
                style={{
                  color: "var(--ink-ghost)",
                  opacity: 0.7,
                  fontFamily: "var(--font-ui)",
                }}
              >
                © {new Date().getFullYear()} Pars Yatırım. Tüm hakları saklıdır.
              </p>
              <p
                className="text-xs tracking-widest"
                style={{
                  color: "var(--gold-deep)",
                  opacity: 0.8,
                  fontFamily: "var(--font-ui)",
                }}
              >
                PARS YATIRIM
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
