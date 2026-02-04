"use client";

export default function LogoutButton() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

    return (
        <form action={`${backend}/logout`} method="post">
            <button type="submit">Logout</button>
        </form>
    );
}