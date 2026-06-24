"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type HangCard = {
  img: string;
  label: string;
  d: string;
  m: string;
};

function CardFace({
  data,
  top = false,
  tearing = false,
}: {
  data: HangCard;
  top?: boolean;
  tearing?: boolean;
}) {
  return (
    <div
      className={`card-page absolute inset-0 ${top ? "z-10" : "z-0"} ${
        tearing ? "tearing" : ""
      }`}
    >
      <div className="relative h-full rounded-[24px] overflow-hidden border border-secondary/40 bg-primary shadow-[0_38px_70px_-26px_rgba(0,0,0,0.85)] flex flex-col">
        <div className="relative flex-1">
          <Image
            src={data.img}
            alt={data.label}
            fill
            sizes="420px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/5 to-transparent" />
          {/* glossy sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,255,255,0.16) 0%,transparent 32%)",
            }}
          />
          {/* date chip */}
          <div className="absolute top-3.5 left-3.5 glass-gold rounded-xl px-3.5 py-2 text-center min-w-[58px] leading-none shadow-lg">
            <div className="font-display text-2xl font-bold text-secondary-bright">
              {data.d}
            </div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-white/75 mt-1">
              {data.m}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center gap-2.5 border-t border-secondary/25">
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.8)]" />
          <span className="text-white font-semibold text-[15px] leading-snug">
            {data.label}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * A photo card that hangs from a cord and swings gently. Every few seconds
 * the top page tears off like a wall calendar (a real 3D flip) revealing the
 * next photo beneath.
 */
export default function HeroCard({
  cards,
  className = "",
  big = false,
}: {
  cards: HangCard[];
  className?: string;
  big?: boolean;
}) {
  const [i, setI] = useState(0);
  const [tearing, setTearing] = useState(false);
  const n = cards.length;

  useEffect(() => {
    if (n < 2) return;
    let swap: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setTearing(true);
      swap = setTimeout(() => {
        setI((p) => (p + 1) % n);
        setTearing(false);
      }, 1050);
    };
    const id = setInterval(cycle, 4500);
    return () => {
      clearInterval(id);
      clearTimeout(swap);
    };
  }, [n]);

  if (n === 0) return null;
  const cur = cards[i];
  const nxt = cards[(i + 1) % n];

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      {/* cord + hook */}
      <div className="flex flex-col items-center">
        <span className="w-px h-12 bg-gradient-to-b from-transparent to-secondary/50" />
        <span className="w-3.5 h-3.5 rounded-full border-2 border-secondary bg-primary -mt-1 shadow-[0_0_12px_rgba(197,160,89,0.6)]" />
      </div>

      <div className="card-swing -mt-1">
        {/* spiral binding */}
        <div className="relative z-20 flex justify-center gap-2.5 mb-[-7px]">
          {Array.from({ length: 5 }).map((_, k) => (
            <span
              key={k}
              className="w-2.5 h-2.5 rounded-full bg-secondary/80 border border-secondary-bright"
            />
          ))}
        </div>

        {/* soft gold glow behind the card */}
        <div className="relative">
          <div
            className="absolute -inset-5 rounded-[36px] blur-2xl opacity-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(197,160,89,0.35),transparent 70%)",
            }}
          />
          <div
            className={`relative ${big ? "w-[380px] h-[500px]" : "w-[346px] h-[452px]"}`}
            style={{ perspective: "1500px" }}
          >
            <CardFace data={nxt} />
            <CardFace key={i} data={cur} top tearing={tearing} />
          </div>
        </div>
      </div>
    </div>
  );
}
