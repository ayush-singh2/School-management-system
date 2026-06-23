"use client";

import { useEffect, useState } from "react";
import HeroBackdrop from "./HeroBackdrop";
import SolarSystem from "./SolarSystem";

/**
 * Hero background:
 *  - WebGL available → the realistic 3D <SolarSystem>
 *  - otherwise → the CSS planet fallback (e.g. VS Code's preview browser)
 */
export default function HeroVisuals({ compact = false }: { compact?: boolean }) {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setWebgl(!!gl);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (webgl) return <SolarSystem />;
  return <HeroBackdrop compact={compact} showPlanets />;
}
