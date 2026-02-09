"use client";

import { useEffect, useState } from "react";

export default function ClientEditor({ slug }: { slug: string }) {
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const res = await fetch(`/api/blog/${slug}/save`);
                if (!res.ok) throw new Error(await res.text());
                const data = await res.json();

                if (!cancelled) {
                    const raw = data.mdx ?? "";

                    const m = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
                    const fmText = m ? m[1] : "";
                    const body = m ? raw.slice(m[0].length) : raw;

                    // super simple "key: value" frontmatter parse
                    const fm: Record<string, string> = {};
                    for (const line of fmText.split("\n")) {
                        const idx = line.indexOf(":");
                        if (idx === -1) continue;
                        const key = line.slice(0, idx).trim();
                        let val = line.slice(idx + 1).trim();
                        val = val.replace(/^"(.*)"$/, "$1");
                        fm[key] = val;
                    }

                    setExcerpt(fm.excerpt ?? "");
                    setContent(body);
                }
            } catch (err) {
                console.error(err);
                if (!cancelled) alert("Load failed");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    async function save() {
        const esc = (s: string) => s.replaceAll("\\", "\\\\").replaceAll('"', '\\"');

        const frontmatter = `---
title: "${esc(slug)}"
excerpt: "${esc(excerpt)}"
date: "${new Date().toISOString().slice(0, 10)}"
image: "./cover.jpg"
---

`;

        const fullMdx = frontmatter + content;

        setSaving(true);
        try {
            const res = await fetch(`/api/blog/${slug}/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mdx: fullMdx }),
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
                {/* Excerpt */}
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Excerpt…"
                    className="w-full min-h-[96px] border rounded p-[12px]"
                />

                {/* Content */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[520px] font-mono border rounded p-[12px]"
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
                </div>
            </div>
        </div>
    );
}