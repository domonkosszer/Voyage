import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection, listCollections } from "@/lib/collections";

export function generateStaticParams() {
    return listCollections().map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({
                                                 params,
                                             }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const collection = getCollection(slug);
    if (!collection) return notFound();

    return (
        <main className="px-7 py-10">
            <h1 className="text-3xl font-semibold tracking-[0.2em]">
                {collection.title}
            </h1>

            <p className="mt-4 opacity-70">{collection.subtitle}</p>

            {/* IMAGE UNDER TITLE */}
            <div className="mt-8 relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
                <Image
                    src={collection.heroImage}
                    alt={collection.title}
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {collection.products.map((product) => (
                    <div key={product.id}>
                        <p className="font-medium">{product.name}</p>
                        <p className="opacity-60">CHF {product.priceCHF}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}