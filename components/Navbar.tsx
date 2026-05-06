"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navCategories = [
  { label: "Konut", href: "/ilanlar?category=konut" },
  { label: "Tarla", href: "/ilanlar?category=tarla" },
  { label: "Arsa", href: "/ilanlar?category=arsa" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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
          {navCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="nav-link">
              {cat.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6 z-[60]">

          <Link href="/ilanlar" className="btn-primary" style={{ padding: "0.6rem 1.2rem", fontSize: "0.65rem", height: "auto" }}>
            <span className="hidden sm:inline">Tüm</span> İlanlar
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menü"
          >
            <span 
              className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span 
              className={`w-6 h-0.5 bg-ink transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span 
              className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-void z-50 md:hidden transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: "80px" }}
      >
        <div className="flex flex-col p-8 gap-8">
          {navCategories.map((cat) => (
            <Link 
              key={cat.href} 
              href={cat.href} 
              className="display-md text-3xl hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {cat.label}
            </Link>
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
