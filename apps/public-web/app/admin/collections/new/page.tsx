"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCollectionPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        slug: "",
        title: "",
        subtitle: "",
        intro: ""
    });

    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setImages(Array.from(e.target.files));
    }

    const previews = useMemo(() => {
        return images.map((file) => ({
            file,
            url: URL.createObjectURL(file)
        }));
    }, [images]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!form.slug || !form.title) {
            alert("Slug and Title are required");
            return;
        }

        const normalizedSlug = form.slug.trim().toLowerCase();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("slug", normalizedSlug);
            formData.append("title", form.title);
            formData.append("subtitle", form.subtitle);
            formData.append("intro", form.intro);

            images.forEach((image) => {
                formData.append("images", image);
            });

            const res = await fetch("/api/admin/collections/create", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                router.push(`/admin/collections/${normalizedSlug}/edit`);
            } else {
                alert(data.error || "Failed to create collection");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl space-y-10">
            <h1 className="text-4xl font-black tracking-tight">
                New Collection
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
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

                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                    <h2 className="text-xl font-bold">Collection Pictures</h2>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="border p-3 rounded-lg w-full"
                    />

                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {previews.map((preview, index) => (
                                <div
                                    key={`${preview.file.name}-${index}`}
                                    className="border rounded-xl overflow-hidden"
                                >
                                    <img
                                        src={preview.url}
                                        alt={preview.file.name}
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Collection"}
                </button>
            </form>
        </div>
    );
}