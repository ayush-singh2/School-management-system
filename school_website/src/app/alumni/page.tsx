import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import {
  Container,
  PageHero,
  SectionHeading,
  StatBand,
  CTABanner,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Alumni Network | Jitendra Public School, Madhepura",
  description:
    "Reconnect with Jitendra Public School. Meet our alumni, read their stories, register with the network and join reunions and mentorship.",
};

const ACHIEVERS = [
  {
    img: "/assets/award-winners.jpg",
    label: "Our Proud Achievers",
    sub: "Annual prize distribution",
  },
  {
    img: "/assets/topper-felicitation.jpg",
    label: "Topper Felicitation",
    sub: "Celebrating academic excellence",
  },
  {
    img: "/assets/director-award-student.jpg",
    label: "Director's Award",
    sub: "Recognising student talent",
  },
  {
    img: "/assets/science-exhibition.jpg",
    label: "Young Innovators",
    sub: "Science exhibition",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The teachers here didn't just teach subjects — they taught my child to believe in herself. The values she learned at JPS stay with her every day.",
    name: "A Proud Parent",
    batch: "Jitendra Public School",
  },
  {
    quote:
      "From the labs and stage at JPS to college and beyond — the curiosity this school gave me never switched off. I'll always be grateful for those years.",
    name: "An Alumnus",
    batch: "Jitendra Public School",
  },
];

const PERKS = [
  { icon: "groups", title: "Reunions", body: "Annual get-togethers to relive memories and meet old friends." },
  { icon: "school", title: "Mentorship", body: "Guide current students through talks, sessions and advice." },
  { icon: "volunteer_activism", title: "Give Back", body: "Support scholarships and campus initiatives for juniors." },
];

export default function AlumniPage() {
  return (
    <>
      <PageHero
        crumb="Alumni Network"
        cta={{ label: "Join the Network", href: "#register" }}
        cards={[
          { img: "/assets/award-winners.jpg", label: "Our Achievers", d: "2000+", m: "Alumni" },
          { img: "/assets/topper-felicitation.jpg", label: "Our Toppers", d: "13+", m: "Batches" },
          { img: "/assets/director-award-student.jpg", label: "Director's Award", d: "★", m: "Pride" },
        ]}
        overline="Once a JPS student, always family"
        title="Where our students"
        highlight="go next."
        subtitle="Our alumni are doctors, engineers, teachers, entrepreneurs and leaders — and the bond with their school never fades."
      />

      {/* Notable alumni */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHeading
            center
            overline="Pride of JPS"
            title="Where our students"
            highlight="shine"
            subtitle="Every year our students step onto the stage to be celebrated — the start of journeys that carry them far beyond Madhepura."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
            {ACHIEVERS.map((a, i) => (
              <div
                key={a.label}
                className="reveal group"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden border border-secondary/15 shadow-xl">
                  <Image
                    alt={a.label}
                    src={a.img}
                    fill
                    sizes="(max-width: 768px) 50vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                    <p className="text-secondary text-[10px] uppercase tracking-[0.2em] font-bold">
                      {a.sub}
                    </p>
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {a.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-[120px] bg-primary text-white overflow-hidden">
        <Container>
          <SectionHeading
            dark
            center
            overline="In their words"
            title="Stories that"
            highlight="travelled far"
          />
          <div className="grid md:grid-cols-2 gap-4 sm:gap-7">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`${i % 2 ? "reveal-right" : "reveal-left"} glass-gold shimmer rounded-[36px] p-9 shadow-2xl`}
              >
                <Icon
                  name="format_quote"
                  className="text-secondary text-5xl opacity-50"
                />
                <p className="font-display italic text-xl leading-relaxed text-white/90 my-5">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-px bg-secondary" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold">
                      {t.batch}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Perks */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHeading
            center
            overline="Stay connected"
            title="Ways to"
            highlight="stay involved"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-7">
            {PERKS.map((p, i) => (
              <div
                key={p.title}
                className="reveal text-center lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="grid place-items-center w-16 h-16 mx-auto rounded-2xl bg-secondary/20 text-secondary-bright mb-5">
                  <Icon name={p.icon} className="text-3xl" />
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2.5">
                  {p.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Register */}
      <section id="register" className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] scroll-mt-24">
        <Container className="max-w-3xl">
          <SectionHeading
            center
            overline="Join the network"
            title="Register as an"
            highlight="alumnus"
            subtitle="Add yourself to the JPS alumni directory and we'll keep you posted about reunions, mentorship drives and events."
          />
          <LeadForm
            submitLabel="Join the network"
            note="Your details are kept private and used only for alumni updates."
            fields={[
              { name: "name", label: "Full name", required: true },
              { name: "batch", label: "Passing year / batch", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "profession", label: "Current profession / city", full: true },
              { name: "memory", label: "A favourite memory of JPS", type: "textarea", full: true },
            ]}
          />
        </Container>
      </section>

      <StatBand
        stats={[
          { count: 2000, suffix: "+", label: "Alumni Worldwide" },
          { count: 13, suffix: "+", label: "Graduating Batches" },
          { count: 100, suffix: "+", label: "In Higher Studies" },
          { count: 1, label: "Lifelong Family" },
        ]}
      />

      <CTABanner
        title="Were you once a JPS student?"
        subtitle="We'd love to hear where life has taken you"
        ctaLabel="Reconnect with us"
        ctaHref="/contact"
      />
    </>
  );
}
