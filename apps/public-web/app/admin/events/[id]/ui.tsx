"use client";

import { useEffect, useState } from "react";

type EventStatus = "draft" | "published";
type EventMeta = {
    id: string;
    title: string;
    startAt: string;
    endAt?: string;
    location?: string;
    status: EventStatus;
    excerpt?: string;
    coverImage?: string;
};

function isoToDatetimeLocal(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
    )}:${pad(d.getMinutes())}`;
}

export default function EditEventClient({ id }: { id: string }) {
    const [event, setEvent] = useState<EventMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            setMsg(null);

            const res = await fetch(`/api/admin/events/${id}`);
            const data = await res.json().catch(() => null);

            if (!mounted) return;

            if (!res.ok) {
                setEvent(null);
                setMsg(data?.message || "Failed to load");
                setLoading(false);
                return;
            }

            setEvent(data.event);
            setLoading(false);
        }

        if (id) load();
        return () => {
            mounted = false;
        };
    }, [id]);

    async function onSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMsg(null);

        const fd = new FormData(e.currentTarget);
        fd.set("id", id);

        const res = await fetch("/api/admin/events/update", {
            method: "POST",
            body: fd,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            setMsg(data?.message || "Save failed");
            return;
        }

        setMsg("Saved ✅");

        // reload
        const reload = await fetch(`/api/admin/events/${id}`);
        const reloadData = await reload.json().catch(() => null);
        if (reload.ok) setEvent(reloadData.event);
    }

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-2xl p-6">
                <h1 className="text-2xl font-semibold">Edit event</h1>
                <p className="mt-2 text-sm opacity-70">Loading…</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="mx-auto w-full max-w-2xl p-6">
                <h1 className="text-2xl font-semibold">Edit event</h1>
                <p className="mt-2 text-sm opacity-70">
                    Event not found: <span className="font-mono">{id}</span>
                </p>
                {msg ? <div className="mt-4 rounded-lg border p-3 text-sm">{msg}</div> : null}
                <a href="/admin/events" className="mt-6 inline-block text-sm underline opacity-80 hover:opacity-100">
                    Back to events
                </a>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Edit event</h1>
                <p className="mt-1 text-sm opacity-70">
                    ID: <span className="font-mono">{event.id}</span>
                </p>
            </div>

            <form onSubmit={onSave} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        required
                        defaultValue={event.title}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start</label>
                        <input
                            name="startAt"
                            type="datetime-local"
                            required
                            defaultValue={isoToDatetimeLocal(event.startAt)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">End (optional)</label>
                        <input
                            name="endAt"
                            type="datetime-local"
                            defaultValue={isoToDatetimeLocal(event.endAt)}
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Location (optional)</label>
                    <input
                        name="location"
                        defaultValue={event.location ?? ""}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt (optional)</label>
                    <textarea
                        name="excerpt"
                        rows={3}
                        defaultValue={event.excerpt ?? ""}
                        className="w-full rounded-lg border px-3 py-2"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select
                        name="status"
                        defaultValue={event.status}
                        className="w-full rounded-lg border px-3 py-2"
                    >
                        <option value="draft">draft</option>
                        <option value="published">published</option>
                    </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <a href="/admin/events" className="text-sm underline opacity-80 hover:opacity-100">
                        Back to events
                    </a>

                    <button
                        type="submit"
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                        Save
                    </button>
                </div>

                {msg ? <div className="rounded-lg border p-3 text-sm">{msg}</div> : null}
            </form>
        </div>
    );
}