"use client";

import { ReactNode } from "react";
import Link from "next/link";

export function TopBar({
                           title,
                           left,
                           right,
                       }: {
    title: string;
    left?: ReactNode;
    right?: ReactNode;
}) {
    return (
        <header className="fixed top-0 inset-x-0 h-16 flex items-center justify-between px-6 bg-white z-50">
            <div>{left}</div>
            <h1 className="font-semibold">{title}</h1>
            <div>{right}</div>
        </header>
    );
}

export function BackLink({ href }: { href: string }) {
    return <Link href={href}>← Back</Link>;
}

export function InfoLink({ href }: { href: string }) {
    return <Link href={href}>Info</Link>;
}