const STATS = [
  { count: 13, suffix: "+", label: "Years Since 2012" },
  { count: 1000, suffix: "+", label: "Students Enrolled" },
  { count: 45, suffix: "+", label: "Dedicated Educators" },
  { count: 100, suffix: "%", label: "Board Results" },
];

export default function Stats() {
  return (
    <section className="bg-primary text-white py-20">
      <div className="mx-auto max-w-[1500px] px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="reveal text-center"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
              <span data-count={s.count} data-suffix={s.suffix}>
                0
              </span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
