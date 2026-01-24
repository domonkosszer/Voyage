import Link from "next/link";
import { TopBar, InfoLink } from "../../components/shell/TopBar";

export default function HomePage(){
    return(
        <>
            {/* NAVIGATION ONLY */}
            <TopBar right={<InfoLink href="/about"/>} title={""} />

            {/* BRAND / LOGO */}
            <section className="mt-20 text-center">
                <h1 className="font-bold text-[10rem] tracking-[0.6em] leading-none">
                    VOYAGE
                </h1>
            </section>

            {/* PAGE CONTENT */}
            <main className="mx-auto min-w-6xl px-7 py-160 text-center">

                <h2 className="font-serif text-[10.5rem] tracking-[0.2em] opacity-5">
                    BE THE PENGUIN
                </h2>

                <p className="mt-3 opacity-60">
                    be the penguine
                </p>

                <div className="mt-6">
                    <Link className="underline" href="/blog">
                        Go to Blog
                    </Link>
                </div>
            </main>
        </>
    )
}