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
                <div className="h-16 flex items-center justify-between border-b border-black/10">
                    <div className="min-w-[72px]">{left}</div>
                    <div className="flex-1 text-center font-medium">{title}</div>
                    <div className="min-w-[72px] flex justify-end">{right}</div>
                </div>

                <div className="flex justify-center">
                    <div className="h-6 w-24 border-x border-b border-black/10 bg-white" />
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