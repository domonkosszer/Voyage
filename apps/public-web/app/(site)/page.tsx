import Link from "next/link";
import { TopBar, InfoLink } from "../../components/shell/TopBar";
import ImageSphereSketch from "../../components/visuals/ImageSphereSketch";
import { listEvents } from "@/lib/events";

export default function HomePage() {
    const events = listEvents().filter((e) => e.status === "published");

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
            translate-y-[40px]
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
                        <Link className="underline underline-offset-4" href="/blog">
                            Blog
                        </Link>
                    </div>
                </div>

                {/* THIS CREATES SCROLL */}
                <section id="events" className="relative z-0 min-h-[200vh] pt-[110vh] scroll-mt-24">
                    <div className="relative z-20 mx-auto w-full max-w-5xl">
                        <header className="text-center">
                            <p className="text-[38px] uppercase tracking-[0.25em] opacity-60 translate-y-[-40px]" >
                                Voyage Sports Club
                            </p>
                           <p className="mt-4 mx-auto mt-[-30px] mb-[80px] max-w-2xl opacity-70">
                                Upcoming gatherings, trainings, and club moments.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 gap-[40px] md:grid-cols-2 place-items-stretch">
                          {events.length === 0 ? (
                            <p className="opacity-60 text-center col-span-2">
                              No upcoming events.
                            </p>
                          ) : (
                            events.map((event) => {
                              const date = new Date(event.startAt);

                              return (
                                <article
                                  key={event.id}
                                  className="rounded-2xl bg-white/60 p-6 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
                                >
                                  <div className="flex flex-col items-center gap-4 text-center">
                                    <div>
                                      <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                                        {date.toLocaleDateString(undefined, {
                                          weekday: "short",
                                          month: "short",
                                          day: "numeric",
                                        })} · {date.toLocaleTimeString(undefined, {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>

                                      <h4 className="mt-2 font-serif text-2xl leading-snug">
                                        {event.title}
                                      </h4>

                                      {event.excerpt && (
                                        <p className="mt-2 opacity-70">{event.excerpt}</p>
                                      )}
                                    </div>

                                    {event.location && (
                                      <div className="opacity-70">
                                        <p className="text-sm opacity-70">{event.location}</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-center">
                                    <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs opacity-70">
                                      {event.status}
                                    </span>

                                    <Link
                                      className="underline underline-offset-4"
                                      href={`/events/${event.id}`}
                                    >
                                      Details
                                    </Link>
                                  </div>
                                </article>
                              );
                            })
                          )}
                        </div>

                        {/* Bottom breathing room so the last card isn't stuck to the bottom */}
                        <div className="h-[35vh]" />
                    </div>
                </section>
            </main>
        </>
    );
}