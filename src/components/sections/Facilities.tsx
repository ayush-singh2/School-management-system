import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";

const FACILITIES = [
  {
    icon: "cast_for_education",
    title: "Smart Classes",
    body: "Interactive digital boards bring lessons to life with visual, modern learning tools.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
    alt: "Smart classes",
  },
  {
    icon: "menu_book",
    title: "Vast Library",
    body: "A rich collection of academic and reference books to nurture a lifelong love of reading.",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
    alt: "Library",
  },
  {
    icon: "sports_soccer",
    title: "Sports & Play",
    body: "Daily sports and physical activity build healthy bodies, teamwork and confident minds.",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    alt: "Sports facilities",
  },
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 md:py-[120px] px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block text-secondary font-bold uppercase tracking-[0.25em] text-xs mb-4">
            Our Facilities
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
            Everything a growing mind needs
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-7">
          {FACILITIES.map((f, i) => (
            <div
              key={f.title}
              className="tilt-wrap reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="tilt group bg-white rounded-[32px] overflow-hidden border border-secondary/20 shadow-[0_20px_50px_-20px_rgba(13,27,52,0.25)]">
                <div className="overflow-hidden h-52 relative">
                  <Image
                    alt={f.alt}
                    src={f.img}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-7">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-secondary/12 text-secondary mb-4">
                    <Icon name={f.icon} />
                  </span>
                  <h4 className="font-display text-xl font-bold text-primary mb-2">
                    {f.title}
                  </h4>
                  <p className="text-on-surface/75 text-sm leading-relaxed">
                    {f.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 reveal">
          <Link
            href="/infrastructure"
            className="magnetic btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all"
          >
            Tour the full campus <Icon name="arrow_forward" />
          </Link>
        </div>
      </div>
    </section>
  );
}
