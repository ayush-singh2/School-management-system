import Link from "next/link";
import Icon from "../Icon";

export default function Admissions() {
  return (
    <section
      id="admissions"
      className="py-20 md:py-[120px] px-8 bg-gradient-to-b from-[#d6e1f3] to-[#e8eefa]"
    >
      <div className="mx-auto max-w-[1500px] grid md:grid-cols-2 gap-4 sm:gap-7">
        <div className="reveal-left lux-card bg-primary text-white shimmer rounded-[40px] p-10 flex flex-col gap-5 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright border border-secondary/30">
            <Icon name="assignment_turned_in" className="text-3xl" />
          </span>
          <h3 className="font-display text-xl font-bold text-white">
            Admissions open — Session 2026–27
          </h3>
          <p className="text-white/75 text-sm leading-relaxed">
            Apply online as per the guidelines and age criteria prescribed by the
            NEP. Seats are limited across all classes — early applications are
            encouraged.
          </p>
          <Link
            href="/admissions"
            className="magnetic btn-gold inline-flex w-fit items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-all"
          >
            Apply Online <Icon name="arrow_forward" />
          </Link>
        </div>
        <div className="reveal-right lux-card bg-primary text-white shimmer rounded-[40px] p-10 flex flex-col gap-5 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright border border-secondary/30">
            <Icon name="smartphone" className="text-3xl" />
          </span>
          <h3 className="font-display text-xl font-bold text-white">
            Download the official JPS app
          </h3>
          <p className="text-white/75 text-sm leading-relaxed">
            Stay connected with the school — get notices, updates and results
            delivered directly to your phone, anytime.
          </p>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 px-7 py-3.5 rounded-full font-bold text-secondary-bright border border-secondary/40 hover:bg-secondary hover:text-primary transition-colors"
          >
            Get it on Google Play <Icon name="arrow_forward" />
          </a>
        </div>
      </div>
    </section>
  );
}
