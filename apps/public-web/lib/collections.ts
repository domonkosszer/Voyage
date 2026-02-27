import fs from "fs";
import path from "path";

export type Product = {
    id: string;
    slug: string;
    name: string;
    priceCHF: number;
    image1: string;
    image2?: string;
    badge?: string;
};

export type Collection = {
    slug: string;
    title: string;
    subtitle: string;
    heroImage: string;
    intro: string;
    products: Product[];
    editorial?: {
        headline: string;
        copy: string;
        imageA: string;
        imageB: string;
    };
};

const collectionsDir = path.join(
    process.cwd(),
    "public",
    "content",
    "collections"
);

export function listCollections(): Collection[] {
    if (!fs.existsSync(collectionsDir)) return [];

    const files = fs
        .readdirSync(collectionsDir)
        .filter((file) => file.endsWith(".json"));

    return files.map((file) => {
        const raw = fs.readFileSync(
            path.join(collectionsDir, file),
            "utf8"
        );
        return JSON.parse(raw) as Collection;
    });
}

export function getCollection(slug: string): Collection | null {
    const filePath = path.join(collectionsDir, `${slug}.json`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as Collection;
}