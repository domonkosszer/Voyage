import { TopBar, BackLink } from "../../../components/shell/TopBar";
import { Instagram, X, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div>
            {/* <TopBar title="" left={<BackLink href="/" />} /> */}

            {/* Top label */}
            <div className="fixed top-[20px] left-[0px] right-[0px] z-[9999] flex justify-center pointer-events-auto">
                <Link
                    href="/"
                    className="inline-block cursor-pointer text-[22px] font-semibold uppercase tracking-[0.35em] opacity-60 hover:opacity-100 transition"
                >
                    Voyage Sports Club
                </Link>
            </div>

            {/* Main content */}
            <main className="relative h-screen mx-auto pt-[40px] max-w-3xl px-[16px] pointer-events-none">
                {/* Trackfield wrapper */}
                <div className="fixed top-[70px] bottom-[20px] md:top-[80px] md:bottom-[30px] left-[20px] right-[20px] md:left-[80px] md:right-[80px] rounded-[140px] border-[4px] border-black/90 pointer-events-none">
                    {/* Lane lines */}
                    <div className="absolute inset-[14px] rounded-[128px] border-[3px] border-black/30" />
                    <div className="absolute inset-[32px] rounded-[110px] border-[2px] border-black/5" />
                </div>
                    {/* Content */}
                    <div className="fixed top-[110px] bottom-[90px] left-[30px] right-[30px] md:left-[130px] md:right-[130px] overflow-y-auto no-scrollbar pointer-events-auto">
                        <div className="relative z-10 mx-auto mt-[50px] max-w-3xl px-[60px] text-center">
                            <h1 className="mb-[12px] text-[35px] md:text-[40px] font-bold tracking-tight">
                            Who Are We?
                        </h1>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                We’re a community for sport, outdoors and good energy — building sessions, events and stories.
                            </p>

                            <h2 className="mb-[12px] text-[28px] md:text-[32px] font-medium tracking-tight">
                                What Do We Do?
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                A mixture of design, lifestyle, movement and brand culture.
                            </p>

                            <h2 className="mb-[12px] text-[28px] md:text-[32px] font-medium tracking-tight">
                                Should You Join?
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                nahh not really tbh just stay at home
                                <br />
                                stick to your old shit
                            </p>

                            <h2 className="mt-[72px] mb-[12px] text-[28px] md:text-[32px] font-medium tracking-tight">
                                Events & Shit
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                Runs, rides, sessions, pop-ups, maybe a race, maybe just coffee.
                                <br />
                                If something’s happening, it’ll show up here.
                            </p>

                            <Link href="/blog"
                                  className="inline-block">
                                <h2 className="mb-[20px] text-[28px] md:text-[32px] font-medium tracking-tight">
                                    Blog
                                </h2>
                            </Link>
                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                Stay Up to date. There is more to find out.
                            </p>

                            <h2 className="mb-[20px] text-[28px] md:text-[32px] font-medium tracking-tight">
                                Socials
                            </h2>

                            {/* Social icons */}
                            <div className="flex justify-center gap-[24px]">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-[2px] border-black/25 opacity-80 transition hover:opacity-100 hover:border-black/40 hover:bg-black/5"
                                >
                                    <Instagram size={24} strokeWidth={1.75} />
                                </a>

                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="X / Twitter"
                                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-[2px] border-black/25 opacity-80 transition hover:opacity-100 hover:border-black/40 hover:bg-black/5"
                                >
                                    <X size={24} strokeWidth={1.75} />
                                </a>

                                <a
                                    href="https://voyagesportsclub.ch"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Website"
                                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full border-[2px] border-black/25 opacity-80 transition hover:opacity-100 hover:border-black/40 hover:bg-black/5"
                                >
                                    <Globe size={24} strokeWidth={1.75} />
                                </a>
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    );
}