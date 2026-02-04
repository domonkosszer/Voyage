import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function cookieHeader() {
    const h = await headers();
    return h.get("cookie") ?? "";
}

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    let res: Response;

    try {
        res = await fetch(`${process.env.BACKEND_URL}/api/me`, {
            headers: { cookie: await cookieHeader() },
            cache: "no-store",
        });
    } catch {
        redirect("/login");
        throw new Error("Unreachable");
    }

    if (res.status === 401) redirect("/login");
    if (!res.ok) redirect("/login");

    const me = await res.json();

    const isAdmin =
        Array.isArray(me?.authorities) &&
        me.authorities.some((a: any) => a.authority === "ROLE_ADMIN");

    if (!isAdmin) redirect("/");

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r p-4 space-y-4">
                <nav className="space-y-2">
                    <a href="/admin" className="block font-medium">
                        Dashboard
                    </a>
                    <a href="/admin/posts" className="block">
                        Manage posts
                    </a>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}