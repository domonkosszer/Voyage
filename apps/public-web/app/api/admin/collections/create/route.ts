import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
    try {

        const body = await req.json();
        console.log(body);
        const {
            slug,
            title,
            subtitle,
            intro,
            heroImage,
            editorialHeadline,
            editorialCopy,
            priceCHF
        } = body;

        if (!slug || !title) {
            return NextResponse.json(
                { error: "Slug and title are required" },
                { status: 400 }
            );
        }

        const collectionData = {
            slug,
            title,
            subtitle: subtitle ?? "",
            heroImage: heroImage ?? "",
            intro: intro ?? "",
            products: [
                {
                    id: "p1",
                    slug: `${slug}-product`,
                    name: title,
                    priceCHF: Number(priceCHF) || 0,
                    image1: "",
                    image2: "",
                    badge: ""
                }
            ],
            editorial: {
                headline: "",
                copy: "",
                imageA: "",
                imageB: ""
            }
        };

        const dir = path.join(
          process.cwd(),
          "public",
          "content",
          "collections"
        );

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, `${slug}.json`);

        if (fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "Collection already exists" },
                { status: 400 }
            );
        }

        fs.writeFileSync(filePath, JSON.stringify(collectionData, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create collection" },
            { status: 500 }
        );
    }
}
