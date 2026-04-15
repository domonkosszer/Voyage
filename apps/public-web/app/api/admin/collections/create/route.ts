import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function sanitizeFileName(fileName: string) {
    return fileName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9._-]/g, "");
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const slug = String(formData.get("slug") ?? "")
            .trim()
            .toLowerCase();
        const title = String(formData.get("title") ?? "").trim();
        const subtitle = String(formData.get("subtitle") ?? "").trim();
        const intro = String(formData.get("intro") ?? "").trim();
        const editorialHeadline = String(
            formData.get("editorialHeadline") ?? ""
        ).trim();
        const editorialCopy = String(
            formData.get("editorialCopy") ?? ""
        ).trim();
        const priceCHF = Number(formData.get("priceCHF") ?? 0) || 0;

        if (!slug || !title) {
            return NextResponse.json(
                { error: "Slug and title are required" },
                { status: 400 }
            );
        }

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

        const uploadDir = path.join(
            process.cwd(),
            "public",
            "uploads",
            "collections",
            slug
        );

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uploadedFiles = formData
            .getAll("images")
            .filter((value): value is File => value instanceof File && value.size > 0);

        const imagePaths: string[] = [];

        for (const file of uploadedFiles) {
            const ext = path.extname(file.name) || ".jpg";
            const baseName = path.basename(file.name, ext);
            const safeFileName = `${sanitizeFileName(baseName) || "image"}-${Date.now()}${ext.toLowerCase()}`;
            const outputPath = path.join(uploadDir, safeFileName);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            fs.writeFileSync(outputPath, buffer);
            imagePaths.push(`/uploads/collections/${slug}/${safeFileName}`);
        }

        const collectionData = {
            slug,
            title,
            subtitle,
            heroImage: imagePaths[0] ?? "",
            intro,
            images: imagePaths,
            products: [
                {
                    id: "p1",
                    slug: `${slug}-product`,
                    name: title,
                    priceCHF,
                    image1: imagePaths[0] ?? "",
                    image2: imagePaths[1] ?? "",
                    badge: ""
                }
            ],
            editorial: {
                headline: editorialHeadline,
                copy: editorialCopy,
                imageA: "",
                imageB: ""
            }
        };

        fs.writeFileSync(filePath, JSON.stringify(collectionData, null, 2));

        return NextResponse.json({ success: true, images: imagePaths });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to create collection" },
            { status: 500 }
        );
    }
}
