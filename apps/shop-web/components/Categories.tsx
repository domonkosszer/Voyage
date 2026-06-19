import Image from "next/image";
import Reveal from "./Reveal";
import { categories } from "@/lib/data";

export default function Categories() {
  return (
    <section id="categories" className="bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-paper/60">
            Shop nach Kategorie
          </p>
          <h2 className="mb-14 font-display text-4xl text-paper md:text-5xl">
            FIND YOUR FIT
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 90}>
              <a
                href="#products"
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-display text-xl text-paper md:text-2xl">
                    {category.label}
                  </span>
                  <span className="text-paper transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
