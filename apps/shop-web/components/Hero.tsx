import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-end overflow-hidden bg-ink">
      <Image
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2400&auto=format&fit=crop"
        alt="Athletin in voller Bewegung während eines intensiven Trainings"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-90"
      />
      {/* Verlauf für bessere Lesbarkeit des Textes */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

      <div className="relative z-10 w-full px-6 pb-20 pt-40 md:px-10 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest2 text-paper/70">
            Kollektion 2026 — Jetzt verfügbar
          </p>
          <h1 className="font-display text-[15vw] leading-[0.9] text-paper sm:text-7xl md:text-8xl lg:text-9xl">
            BUILT FOR
            <br />
            PERFORMANCE
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
            Funktionale Sportwear für alle, die jeden Tag an ihre Grenzen
            gehen — entwickelt für Bewegung, gemacht für den Alltag.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 bg-paper px-8 py-4 text-xs font-semibold uppercase tracking-widest2 text-ink transition-colors hover:bg-volt"
            >
              Jetzt shoppen
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#story"
              className="text-xs font-medium uppercase tracking-widest2 text-paper/80 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
            >
              Unsere Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
