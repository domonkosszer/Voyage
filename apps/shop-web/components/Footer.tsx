import Link from "next/link";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Strava", href: "https://strava.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const SHOP_LINKS = ["Men", "Women", "Performance", "Lifestyle", "Sale"];
const HELP_LINKS = ["Versand", "Rückgabe", "Größentabelle", "Kontakt"];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pt-20 text-paper md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 border-b border-paper/15 pb-16 md:grid-cols-5">
        <div className="col-span-2">
          <p className="font-display text-2xl tracking-widest2">FORMA.</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Premium Sportswear für Athleten, die Leistung zum Lifestyle
            machen.
          </p>
          <div className="mt-6 flex gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest2 text-paper/70 hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-paper/40">
            Shop
          </p>
          <ul className="flex flex-col gap-3">
            {SHOP_LINKS.map((item) => (
              <li key={item}>
                <a
                  href="#categories"
                  className="text-sm text-paper/80 hover:text-paper"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-paper/40">
            Hilfe
          </p>
          <ul className="flex flex-col gap-3">
            {HELP_LINKS.map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-paper/80 hover:text-paper">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest2 text-paper/40">
            Unternehmen
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/impressum"
                className="text-sm text-paper/80 hover:text-paper"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                href="/datenschutz"
                className="text-sm text-paper/80 hover:text-paper"
              >
                Datenschutz
              </Link>
            </li>
            <li>
              <a href="#" className="text-sm text-paper/80 hover:text-paper">
                AGB
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-6 text-xs text-paper/40 md:flex-row">
        <p>© {new Date().getFullYear()} FORMA. Alle Rechte vorbehalten.</p>
        <p>Designed for performance.</p>
      </div>
    </footer>
  );
}
