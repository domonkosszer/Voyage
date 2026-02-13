import { NextResponse } from "next/server";
import { updateEvent } from "@/lib/events";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const id = String(formData.get("id") || "").trim();
        const title = String(formData.get("title") || "").trim();
        const startAtRaw = String(formData.get("startAt") || "").trim();
        const endAtRaw = String(formData.get("endAt") || "").trim();
        const location = String(formData.get("location") || "").trim();
        const excerpt = String(formData.get("excerpt") || "").trim();
        const status = String(formData.get("status") || "draft").trim();

        if (!id || !title || !startAtRaw) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const startAt = new Date(startAtRaw).toISOString();
        const endAt = endAtRaw ? new Date(endAtRaw).toISOString() : undefined;

        updateEvent(id, {
            title,
            startAt,
            endAt,
            location: location || undefined,
            excerpt: excerpt || undefined,
            status: status === "published" ? "published" : "draft",
        });

        return NextResponse.json({ ok: true, message: "Saved", id }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, message: err?.message || "Failed to update event" },
            { status: 500 }
        );
    }
}