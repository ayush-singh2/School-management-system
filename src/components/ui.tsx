import Link from "next/link";
import Icon from "./Icon";
import HeroVisuals from "./HeroVisuals";
import HeroCard, { type HangCard } from "./HeroCard";

/* ---------- Layout ---------- */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1500px] px-8 ${className}`}>{children}</div>
  );
}

/* ---------- Overline label ---------- */
export function Overline({
  children,
  className = "",
  tone = "onLight",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "onLight" | "onDark";
}) {
  const color = tone === "onDark" ? "text-secondary" : "text-[#94701f]";
  return (
    <span
      className={`inline-block ${color} font-bold uppercase tracking-[0.25em] text-xs ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  overline,
  title,
  highlight,
  subtitle,
  center = false,
  dark = false,
}: {
  overline?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`reveal max-w-2xl ${center ? "mx-auto text-center" : ""} mb-14`}
    >
      {overline && (
        <Overline className="mb-4" tone={dark ? "onDark" : "onLight"}>
          {overline}
        </Overline>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl font-bold leading-tight ${
          dark ? "text-white" : "text-primary"
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="italic text-gradient-gold">{highlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-white/75" : "text-on-surface/80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- Feature card (tilt) ---------- */
export function FeatureCard({
  icon,
  title,
  body,
  delay = 0,
}: {
  icon: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <div className="tilt-wrap reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="tilt h-full lux-card bg-primary text-white rounded-[28px] p-8 border border-secondary/25 shadow-[0_24px_55px_-22px_rgba(13,27,52,0.5)]">
        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-bright mb-5">
          <Icon name={icon} className="text-3xl" />
        </span>
        <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/75 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* ---------- Stat band ---------- */
export function StatBand({
  stats,
}: {
  stats: { count: number; suffix?: string; label: string }[];
}) {
  return (
    <section className="bg-primary text-white py-20">
      <Container className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="reveal text-center"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
              <span data-count={s.count} data-suffix={s.suffix ?? ""}>
                0
              </span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/55">
              {s.label}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* ---------- CTA banner ---------- */
export function CTABanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="px-8 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1500px] reveal-scale">
        <div className="relative overflow-hidden rounded-[48px] bg-primary border-2 border-secondary/40 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 20%,rgba(197,160,89,.5),transparent 50%)",
            }}
          />
          <div className="relative max-w-xl text-center md:text-left">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
              {subtitle}
            </p>
          </div>
          <Link
            href={ctaHref}
            className="relative magnetic btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all"
          >
            {ctaLabel} <Icon name="arrow_forward" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Interior page hero ---------- */
export function PageHero({
  overline,
  title,
  highlight,
  subtitle,
  crumb,
  cards,
}: {
  overline: string;
  title: string;
  highlight?: string;
  subtitle: string;
  crumb: string;
  cards?: HangCard[];
}) {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* deep space background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 70% 30%,#13233f 0%,#0b1729 50%,#060c18 100%)",
        }}
      />
      {/* one planet system — 3D when WebGL is available, else CSS */}
      <HeroVisuals compact />
      {/* left scrim keeps the heading readable over the planets */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg,#060c18 0%,rgba(8,15,28,0.78) 30%,rgba(8,15,28,0.2) 50%,transparent 64%)",
        }}
      />

      {cards && cards.length > 0 && (
        <HeroCard
          cards={cards}
          className="hidden xl:block absolute right-[5%] top-1/2 -translate-y-1/2 z-20"
        />
      )}

      <div className="relative z-10 max-w-[1500px] px-8 lg:px-16 min-h-[80vh] flex items-center pt-32 pb-16">
        <div className="w-full max-w-3xl">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Icon name="chevron_right" className="text-sm" />
            <span className="text-secondary">{crumb}</span>
          </nav>
          <Overline className="mb-5" tone="onDark">
            {overline}
          </Overline>
          <h1 className="font-display text-white font-bold leading-[1.05] text-[40px] sm:text-5xl xl:text-6xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="italic text-gradient-gold">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mt-6 text-white/80 text-lg leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
