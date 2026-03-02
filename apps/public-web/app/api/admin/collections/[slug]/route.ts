import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getCollectionPath(slug: string) {
  return path.join(
    process.cwd(),
    "public",
    "content",
    "collections",
    `${slug}.json`
  );
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const filePath = getCollectionPath(slug);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load collection" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await req.json();

      if (!body.slug || !body.title) {
          return NextResponse.json(
              { error: "Slug and title are required" },
              { status: 400 }
          );
      }

      const { slug } = await context.params;
    const filePath = getCollectionPath(slug);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update collection" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    _req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;
        const filePath = getCollectionPath(slug);

        const mediaDir = path.join(
            process.cwd(),
            "public",
            "media",
            "collections",
            slug
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        fs.unlinkSync(filePath);

        if (fs.existsSync(mediaDir)) {
            fs.rmSync(mediaDir, { recursive: true, force: true });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to delete collection" },
            { status: 500 }
        );
    }
}
