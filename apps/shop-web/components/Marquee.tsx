const WORDS = ["DISZIPLIN", "LEISTUNG", "BEWEGUNG", "FOKUS", "AUSDAUER"];

export default function Marquee() {
  const sequence = [...WORDS, ...WORDS]; // für lückenlose Endlosschleife

  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-5">
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex shrink-0 items-center">
            {sequence.map((word, i) => (
              <span
                key={`${rep}-${i}`}
                className="mx-6 flex items-center gap-6 whitespace-nowrap font-display text-2xl text-paper md:text-3xl"
              >
                {word}
                <span className="h-2 w-2 rounded-full bg-volt" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
