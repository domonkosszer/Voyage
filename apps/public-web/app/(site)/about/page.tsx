import { TopBar, BackLink } from "../../../components/shell/TopBar";
import { Instagram, X, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div>
            <TopBar title="Info" left={<BackLink href="/" />} />

            {/* Top label */}
            <div className="fixed top-[20px] left-[0px] right-[0px] z-[20px] text-center">
                <div className="text-[22px] font-semibold uppercase tracking-[0.35em] opacity-60">
                    Voyage Sports Club
                </div>
            </div>

            {/* Main content */}
            <main className="relative h-screen mx-auto pt-[40px] max-w-3xl px-[16px]">
                {/* Trackfield wrapper */}
                <div className="fixed top-[80px] bottom-[30px] left-[80px] right-[80px] rounded-[140px] border-[4px] border-black/20 pointer-events-none">
                    {/* Lane lines */}
                    <div className="absolute inset-[14px] rounded-[128px] border-[3px] border-black/12" />
                    <div className="absolute inset-[32px] rounded-[110px] border-[2px] border-black/10" />
                </div>
                    {/* Content */}
                    <div className="fixed top-[140px] bottom-[90px] left-[130px] right-[130px] overflow-y-auto no-scrollbar">
                        <div className="relative z-10 mx-auto mt-[50px] max-w-3xl px-[60px] text-center">
                            <h1 className="mb-[12px] text-[40px] font-semibold tracking-tight">
                            Who Are We?
                        </h1>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                We’re a community for sport, outdoors and good energy — building sessions, events and stories.
                            </p>

                            <h2 className="mb-[12px] text-[32px] font-medium tracking-tight">
                                What Do We Do?
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                A mixture of design, lifestyle, movement and brand culture.
                            </p>

                            <h2 className="mb-[12px] text-[32px] font-medium tracking-tight">
                                Should You Join?
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                nahh not really tbh just stay at home
                                <br />
                                stick to your old shit
                            </p>

                            <h2 className="mt-[72px] mb-[12px] text-[32px] font-medium tracking-tight">
                                Events & Shit
                            </h2>

                            <p className="mx-auto mb-[64px] max-w-[520px] text-[16px] leading-[1.6] opacity-80">
                                Runs, rides, sessions, pop-ups, maybe a race, maybe just coffee.
                                <br />
                                If something’s happening, it’ll show up here.
                            </p>

                            <h2 className="mb-[20px] text-[32px] font-medium tracking-tight">
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