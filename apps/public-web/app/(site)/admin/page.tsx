import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminPage() {
    const cookieHeader = (await cookies())
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    const res = await fetch(`${process.env.BACKEND_URL}/api/me`, {
        headers: { cookie: cookieHeader },
        cache: "no-store",
        redirect: "manual", // IMPORTANT: don’t follow to /login
    });

    // Spring might answer 302 to /login when unauthenticated
    if (res.status === 401 || res.status === 302) redirect("/login");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to load session: ${res.status} ${text.slice(0, 200)}`);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
        // we got HTML (login page) or something else
        redirect("/login");
    }

    const me = await res.json();

    return (
        <main>
            <h1>Admin</h1>
            <pre>{JSON.stringify(me, null, 2)}</pre>
        </main>
    );
}