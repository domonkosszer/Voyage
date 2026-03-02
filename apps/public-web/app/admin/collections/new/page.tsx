"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCollectionPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        slug: "",
        title: "",
        subtitle: "",
        intro: ""
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.slug || !form.title) {
            alert("Slug and Title are required");
            return;
        }

        const normalizedSlug = form.slug.trim().toLowerCase();

        const res = await fetch("/api/admin/collections/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                slug: normalizedSlug
            }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push(`/admin/collections/${normalizedSlug}/edit`);
        } else {
            alert(data.error || "Failed to create collection");
        }
    }

    return (
        <div className="max-w-4xl space-y-10">
            <h1 className="text-4xl font-black tracking-tight">
                New Collection
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                    <h2 className="text-xl font-bold">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            name="slug"
                            placeholder="slug (e.g. drop-02)"
                            value={form.slug}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />

                        <input
                            name="title"
                            placeholder="Collection Title"
                            value={form.title}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                            required
                        />
                    </div>

                    <input
                        name="subtitle"
                        placeholder="Subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                    />

                    <textarea
                        name="intro"
                        placeholder="Intro text"
                        value={form.intro}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full min-h-[120px]"
                    />
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
                >
                    Create Collection
                </button>
            </form>
        </div>
    );
}