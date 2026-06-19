import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero">
      <img
        src="/assets/hero-bw.jpg"
        alt="Athlete on the track at dusk wearing the Voyage Sports Club tee"
      />
      <div className="scrim" />
      <div className="wrap content">
        <Reveal>
          <p className="eyebrow">Voyage Sports Club</p>
          <h1>
            for the <em>few.</em>
          </h1>
          <p className="sub">
            A small-batch sportswear house for those who train alone — and
            prefer it that way.
          </p>
          <a href="#collection" className="cta">
            Shop Drop 01 <i>&rarr;</i>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
