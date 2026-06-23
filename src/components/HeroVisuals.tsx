"use client";

import { useEffect, useState } from "react";
import HeroBackdrop from "./HeroBackdrop";
import SolarSystem from "./SolarSystem";

/**
 * Hero background. To avoid flashing the CSS fallback before the 3D scene
 * loads, we render NOTHING until we've detected WebGL support (the hero's
 * own dark background shows through in the meantime):
 *  - WebGL available  → the 3D <SolarSystem>
 *  - WebGL missing    → the CSS planet fallback (e.g. VS Code preview)
 */
export default function HeroVisuals({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<"pending" | "webgl" | "css">("pending");

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setMode(gl ? "webgl" : "css");
    } catch {
      setMode("css");
    }
  }, []);

  if (mode === "webgl") return <SolarSystem />;
  if (mode === "css") return <HeroBackdrop compact={compact} showPlanets />;
  return null; // pending → just the dark hero background, no old-animation flash
}
