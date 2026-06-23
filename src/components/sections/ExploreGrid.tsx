import Link from "next/link";
import Icon from "../Icon";
import { Container, SectionHeading } from "../ui";

const TILES = [
  {
    href: "/about",
    icon: "history_edu",
    title: "About Us",
    body: "Our story, vision and the values that guide every classroom.",
  },
  {
    href: "/academics",
    icon: "school",
    title: "Academics",
    body: "An NEP-aligned curriculum built around curiosity and mastery.",
  },
  {
    href: "/admissions",
    icon: "assignment_turned_in",
    title: "Admissions",
    body: "Process, age criteria, fees and online application for 2026–27.",
  },
  {
    href: "/infrastructure",
    icon: "domain",
    title: "Infrastructure",
    body: "Smart classes, labs, library, sports, transport and safety.",
  },
  {
    href: "/student-life",
    icon: "celebration",
    title: "Student Life",
    body: "Houses, clubs, sports, arts and a calendar full of events.",
  },
  {
    href: "/alumni",
    icon: "diversity_3",
    title: "Alumni Network",
    body: "Where our students go next — and how they give back.",
  },
];

export default function ExploreGrid() {
  return (
    <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#d6e1f3] to-[#e8eefa]">
      <Container>
        <SectionHeading
          center
          overline="Explore the school"
          title="Everything you need,"
          highlight="one click away"
          subtitle="A complete look at life at Jitendra Public School — from the first classroom to the wider world our students step into."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {TILES.map((t, i) => (
            <Link
              key={t.href}
              href={t.href}
              className="tilt-wrap reveal group block"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="tilt h-full lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright">
                    <Icon name={t.icon} className="text-3xl" />
                  </span>
                  <span className="grid place-items-center w-11 h-11 rounded-full border border-secondary/40 text-secondary-bright group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <Icon name="arrow_outward" />
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2.5">
                  {t.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {t.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
