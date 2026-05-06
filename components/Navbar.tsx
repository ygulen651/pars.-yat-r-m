"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { 
    label: "İlanlar", 
    href: "/ilanlar",
    children: [
      { label: "Konut", href: "/ilanlar?category=konut" },
      { label: "Tarla", href: "/ilanlar?category=tarla" },
      { label: "Arsa", href: "/ilanlar?category=arsa" },
      { label: "Yatırım Atlası", isSeparator: true },
      { label: "Fabrika", href: "/ilanlar?category=fabrika" },
      { label: "Ticari Arsa", href: "/ilanlar?category=ticari-arsa" },
      { label: "Enerji Tahsis Alanı", href: "/ilanlar?category=enerji-tahsis-alani" },
      { label: "Bahçe", href: "/ilanlar?category=bahce" },
    ]
  },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIlanlarOpen, setIsIlanlarOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsIlanlarOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="glass-dark fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-auto flex items-center justify-between px-6 py-4 md:px-10"
        style={{ maxWidth: "1280px" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center z-[60]">
          <Image
            src="/images/pars-logo.png"
            alt="Pars Yatırım"
            width={110}
            height={52}
            className="h-9 md:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative group"
              onMouseEnter={() => item.children && setIsIlanlarOpen(true)}
              onMouseLeave={() => item.children && setIsIlanlarOpen(false)}
            >
              {item.children ? (
                <div className="flex items-center gap-1 cursor-pointer nav-link">
                  <span>{item.label}</span>
                  <svg 
                    style={{ width: "0.6rem", height: "0.6rem", transition: "transform 0.3s ease" }} 
                    className={isIlanlarOpen ? "rotate-180" : ""}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {item.children && (
                <div 
                  className={`absolute top-full left-0 pt-4 transition-all duration-300 ${isIlanlarOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                >
                  <div className="bg-white border border-[rgba(28,23,18,0.08)] shadow-2xl p-6 min-w-[240px] flex flex-col gap-4">
                    {item.children.map((child, idx) => (
                      child.isSeparator ? (
                        <div key={idx} className="mt-2">
                          <p className="label-xs" style={{ fontSize: '0.55rem', opacity: 0.5, marginBottom: '0.5rem' }}>{child.label}</p>
                          <div className="h-[1px] bg-[rgba(28,23,18,0.05)]" />
                        </div>
                      ) : (
                        <Link 
                          key={child.href} 
                          href={child.href || "#"} 
                          className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-dim hover:text-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6 z-[60]">
          <Link href="/ilanlar" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.65rem", height: "auto" }}>
            <span className="hidden sm:inline">Tüm</span> İlanlar
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menü"
          >
            <span 
              className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span 
              className={`w-6 h-0.5 bg-ink transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span 
              className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-void z-50 md:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: "80px", overflowY: "auto" }}
      >
        <div className="flex flex-col p-8 gap-8">
          {navItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-4">
              {item.children ? (
                <>
                  <div className="display-md text-2xl text-ink-dim border-b border-[rgba(28,23,18,0.1)] pb-2">
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-4 pl-4">
                    {item.children.map((child, idx) => (
                      child.isSeparator ? (
                        <p key={idx} className="label-xs mt-4" style={{ fontSize: '0.6rem', opacity: 0.5 }}>{child.label}</p>
                      ) : (
                        <Link 
                          key={child.href} 
                          href={child.href || "#"} 
                          className="display-sm text-xl hover:text-gold transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      )
                    ))}
                  </div>
                </>
              ) : (
                <Link 
                  href={item.href} 
                  className="display-md text-3xl hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-10 left-10 opacity-5 select-none pointer-events-none">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 700 }}>PARS</p>
        </div>
      </div>
    </header>
  );
}
