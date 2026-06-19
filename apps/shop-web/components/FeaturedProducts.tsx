import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function FeaturedProducts() {
  return (
    <section id="products" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-mute">
                Ausgewählt
              </p>
              <h2 className="font-display text-4xl text-ink md:text-5xl">
                BESTSELLER
              </h2>
            </div>
            <a
              href="#"
              className="text-xs font-medium uppercase tracking-widest2 text-ink underline underline-offset-4 hover:text-mute"
            >
              Alle Produkte ansehen
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
