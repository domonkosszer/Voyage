import Reveal from "./Reveal";

export default function BrandStory() {
  return (
    <section className="signature sec" id="signature">
      <div className="wrap">
        <div className="row">
          <Reveal as="figure">
            <img
              src="/assets/statue-back.jpg"
              alt="The discus thrower print of the L'Olympionique line"
            />
          </Reveal>
          <Reveal className="txt">
            <p className="eyebrow">L&rsquo;Olympionique</p>
            <h2>
              The athlete, <em>in marble.</em>
            </h2>
            <p>
              Our second line borrows from antiquity — the discus thrower,
              caught at the still point before release. Athletics as it was
              first imagined: disciplined, unhurried, made to outlast the
              season.
            </p>
            <p>
              Printed large across the back, set against a serif drawn for the
              occasion. One figure, one idea, nothing spare.
            </p>
            <div className="rule" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
