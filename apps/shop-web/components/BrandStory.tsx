import Image from "next/image";
import Reveal from "./Reveal";

export default function BrandStory() {
  return (
    <section
      id="story"
      className="grid grid-cols-1 items-center gap-0 bg-paper md:grid-cols-2"
    >
      <Reveal as="div" className="relative aspect-[4/5] md:aspect-auto md:h-[640px]">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop"
          alt="Athlet bei konzentriertem Training in der Morgendämmerung"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </Reveal>

      <Reveal>
        <div className="px-6 py-20 md:px-16 lg:px-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest2 text-mute">
            Unsere Philosophie
          </p>
          <h2 className="font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            DISZIPLIN
            <br />
            IST DIE
            <br />
            BASIS.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-mute md:text-base">
            FORMA entsteht für Menschen, die Leistung nicht dem Zufall
            überlassen. Jedes Teil wird entwickelt, um mit dir zu trainieren,
            zu arbeiten und zu leben — ohne Kompromisse bei Passform,
            Material oder Haltung.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mute md:text-base">
            Kein Trend. Ein Standard, an dem wir uns jeden Tag neu messen.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            <div>
              <p className="font-display text-3xl text-ink">12+</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest2 text-mute">
                Jahre Erfahrung
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-ink">40k</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest2 text-mute">
                Athleten weltweit
              </p>
            </div>
            <div>
              <p className="font-display text-3xl text-ink">100%</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest2 text-mute">
                Performance-Stoffe
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
