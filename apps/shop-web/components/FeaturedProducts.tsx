import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function FeaturedProducts() {
  return (
    <section className="sec" id="collection">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2>Drop 01</h2>
            </div>
            <a href="#" className="link">
              View all
            </a>
          </div>
        </Reveal>
        <div className="grid">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
