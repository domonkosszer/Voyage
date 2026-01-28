import { redirect } from "next/navigation";
import { headers } from "next/headers";

async function cookieHeader() {
    const h = await headers();          // ✅ await
    return h.get("cookie") ?? "";
}

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/me`, {
        headers: { cookie: await cookieHeader() },  // ✅ await here too
        cache: "no-store",
    });

    if (res.status === 401) redirect("/login");
    if (!res.ok) redirect("/login");

    const me = await res.json();

    const isAdmin =
        Array.isArray(me?.authorities) &&
        me.authorities.some((a: any) => a.authority === "ROLE_ADMIN");

    if (!isAdmin) redirect("/");

    return <>{children}</>;
}