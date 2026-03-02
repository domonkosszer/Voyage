"use client";

export default function DeleteCollectionButton({ slug }: { slug: string }) {
    async function handleDelete() {
        const confirmed = window.confirm("Delete this collection?");
        if (!confirmed) return;

        await fetch(`/api/admin/collections/${slug}`, {
            method: "DELETE",
        });

        window.location.reload();
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-500 font-bold hover:underline"
        >
            Delete
        </button>
    );
}