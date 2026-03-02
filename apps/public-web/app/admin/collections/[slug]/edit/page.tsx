"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCollectionPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [form, setForm] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const res = await fetch(`/api/admin/collections/${slug}`);
            if (!res.ok) return;
            const data = await res.json();
            setForm(data);
        }
        if (slug) load();
    }, [slug]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("slug", slug);
        formData.append("type", "hero");

        const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setForm({ ...form, heroImage: data.url });
        } else {
            alert(data.error || "Upload failed");
        }
    }

    async function handleEditorialUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        field: "imageA" | "imageB"
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("slug", slug);
        formData.append(
            "type",
            field === "imageA" ? "editorial-a" : "editorial-b"
        );

        const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setForm({
                ...form,
                editorial: {
                    ...form.editorial,
                    [field]: data.url,
                },
            });
        } else {
            alert(data.error || "Upload failed");
        }
    }

    async function handleProductUpload(
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        field: "image1" | "image2"
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("slug", slug);
        const slot = field === "image1" ? 1 : 2;
        formData.append("type", `product-${index + 1}-${slot}`);

        const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            const updatedProducts = [...form.products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [field]: data.url,
            };

            setForm({ ...form, products: updatedProducts });
        } else {
            alert(data.error || "Upload failed");
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch(`/api/admin/collections/${slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) router.push("/admin/collections");
        else alert("Failed to update collection");
    }

    if (!form) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl space-y-10">
            <h1 className="text-4xl font-black tracking-tight">
                Edit Collection: {slug}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                    />

                    <input
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                    />

                    <textarea
                        name="intro"
                        value={form.intro}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full min-h-[120px]"
                    />
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                    <input
                        name="heroImage"
                        value={form.heroImage}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroUpload}
                        className="border p-3 rounded-lg w-full"
                    />
                    {form.heroImage && (
                        <img
                            src={form.heroImage}
                            alt="Hero preview"
                            className="w-full rounded-xl mt-4"
                        />
                    )}
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                    <h2 className="text-xl font-bold">Editorial Images</h2>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEditorialUpload(e, "imageA")}
                        className="border p-3 rounded-lg w-full"
                    />

                    {form.editorial?.imageA && (
                        <img
                            src={form.editorial.imageA}
                            className="w-full rounded-xl"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEditorialUpload(e, "imageB")}
                        className="border p-3 rounded-lg w-full"
                    />

                    {form.editorial?.imageB && (
                        <img
                            src={form.editorial.imageB}
                            className="w-full rounded-xl"
                        />
                    )}
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-8">
                    <h2 className="text-xl font-bold">Product Images</h2>

                    {form.products?.map((product: any, index: number) => (
                        <div key={index} className="space-y-4 border p-6 rounded-xl">
                            <p className="font-semibold">{product.name}</p>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProductUpload(e, index, "image1")}
                                className="border p-3 rounded-lg w-full"
                            />

                            {product.image1 && (
                                <img
                                    src={product.image1}
                                    className="w-full h-96 object-contain rounded-xl bg-white"
                                />
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProductUpload(e, index, "image2")}
                                className="border p-3 rounded-lg w-full"
                            />

                            {product.image2 && (
                                <img
                                    src={product.image2}
                                    className="w-full h-96 object-contain rounded-xl bg-white"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}