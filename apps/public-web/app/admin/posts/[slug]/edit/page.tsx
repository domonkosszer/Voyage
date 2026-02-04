"use client";

import { useEffect, useState } from "react";

type PageProps = {
    params: {
        slug: string;
    };
};

export default function EditPostPage({ params }: PageProps) {
    const { slug } = params;

    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const res = await fetch(`/api/blog/${slug}/save`);
            if (!cancelled && res.ok) {
                const data = await res.json();
                setContent(data.mdx ?? "");
            }
            if (!cancelled) setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    async function save() {
        setSaving(true);

        const res = await fetch(`/api/blog/${slug}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mdx: content }),
        });

        setSaving(false);

        if (!res.ok) {
            alert(await res.text());
            return;
        }

        alert("Gespeichert ✅");
    }

    if (loading) return <div>Lade...</div>;

    return (
        <div className="max-w-[980px]">
            <h1 className="text-xl font-semibold mb-4">
                Post bearbeiten: {slug}
            </h1>

            <div className="grid gap-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[520px] font-mono border rounded p-3"
                />

                <div className="flex gap-3">
                    <button
                        onClick={save}
                        disabled={saving}
                        className="px-4 py-2 rounded border"
                    >
                        {saving ? "Speichere..." : "Speichern"}
                    </button>

                    <a
                        href={`/blog/${slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded border"
                    >
                        Preview öffnen
                    </a>
                </div>
            </div>
        </div>
    );
}