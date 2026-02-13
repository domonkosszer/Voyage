"use client";

import { useState } from "react";

export default function NewEventPage() {
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMsg(null);
        setLoading(true);

        const form = e.currentTarget;
        const fd = new FormData(form);

        const res = await fetch("/api/admin/events/create", {
            method: "POST",
            body: fd,
        });

        const data = await res.json().catch(() => null);

        setLoading(false);

        if (!res.ok) {
            setMsg(data?.message || "Failed");
            return;
        }

        setMsg(`Created: ${data?.id || ""}`);
        form.reset();
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">
            <h1 className="text-2xl font-semibold">New event</h1>
            <p className="mt-2 text-sm opacity-70">
                Create a new event (starts as a draft).
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        required
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Winter Run 2026"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">ID (slug)</label>
                    <input
                        name="id"
                        required
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="winter-run-2026"
                        pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start</label>
                        <input
                            name="startAt"
                            type="datetime-local"
                            required
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">End (optional)</label>
                        <input
                            name="endAt"
                            type="datetime-local"
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Location (optional)</label>
                    <input
                        name="location"
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Voyage Track"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt (optional)</label>
                    <textarea
                        name="excerpt"
                        rows={3}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Short description for cards..."
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <a
                        href="/admin/events"
                        className="text-sm underline opacity-80 hover:opacity-100"
                    >
                        Back to events
                    </a>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create event"}
                    </button>
                </div>

                {msg ? (
                    <div className="rounded-lg border p-3 text-sm">
                        {msg}
                    </div>
                ) : null}
            </form>
        </div>
    );
}