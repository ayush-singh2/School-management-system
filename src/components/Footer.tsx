import Link from "next/link";
import Icon from "./Icon";

const EXPLORE = [
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/infrastructure", label: "Infrastructure" },
];
const MORE = [
  { href: "/student-life", label: "Student Life" },
  { href: "/alumni", label: "Alumni Network" },
  { href: "/contact", label: "Contact" },
  { href: "/admissions", label: "Apply Online" },
];

export default function Footer() {
  return (
    <footer className="bg-primary-deep text-white border-t border-secondary/20">
      {/* top CTA strip */}
      <div className="border-b border-secondary/20">
        <div className="mx-auto max-w-[1500px] px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-secondary/15 text-secondary border border-secondary/25">
              <Icon name="mail" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-white">
                Have a question about admissions?
              </p>
              <p className="text-white/55 text-sm">
                Our team is happy to guide you through every step.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="magnetic btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-all shrink-0"
          >
            Get in touch <Icon name="arrow_forward" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-8 grid md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-full border border-secondary text-secondary">
              <Icon name="school" className="text-base" />
            </span>
            <span className="font-display text-lg font-bold text-secondary">
              Jitendra Public School
            </span>
          </div>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm">
            Established 2012 in loving memory of Late Jitendra Narayan Sinha —
            committed to quality education and shaping responsible, compassionate
            citizens of tomorrow.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="grid place-items-center w-10 h-10 rounded-full border border-secondary/30 hover:bg-secondary hover:text-primary transition-colors"
            >
              <Icon name="thumb_up" className="text-base" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="grid place-items-center w-10 h-10 rounded-full border border-secondary/30 hover:bg-secondary hover:text-primary transition-colors"
            >
              <Icon name="play_circle" className="text-base" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="grid place-items-center w-10 h-10 rounded-full border border-secondary/30 hover:bg-secondary hover:text-primary transition-colors"
            >
              <Icon name="photo_camera" className="text-base" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            Explore
          </h4>
          <ul className="space-y-3 text-white/55 text-sm">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link
                  className="hover:text-secondary transition-colors"
                  href={l.href}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 text-white/55 text-sm">
            {MORE.map((l) => (
              <li key={l.label}>
                <Link
                  className="hover:text-secondary transition-colors"
                  href={l.href}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            Reach Us
          </h4>
          <ul className="space-y-3 text-white/55 text-sm">
            <li className="flex gap-3">
              <Icon name="location_on" className="text-secondary text-base shrink-0" />
              Shastri Nagar, Ward No. 19, Madhepura, Bihar
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="text-secondary text-base shrink-0" />
              +91 94300 28159
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="text-secondary text-base shrink-0" />
              info@jpsmadhepura.com
            </li>
            <li className="flex gap-3">
              <Icon name="schedule" className="text-secondary text-base shrink-0" />
              Mon–Sat: 8:00 AM – 2:00 PM
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-8 py-6 border-t border-secondary/20 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <p>© 2026 Jitendra Public School. All rights reserved.</p>
        <p>Managed by Hansi Rani Educational Trust</p>
      </div>
    </footer>
  );
}
