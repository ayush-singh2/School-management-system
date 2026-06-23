import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-[120px] px-8">
      <div className="mx-auto max-w-[1500px] grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal-left relative">
          <div className="absolute -inset-5 bg-secondary/20 rounded-[48px] blur-3xl opacity-40" />
          <div className="relative rounded-[44px] overflow-hidden shadow-2xl border border-secondary/20">
            <Image
              alt="Jitendra Public School — flag hoisting assembly on campus"
              className="w-full h-[460px] object-cover"
              src="/assets/flag-hoisting.jpg"
              width={720}
              height={460}
              style={{ width: "100%", height: "460px" }}
            />
          </div>
          <div className="absolute -top-6 -left-6 floaty w-28 h-28 rounded-full bg-primary border-2 border-secondary grid place-items-center text-center shadow-2xl">
            <div>
              <div className="font-display text-2xl font-bold text-secondary">
                2012
              </div>
              <div className="text-[8px] uppercase tracking-[0.2em] text-white/60">
                Founded
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-4 glass-light shimmer rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3">
            <Icon name="verified" className="text-secondary" />
            <div className="leading-tight">
              <div className="font-bold text-primary text-sm">Hansi Rani Trust</div>
              <div className="text-[10px] uppercase tracking-widest text-on-surface/65">
                Managed With Care
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-right space-y-6">
          <span className="inline-block text-secondary font-bold uppercase tracking-[0.25em] text-xs border-l-4 border-secondary pl-4">
            About Our School
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
            A school built on memory,
            <br />
            <span className="italic text-gradient-gold">raised on values.</span>
          </h2>
          <p className="text-lg text-on-surface/75 leading-relaxed">
            Jitendra Public School was established in <strong>2012</strong> in the
            loving memory of Late <strong>Jitendra Narayan Sinha</strong>. Nestled
            in the heart of Madhepura at Shastri Nagar, we offer a nurturing
            environment where students are encouraged to ask <em>“why”</em>, build
            resilience, and grow into confident, compassionate individuals.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/15">
              <Icon name="check_circle" className="text-secondary" />
              <span className="text-sm font-semibold text-primary">
                State Recognised
              </span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/15">
              <Icon name="menu_book" className="text-secondary" />
              <span className="text-sm font-semibold text-primary">NEP Aligned</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <Link
              href="/about"
              className="magnetic btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all"
            >
              Discover Our Story <Icon name="arrow_forward" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
