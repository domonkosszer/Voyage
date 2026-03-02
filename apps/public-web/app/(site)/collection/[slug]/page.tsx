import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "@/lib/collections";
import { TopBar, BackLink } from "@/components/shell/TopBar";


export const dynamic = "force-dynamic";

export default async function CollectionPage({
                                                 params,
                                             }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const collection = getCollection(slug);
    if (!collection) return notFound();
    console.log("HERO IMAGE PATH:", collection.heroImage);

    return (
        <>
            <TopBar
                title=""
                left={<BackLink href="/" />}
            />
            <main className="px-7 py-10 pt-24 overflow-y-auto ">
            <h1 className=" text-2xl md:text-3xl font-semibold tracking-[0.15em]  md:tracking-[0.2em]">
                {collection.title}
            </h1>

            <p className="mt-4 opacity-70">{collection.subtitle}</p>

            {/* IMAGE UNDER TITLE */}
            <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
                <Image
                    src={`${collection.heroImage}?v=${Date.now()}`}
                    alt={collection.title}
                    fill
                    priority
                    unoptimized
                    className="object-cover"
                />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                {collection.products.map((product) => (
                    <div key={product.id} className="space-y-4">

                        {/* PRODUCT IMAGES */}
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5 group cursor-pointer">
                            {product.image1 && (
                                <Image
                                    src={product.image1}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                                />
                            )}

                            {product.image2 && (
                                <Image
                                    src={product.image2}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-102"
                                />
                            )}

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-700" />

                            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <p className="text-sm tracking-[0.3em] uppercase">{product.badge || "Voyage"}</p>
                            </div>
                        </div>

                        {/* PRODUCT INFO */}
                        <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="opacity-60">CHF {product.priceCHF}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDITORIAL SECTION */}
            {collection.editorial && (
                <section className="mt-16 space-y-8">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold">
                            {collection.editorial.headline}
                        </h2>
                        <p className="mt-4 opacity-70 max-w-2xl">
                            {collection.editorial.copy}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
                            <Image
                                src={collection.editorial.imageA}
                                alt={collection.editorial.headline}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>

                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
                            <Image
                                src={collection.editorial.imageB}
                                alt={collection.editorial.headline}
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}
        </main>
        </>
    );
}