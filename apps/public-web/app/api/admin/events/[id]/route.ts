import { NextResponse } from "next/server";
import { getEvent } from "@/lib/events";

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await ctx.params;

        const event = getEvent(id);
        if (!event) {
            return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ ok: true, event }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { ok: false, message: err?.message || "Failed to load event" },
            { status: 500 }
        );
    }
}