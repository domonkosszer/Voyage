import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string | null;
    const type = formData.get("type") as string | null;

      console.log("UPLOAD HIT");
      console.log("Slug:", slug);

    if (!file || !slug || !type) {
      return NextResponse.json(
        { error: "File and slug are required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "media",
      "collections",
      slug
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let filename: string;
    let finalDir = uploadDir;

    if (type === "hero") {
      filename = "hero-${Date.now()}.webp";
    } else if (type === "editorial-a") {
      filename = "editorial-a.webp";
    } else if (type === "editorial-b") {
      filename = "editorial-b.webp";
    } else if (type.startsWith("product-")) {
      const productsDir = path.join(uploadDir, "products");
      if (!fs.existsSync(productsDir)) {
        fs.mkdirSync(productsDir, { recursive: true });
      }
      finalDir = productsDir;
      filename = `${type}.webp`;
    } else {
      return NextResponse.json(
        { error: "Invalid upload type" },
        { status: 400 }
      );
    }

    const filePath = path.join(finalDir, filename);

      console.log("Upload Dir:", uploadDir)
      console.log("File Path:", filePath)

    await sharp(buffer)
      .resize({
        width: 1920,
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(filePath);

    const publicUrl = type.startsWith("product-")
      ? `/media/collections/${slug}/products/${filename}`
      : `/media/collections/${slug}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}