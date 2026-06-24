import Icon from "../Icon";

export default function FinalCTA() {
  return (
    <section className="px-8 pb-20 md:pb-[120px]">
      <div className="mx-auto max-w-[1500px] reveal-scale">
        <div className="relative overflow-hidden rounded-[48px] bg-primary border-2 border-secondary/40 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 80% 20%,rgba(197,160,89,.5),transparent 50%)",
            }}
          />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
              <pattern
                id="cta-dots"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="2" fill="#c5a059" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>
          <div className="relative max-w-xl text-center md:text-left">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3">
              Ready to begin your child&apos;s journey?
            </h2>
            <p className="text-secondary uppercase tracking-[0.2em] text-xs font-bold">
              Enrollment open for session 2026–27
            </p>
          </div>
          <a
            href="#"
            className="relative magnetic btn-gold inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all"
          >
            Apply for 2026–27 <Icon name="arrow_forward" />
          </a>
        </div>
      </div>
    </section>
  );
}
