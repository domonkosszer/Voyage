export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as path from "path";
import { readFile, writeFile, readdir } from "fs/promises";
import matter from "gray-matter";

function postDir(slug: string) {
    return path.join(process.cwd(), "public", "content", "posts", slug);
}

async function latestPostFile(slug: string) {
    const dir = postDir(slug);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx")).sort().reverse();
    if (!files.length) throw new Error("No mdx file found");
    return path.join(dir, files[0]);
}

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_: Request, ctx: Ctx) {
    const { slug } = await ctx.params;

    try {
        const mdx = await readFile(await latestPostFile(slug), "utf8");
        return NextResponse.json({ mdx });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}

export async function POST(req: Request, ctx: Ctx) {
    const { slug } = await ctx.params;

    const body = await req.json().catch(() => null);
    const incomingMdx = String(body?.mdx ?? "");
    if (!incomingMdx.trim()) return new NextResponse("Empty content", { status: 400 });

    const file = await latestPostFile(slug);

    // Read existing file so we can preserve metadata
    const existingMdx = await readFile(file, "utf8");

    const existing = matter(existingMdx);
    const incoming = matter(incomingMdx);

    const mergedData: Record<string, any> = {
        ...existing.data,
        ...incoming.data,
    };

    // Preserve excerpt if incoming dropped it OR made it empty
    if (incoming.data?.excerpt === undefined || String(incoming.data.excerpt ?? "").trim() === "") {
        mergedData.excerpt = existing.data?.excerpt;
    }

    // Preserve other common fields if missing
    if (incoming.data?.image === undefined) mergedData.image = existing.data?.image;
    if (incoming.data?.title === undefined) mergedData.title = existing.data?.title;
    if (incoming.data?.date === undefined) mergedData.date = existing.data?.date;

    const mergedMdx = matter.stringify(incoming.content, mergedData);

    await writeFile(file, mergedMdx, "utf8");
    return NextResponse.json({ ok: true });
}