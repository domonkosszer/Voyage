import Link from "next/link";
import { TopBar, InfoLink } from "../../components/shell/TopBar";

export default function HomePage(){
    return(
        <div>
            <TopBar title="VOYAGE" right={<InfoLink href="/about" />} />

            <main className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="text-2xl font-semibold">Public Web</h1>
                <p className="mt-3 opacity-80">
                    Das ist das Grundgeruest. Von hier aus baust du Design & Content iterativ.
                </p>

                <div className="mt-6">
                    <Link className="underline" href="/blog">
                        Go to Blog
                    </Link>
                </div>
            </main>
        </div>
    )
}