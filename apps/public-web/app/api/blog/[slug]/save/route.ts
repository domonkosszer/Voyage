import { NextResponse } from "next/server";
import path from "path";
import { mkdir, readFile, writeFile, readdir } from "fs/promises";

function postDir(slug: string) {
    return path.join(process.cwd(), "public", "content", "posts", slug);
}

async function latestPostFile(slug: string) {
    const dir = postDir(slug);
    const files = (await readdir(dir))
        .filter((f) => f.endsWith(".mdx"))
        .sort()
        .reverse();

    if (!files.length) {
        throw new Error("No mdx file found");
    }

    return path.join(dir, files[0]);
}

type Ctx = {
    params: Promise<{ slug: string }>;
};

export async function GET(_: Request, ctx: Ctx) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    try {
        const mdx = await readFile(await latestPostFile(slug), "utf8");
        return NextResponse.json({ mdx });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}

export async function POST(req: Request, ctx: Ctx) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    const body = await req.json().catch(() => null);
    const mdx = String(body?.mdx ?? "");

    if (!mdx.trim()) {
        return new NextResponse("Empty content", { status: 400 });
    }

    const file = await latestPostFile(slug);
    await writeFile(file, mdx, "utf8");
    return NextResponse.json({ ok: true });
}