import { TopBar, BackLink } from "../../../components/shell/TopBar";

export default function AboutPage() {
    // @ts-ignore
    return (
        <div>
            <TopBar title="Info" left={<BackLink href="/" />} />

            <main className="mx-auto max-w-3xl px-4 py-10">
                <h1 className="text-2xl font-semibold">About</h1>
                <p className="mt-3 opacity-80">
                    Platzhalter. Hier kommt spaeter Brand-Info, Links, Kontakt, etc.
                </p>
            </main>
        </div>
    );
}