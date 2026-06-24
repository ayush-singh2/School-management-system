"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global page interactions, ported from the Stitch reference:
 *  - scroll reveals
 *  - count-up numbers
 *  - 3D tilt cards
 *  - magnetic buttons
 *  - light scroll parallax
 *
 * Runs once on mount and wires plain DOM listeners so the section
 * markup can stay as server components using the same utility classes.
 */
export default function Interactions() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    const cleanups: Array<() => void> = [];

    /* 1) Scroll reveals */
    {
      const els = document.querySelectorAll(
        ".reveal,.reveal-left,.reveal-right,.reveal-scale",
      );
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      els.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* 2) Count-up numbers */
    {
      const run = (el: HTMLElement) => {
        const end = +(el.dataset.count ?? "0");
        const suffix = el.dataset.suffix ?? "";
        if (reduce) {
          el.textContent = end + suffix;
          return;
        }
        const dur = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run(e.target as HTMLElement);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    /* 3) 3D tilt cards */
    if (!reduce && !coarse) {
      document.querySelectorAll<HTMLElement>(".tilt-wrap").forEach((wrap) => {
        const card = wrap.querySelector<HTMLElement>(".tilt");
        if (!card) return;
        wrap.style.perspective = "900px";
        const move = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `rotateX(${-py * 9}deg) rotateY(${px * 11}deg) translateY(-6px)`;
          card.style.boxShadow = `${-px * 24}px ${py * 24 + 28}px 50px -20px rgba(13,27,52,0.35)`;
        };
        const leave = () => {
          card.style.transform = "";
          card.style.boxShadow = "";
        };
        wrap.addEventListener("pointermove", move);
        wrap.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          wrap.removeEventListener("pointermove", move);
          wrap.removeEventListener("pointerleave", leave);
        });
      });
    }

    /* 4) Magnetic buttons */
    if (!coarse) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((btn) => {
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
        };
        const leave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });
    }

    /* 5) Light scroll parallax */
    if (!reduce) {
      const els = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
      let ticking = false;
      const update = () => {
        const vh = window.innerHeight;
        els.forEach((el) => {
          const r = el.getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax ?? "0");
          const offset = (r.top + r.height / 2 - vh / 2) * -speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
