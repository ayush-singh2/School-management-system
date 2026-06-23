"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/infrastructure", label: "Campus" },
  { href: "/student-life", label: "Student Life" },
  { href: "/alumni", label: "Alumni" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement;
      if (progressRef.current) {
        progressRef.current.style.width =
          (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-secondary-bright to-secondary"
        style={{ width: "0%" }}
      />

      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500">
        <div className="mx-auto max-w-[1500px] px-6">
          <div
            className={`mt-4 flex items-center justify-between rounded-full px-5 glass-gold shadow-2xl transition-all duration-500 ${
              scrolled ? "py-2" : "py-3"
            }`}
          >
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <span className="grid place-items-center w-11 h-11 rounded-full border-2 border-secondary bg-primary text-secondary transition-transform group-hover:rotate-[8deg]">
                <Icon name="school" filled />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-base xl:text-lg font-bold text-secondary">
                  Jitendra Public School
                </span>
                <span className="block text-[8px] xl:text-[9px] tracking-[0.28em] uppercase text-white/55">
                  Shastri Nagar • Madhepura
                </span>
              </span>
            </Link>

            <nav className="hidden xl:flex items-center gap-6 text-[12px] uppercase tracking-wider font-semibold text-white/80">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  className={`navlink ${isActive(l.href) ? "active text-secondary" : ""}`}
                  href={l.href}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/admissions"
              className="hidden sm:inline-flex magnetic btn-gold items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shrink-0"
            >
              Apply Now <Icon name="arrow_forward" className="text-[18px]" />
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="xl:hidden grid place-items-center w-11 h-11 rounded-full border border-secondary/40 text-secondary"
              aria-label="Open menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="xl:hidden mx-6 mt-2">
            <div className="mx-auto max-w-[1500px] glass-gold rounded-3xl p-6 flex flex-col gap-2 text-white/85 uppercase tracking-wider text-sm font-semibold">
              <Link href="/" className="py-2">
                Home
              </Link>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`py-2 ${isActive(l.href) ? "text-secondary" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/admissions"
                className="btn-gold text-center px-6 py-3 rounded-full font-bold mt-2"
              >
                Apply for 2026–27
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
