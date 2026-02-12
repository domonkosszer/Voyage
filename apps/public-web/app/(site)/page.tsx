import Link from "next/link";
import { TopBar, InfoLink } from "../../components/shell/TopBar";
import ImageSphereSketch from "../../components/visuals/ImageSphereSketch";

export default function HomePage() {
    return (
        <>
            {/* NAVIGATION ONLY */}
            <TopBar right={<InfoLink href="/about" />} title="" />

            {/* BRAND / LOGO */}
            <section className="mt-10 text-center">
                <h1
                    className="
            font-bold leading-none
            mx-auto w-full max-w-[95vw]
            translate-y-[1px]
            whitespace-nowrap
            [font-size:clamp(4rem,10vw,10rem)]
            tracking-[0.6em]
          "
                >
                    VOYAGE
                </h1>
            </section>

            {/* PAGE CONTENT */}
            <main className="relative mx-auto w-full px-7">
                {/* GIANT BACKGROUND HEADLINE (fixed) */}
                <h2
                    className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            z-0
            pointer-events-none select-none
            font-serif text-black
            text-center
            leading-[0.82]
            tracking-[0.02em]
            opacity-[0.12]
            [font-size:clamp(8rem,30vh,26rem)]
          "
                >
          <span className="block">
            for<br />
            the<br />
            few.
          </span>
                </h2>

                {/* CTA (fixed) */}
                <div
                    className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2
            translate-y-[40vh]
            z-10
            text-center
          "
                >
                    <p className="opacity-60 mb-3">be the penguine</p>
                    <div className="flex items-center justify-center gap-6">
                        <a className="underline underline-offset-4" href="#events">
                            Events
                        </a>
                        <Link className="underline underline-offset-4" href="/blog">
                            Blog
                        </Link>
                    </div>
                </div>

                {/* THIS CREATES SCROLL */}
                <section id="events" className="relative z-0 min-h-[200vh] pt-[110vh] scroll-mt-24">
                    <div className="relative z-20 mx-auto w-full max-w-5xl">
                        <header className="text-center">
                            <p className="text-sm uppercase tracking-[0.25em] opacity-60 translate-y-[80px]" >
                                Voyage Sports Club
                            </p>
                            <h3 className="mt-[80px] font-serif text-5xl leading-tight ">
                                Events
                            </h3>
                            <p className="mt-4 mx-auto max-w-2xl opacity-70">
                                Upcoming gatherings, trainings, and club moments.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 place-items-stretch">
                            {/* Event card */}
                            <article className="rounded-2xl bg-white/60 p-6 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                                            Sat · Feb 21 · 18:30
                                        </p>
                                        <h4 className="mt-2 font-serif text-2xl leading-snug">
                                            Winter Run &amp; Sauna
                                        </h4>
                                        <p className="mt-2 opacity-70">
                                            Easy pace run, then recovery sauna. Bring a towel.
                                        </p>
                                    </div>

                                    <div className="opacity-70">
                                        <p className="text-sm opacity-70">Zürich</p>
                                        <p className="text-xs opacity-50">Seefeld</p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-center">
                                    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs opacity-70">
                                        Limited spots
                                    </span>
                                    <Link className="underline underline-offset-4" href="/about">
                                        Details
                                    </Link>
                                </div>
                            </article>

                            {/* Event card */}
                            <article className="rounded-2xl bg-white/60 p-6 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                                            Wed · Feb 25 · 07:00
                                        </p>
                                        <h4 className="mt-2 font-serif text-2xl leading-snug">
                                            Morning Strength Session
                                        </h4>
                                        <p className="mt-2 opacity-70">
                                            45 minutes. Technique first. All levels welcome.
                                        </p>
                                    </div>

                                    <div className="opacity-70">
                                        <p className="text-sm opacity-70">Zürich</p>
                                        <p className="text-xs opacity-50">Hardbrücke</p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-center">
                                    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs opacity-70">
                                        Open
                                    </span>
                                    <Link className="underline underline-offset-4" href="/about">
                                        Details
                                    </Link>
                                </div>
                            </article>

                            {/* Event card */}
                            <article className="rounded-2xl bg-white/60 p-6 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)] md:col-span-2">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="max-w-3xl">
                                        <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                                            Sun · Mar 8 · 10:00
                                        </p>
                                        <h4 className="mt-2 font-serif text-2xl leading-snug">
                                            Club Day — “for the few.”
                                        </h4>
                                        <p className="mt-2 opacity-70">
                                            A longer session with coffee, kit try-on, and a proper hang after.
                                        </p>
                                    </div>

                                    <div className="opacity-70">
                                        <p className="text-sm opacity-70">Zürich</p>
                                        <p className="text-xs opacity-50">TBD</p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-center">
                                    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs opacity-70">
                                        Save the date
                                    </span>
                                    <div className="flex items-center justify-center gap-4">
                                        <Link className="underline underline-offset-4" href="/blog">
                                            Read more
                                        </Link>
                                        <Link className="underline underline-offset-4" href="/about">
                                            Join
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Bottom breathing room so the last card isn't stuck to the bottom */}
                        <div className="h-[35vh]" />
                    </div>
                </section>
            </main>
        </>
    );
}