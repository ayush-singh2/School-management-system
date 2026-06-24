import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import { Container, SectionHeading } from "../ui";

const MOMENTS = [
  { src: "/assets/flag-hoisting.jpg", label: "Republic Day Assembly", big: true },
  { src: "/assets/feast-students.jpg", label: "Annual Community Feast" },
  { src: "/assets/christmas.jpg", label: "Christmas Celebration" },
  { src: "/assets/feast-wide.jpg", label: "Community Lunch" },
  { src: "/assets/science-exhibition.jpg", label: "Science Exhibition" },
  { src: "/assets/award-winners.jpg", label: "Our Proud Achievers" },
  { src: "/assets/preprimary-festival.jpg", label: "Pre-Primary Festival" },
];

export default function MomentsGallery() {
  return (
    <section className="py-20 md:py-[120px]">
      <Container>
        <SectionHeading
          center
          overline="Life at JPS"
          title="Real moments,"
          highlight="real smiles"
          subtitle="A glimpse into everyday life and the celebrations that make Jitendra Public School feel like family."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4">
          {MOMENTS.map((m, i) => (
            <div
              key={m.src}
              className={`reveal group relative overflow-hidden rounded-[24px] border border-secondary/20 ${
                m.big ? "col-span-2 row-span-2" : ""
              }`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <Image
                src={m.src}
                alt={m.label}
                fill
                sizes="(max-width: 768px) 50vw, 360px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                <span className="text-white font-semibold text-sm leading-tight">
                  {m.label}
                </span>
              </div>
            </div>
          ))}
          <Link
            href="/student-life"
            className="reveal group relative overflow-hidden rounded-[24px] bg-primary border border-secondary/30 grid place-items-center text-center p-4"
          >
            <div>
              <span className="grid place-items-center w-12 h-12 mx-auto rounded-full bg-secondary/15 text-secondary mb-3 group-hover:bg-secondary group-hover:text-primary transition-colors">
                <Icon name="arrow_outward" />
              </span>
              <span className="text-white font-display font-bold">
                See student life
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
