import type { Metadata } from "next";
import Icon from "@/components/Icon";
import {
  Container,
  PageHero,
  SectionHeading,
  FeatureCard,
  StatBand,
  CTABanner,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Academics | Jitendra Public School, Madhepura",
  description:
    "An NEP-aligned curriculum from pre-primary to secondary — built around curiosity, conceptual mastery and the all-round growth of every child.",
};

const STAGES = [
  {
    icon: "child_care",
    tag: "Ages 3–5",
    title: "Pre-Primary",
    body: "Play-based, activity-rich foundation years that make school feel like joy, not pressure.",
  },
  {
    icon: "auto_stories",
    tag: "Grades 1–5",
    title: "Primary",
    body: "Strong literacy and numeracy with hands-on learning that turns ideas into experiences.",
  },
  {
    icon: "science",
    tag: "Grades 6–8",
    title: "Middle School",
    body: "Concept-first teaching across sciences, languages and the arts to build real understanding.",
  },
  {
    icon: "workspace_premium",
    tag: "Grades 9–10",
    title: "Secondary",
    body: "Focused board preparation paired with mentoring, life skills and career awareness.",
  },
];

const FEATURES = [
  {
    icon: "menu_book",
    title: "NEP-Aligned Curriculum",
    body: "A modern framework that values understanding over rote, and skills over memorisation.",
  },
  {
    icon: "cast_for_education",
    title: "Smart Classrooms",
    body: "Interactive digital boards bring abstract concepts to life with visuals and simulation.",
  },
  {
    icon: "groups",
    title: "Low Student–Teacher Ratio",
    body: "Small classes mean every child is known, supported and given room to ask questions.",
  },
  {
    icon: "biotech",
    title: "Science & Computer Labs",
    body: "Dedicated, well-equipped labs make experimentation a regular part of learning.",
  },
  {
    icon: "palette",
    title: "Arts & Languages",
    body: "Music, art and language are core to the timetable — not afterthoughts.",
  },
  {
    icon: "monitoring",
    title: "Continuous Assessment",
    body: "Regular, supportive evaluation that tracks growth and guides each learner forward.",
  },
];

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        crumb="Academics"
        cards={[
          { img: "/assets/science-exhibition.jpg", label: "Science Exhibition", d: "NEP", m: "Aligned" },
          { img: "/assets/award-winners.jpg", label: "Our Toppers", d: "100%", m: "Pass" },
          { img: "/assets/annual-day-dance.jpg", label: "Beyond Books", d: "20+", m: "Activities" },
        ]}
        overline="Teaching & Learning"
        title="An education that builds"
        highlight="real understanding."
        subtitle="From the first day of pre-primary to the board exams, our NEP-aligned programme keeps curiosity at the centre."
      />

      {/* Stages */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="Academic Stages"
            title="A continuous path,"
            highlight="stage by stage"
            subtitle="Each stage is designed to meet children where they are — and gently stretch them to where they can be."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {STAGES.map((s, i) => (
              <div
                key={s.title}
                className="tilt-wrap reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="tilt h-full lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright mb-5">
                    <Icon name={s.icon} className="text-3xl" />
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-secondary-bright">
                    {s.tag}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1.5 mb-2.5">
                    {s.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] px-8">
        <Container>
          <SectionHeading
            center
            overline="How we teach"
            title="The building blocks of a"
            highlight="great classroom"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.07} />
            ))}
          </div>
        </Container>
      </section>

      {/* Pledge / quote band */}
      <section className="py-20 md:py-[120px] bg-primary text-white px-8 overflow-hidden">
        <Container className="max-w-3xl text-center reveal">
          <Icon
            name="format_quote"
            className="text-secondary text-6xl opacity-50"
          />
          <p className="font-display italic text-2xl md:text-3xl leading-relaxed text-white/90 my-6">
            We don&apos;t just prepare students for exams — we prepare them for the
            questions life will ask long after the marks are forgotten.
          </p>
          <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
            The Academic Team
          </p>
        </Container>
      </section>

      <StatBand
        stats={[
          { count: 100, suffix: "%", label: "Board Pass Rate" },
          { count: 45, suffix: "+", label: "Qualified Faculty" },
          { count: 20, suffix: "+", label: "Subjects & Activities" },
          { count: 12, label: "Grades Offered" },
        ]}
      />

      <CTABanner
        title="Curious about our curriculum?"
        subtitle="Talk to our academic counsellors"
        ctaLabel="Request a callback"
        ctaHref="/contact"
      />
    </>
  );
}
