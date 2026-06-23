import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import {
  Container,
  PageHero,
  SectionHeading,
  StatBand,
  CTABanner,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Student Life | Jitendra Public School, Madhepura",
  description:
    "Houses, clubs, sports, arts and a calendar full of events — the vibrant life beyond the classroom at Jitendra Public School.",
};

const HOUSES = [
  { name: "Surya", color: "#c0392b", trait: "Courage", icon: "wb_sunny" },
  { name: "Prithvi", color: "#1f7a4d", trait: "Discipline", icon: "public" },
  { name: "Vayu", color: "#2e6fb0", trait: "Teamwork", icon: "air" },
  { name: "Agni", color: "#c5a059", trait: "Excellence", icon: "local_fire_department" },
];

const CLUBS = [
  { icon: "science", title: "Science & Eco Club", body: "Experiments, model-making and projects that care for the planet." },
  { icon: "palette", title: "Art & Craft", body: "Painting, clay and craft that let imagination run free." },
  { icon: "music_note", title: "Music & Dance", body: "Vocal, instrumental and dance for every stage performance." },
  { icon: "sports_cricket", title: "Sports", body: "Cricket, football, kabaddi, athletics and indoor games." },
  { icon: "menu_book", title: "Literary Club", body: "Debates, elocution, creative writing and the school magazine." },
  { icon: "smart_toy", title: "Computer & Robotics", body: "Coding basics, typing and hands-on tech tinkering." },
];

const EVENTS = [
  {
    month: "APR",
    title: "Annual Day",
    body: "A grand showcase of music, dance and drama by every grade.",
    img: "/assets/annual-day-dance.jpg",
  },
  {
    month: "AUG",
    title: "Independence Day",
    body: "Flag hoisting, parade and patriotic cultural performances.",
    img: "/assets/independence-day.jpg",
  },
  {
    month: "DEC",
    title: "Christmas Celebration",
    body: "Our littlest students dress up and spread festive cheer across campus.",
    img: "/assets/christmas.jpg",
  },
  {
    month: "JAN",
    title: "Science Exhibition",
    body: "Student-led models and experiments on display for parents.",
    img: "/assets/science-exhibition.jpg",
  },
];

const GALLERY = [
  { src: "/assets/feast-students.jpg", label: "Community Feast" },
  { src: "/assets/speech-competition.jpg", label: "Speech Competition" },
  { src: "/assets/preprimary-festival.jpg", label: "Pre-Primary Festival" },
  { src: "/assets/felicitation-stage.jpg", label: "Felicitation Ceremony" },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        crumb="Student Life"
        cta={{ label: "Apply for 2026–27", href: "/admissions" }}
        cards={[
          { img: "/assets/annual-day-dance.jpg", label: "Annual Day", d: "Apr", m: "Stage" },
          { img: "/assets/christmas.jpg", label: "Christmas Joy", d: "24", m: "Dec" },
          { img: "/assets/speech-competition.jpg", label: "Elocution Contest", d: "15+", m: "Clubs" },
        ]}
        overline="Beyond the Classroom"
        title="Where childhood is"
        highlight="celebrated."
        subtitle="Houses, clubs, sport and a calendar bursting with events — because confidence is built as much on the field and the stage as in the classroom."
      />

      {/* Houses */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHeading
            center
            overline="The House System"
            title="Four houses,"
            highlight="one family"
            subtitle="Every student belongs to a house — a smaller family within the school that builds belonging, leadership and healthy competition."
          />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7">
            {HOUSES.map((h, i) => (
              <div
                key={h.name}
                className="reveal relative overflow-hidden rounded-[28px] p-8 text-white shadow-[0_20px_50px_-20px_rgba(13,27,52,0.35)]"
                style={{
                  background: `linear-gradient(160deg, ${h.color}, ${h.color}cc)`,
                  transitionDelay: `${i * 0.08}s`,
                }}
              >
                <Icon name={h.icon} className="text-4xl mb-4 opacity-90" />
                <h3 className="font-display text-2xl font-bold">{h.name}</h3>
                <p className="text-white/80 text-sm uppercase tracking-[0.2em] mt-1">
                  {h.trait}
                </p>
                <span className="absolute -bottom-6 -right-4 text-white/10">
                  <Icon name={h.icon} className="text-[120px]" />
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Clubs */}
      <section className="py-20 md:py-[120px] bg-gradient-to-b from-[#e8eefa] to-[#d6e1f3]">
        <Container>
          <SectionHeading
            center
            overline="Clubs & Activities"
            title="A place for every"
            highlight="passion"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-7">
            {CLUBS.map((c, i) => (
              <div
                key={c.title}
                className="reveal flex gap-5 lux-card bg-primary text-white rounded-[24px] p-7 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]"
                style={{ transitionDelay: `${i * 0.06}s` }}
              >
                <span className="grid place-items-center w-14 h-14 shrink-0 rounded-xl bg-secondary/20 text-secondary-bright">
                  <Icon name={c.icon} className="text-2xl" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1.5">
                    {c.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Events */}
      <section className="py-20 md:py-[120px]">
        <Container>
          <SectionHeading
            center
            overline="School Calendar"
            title="Moments we"
            highlight="look forward to"
          />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-7">
            {EVENTS.map((e, i) => (
              <div
                key={e.title}
                className="reveal group bg-primary text-white rounded-[28px] overflow-hidden border border-secondary/20"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={e.img}
                    alt={e.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-gold font-display text-sm font-bold text-secondary-bright">
                    {e.month}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold mb-2">{e.title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="pb-20 md:pb-[120px]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={g.src}
                className="reveal relative h-56 overflow-hidden rounded-[24px] border border-secondary/20 group"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <Image
                  alt={g.label}
                  src={g.src}
                  fill
                  sizes="(max-width: 768px) 50vw, 300px"
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
          { count: 4, label: "Houses" },
          { count: 15, suffix: "+", label: "Clubs & Activities" },
          { count: 30, suffix: "+", label: "Events a Year" },
          { count: 50, suffix: "+", label: "Awards Won" },
        ]}
      />

      <CTABanner
        title="Give your child a fuller childhood."
        subtitle="Admissions open for session 2026–27"
        ctaLabel="Apply now"
        ctaHref="/admissions"
      />
    </>
  );
}
