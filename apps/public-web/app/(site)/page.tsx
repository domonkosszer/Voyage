import Link from "next/link";
import VoyageStickLoop from "../../components/visuals/VoyageStickLoop";
import { listEvents } from "@/lib/events/store.file";

export default function HomePage() {
    const events = listEvents();
    return (
        <div className="px-7">
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

          "
                >
                    <p className=" mt-[10px] mb-[5px] tracking-[0.35em] italic opacity-50">there is more to find out</p>
                    <div className="flex items-center justify-center gap-[45px] pointer-events-auto">
                        <Link
                            href="/about"
                            className="text-[15px] font-semibold tracking-[0.35em] opacity-60 hover:opacity-100 transition"
                        >
                            about
                        </Link>
                        <Link
                            href="/collection/drop-01"
                            className="text-[15px] font-semibold tracking-[0.35em] opacity-60 hover:opacity-100 transition"
                        >
                            collection
                        </Link>
                        <Link
                            href="/blog"
                            className="text-[15px] font-semibold tracking-[0.35em] opacity-60 hover:opacity-100 transition"
                        >
                            blog
                        </Link>
                    </div>
                </div>

                {/* THIS CREATES SCROLL */}
                <section id="events" className="relative z-0 pt-[90svh] md:pt-[90svh] scroll-mt-24 flex flex-col">
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
                            {events.length === 0 && (
                                <p className="md:col-span-2 mt-[20px] text-center opacity-50 tracking-[0.15em] italic">
                                    No upcoming events yet — check back soon.
                                </p>
                            )}
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


                    </div>

                    {/* VOYAGE LOOP ANIMATION */}
                    <div className="
    mt-[25vh] md:mt-[25vh]
    mb-[10px] md:mb-[15vh]
    flex justify-center
    scale-210 md:scale-195
">
                        <VoyageStickLoop size={520} />
                    </div>

                </section>
            </main>
        </div>
    );
}