import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Leadership from "@/components/sections/Leadership";
import {
  Container,
  PageHero,
  SectionHeading,
  FeatureCard,
  StatBand,
  CTABanner,
  Overline,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us | Jitendra Public School, Madhepura",
  description:
    "The story of Jitendra Public School — founded in 2012 in loving memory of Late Jitendra Narayan Sinha, managed by the Hansi Rani Educational Trust.",
};

const VALUES = [
  {
    icon: "psychology",
    title: "Curiosity",
    body: "We protect the instinct to wonder and question — the true engine of lifelong learning.",
  },
  {
    icon: "favorite",
    title: "Character",
    body: "Empathy, honesty and discipline are taught with the same care as any subject.",
  },
  {
    icon: "groups",
    title: "Community",
    body: "Teachers, parents and students move forward together as one extended family.",
  },
  {
    icon: "workspace_premium",
    title: "Excellence",
    body: "High expectations, warm support and a refusal to let any child be left behind.",
  },
];

const MILESTONES = [
  { year: "2012", text: "School founded in memory of Late Jitendra Narayan Sinha." },
  { year: "2015", text: "Expanded to full primary wing with dedicated activity rooms." },
  { year: "2019", text: "Smart classrooms and science & computer labs introduced." },
  { year: "2023", text: "Crossed 1,000 students with a 100% board pass record." },
  { year: "2026", text: "NEP-aligned curriculum rolled out across all grades." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        cards={[
          { img: "/assets/flag-hoisting.jpg", label: "Our Campus", d: "2012", m: "Since" },
          { img: "/assets/director-couple.jpg", label: "Our Director", d: "JPS", m: "Lead" },
          { img: "/assets/award-winners.jpg", label: "Our Pride", d: "100%", m: "Result" },
        ]}
        overline="Our Story"
        title="A school built on memory,"
        highlight="raised on values."
        subtitle="Jitendra Public School was born from love and remembrance — and grew into a place where every child is seen, challenged and cared for."
      />

      {/* Founder / story */}
      <section className="py-20 md:py-[120px] px-8">
        <Container className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-left relative">
            <div className="absolute -inset-5 bg-secondary/20 rounded-[48px] blur-3xl opacity-40" />
            <div className="relative rounded-[44px] overflow-hidden shadow-2xl border border-secondary/20">
              <Image
                alt="Jitendra Public School campus during a flag-hoisting assembly"
                src="/assets/flag-hoisting.jpg"
                width={720}
                height={500}
                className="w-full object-cover"
                style={{ width: "100%", height: "500px" }}
              />
            </div>
            <div className="absolute -bottom-6 -right-4 glass-light shimmer rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
              <Icon name="verified" className="text-secondary" />
              <div className="leading-tight">
                <div className="font-bold text-primary text-sm">
                  Hansi Rani Educational Trust
                </div>
                <div className="text-[10px] uppercase tracking-widest text-on-surface/65">
                  Managed With Care
                </div>
              </div>
            </div>
          </div>
          <div className="reveal-right space-y-6">
            <Overline className="border-l-4 border-secondary pl-4">
              In Loving Memory
            </Overline>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
              Honouring{" "}
              <span className="italic text-gradient-gold">
                Late Jitendra Narayan Sinha.
              </span>
            </h2>
            <p className="text-lg text-on-surface/75 leading-relaxed">
              In <strong>2012</strong>, the family established Jitendra Public
              School in the loving memory of Late Jitendra Narayan Sinha — a man who
              believed that the greatest gift you can give a child is the confidence
              to think for themselves.
            </p>
            <p className="text-on-surface/75 leading-relaxed">
              Nestled at Shastri Nagar in the heart of Madhepura, the school is run
              by the Hansi Rani Educational Trust. From a handful of classrooms it
              has grown into one of the region&apos;s most trusted institutions —
              without ever losing the warmth it was founded on.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/15">
                <Icon name="check_circle" className="text-secondary" />
                <span className="text-sm font-semibold text-primary">
                  State Recognised
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/15">
                <Icon name="menu_book" className="text-secondary" />
                <span className="text-sm font-semibold text-primary">
                  NEP Aligned
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] px-8">
        <Container>
          <div className="grid md:grid-cols-2 gap-7">
            <div className="reveal-left lux-card bg-primary text-white shimmer rounded-[40px] p-10 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright border border-secondary/30 mb-6">
                <Icon name="visibility" className="text-3xl" />
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Our Vision
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">
                To nurture confident, compassionate and curious individuals who
                carry their values into the world and lead lives of purpose and
                integrity.
              </p>
            </div>
            <div className="reveal-right lux-card bg-primary text-white shimmer rounded-[40px] p-10 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright border border-secondary/30 mb-6">
                <Icon name="flag" className="text-3xl" />
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">
                To deliver a modern, value-driven education in a safe and joyful
                environment — pairing academic rigour with the arts, sports and
                strong character.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="What we stand for"
            title="Four values at the"
            highlight="heart of everything"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {VALUES.map((v, i) => (
              <FeatureCard key={v.title} {...v} delay={i * 0.08} />
            ))}
          </div>
        </Container>
      </section>

      {/* Milestones */}
      <section className="py-20 md:py-[120px] bg-primary text-white px-8 overflow-hidden">
        <Container>
          <SectionHeading
            dark
            overline="Our Journey"
            title="A timeline of"
            highlight="quiet milestones"
          />
          <div className="relative space-y-8 before:absolute before:left-[15px] md:before:left-1/2 before:top-2 before:bottom-2 before:w-px before:bg-secondary/30">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`reveal relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div
                  className={`pl-10 md:pl-0 [direction:ltr] ${
                    i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"
                  }`}
                >
                  <div className="font-display text-3xl font-bold text-gradient-gold">
                    {m.year}
                  </div>
                  <p className="text-white/70 mt-1">{m.text}</p>
                </div>
                <span className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-secondary border-4 border-primary" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Leadership />

      <StatBand
        stats={[
          { count: 13, suffix: "+", label: "Years Since 2012" },
          { count: 1000, suffix: "+", label: "Students Enrolled" },
          { count: 45, suffix: "+", label: "Dedicated Educators" },
          { count: 100, suffix: "%", label: "Board Results" },
        ]}
      />

      <CTABanner
        title="Come see our story in person."
        subtitle="Campus visits welcome — Mon to Sat"
        ctaLabel="Plan a visit"
        ctaHref="/contact"
      />
    </>
  );
}
