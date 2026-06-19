"use client";

import Image from "next/image";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 bg-volt px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-ink">
            Neu
          </span>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <Image
          src={product.imageHover}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Schneller Warenkorb-Hinweis, schiebt sich beim Hover hoch */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-paper px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest2 text-ink transition-transform duration-300 group-hover:translate-y-0">
          + In den Warenkorb
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-mute">
            {product.category}
          </p>
          <h3 className="mt-1 text-sm font-medium text-ink">
            {product.name}
          </h3>
        </div>
        <p className="text-sm font-semibold text-ink whitespace-nowrap">
          {product.price} CHF
        </p>
      </div>
    </article>
  );
}
