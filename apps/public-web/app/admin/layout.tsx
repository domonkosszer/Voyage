import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";

async function cookieHeader() {
    const h = await headers();
    return h.get("cookie") ?? "";
}

const BACKEND = process.env.BACKEND_URL;
const DEV_BYPASS =
    process.env.NODE_ENV !== "production" &&
    process.env.ADMIN_DEV_BYPASS === "true";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // No backend configured -------------------------------------------------
    if (!BACKEND) {
        if (DEV_BYPASS) return <Shell devMode>{children}</Shell>;
        return <ConfigNotice />;
    }

    // Backend configured → verify session -----------------------------------
    let res: Response;
    try {
        res = await fetch(`${BACKEND}/api/me`, {
            headers: { cookie: await cookieHeader() },
            cache: "no-store",
        });
    } catch {
        if (DEV_BYPASS) return <Shell devMode unreachable>{children}</Shell>;
        redirect("/login");
        throw new Error("Unreachable");
    }

    if (res.status === 401 || !res.ok) {
        if (DEV_BYPASS) return <Shell devMode>{children}</Shell>;
        redirect("/login");
    }

    const me = await res.json();
    const isAdmin =
        Array.isArray(me?.authorities) &&
        me.authorities.some((a: { authority?: string }) => a.authority === "ROLE_ADMIN");

    if (!isAdmin) redirect("/");

    return <Shell user={me?.name}>{children}</Shell>;
}

/* -------------------------------------------------------------------------- */
/* Shared admin chrome — sidebar + content. Single source of navigation.      */
/* -------------------------------------------------------------------------- */
function Shell({
    children,
    user,
    devMode,
    unreachable,
}: {
    children: React.ReactNode;
    user?: string;
    devMode?: boolean;
    unreachable?: boolean;
}) {
    const backend =
        process.env.NEXT_PUBLIC_BACKEND_URL ??
        process.env.BACKEND_URL ??
        "http://localhost:8080";

    return (
        <div className="flex min-h-screen bg-[#FAFAFA] text-slate-900">
            <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
                <div className="px-6 py-6">
                    <Link
                        href="/admin"
                        className="text-xl font-black tracking-tight"
                    >
                        VOYAGE <span className="text-slate-300">OFFICE</span>
                    </Link>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                        {user ? `Signed in · ${user}` : "Internal tools"}
                    </p>
                </div>

                <AdminNav />

                <div className="space-y-1 border-t border-slate-100 px-3 py-4">
                    <a
                        href="/"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        View site ↗
                    </a>
                    <a
                        href={`${backend}/h2-console`}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        Database ↗
                    </a>
                    {!devMode && (
                        <form action={`${backend}/logout`} method="post">
                            <button
                                type="submit"
                                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                                Log out
                            </button>
                        </form>
                    )}
                </div>
            </aside>

            <div className="min-w-0 flex-1">
                {devMode && (
                    <div className="border-b border-amber-200 bg-amber-50 px-8 py-2.5 text-[13px] text-amber-800">
                        <span className="font-semibold">Dev mode</span> —{" "}
                        {unreachable
                            ? "backend unreachable, auth bypassed."
                            : "admin auth bypassed."}{" "}
                        Set <code className="font-mono">ADMIN_DEV_BYPASS=false</code> and run{" "}
                        <code className="font-mono">workspace-api</code> for the real login flow.
                    </div>
                )}
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Shown when no backend is configured and dev bypass is off.                 */
/* -------------------------------------------------------------------------- */
function ConfigNotice() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 text-slate-900">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-xl font-bold">Admin isn’t configured</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    No <code className="font-mono">BACKEND_URL</code> is set, so the admin
                    can’t verify your session. Add it to{" "}
                    <code className="font-mono">.env.local</code> and start the Spring
                    backend:
                </p>
                <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
{`# .env.local
BACKEND_URL=http://localhost:8080

# then, in workspace-api:
./gradlew bootRun`}
                </pre>
                <p className="mt-4 text-sm text-slate-600">
                    For UI work without the backend, set{" "}
                    <code className="font-mono">ADMIN_DEV_BYPASS=true</code> in{" "}
                    <code className="font-mono">.env.local</code>.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block text-sm font-semibold underline underline-offset-4"
                >
                    ← Back to site
                </Link>
            </div>
        </div>
    );
}
