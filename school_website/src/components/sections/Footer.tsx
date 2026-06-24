import Icon from "../Icon";

export default function Footer() {
  return (
    <footer className="bg-primary-deep text-white pt-20 pb-10 border-t border-secondary/20">
      <div className="mx-auto max-w-[1500px] px-8 grid md:grid-cols-4 gap-10 mb-14">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-full border border-secondary text-secondary">
              <Icon name="school" className="text-base" />
            </span>
            <span className="font-display text-lg font-bold text-secondary">
              Jitendra Public School
            </span>
          </div>
          <p className="text-white/55 text-sm leading-relaxed">
            Established 2012 — committed to quality education and shaping
            responsible, compassionate citizens of tomorrow.
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
          </div>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 text-white/55 text-sm">
            <li>
              <a className="hover:text-secondary transition-colors" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-secondary transition-colors" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a
                className="hover:text-secondary transition-colors"
                href="#admissions"
              >
                Admissions
              </a>
            </li>
            <li>
              <a
                className="hover:text-secondary transition-colors"
                href="#facilities"
              >
                Facilities
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            School Timing
          </h4>
          <div className="space-y-3 text-white/55 text-sm">
            <p>Mon – Sat: 8:00 AM – 2:00 PM</p>
            <p>Sunday: Closed</p>
            <div className="pt-4">
              <h4 className="text-secondary text-[11px] uppercase tracking-[0.2em] font-bold mb-1">
                Managed By
              </h4>
              <p>Hansi Rani Educational Trust</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-5">
            Contact Details
          </h4>
          <ul className="space-y-3 text-white/55 text-sm">
            <li className="flex gap-3">
              <Icon name="location_on" className="text-secondary text-base" />
              Shastri Nagar, Ward No. 19, Madhepura
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="text-secondary text-base" />
              +91 94300 28159
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="text-secondary text-base" />
              info@jpsmadhepura.com
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-8 pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <p>© 2026 Jitendra Public School. All rights reserved.</p>
        <p>Premium education for a brighter future.</p>
      </div>
    </footer>
  );
}
