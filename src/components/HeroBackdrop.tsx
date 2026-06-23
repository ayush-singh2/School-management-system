/**
 * Deep-space solar system rendered in pure CSS using the real planet
 * texture images — a glowing sun and texture-mapped planets (earth, mars,
 * jupiter, ringed saturn, neptune + a moon) orbiting on faint paths over a
 * twinkling starfield. No WebGL, so it looks identical in every browser.
 */

const TX = "/assets/textures/";

// Deterministic star field (fixed positions → no hydration mismatch)
const STARS = Array.from({ length: 70 }, (_, i) => {
  const x = (i * 97.13) % 100;
  const y = (i * 53.71) % 100;
  const s = 1 + ((i * 7) % 3);
  const dur = 2.4 + ((i * 13) % 30) / 10;
  const delay = ((i * 17) % 40) / 10;
  return { x, y, s, dur, delay };
});

/** A texture-mapped, shaded, slowly-spinning planet sphere. */
function Planet({
  tex,
  size,
  glow,
  spin = 26,
}: {
  tex: string;
  size: number;
  glow: string;
  spin?: number;
}) {
  return (
    <span
      className="planet-spin block rounded-full relative"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${TX}${tex})`,
        backgroundSize: "200% 100%",
        boxShadow: `inset -${size * 0.16}px -${size * 0.2}px ${size * 0.34}px rgba(0,0,0,0.7), 0 0 ${size * 0.5}px ${glow}`,
        animation: `planetSpin ${spin}s linear infinite`,
      }}
    >
      {/* spherical highlight */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.45), rgba(255,255,255,0.08) 34%, transparent 52%)",
        }}
      />
    </span>
  );
}

function Orbit({
  d,
  dur,
  reverse = false,
  children,
}: {
  d: number;
  dur: number;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
      style={{
        width: d,
        height: d,
        marginLeft: -d / 2,
        marginTop: -d / 2,
        animation: `spin ${dur}s linear infinite${reverse ? " reverse" : ""}`,
      }}
    >
      <span
        className="absolute left-1/2 top-0"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <span
          className="block"
          style={{
            animation: `spin ${dur}s linear infinite${reverse ? "" : " reverse"}`,
          }}
        >
          {children}
        </span>
      </span>
    </div>
  );
}

export default function HeroBackdrop({
  compact = false,
  showPlanets = true,
}: {
  compact?: boolean;
  showPlanets?: boolean;
}) {
  const size = compact ? 400 : 540;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* twinkling stars */}
      {STARS.map((st, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              "--dur": `${st.dur}s`,
              animationDelay: `${st.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {showPlanets && (
        <div
          className="absolute hidden md:block"
          style={{
            right: compact ? "27%" : "19%",
            top: "50%",
            width: size,
            height: size,
            // smaller + tilted to the left (inclined-plane look)
            transform: "translateY(-50%) rotate(-12deg) scaleY(0.82)",
          }}
        >
          {/* orbits + planets */}
          <Orbit d={size * 0.32} dur={26}>
            <span className="relative block">
              <Planet tex="2k_earth_daymap.jpg" size={size * 0.085} glow="rgba(74,135,214,0.6)" spin={22} />
              {/* moon */}
              <span
                className="absolute left-1/2 top-1/2"
                style={{
                  animation: "spin 6s linear infinite",
                  width: 0,
                  height: 0,
                }}
              >
                <Planet tex="2k_moon.jpg" size={size * 0.03} glow="rgba(180,188,200,0.5)" spin={40} />
              </span>
            </span>
          </Orbit>
          <Orbit d={size * 0.46} dur={34} reverse>
            <Planet tex="2k_mars.jpg" size={size * 0.06} glow="rgba(200,90,50,0.55)" spin={28} />
          </Orbit>
          <Orbit d={size * 0.64} dur={46}>
            <Planet tex="2k_jupiter.jpg" size={size * 0.135} glow="rgba(210,170,120,0.5)" spin={30} />
          </Orbit>
          <Orbit d={size * 0.82} dur={60} reverse>
            {/* Saturn with ring — ring centered behind the planet */}
            <span
              className="relative grid place-items-center"
              style={{ width: size * 0.11, height: size * 0.11 }}
            >
              {/* ring (behind planet) */}
              <span
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                style={{
                  width: size * 0.27,
                  height: size * 0.092,
                  transform: "translate(-50%,-50%) rotate(-18deg)",
                  border: `${Math.max(2, size * 0.01)}px solid rgba(233,200,115,0.7)`,
                  boxShadow: "0 0 10px rgba(233,200,115,0.3)",
                }}
              />
              <Planet tex="2k_saturn.jpg" size={size * 0.11} glow="rgba(220,190,130,0.5)" spin={34} />
            </span>
          </Orbit>
          <Orbit d={size * 0.98} dur={74}>
            <Planet tex="2k_neptune.jpg" size={size * 0.07} glow="rgba(70,110,200,0.5)" spin={26} />
          </Orbit>

          {/* Sun (center) */}
          <span
            className="core-pulse absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: size * 0.2,
              height: size * 0.2,
              marginLeft: -size * 0.1,
              marginTop: -size * 0.1,
              backgroundImage: `url(${TX}2k_sun.jpg)`,
              backgroundSize: "cover",
              boxShadow:
                "0 0 60px 18px rgba(255,210,120,0.55), 0 0 120px 50px rgba(233,200,115,0.28)",
            }}
          />
        </div>
      )}
    </div>
  );
}
