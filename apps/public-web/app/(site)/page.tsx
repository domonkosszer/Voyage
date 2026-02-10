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
            translate-y-[35px]
            whitespace-nowrap
            [font-size:clamp(4rem,10vw,10rem)]
            tracking-[0.6em]
          "
                >
                    VOYAGE
                </h1>
            </section>

            {/* PAGE CONTENT */}
            <main className="mx-auto min-w-6xl px-7 py-160 text-center">
                {/* GIANT BACKGROUND HEADLINE */}
                <h2
                    className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            + translate-y-0
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

                  <Link className="underline" href="/blog">
                    Go to Blog
                  </Link>
                </div>
            </main>
        </>
    );
}