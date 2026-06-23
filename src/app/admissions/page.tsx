import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import Accordion from "@/components/Accordion";
import {
  Container,
  PageHero,
  SectionHeading,
  CTABanner,
  Overline,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Admissions 2026–27 | Jitendra Public School, Madhepura",
  description:
    "Admissions are open for session 2026–27. View the process, age criteria, fee structure and apply online to Jitendra Public School, Madhepura.",
};

const STEPS = [
  {
    n: "01",
    icon: "edit_document",
    title: "Enquire & Apply",
    body: "Fill the online enquiry form below or collect a form from the school office.",
  },
  {
    n: "02",
    icon: "fact_check",
    title: "Submit Documents",
    body: "Share the child's birth certificate, photos and previous records (if any).",
  },
  {
    n: "03",
    icon: "diversity_3",
    title: "Interaction",
    body: "A warm, informal interaction with the child and parents to understand needs.",
  },
  {
    n: "04",
    icon: "celebration",
    title: "Confirm Seat",
    body: "On selection, complete the admission formalities and fee payment to confirm.",
  },
];

const CRITERIA = [
  { cls: "Pre-Nursery", age: "3 years" },
  { cls: "Nursery", age: "3–4 years" },
  { cls: "LKG", age: "4–5 years" },
  { cls: "UKG", age: "5–6 years" },
  { cls: "Class 1", age: "6+ years" },
];

const FEES = [
  {
    tier: "Pre-Primary",
    note: "Nursery – UKG",
    points: ["Admission kit included", "Activity & material fee", "Monthly tuition"],
  },
  {
    tier: "Primary",
    note: "Grades 1 – 5",
    points: ["Smart-class access", "Lab & library", "Monthly tuition"],
    featured: true,
  },
  {
    tier: "Secondary",
    note: "Grades 6 – 10",
    points: ["All labs & activities", "Board exam support", "Monthly tuition"],
  },
];

const FAQ = [
  {
    q: "When do admissions open for the new session?",
    a: "Admissions for session 2026–27 are open now. Seats are limited across all classes, so early applications are strongly encouraged.",
  },
  {
    q: "What documents are required?",
    a: "The child's birth certificate, two passport-size photographs, Aadhaar (if available) and the previous school's report card or transfer certificate for higher classes.",
  },
  {
    q: "Is there an entrance test?",
    a: "For pre-primary and primary there is a friendly interaction rather than a formal test. For higher grades a simple assessment helps us place the child appropriately.",
  },
  {
    q: "Do you provide transport?",
    a: "Yes. School transport covers major routes across Madhepura. Route and stop details are shared at the time of admission.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        crumb="Admissions"
        cards={[
          { img: "/assets/admissions-desk.jpg", label: "Admissions Open", d: "26", m: "–27" },
          { img: "/assets/topper-felicitation.jpg", label: "Celebrating Toppers", d: "Now", m: "Apply" },
          { img: "/assets/award-winners.jpg", label: "Join the Family", d: "1000+", m: "Students" },
        ]}
        overline="Session 2026–27"
        title="Admissions are"
        highlight="open."
        subtitle="A simple, supportive process designed for parents — with limited seats across all classes. Begin your child's journey today."
      />

      {/* Process */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="How it works"
            title="Four simple"
            highlight="steps"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="reveal relative lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="absolute top-6 right-7 font-display text-5xl font-bold text-secondary/30">
                  {s.n}
                </span>
                <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright mb-5">
                  <Icon name={s.icon} className="text-3xl" />
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2.5">
                  {s.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Criteria + Prospectus */}
      <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] px-8">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <Overline className="mb-4">Age Criteria</Overline>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
              Minimum age by class
            </h2>
            <div className="rounded-[28px] overflow-hidden border border-secondary/15 bg-white shadow-xl">
              {CRITERIA.map((c, i) => (
                <div
                  key={c.cls}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i % 2 ? "bg-secondary/5" : "bg-white"
                  }`}
                >
                  <span className="font-semibold text-primary flex items-center gap-3">
                    <Icon name="school" className="text-secondary text-lg" />
                    {c.cls}
                  </span>
                  <span className="text-on-surface/75 text-sm">
                    as on 31 March · {c.age}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-on-surface/75 text-xs mt-4">
              Age criteria follow NEP guidelines. Final placement is confirmed by
              the school office.
            </p>
          </div>

          <div className="reveal-right relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-[40px] blur-3xl opacity-40" />
            <div className="relative rounded-[36px] overflow-hidden border border-secondary/20 shadow-2xl bg-white">
              <Image
                src="/assets/prospectus.png"
                alt="School prospectus 2026–27"
                width={680}
                height={460}
                className="w-full object-cover"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="p-7 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary">
                    Prospectus 2026–27
                  </h3>
                  <p className="text-on-surface/60 text-sm">
                    Everything about fees, dates & rules.
                  </p>
                </div>
                <a
                  href="/assets/prospectus.png"
                  download
                  className="magnetic btn-gold inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all shrink-0"
                >
                  <Icon name="download" /> Download
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Fees */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="Fee Structure"
            title="Transparent fees,"
            highlight="real value"
            subtitle="Detailed, class-wise fee sheets are available with the prospectus and at the school office."
          />
          <div className="grid md:grid-cols-3 gap-7">
            {FEES.map((f) => (
              <div
                key={f.tier}
                className={`reveal rounded-[28px] p-8 bg-primary text-white border shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)] ${
                  f.featured
                    ? "border-secondary-bright/70 ring-2 ring-secondary/40"
                    : "border-secondary/25"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-secondary-bright">
                  {f.note}
                </span>
                <h3 className="font-display text-2xl font-bold mt-1.5 mb-5 text-white">
                  {f.tier}
                </h3>
                <ul className="space-y-3 mb-6">
                  {f.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <Icon
                        name="check_circle"
                        className="text-secondary-bright text-lg"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="/assets/prospectus.png"
                  download
                  className="inline-flex items-center gap-2 font-bold text-sm text-secondary-bright hover:gap-3 transition-all"
                >
                  View fee sheet <Icon name="arrow_forward" />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Apply form */}
      <section id="apply" className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] px-8">
        <Container className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <div className="reveal-left lg:sticky lg:top-28">
            <SectionHeading
              overline="Apply Online"
              title="Start your"
              highlight="application"
              subtitle="Fill in a few details and our admissions team will reach out to guide you through the rest."
            />
            <div className="relative h-56 rounded-[28px] overflow-hidden border border-secondary/15 shadow-xl">
              <Image
                src="/assets/admissions-desk.jpg"
                alt="Admissions counselling desk at Jitendra Public School"
                fill
                sizes="500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-display text-lg font-bold leading-tight">
                  A warm, guided process
                </p>
                <p className="text-white/70 text-sm">
                  Our team helps parents at every step.
                </p>
              </div>
            </div>
          </div>
          <LeadForm
            submitLabel="Submit application"
            note="We'll respond within one working day."
            fields={[
              { name: "parent", label: "Parent / Guardian name", required: true },
              { name: "child", label: "Child's name", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "email", label: "Email", type: "email" },
              {
                name: "class",
                label: "Class applying for",
                required: true,
                options: [
                  "Pre-Nursery",
                  "Nursery",
                  "LKG",
                  "UKG",
                  "Class 1–5",
                  "Class 6–10",
                ],
              },
              { name: "city", label: "City / Locality" },
              { name: "message", label: "Anything we should know?", type: "textarea", full: true },
            ]}
          />
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-[120px] px-8">
        <Container className="max-w-3xl">
          <SectionHeading
            center
            overline="Good to know"
            title="Frequently asked"
            highlight="questions"
          />
          <div className="reveal">
            <Accordion items={FAQ} />
          </div>
        </Container>
      </section>

      <CTABanner
        title="Seats are limited — don't wait."
        subtitle="Admissions open for session 2026–27"
        ctaLabel="Talk to admissions"
        ctaHref="/contact"
      />
    </>
  );
}
