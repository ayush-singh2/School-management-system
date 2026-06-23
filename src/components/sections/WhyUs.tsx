import Icon from "../Icon";

const CARDS = [
  {
    icon: "psychology",
    title: "Curiosity First",
    body: "We nurture the instinct to question, explore and discover — turning everyday lessons into lifelong wonder.",
  },
  {
    icon: "favorite",
    title: "Character & Values",
    body: "Discipline, empathy and integrity are woven into daily school life so children grow into good human beings.",
  },
  {
    icon: "workspace_premium",
    title: "Academic Excellence",
    body: "A modern, NEP-aligned curriculum delivered by passionate educators committed to every student's success.",
  },
  {
    icon: "groups",
    title: "Caring Community",
    body: "A close-knit, safe environment where teachers, parents and students grow together as one family.",
  },
  {
    icon: "science",
    title: "Hands-On Learning",
    body: "Smart classes, labs and activities turn abstract ideas into experiences children can see and touch.",
  },
  {
    icon: "sports_soccer",
    title: "Beyond Books",
    body: "Sports, arts and cultural events build confidence, teamwork and a healthy, balanced childhood.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why"
      className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3]"
    >
      <div className="mx-auto max-w-[1500px] px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-secondary font-bold uppercase tracking-[0.25em] text-xs mb-4">
            Why Jitendra Public School
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
            An education that shapes the whole child
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              className="tilt-wrap reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="tilt bg-white rounded-[28px] p-8 border border-secondary/20 shadow-[0_20px_50px_-20px_rgba(13,27,52,0.25)]">
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/12 text-secondary mb-5">
                  <Icon name={c.icon} className="text-3xl" />
                </span>
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {c.title}
                </h3>
                <p className="text-on-surface/75 text-sm leading-relaxed">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
