import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/collections";
import { SiteNav } from "@/components/shell/SiteNav";
import ProductCard from "@/components/commerce/ProductCard";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const collection = getCollection(slug);
    if (!collection) return notFound();

    return (
        <>
            <SiteNav />
            <main className="px-7 py-10 pt-24 overflow-y-auto">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.15em] md:tracking-[0.2em]">
                    {collection.title}
                </h1>

                {collection.subtitle && (
                    <p className="mt-4 opacity-70">{collection.subtitle}</p>
                )}

                {/* IMAGE UNDER TITLE */}
                <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
                    {collection.heroImage ? (
                        <Image
                            src={collection.heroImage}
                            alt={collection.title}
                            fill
                            priority
                            unoptimized
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <span className="text-[13px] font-semibold tracking-[0.35em] uppercase opacity-30">
                                Voyage
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {collection.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* EDITORIAL SECTION */}
                {collection.editorial && collection.editorial.headline && (
                    <section className="mt-16 space-y-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-semibold">
                                {collection.editorial.headline}
                            </h2>
                            {collection.editorial.copy && (
                                <p className="mt-4 opacity-70 max-w-2xl">
                                    {collection.editorial.copy}
                                </p>
                            )}
                        </div>

                        {(collection.editorial.imageA || collection.editorial.imageB) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {collection.editorial.imageA && (
                                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
                                        <Image
                                            src={collection.editorial.imageA}
                                            alt={collection.editorial.headline}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {collection.editorial.imageB && (
                                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
                                        <Image
                                            src={collection.editorial.imageB}
                                            alt={collection.editorial.headline}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}
