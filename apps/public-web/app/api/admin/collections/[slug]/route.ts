import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getCollectionPath(slug: string) {
  return path.join(
    process.cwd(),
    "apps",
    "public-web",
    "public",
    "content",
    "collections",
    `${slug}.json`
  );
}

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const filePath = getCollectionPath(params.slug);

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
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const filePath = getCollectionPath(params.slug);

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