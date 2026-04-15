"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientEditor({ slug }: { slug: string }) {
    const router = useRouter();

    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

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

    async function deletePost() {
        const confirmed = window.confirm(
            `Delete "${slug}"? This cannot be undone.`
        );

        if (!confirmed) return;

        setDeleting(true);

        try {
            const res = await fetch(`/api/admin/posts/${slug}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to delete post");
                return;
            }

            alert("Post deleted");
            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setDeleting(false);
        }
    }

    if (loading) return <div>Lade...</div>;

    return (
        <div className="max-w-[980px]">
            <h1 className="text-xl font-semibold mb-[16px]">
                Post bearbeiten: {slug}
            </h1>

            <div className="grid gap-[12px]">
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full min-h-[520px] font-mono border rounded p-[12px]"
                    spellCheck={false}
                />

                <div className="flex gap-[12px]">
                    <button
                        onClick={save}
                        disabled={saving}
                        className="px-[16px] py-[8px] rounded border"
                    >
                        {saving ? "Speichere..." : "Speichern"}
                    </button>

                    <a
                        href={`/blog/${slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-[16px] py-[8px] rounded border"
                    >
                        Preview öffnen
                    </a>

                    <button
                        onClick={deletePost}
                        disabled={deleting}
                        className="px-[16px] py-[8px] rounded border border-red-600 text-red-600"
                    >
                        {deleting ? "Lösche..." : "Delete Post"}
                    </button>
                </div>
            </div>
        </div>
    );
}