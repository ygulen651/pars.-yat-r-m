import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

import { categories } from "@/lib/types";

export const metadata: Metadata = {
  title: {
    default: "Pars Yatırım — Karaman Emlak, Arsa ve Yatırım Fırsatları",
    template: "%s — Pars Yatırım",
  },
  description:
    "Karaman'da yatırımın adresi Pars Yatırım. Karaman satılık arsa, tarla, emlak ve ticari mülkler için en güvenilir platform. Karaman fabrika ve yatırım atlası.",
  keywords: [
    "Karaman yatırım",
    "Karaman arsa",
    "Karaman emlak",
    "Karaman fabrika",
    "Karaman ticaret",
    "Karaman satılık tarla",
    "Karaman gayrimenkul",
    "Pars Yatırım",
  ],
  authors: [{ name: "Pars Yatırım" }],
  creator: "UGİ Agency",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.parsyatirim.com.tr",
    siteName: "Pars Yatırım",
    title: "Pars Yatırım — Karaman'da Güvenilir Yatırım",
    description: "Karaman'da satılık arsa, tarla ve emlak fırsatları. Profesyonel yatırım danışmanlığı.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pars Yatırım Karaman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pars Yatırım — Karaman Yatırım Fırsatları",
    description: "Karaman'da satılık arsa ve emlak. Yatırımın en doğru adresi.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navCategories = [
  { label: "Konut", href: "/ilanlar?category=konut" },
  { label: "Tarla", href: "/ilanlar?category=tarla" },
  { label: "Arsa", href: "/ilanlar?category=arsa" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <Navbar />

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
                  {categories.map((cat) => (
                    <Link key={cat.value} href={`/ilanlar?category=${cat.value}`} className="footer-link">
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
                className="text-xs tracking-widest flex items-center gap-2"
                style={{
                  color: "var(--gold-deep)",
                  opacity: 0.8,
                  fontFamily: "var(--font-ui)",
                }}
              >
                <span>PARS YATIRIM</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <a 
                  href="https://www.ugi.net.tr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                  style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  UGİ TARAFINDAN YAPILMIŞTIR
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
