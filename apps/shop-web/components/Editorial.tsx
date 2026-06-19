import Reveal from "./Reveal";

export default function Editorial() {
  return (
    <section className="sec" id="about" style={{ paddingBottom: "clamp(40px,6vh,72px)" }}>
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <div>
              <p className="eyebrow">The Lookbook</p>
              <h2>On the track</h2>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="editorial">
        <Reveal as="figure">
          <img
            src="/assets/editorial-color.jpg"
            alt="Runner in the Voyage Sports Club tee on a daytime track"
          />
          <figcaption>Sports Club — SS26</figcaption>
        </Reveal>
        <Reveal as="figure">
          <img
            src="/assets/voyage-bw.jpg"
            alt="Athlete at dusk in the Voyage Sports Club tee"
          />
          <figcaption>for the few.</figcaption>
        </Reveal>
      </div>
    </section>
  );
}
