"use client";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Shop", href: "#collection" },
  { label: "L'Olympionique", href: "#signature" },
  { label: "About", href: "#about" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div className="announce">
        <b>Drop 01</b> &nbsp;<span>·</span>&nbsp; for the few. &nbsp;
        <span>·</span>&nbsp; Worldwide shipping
      </div>
      <header className={`site ${solid ? "solid" : "transparent"}`}>
        <div className="wrap bar">
          <a href="#" className="brandmark" aria-label="Voyage home">
            VOYAGE
          </a>
          <nav className="main">
            {NAV.map((n) => (
              <a key={n.label} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="actions">
            <a href="#about" className="acct">
              Account
            </a>
            <a href="#" aria-label="Cart">
              Bag&nbsp;(0)
            </a>
            <button
              className="burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.label} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <a href="#" onClick={() => setOpen(false)}>
          Bag (0)
        </a>
      </div>
    </>
  );
}
