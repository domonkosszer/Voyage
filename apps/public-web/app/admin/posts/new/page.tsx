"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const fd = new FormData(form);

        // ✅ use the API route (must live under app/api/blog/create/route.ts)
        const res = await fetch("/api/blog/create", {
            method: "POST",
            body: fd,
        });

        setLoading(false);

        if (!res.ok) {
            const msg = await res.text();
            alert(msg || "Fehler beim Erstellen");
            return;
        }

        const data = (await res.json()) as { slug: string };

        // ✅ match your existing route: app/(site)/blog/[slug]/edit/page.tsx
        router.push(`/admin/posts/${data.slug}/edit`);
    }

    return (
        <div style={{ maxWidth: 760 }}>
            <h1>Neuen Blogpost erstellen</h1>

            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                <label>
                    Titel
                    <input name="title" required style={{ width: "100%" }} />
                </label>

                <label>
                    Datum
                    <input
                        name="date"
                        type="date"
                        required
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        style={{ width: "100%" }}
                    />
                </label>

                <label>
                    Untertitel
                    <input name="subtitle" required style={{ width: "100%" }} />
                </label>

                <label>
                    Cover Bild
                    <input name="cover" type="file" accept="image/*" />
                </label>

                <button disabled={loading} type="submit">
                    {loading ? "Erstelle..." : "Erstellen & Text schreiben"}
                </button>
            </form>
        </div>
    );
}