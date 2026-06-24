const WORDS = [
  "Curiosity",
  "Character",
  "Excellence",
  "Compassion",
  "Confidence",
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <span className="flex items-center gap-12" aria-hidden={ariaHidden}>
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-12">
          <span>{w}</span>
          <span className="text-secondary/30">✦</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <section
      id="marquee"
      className="bg-primary-deep border-y border-secondary/15 py-5 overflow-hidden"
    >
      <div className="marquee gap-12 text-secondary/80 font-display italic text-2xl md:text-3xl whitespace-nowrap">
        <Row />
        <Row ariaHidden />
      </div>
    </section>
  );
}
