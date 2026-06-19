import Reveal from "./Reveal";
import { testimonials } from "@/lib/data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} von 5 Sternen`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-ink" : "fill-line"
          }`}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-mute">
            Was Athleten sagen
          </p>
          <h2 className="mb-14 font-display text-4xl text-ink md:text-5xl">
            VERTRAUEN, DAS
            <br />
            MAN TRÄGT
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 100}>
              <figure className="flex h-full flex-col justify-between border border-line bg-white p-8 transition-colors hover:border-ink">
                <div>
                  <Stars rating={t.rating} />
                  <blockquote className="mt-5 text-sm leading-relaxed text-ink md:text-base">
                    &bdquo;{t.quote}&ldquo;
                  </blockquote>
                </div>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest2 text-mute">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
