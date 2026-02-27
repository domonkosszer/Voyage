import Link from "next/link";
import { TopBar, InfoLink } from "../../components/shell/TopBar";
import VoyageStickLoop from "../../components/visuals/VoyageStickLoop";
import { listEvents } from "@/lib/events/store.file";

export default function HomePage() {
    const events = listEvents();
    return (
        <div className="px-7">
            {/* NAVIGATION ONLY */}
            {/*<TopBar right={<InfoLink href="/about" />} title="" />*/}

            {/* BRAND / LOGO */}
            <section className="mt-10 text-center">
                <h1
                    className="
            font-bold leading-none
            mx-auto w-full max-w-full
            translate-y-[1px]
            whitespace-nowrap
            text-[clamp(3rem,9vw,7rem)] md:text-[clamp(6rem,11vw,11rem)]
            tracking-[0.4em] md:tracking-[0.6em] md:translate-x-[0.17em]
          "
                >
                    VOYAGE
                </h1>
            </section>

            {/* PAGE CONTENT */}
            <main className="relative no-scrollbar mx-auto w-full ">
                {/* GIANT BACKGROUND HEADLINE (fixed) */}
                <h2
                    className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-[52%]
            z-0
            pointer-events-none select-none
            font-serif text-black
            text-center
            leading-[0.82]
            tracking-[0.02em]
            opacity-[0.12]
            text-[clamp(6rem,23vh,14rem)] md:[font-size:clamp(8rem,30vh,26rem)]

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
            translate-y-[32vh] md:translate-y-[40vh]
            z-10
            text-center
            pointer-events-none

          "
                >
                    <p className=" mt-[10px] mb-[5px] tracking-[0.35em] italic opacity-50">there is more to find out</p>
                    <div className="flex items-center justify-center gap-[45px] pointer-events-auto">
                        <Link
                            href="/about"
                            className="text-[15px] font-semibold tracking-[0.35em] opacity-60"
                        >
                            about
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[15px] font-semibold tracking-[0.35em] opacity-60"
                        >
                            blog
                        </Link>
                    </div>
                </div>

                {/* THIS CREATES SCROLL */}
                <section id="events" className="relative z-0 min-h-[100svh] pt-[90svh] scroll-mt-24">
                    <div className="relative z-0 mx-auto w-full max-w-5xl">
                        <header className="text-center">
                            <p className="text-[25px] uppercase tracking-[0.25em] opacity-60 translate-y-[80px]" >
                                Voyage Sports Club
                            </p>
                            <h3 className="text-[30px] mt-[100px] font-serif text-5xl leading-tight ">
                                Events
                            </h3>
                            <p className="mt-[30px] mx-auto max-w-2xl opacity-80">
                                Upcoming gatherings, trainings, and club moments.
                            </p>
                        </header>

                        <div className="mt-[30px] grid grid-cols-1 gap-[2px] md:grid-cols-2 place-items-stretch">
                            {events.map((event) => (
                                <article
                                    key={event.id}
                                    className="rounded-2xl bg-white/60 px-[5px] pt-[5px] pb-[20px] backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
                                >
                                    <div className="mt-[20px] flex flex-col items-center gap-4 text-center">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                                                {new Date(event.startAt).toLocaleString("en-CH", {
                                                    weekday: "short",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>

                                            <h4 className="mt-[5px] text-[30px] font-serif text-2xl leading-snug">
                                                {event.title}
                                            </h4>

                                            {event.excerpt && (
                                                <p className="mt-[5px] opacity-70">
                                                    {event.excerpt}
                                                </p>
                                            )}
                                        </div>

                                        <div className="opacity-70">
                                            {event.location && (
                                                <p className="text-sm opacity-70">
                                                    {event.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </article>
                            ))}
                        </div>

                        {/* Bottom breathing room so the last card isn't stuck to the bottom */}
                        <div className="h-[35vh]" />
                    </div>
                </section>

                {/* VOYAGE LOOP ANIMATION */}
                <div className="flex justify-center mt-[-100px] md:mt-[-40px] scale-150 md:scale-125">
                    <VoyageStickLoop size={720} />
                </div>
            </main>
        </div>
    );
}