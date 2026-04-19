"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Models", href: "#models" },
  { label: "Features", href: "#features" },
  { label: "Compare", href: "#comparison" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#f3f3f3]/70 backdrop-blur-xl border-b border-[#e5e5e5]/50 py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="text-2xl font-heading font-black tracking-[0.2em] text-[#1c1b1b]"
          aria-label="NEXARA Motors — return to top"
        >
          NEXARA
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-5 py-2 text-sm font-bold text-[#474545] hover:text-[#1c1b1b] hover:bg-white/60 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#booking"
          className="hidden md:inline-flex items-center px-8 py-3.5 rounded-full bg-[#1c1b1b] text-white text-sm font-bold hover:bg-[#333] transition-all active:scale-[0.98]"
        >
          Book Test Drive
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-3 bg-white/50 backdrop-blur-md border border-white/40 shadow-sm text-[#1c1b1b] rounded-full active:scale-95 transition-transform"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={
            isMobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#f3f3f3]/95 backdrop-blur-xl border-b border-[#e5e5e5] ${
          isMobileOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-4 text-lg font-bold text-[#1c1b1b] hover:bg-white/50 rounded-2xl transition-all"
              onClick={closeMobile}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="mt-6 inline-flex items-center justify-center px-6 py-5 rounded-full bg-[#1c1b1b] text-white text-lg font-bold active:scale-95 transition-all"
            onClick={closeMobile}
          >
            Book Test Drive
          </a>
        </div>
      </div>
    </header>
  );
}
