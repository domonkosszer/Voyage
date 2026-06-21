"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/about", label: "about" },
    { href: "/collection/drop-01", label: "collection" },
    { href: "/blog", label: "blog" },
] as const;

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";
    // /blog should stay active on /blog/[slug]; /collection on any drop, etc.
    const root = "/" + href.split("/")[1];
    return pathname === href || pathname.startsWith(root + "/") || pathname === root;
}

/**
 * Persistent, on-brand navigation for all interior public pages.
 * Wordmark (→ home) on the left, core destinations on the right.
 */
export function SiteNav() {
    const pathname = usePathname() ?? "";

    return (
        <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-black/5 bg-white/70 backdrop-blur-md">
            <nav className="flex h-full items-center justify-between px-6 md:px-12">
                <Link
                    href="/"
                    aria-label="VOYAGE — home"
                    className="text-[15px] font-semibold tracking-[0.3em] opacity-70 transition hover:opacity-100"
                >
                    VOYAGE
                </Link>

                <ul className="flex items-center gap-7 md:gap-10">
                    {LINKS.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={
                                        "text-[13px] md:text-[15px] font-semibold tracking-[0.3em] transition " +
                                        (active
                                            ? "opacity-100 underline underline-offset-[6px] decoration-1"
                                            : "opacity-50 hover:opacity-100")
                                    }
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
