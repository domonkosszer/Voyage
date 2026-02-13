import { NextResponse } from "next/server";
import { createEvent } from "@/lib/events";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const id = String(formData.get("id") || "").trim();
        const title = String(formData.get("title") || "").trim();
        const startAtRaw = String(formData.get("startAt") || "").trim();
        const endAtRaw = String(formData.get("endAt") || "").trim();
        const location = String(formData.get("location") || "").trim();
        const excerpt = String(formData.get("excerpt") || "").trim();

        if (!id || !title || !startAtRaw) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const startAt = new Date(startAtRaw).toISOString();
        const endAt = endAtRaw ? new Date(endAtRaw).toISOString() : undefined;

        try {
            createEvent({
                id,
                title,
                startAt,
                endAt,
                location: location || undefined,
                excerpt: excerpt || undefined,
                status: "draft",
            });
        } catch (e: any) {
            // If it already exists, treat as success
            if (!String(e?.message || "").includes("already exists")) throw e;
        }

        // Return plain "Created" (no redirect)
        return NextResponse.json({ ok: true, message: "Created", id }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, message: err?.message || "Failed to create event" },
            { status: 500 }
        );
    }
}