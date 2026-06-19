"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Men", href: "#categories" },
  { label: "Women", href: "#categories" },
  { label: "Performance", href: "#categories" },
  { label: "Lifestyle", href: "#categories" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-paper/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className={`font-display text-xl tracking-widest2 transition-colors ${
            isScrolled ? "text-ink" : "text-paper"
          }`}
        >
          FORMA.
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs font-medium uppercase tracking-widest2 transition-colors hover:opacity-60 ${
                isScrolled ? "text-ink" : "text-paper"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="#newsletter"
            className={`hidden text-xs font-medium uppercase tracking-widest2 transition-colors hover:opacity-60 sm:block ${
              isScrolled ? "text-ink" : "text-paper"
            }`}
          >
            Konto
          </a>
          <button
            aria-label="Warenkorb öffnen"
            className={`text-xs font-medium uppercase tracking-widest2 transition-colors hover:opacity-60 ${
              isScrolled ? "text-ink" : "text-paper"
            }`}
          >
            Bag (0)
          </button>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menü öffnen"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span
              className={`block h-px w-6 transition-all ${
                isScrolled ? "bg-ink" : "bg-paper"
              } ${isMenuOpen ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-6 transition-all ${
                isScrolled ? "bg-ink" : "bg-paper"
              } ${isMenuOpen ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden bg-paper transition-[max-height] duration-300 ${
          isMenuOpen ? "max-h-80 border-b border-line" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 text-sm font-medium uppercase tracking-widest2 text-ink border-b border-line last:border-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
