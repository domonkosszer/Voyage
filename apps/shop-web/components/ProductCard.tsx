import type { Product } from "@/lib/data";
import BuyButton from "./BuyButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <div className="frame">
        {product.tag && <span className="tag">{product.tag}</span>}
        <img className="a" src={product.image} alt={`${product.name}, back`} />
        <img
          className="b"
          src={product.imageHover}
          alt={`${product.name}, front`}
        />
        <BuyButton id={product.id} />
      </div>
      <div className="meta">
        <div>
          <p className="cat">{product.line}</p>
          <p className="name">{product.name}</p>
        </div>
        <p className="price">CHF {product.price}</p>
      </div>
      <div className="swatches">
        {product.swatches.map((s) => (
          <i key={s} className={`sw-${s}`} title={s} />
        ))}
      </div>
    </div>
  );
}
