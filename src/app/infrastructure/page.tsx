import type { Metadata } from "next";
import Image from "next/image";
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
  title: "Infrastructure & Campus | Jitendra Public School, Madhepura",
  description:
    "Smart classrooms, science & computer labs, a vast library, sports grounds, safe transport and a caring, secure campus at Jitendra Public School.",
};

const FEATURED = [
  {
    title: "Smart Classrooms",
    body: "Every classroom is fitted with interactive digital boards that turn lessons into vivid, visual experiences.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=900&auto=format&fit=crop",
    icon: "cast_for_education",
  },
  {
    title: "Vast Library",
    body: "A calm, well-stocked library with academic and reference titles that nurture a lifelong love of reading.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=900&auto=format&fit=crop",
    icon: "menu_book",
  },
  {
    title: "Sports & Play",
    body: "Open grounds and daily physical activity that build healthy bodies, teamwork and confidence.",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=900&auto=format&fit=crop",
    icon: "sports_soccer",
  },
];

const MORE = [
  {
    icon: "biotech",
    title: "Science Labs",
    body: "Hands-on physics, chemistry and biology experiments in dedicated, well-equipped labs.",
  },
  {
    icon: "computer",
    title: "Computer Lab",
    body: "Modern computers and internet access build digital literacy from an early age.",
  },
  {
    icon: "directions_bus",
    title: "Safe Transport",
    body: "GPS-aware buses cover major routes across Madhepura with trained staff on board.",
  },
  {
    icon: "health_and_safety",
    title: "Safety & Security",
    body: "CCTV monitoring, secure entry and trained staff keep the campus safe all day.",
  },
  {
    icon: "local_hospital",
    title: "Medical Care",
    body: "A first-aid room and tie-ups for prompt medical attention when it's needed.",
  },
  {
    icon: "restaurant",
    title: "Clean Drinking Water",
    body: "RO-purified water and hygienic facilities across the entire campus.",
  },
];

const GALLERY = [
  { src: "/assets/flag-hoisting.jpg", label: "Morning Assembly Ground" },
  { src: "/assets/feast-wide.jpg", label: "Open-Air Dining Space" },
  { src: "/assets/feast-students.jpg", label: "Dining Hall" },
  { src: "/assets/preprimary-festival.jpg", label: "Pre-Primary Activity Hall" },
  { src: "/assets/christmas.jpg", label: "Activity & Play Room" },
  { src: "/assets/admissions-desk.jpg", label: "Reception & Admissions" },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        crumb="Infrastructure"
        cards={[
          { img: "/assets/flag-hoisting.jpg", label: "Assembly Ground", d: "30+", m: "Classes" },
          { img: "/assets/feast-wide.jpg", label: "Open-Air Dining", d: "RO", m: "Water" },
          { img: "/assets/preprimary-festival.jpg", label: "Activity Hall", d: "4", m: "Labs" },
        ]}
        overline="Our Campus"
        title="Everything a growing"
        highlight="mind needs."
        subtitle="A safe, modern and joyful campus — designed so that every space, indoors and out, helps a child learn and grow."
      />

      {/* Featured facilities */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="Flagship Facilities"
            title="Built for"
            highlight="real learning"
          />
          <div className="grid md:grid-cols-3 gap-7">
            {FEATURED.map((f, i) => (
              <div
                key={f.title}
                className="tilt-wrap reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="tilt group h-full lux-card bg-primary text-white rounded-[32px] overflow-hidden border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
                  <div className="overflow-hidden h-56 relative">
                    <Image
                      alt={f.title}
                      src={f.img}
                      fill
                      sizes="(max-width: 768px) 100vw, 460px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8">
                    <span className="grid place-items-center w-14 h-14 rounded-xl bg-secondary/20 text-secondary-bright mb-5">
                      <Icon name={f.icon} className="text-2xl" />
                    </span>
                    <h4 className="font-display text-xl font-bold text-white mb-2.5">
                      {f.title}
                    </h4>
                    <p className="text-white/75 text-sm leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* More facilities */}
      <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3] px-8">
        <Container>
          <SectionHeading
            center
            overline="More on campus"
            title="Care in every"
            highlight="corner"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {MORE.map((m, i) => (
              <FeatureCard key={m.title} {...m} delay={i * 0.07} />
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-[120px] px-8">
        <Container>
          <SectionHeading
            center
            overline="Campus Gallery"
            title="A look"
            highlight="around"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={g.src}
                className={`reveal relative overflow-hidden rounded-[24px] border border-secondary/20 group ${
                  i === 0 ? "col-span-2 row-span-2 h-full min-h-[280px]" : "h-48 md:h-56"
                }`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <Image
                  alt={g.label}
                  src={g.src}
                  fill
                  sizes="(max-width: 768px) 50vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <StatBand
        stats={[
          { count: 30, suffix: "+", label: "Smart Classrooms" },
          { count: 4, label: "Dedicated Labs" },
          { count: 100, suffix: "%", label: "CCTV Coverage" },
          { count: 10, suffix: "+", label: "Transport Routes" },
        ]}
      />

      <CTABanner
        title="See the campus for yourself."
        subtitle="Guided visits, Monday to Saturday"
        ctaLabel="Book a campus tour"
        ctaHref="/contact"
      />
    </>
  );
}
