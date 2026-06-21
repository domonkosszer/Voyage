import Link from "next/link";

export default function AdminPage() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

    const sections = [
        {
            eyebrow: "Content",
            title: "Posts",
            copy: "Write, review and edit Voyage blog posts.",
            newHref: "/admin/posts/new",
            newLabel: "+ New post",
            manageHref: "/admin/posts",
        },
        {
            eyebrow: "Content",
            title: "Events",
            copy: "Schedule and publish club events.",
            newHref: "/admin/events/new",
            newLabel: "+ New event",
            manageHref: "/admin/events",
        },
        {
            eyebrow: "Commerce",
            title: "Collections",
            copy: "Manage product drops and collections.",
            newHref: "/admin/collections/new",
            newLabel: "+ New collection",
            manageHref: "/admin/collections",
        },
    ];

    return (
        <div className="mx-auto w-full max-w-5xl">
            {/* Header */}
            <header className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Dashboard
                </p>
                <h1 className="mt-2 text-5xl font-black tracking-tight md:text-6xl">
                    VOYAGE <span className="text-slate-300">OFFICE</span>
                </h1>
                <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                        Connected · {backend}
                    </p>
                </div>
            </header>

            {/* Action cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {sections.map((s) => (
                    <div
                        key={s.title}
                        className="flex min-h-[210px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                {s.eyebrow}
                            </h3>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                {s.title}
                            </h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500">
                                {s.copy}
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href={s.newHref}
                                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                {s.newLabel}
                            </Link>
                            <Link
                                href={s.manageHref}
                                className="inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                            >
                                Manage {s.title.toLowerCase()} →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Infrastructure strip */}
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="flex min-h-[140px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                            Infrastructure
                        </h3>
                        <h2 className="mt-1 text-xl font-bold text-slate-900">
                            SQL Database
                        </h2>
                    </div>
                    <a
                        href={`${backend}/h2-console`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
                    >
                        Open console ↗
                    </a>
                </div>

                <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm md:col-span-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                        Overview
                    </h3>
                    <p className="mt-3 max-w-md text-lg font-medium leading-snug italic">
                        “Do it better than average. It’s me vs. me.”
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Voyage — for the few.
                    </p>
                </div>
            </div>
        </div>
    );
}
