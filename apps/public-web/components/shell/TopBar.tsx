import Link from "next/link";
import type { ReactNode } from "react";

type TopBarProps = {
    title: string;
    left?: ReactNode;
    right?: ReactNode;
};

export function TopBar({ title, left, right }: TopBarProps) {
    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="mx-auto max-w-3xl px-4">
                <div className="min-h-[96px] flex items-center justify-between">
                    <div className="min-w-[72px]">{left}</div>
                    <div className="min-w-[72px] flex justify-end">{right}</div>
                </div>


            </div>
        </header>
    );
}

export function BackLink({ href }: { href: string }) {
    return (
        <Link href={href} className="text-sm opacity-80 hover:opacity-100">
            Back
        </Link>
    );
}

export function InfoLink({ href }: { href: string }) {
    return (
        <Link href={href} className="text-sm opacity-80 hover:opacity-100">
            Info
        </Link>
    );
}