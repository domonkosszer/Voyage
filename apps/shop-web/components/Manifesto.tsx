import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="wrap inner">
        <Reveal>
          <p className="eyebrow">The idea</p>
          <p className="lead">
            We don&rsquo;t make sportswear for everyone.{" "}
            <em>We make it for the few who already know why they show up.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
