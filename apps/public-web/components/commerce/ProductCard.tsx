"use client";

import { useState } from "react";
import Image from "next/image";

type Product = {
    id: string;
    name: string;
    priceCHF: number;
    image1?: string;
    image2?: string;
    badge?: string;
};

export default function ProductCard({ product }: { product: Product }) {
    const [active, setActive] = useState(false);

    return (
        <div className="space-y-4">

            {/* PRODUCT IMAGES */}
            <div
                onClick={() => setActive(!active)}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5 group cursor-pointer select-none"
            >
                {product.image1 && (
                    <Image
                        src={product.image1}
                        alt={product.name}
                        fill
                        unoptimized
                        draggable={false}
                        className={`
              object-cover transition-all duration-700 ease-in-out
              ${active ? "opacity-0 scale-105" : "opacity-100"}
              md:group-hover:opacity-0 md:group-hover:scale-105
            `}
                    />
                )}

                {product.image2 && (
                    <Image
                        src={product.image2}
                        alt={product.name}
                        fill
                        unoptimized
                        draggable={false}
                        className={`
              absolute inset-0 object-cover transition-all duration-700 ease-in-out
              ${active ? "opacity-100 scale-[1.02]" : "opacity-0"}
              md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-[1.02]
            `}
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Mobile Badge */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center md:hidden">
                    <p className="text-xs tracking-[0.4em] uppercase bg-white/90 text-black px-4 py-2 rounded-full">
                        Tap to Discover
                    </p>
                </div>

                {/* Desktop Badge */}
                <div className="absolute bottom-6 left-6 hidden md:block text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <p className="text-sm tracking-[0.3em] uppercase">
                        {product.badge || "Voyage"}
                    </p>
                </div>
            </div>

            {/* PRODUCT INFO */}
            <div>
                <p className="font-medium">{product.name}</p>
                <p className="opacity-60">CHF {product.priceCHF}</p>
            </div>
        </div>
    );
}