"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import HeroVisuals from "./HeroVisuals";
import HeroCard, { type HangCard } from "./HeroCard";

const MORPH = ["path.", "voice.", "spark.", "future.", "light."];

// High-resolution photos only, so the card stays crisp
const HOME_CARDS: HangCard[] = [
  { img: "/assets/flag-hoisting.jpg", label: "Republic Day Assembly", d: "26", m: "Jan" },
  { img: "/assets/feast-students.jpg", label: "Annual Community Feast", d: "14", m: "Nov" },
  { img: "/assets/christmas.jpg", label: "Christmas Celebration", d: "24", m: "Dec" },
  { img: "/assets/award-winners.jpg", label: "Annual Prize Day", d: "05", m: "Apr" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % MORPH.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-[88vh] bg-primary overflow-hidden">
      {/* deep space background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 72% 42%,#13233f 0%,#0b1729 48%,#060c18 100%)",
        }}
      />

      {/* one planet system — 3D when WebGL is available, else CSS */}
      <HeroVisuals />

      {/* scrim keeps the headline readable over the planets
          (stronger/even on phones, fading to the right on desktop) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none md:hidden"
        style={{ background: "rgba(6,12,24,0.6)" }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg,#060c18 0%,rgba(8,15,28,0.82) 34%,rgba(8,15,28,0.3) 54%,transparent 68%)",
        }}
      />

      {/* hanging tear-off photo card */}
      <HeroCard
        cards={HOME_CARDS}
        className="hidden xl:block absolute right-[4%] top-1/2 -translate-y-1/2 z-20"
      />

      <div className="relative z-20 mx-auto md:mx-0 max-w-[1500px] px-6 sm:px-8 lg:px-16 min-h-[88vh] flex items-center pt-28 pb-16">
        <div className="w-full max-w-xl lg:max-w-2xl text-center md:text-left">
          <span className="hero-in d1 inline-flex items-center gap-2 text-secondary uppercase tracking-[0.22em] text-[10px] sm:text-xs font-bold mb-5">
            <span className="w-6 sm:w-8 h-px bg-secondary" /> Established 2012 •
            Madhepura, Bihar
          </span>

          <h1 className="hero-in d2 font-display text-white font-bold leading-[1.08] text-[34px] sm:text-5xl lg:text-6xl xl:text-7xl mb-5">
            Where every child
            <br className="hidden sm:block" /> finds their own{" "}
            <span className="relative inline-block align-bottom">
              <span
                key={idx}
                className="italic text-gradient-gold inline-block hero-morph"
              >
                {MORPH[idx]}
              </span>
            </span>
          </h1>

          <p className="hero-in d3 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
            Founded in loving memory of{" "}
            <strong className="text-white">Late Jitendra Narayan Sinha</strong> — a
            premium, NEP-aligned school shaping not just bright minds, but{" "}
            <span className="text-secondary-bright font-semibold">
              good human beings.
            </span>
          </p>

          <div className="hero-in d4 flex flex-col sm:flex-row gap-3 sm:gap-4 mb-9 sm:items-start justify-center md:justify-start">
            <Link
              href="/admissions"
              className="magnetic btn-gold inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold transition-all w-full sm:w-auto"
            >
              Apply for 2026–27 <Icon name="arrow_forward" />
            </Link>
            <Link
              href="/infrastructure"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-secondary border border-secondary/50 hover:bg-secondary hover:text-primary transition-colors w-full sm:w-auto"
            >
              <Icon name="play_circle" /> Explore Campus
            </Link>
          </div>

          {/* stat strip */}
          <div className="hero-in d5 flex w-full sm:w-auto sm:inline-flex items-stretch rounded-2xl overflow-hidden glass-gold shimmer divide-x divide-secondary/20">
            {[
              { c: 13, s: "+", l: "Years of trust" },
              { c: 1000, s: "+", l: "Happy students" },
              { c: 100, s: "%", l: "Board results" },
            ].map((x) => (
              <div key={x.l} className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4">
                <div className="font-display text-xl sm:text-2xl font-bold text-secondary">
                  <span data-count={x.c} data-suffix={x.s}>
                    0
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60">
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="grid place-items-start w-6 h-10 rounded-full border border-white/30 p-1.5">
          <span className="scroll-dot w-1.5 h-1.5 rounded-full bg-secondary mx-auto" />
        </span>
      </a>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-primary-deep pointer-events-none" />
    </section>
  );
}
