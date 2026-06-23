"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-secondary/15 border-y border-secondary/15">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-bold text-primary">
                {it.q}
              </span>
              <span
                className={`grid place-items-center w-9 h-9 rounded-full border border-secondary/30 text-secondary shrink-0 transition-transform ${
                  isOpen ? "rotate-180 bg-secondary text-primary" : ""
                }`}
              >
                <Icon name="expand_more" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-on-surface/75 leading-relaxed pb-6 pr-12">
                  {it.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
