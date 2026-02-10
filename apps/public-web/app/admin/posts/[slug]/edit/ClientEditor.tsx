"use client";

import { useEffect, useState } from "react";

export default function ClientEditor({ slug }: { slug: string }) {
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            const res = await fetch(`/api/blog/${slug}/save`);
            if (!cancelled && res.ok) {
                const data = await res.json();
                setBody(data.body ?? "");
            }
            if (!cancelled) setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    async function save() {
        setSaving(true);
        try {
            const res = await fetch(`/api/blog/${slug}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body }),
            });

            if (!res.ok) {
                alert(await res.text());
                return;
            }

            alert("Gespeichert ✅");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div>Lade...</div>;

    return (
        <div className="max-w-[980px]">
            <h1 className="text-xl font-semibold mb-[16px]">Post bearbeiten: {slug}</h1>

            <div className="grid gap-[12px]">
        <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full min-h-[520px] font-mono border rounded p-[12px]"
            spellCheck={false}
        />

                <div className="flex gap-[12px]">
                    <button onClick={save} disabled={saving} className="px-[16px] py-[8px] rounded border">
                        {saving ? "Speichere..." : "Speichern"}
                    </button>

                    <a href={`/blog/${slug}`} target="_blank" rel="noreferrer" className="px-[16px] py-[8px] rounded border">
                        Preview öffnen
                    </a>
                </div>
            </div>
        </div>
    );
}