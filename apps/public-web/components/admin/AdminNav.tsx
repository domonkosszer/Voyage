"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/posts", label: "Posts" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/collections", label: "Collections" },
] as const;

export default function AdminNav() {
    const pathname = usePathname() ?? "";

    return (
        <nav className="flex-1 px-3 space-y-1">
            {ITEMS.map((item) => {
                const active =
                    item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={
                            "block rounded-lg px-3 py-2 text-sm font-medium transition " +
                            (active
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
                        }
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
