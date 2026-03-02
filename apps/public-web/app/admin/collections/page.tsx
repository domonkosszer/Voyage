import fs from "fs";
import path from "path";
import Link from "next/link";
import DeleteCollectionButton from "./DeleteCollectionButton";

export default async function CollectionsAdminPage() {
  const collectionsDir = path.join(process.cwd(), "public", "content", "collections");

  let files: string[] = [];

  try {
    files = fs.readdirSync(collectionsDir).filter((file) => file.endsWith(".json"));
  } catch {
    files = [];
  }

  const collections = files.map((file) => {
    const filePath = path.join(collectionsDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    return {
      slug: data.slug ?? file.replace(".json", ""),
      title: data.title ?? "Untitled",
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">Collections</h1>
        <Link
          href="/admin/collections/new"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
        >
          + New Collection
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {collections.length === 0 ? (
          <div className="p-8 text-slate-500">No collections found.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {collections.map((collection) => (
              <li
                key={collection.slug}
                className="p-6 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {collection.title}
                  </p>
                  <p className="text-sm text-slate-400">
                    {collection.slug}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={`/admin/collections/${collection.slug}/edit`}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Edit →
                  </Link>

                  <DeleteCollectionButton slug={collection.slug} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}