import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                { error: "Missing post slug" },
                { status: 400 }
            );
        }

        const postDir = path.join(
            process.cwd(),
            "public",
            "content",
            "posts",
            slug
        );

        if (!fs.existsSync(postDir)) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        fs.rmSync(postDir, { recursive: true, force: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}