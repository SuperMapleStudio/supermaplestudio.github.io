import React, { useEffect, useRef, useState } from "react";
import towerImg from "../imports/Tower_square.png";
import staffImg from "../imports/Staff_Icon_Square.png";
import forgeImg from "../imports/Forge_Icon_512.png";
import axesImg from "../imports/crossed_Axes_256.png";
import { CustomCursor } from "./components/CustomCursor";
import { MapleTree } from "./components/MapleTree";
import heroBg from "../imports/image.png";

// ── Shared style tokens ──────────────────────────────────────────────────────
const C = {
  ember: "#C8601E",       // burnt orange — primary CTA, headers
  golden: "#C9A84C",      // muted antique gold — accents, badges
  fortress: "#0C0B0A",    // near-black — base bg
  bark: "#161412",        // dark warm charcoal — section bg
  cream: "#F0EBE1",       // warm parchment — body text
  muted: "#7A6B5A",       // warm taupe — secondary text
  border: "rgba(200, 96, 30, 0.3)",
  borderGold: "rgba(201, 168, 76, 0.35)",
  // Font stacks
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', sans-serif",
  ui: "'Montserrat', sans-serif",
};

// ── SVG maple leaf icon (consistent orange, no emoji rendering variance) ─────
function MapleLeaf({ size = 20, color = C.ember }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M50 4 C50 4 44 18 38 20 C32 22 20 14 20 14 C20 14 26 26 24 32 C22 38 8 40 8 40 C8 40 18 48 18 54 C18 60 10 70 10 70 C10 70 24 66 30 70 C36 74 36 88 36 88 L44 80 L46 96 L50 88 L54 96 L56 80 L64 88 C64 88 64 74 70 70 C76 66 90 70 90 70 C90 70 82 60 82 54 C82 48 92 40 92 40 C92 40 78 38 76 32 C74 26 80 14 80 14 C80 14 68 22 62 20 C56 18 50 4 50 4Z" />
    </svg>
  );
}

// ── Noise texture overlay for the hero ───────────────────────────────────────
function GrainOverlay() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

// ── Glowing ember divider line ────────────────────────────────────────────────
function EmberDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "0 auto", maxWidth: 200 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.ember})` }} />
      <MapleLeaf size={16} color={C.golden} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.ember})` }} />
    </div>
  );
}

// ── Hero content — flat, no card, editorial layout ───────────────────────────
function HeroContent() {
  return (
    <div style={{ width: "100%", maxWidth: 680 }}>

      {/* Platform badges */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        <span style={{
          background: C.ember,
          color: C.cream,
          padding: "4px 14px",
          borderRadius: 4,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          fontFamily: C.ui,
          textTransform: "uppercase",
        }}>PC · Steam</span>
        <span style={{
          background: "transparent",
          border: `1px solid ${C.golden}`,
          color: C.golden,
          padding: "4px 14px",
          borderRadius: 4,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          fontFamily: C.ui,
          textTransform: "uppercase",
        }}>1–8 Players</span>
      </div>

      {/* Eyebrow */}
      <p style={{
        color: C.cream,
        opacity: 0.75,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontFamily: C.ui,
        fontWeight: 600,
        marginBottom: 16,
      }}>
        — Super Maple Studio presents —
      </p>

      {/* Game title */}
      <h1 style={{
        fontFamily: C.serif,
        fontWeight: 700,
        fontSize: "clamp(44px, 7vw, 88px)",
        lineHeight: 0.98,
        color: C.cream,
        marginBottom: 0,
        letterSpacing: "0.01em",
      }}>
        <span style={{ color: C.golden, fontStyle: "italic", display: "block" }}>Tribal Towers:</span>
        <span style={{ display: "block", fontSize: "0.6em", fontWeight: 400, opacity: 0.85, marginTop: 4 }}>Siege of the</span>
        <span style={{ display: "block", fontSize: "0.6em", fontWeight: 400, opacity: 0.85, marginTop: 4 }}>Shifting Fortress</span>
      </h1>

      {/* Genre tags */}
      <div style={{ display: "flex", gap: 6, margin: "24px 0" }}>
        {["Dungeon Romp", "Co-op", "Action RPG", "Fantasy"].map((tag) => (
          <span key={tag} style={{
            background: "rgba(240,235,225,0.12)",
            border: "1px solid rgba(240,235,225,0.35)",
            color: C.cream,
            padding: "4px 12px",
            borderRadius: 3,
            fontSize: 10,
            fontFamily: C.sans,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>{tag}</span>
        ))}
      </div>

      {/* Pitch copy */}
      <p style={{
        color: C.cream,
        opacity: 0.78,
        fontFamily: C.sans,
        fontSize: 15,
        lineHeight: 1.8,
        marginBottom: 36,
        maxWidth: 520,
      }}>
        Play solo or squad up with a crew of up to eight players and siege a constantly
        changing dungeon where every run is a wild gamble for epic gear. Smash through
        massive boss fights to shatter a wizard's curse, rescue captured villagers, and
        use their skills to rebuild the hometown and power up.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <WishlistButton />
        <SwitchBadge />
      </div>
    </div>
  );
}

function WishlistButton() {
  const [hovered, setHovered] = useState(false);
  return (
    /* using <a> instead of <button>: this is an external navigation link to Steam */
    <a
      href="https://store.steampowered.com/app/2862160/Tribal_Towers__Siege_of_the_Shifting_Fortress/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#A84E18" : C.ember,
        color: C.cream,
        border: "none",
        borderRadius: 4,
        padding: "14px 28px",
        fontFamily: C.ui,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        boxShadow: hovered
          ? `0 0 30px rgba(200,96,30,0.5), 0 8px 24px rgba(0,0,0,0.5)`
          : `0 0 16px rgba(200,96,30,0.25), 0 4px 12px rgba(0,0,0,0.4)`,
        transition: "all 0.2s ease",
        transform: hovered ? "scale(1.04)" : "scale(1)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      Wishlist on Steam
    </a>
  );
}

function SwitchBadge() {
  const [hovered, setHovered] = useState(false);
  return (
    /* using <a>: links to Stripe support page */
    <a
      href="https://buy.stripe.com/eVq9AVcnm5pG4ke4qWgQE00"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hovered ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
        border: `1.5px solid ${hovered ? C.golden : "rgba(201,168,76,0.4)"}`,
        borderRadius: 10,
        padding: "12px 20px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.25s ease",
        boxShadow: hovered ? `0 0 20px rgba(201,168,76,0.2)` : "none",
      }}
    >
      {/* Coffee cup with steam */}
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Steam wisps */}
        <path d="M6 4 Q5 2 6 0" stroke={C.golden} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <path d="M10 4 Q9 2 10 0" stroke={C.golden} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        <path d="M14 4 Q13 2 14 0" stroke={C.golden} strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        {/* Cup body */}
        <path d="M2 6 L4 18 Q4 19 5 19 L15 19 Q16 19 16 18 L18 6 Z" fill={C.golden} opacity="0.9"/>
        {/* Handle */}
        <path d="M18 9 Q22 9 22 13 Q22 17 18 17" stroke={C.golden} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75"/>
        {/* Saucer */}
        <ellipse cx="10" cy="20" rx="8" ry="1.5" fill={C.golden} opacity="0.5"/>
      </svg>
      <div>
        <p
          style={{
            color: C.golden,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            lineHeight: 1.2,
          }}
        >
          Support
        </p>
        <p
          style={{
            color: C.muted,
            fontFamily: "Inter, sans-serif",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          the development
        </p>
      </div>
    </a>
  );
}

// ── Feature card SVG icons ────────────────────────────────────────────────────
function CastleIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer walls */}
      <rect x="4" y="28" width="56" height="32" rx="1" fill="#7A6B5A" />
      <rect x="4" y="28" width="56" height="32" rx="1" fill="url(#wallgrad)" />
      {/* Gate arch */}
      <path d="M24 60 L24 44 Q24 38 32 38 Q40 38 40 44 L40 60Z" fill="#0C0B0A" />
      {/* Gate arch top highlight */}
      <path d="M24 44 Q24 38 32 38 Q40 38 40 44" stroke={C.golden} strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Left tower */}
      <rect x="2" y="18" width="16" height="42" rx="1" fill="#6A5C4C" />
      {/* Left tower battlements */}
      <rect x="2" y="12" width="4" height="8" fill="#6A5C4C" />
      <rect x="8" y="12" width="4" height="8" fill="#6A5C4C" />
      <rect x="14" y="12" width="4" height="8" fill="#6A5C4C" />
      {/* Right tower */}
      <rect x="46" y="18" width="16" height="42" rx="1" fill="#6A5C4C" />
      {/* Right tower battlements */}
      <rect x="46" y="12" width="4" height="8" fill="#6A5C4C" />
      <rect x="52" y="12" width="4" height="8" fill="#6A5C4C" />
      <rect x="58" y="12" width="4" height="8" fill="#6A5C4C" />
      {/* Centre tower */}
      <rect x="20" y="10" width="24" height="20" fill="#7A6B5A" />
      {/* Centre battlements */}
      <rect x="20" y="4" width="5" height="8" fill="#7A6B5A" />
      <rect x="27" y="4" width="5" height="8" fill="#7A6B5A" />
      <rect x="34" y="4" width="5" height="8" fill="#7A6B5A" />
      {/* Centre window */}
      <rect x="28" y="14" width="8" height="10" rx="4" fill="#0C0B0A" />
      <rect x="28" y="14" width="8" height="10" rx="4" fill={C.golden} opacity="0.25" />
      {/* Left tower window */}
      <rect x="7" y="26" width="6" height="8" rx="3" fill="#0C0B0A" />
      {/* Right tower window */}
      <rect x="51" y="26" width="6" height="8" rx="3" fill="#0C0B0A" />
      {/* Wall crenellations */}
      <rect x="16" y="24" width="5" height="6" fill="#6A5C4C" />
      <rect x="43" y="24" width="5" height="6" fill="#6A5C4C" />
      {/* Flag */}
      <line x1="32" y1="4" x2="32" y2="-2" stroke={C.ember} strokeWidth="1.5" />
      <polygon points="32,-2 38,1 32,4" fill={C.ember} />
      <defs>
        <linearGradient id="wallgrad" x1="4" y1="28" x2="4" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8B7A68" />
          <stop offset="1" stopColor="#5A4E42" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WizardIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Staff (behind figure) */}
      <line x1="52" y1="8" x2="48" y2="72" stroke="#8B7A50" strokeWidth="3" strokeLinecap="round" />
      {/* Staff orb */}
      <circle cx="52" cy="8" r="5" fill={C.golden} opacity="0.9" />
      <circle cx="52" cy="8" r="3" fill="#FFF8DC" opacity="0.7" />
      <circle cx="53" cy="6" r="1.2" fill="white" opacity="0.9" />
      {/* Robe / shoulders */}
      <path d="M10 72 Q10 52 18 46 Q24 42 32 42 Q40 42 46 46 Q54 52 54 72Z" fill="#2A1F3A" />
      {/* Robe shading */}
      <path d="M10 72 Q10 52 18 46 Q24 42 32 42 Q40 42 46 46 Q54 52 54 72Z" fill="url(#robegrad)" />
      {/* Robe clasp */}
      <circle cx="32" cy="48" r="2.5" fill={C.golden} opacity="0.8" />
      {/* Neck */}
      <rect x="28" y="34" width="8" height="10" rx="4" fill="#C4956A" />
      {/* Head */}
      <ellipse cx="32" cy="28" rx="12" ry="13" fill="#C4956A" />
      {/* Face shading */}
      <ellipse cx="32" cy="30" rx="10" ry="10" fill="#B8855E" opacity="0.3" />
      {/* Eyes */}
      <ellipse cx="27" cy="27" rx="2.5" ry="2.5" fill="#1A1208" />
      <ellipse cx="37" cy="27" rx="2.5" ry="2.5" fill="#1A1208" />
      <circle cx="28" cy="26" r="0.8" fill="white" />
      <circle cx="38" cy="26" r="0.8" fill="white" />
      {/* Pupils glow */}
      <ellipse cx="27" cy="27" rx="1" ry="1" fill={C.golden} opacity="0.6" />
      <ellipse cx="37" cy="27" rx="1" ry="1" fill={C.golden} opacity="0.6" />
      {/* Beard */}
      <path d="M22 34 Q24 44 32 46 Q40 44 42 34 Q38 38 32 38 Q26 38 22 34Z" fill="#D8D0C0" />
      {/* Moustache */}
      <path d="M26 32 Q29 34 32 32 Q35 34 38 32" stroke="#C0B8A8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Eyebrows */}
      <path d="M24 23 Q27 21 30 23" stroke="#6A5540" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M34 23 Q37 21 40 23" stroke="#6A5540" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hat brim */}
      <ellipse cx="32" cy="16" rx="15" ry="4" fill="#1A1030" />
      <ellipse cx="32" cy="16" rx="15" ry="4" fill={C.ember} opacity="0.15" />
      {/* Hat cone */}
      <path d="M20 16 Q26 -4 32 -4 Q38 -4 44 16Z" fill="#1A1030" />
      {/* Hat star */}
      <polygon points="32,2 33.5,6 37,6 34.5,8.5 35.5,12 32,10 28.5,12 29.5,8.5 27,6 30.5,6" fill={C.golden} opacity="0.8" />
      <defs>
        <linearGradient id="robegrad" x1="32" y1="42" x2="32" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3D2A55" />
          <stop offset="1" stopColor="#180F28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Studio Vision section ─────────────────────────────────────────────────────
function StudioVisionSection() {
  const features = [
    { icon: <img src={towerImg} alt="Castle tower" style={{ width: 64, height: 64, objectFit: "contain" }} />, title: "Living Dungeons", desc: "Every siege is different — the fortress shifts, traps rearrange, and new chambers emerge each run." },
    { icon: <img src={staffImg} alt="Wizard staff" style={{ width: 64, height: 64, objectFit: "contain" }} />, title: "Wizard's Curse", desc: "Unravel an ancient sorcerer's dark power across escalating boss encounters that test your whole crew." },
    { icon: <img src={forgeImg} alt="Forge" style={{ width: 64, height: 64, objectFit: "contain" }} />, title: "Rebuild & Empower", desc: "Rescue villagers, return them home, and unlock their unique skills to permanently power up your character." },
    { icon: <img src={axesImg} alt="Crossed axes" style={{ width: 64, height: 64, objectFit: "contain" }} />, title: "Solo or 8-Player Co-op", desc: "Play at your own pace or storm the fortress with a full crew of eight in drop-in co-op play." },
  ];

  return (
    <section
      style={{
        background: C.bark,
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(200,96,30,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginBottom: 72,
          }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>

        {/* Studio stats */}
        <div
          style={{
            marginBottom: 72,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 1,
            background: C.border,
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
          }}
        >
          {[
            { value: "8", label: "Max Co-op Players" },
            { value: "∞", label: "Unique Dungeon Runs" },
            { value: "Indie", label: "Truly Independent" },
            { value: "2026", label: "Coming to Steam" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: C.bark,
                padding: "32px 24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: C.serif,
                  fontWeight: 700,
                  fontSize: 42,
                  color: C.ember,
                  fontStyle: "italic",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  color: C.muted,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: C.ember,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            About the Studio
          </p>
          <h2
            id="studio"
            style={{
              fontFamily: C.serif,
              fontWeight: 700,
              fontSize: "clamp(34px, 5.5vw, 60px)",
              color: C.cream,
              lineHeight: 1.1,
              marginBottom: 28,
              letterSpacing: "0.01em",
              scrollMarginTop: 80,
            }}
          >
            <span style={{ color: C.ember, fontStyle: "italic" }}>Pouring out</span> a sweet bucket of fun.
          </h2>
          <EmberDivider />
          <p
            style={{
              color: C.cream,
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.8,
              maxWidth: 680,
              margin: "28px auto 0",
              opacity: 0.85,
            }}
          >
            Super Maple Studio is a small independent development team driven by a singular mission: to bring joy,
            deep player connection, and positive interaction to a whole new generation of gamers.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.fortress,
        border: `1px solid ${hovered ? C.ember : "rgba(200,96,30,0.2)"}`,
        borderRadius: 14,
        padding: "28px 24px",
        transition: "all 0.28s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(200,96,30,0.1)` : "none",
        cursor: "default",
      }}
    >
      <div style={{ marginBottom: 16, display: "block" }}>{icon}</div>
      <h3
        style={{
          fontFamily: C.serif,
          fontWeight: 600,
          fontSize: 21,
          color: C.cream,
          marginBottom: 10,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: C.muted,
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

// ── Support / Donation Footer section ─────────────────────────────────────────
function SupportSection() {
  const [coffeeHover, setCoffeeHover] = useState(false);
  const [supportHover, setSupportHover] = useState(false);

  return (
    <section
      id="support"
      style={{
        background: C.fortress,
        padding: "0 24px 80px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: C.bark,
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: "48px 48px 44px",
          maxWidth: 760,
          width: "100%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 0 80px rgba(200,96,30,0.06), 0 32px 64px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Woodgrain texture hint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.01) 40px,
              rgba(255,255,255,0.01) 41px
            )`,
            pointerEvents: "none",
          }}
        />

        {/* Hanging sign nail decorations */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 220,
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#5C3D1A",
                border: "2px solid #8B6020",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.5)",
              }}
            />
          ))}
        </div>

        {/* Top rope lines */}
        <div style={{ position: "absolute", top: 0, left: "calc(50% - 110px)", width: 2, height: 14, background: "#5C3D1A" }} />
        <div style={{ position: "absolute", top: 0, right: "calc(50% - 110px)", width: 2, height: 14, background: "#5C3D1A" }} />

        <div style={{ position: "relative" }}>
          <span style={{ fontSize: 36, display: "block", marginBottom: 16 }}>🌟</span>
          <h2
            style={{
              fontFamily: C.serif,
              fontWeight: 700,
              fontSize: "clamp(26px, 4vw, 40px)",
              color: C.cream,
              marginBottom: 14,
              letterSpacing: "0.01em",
            }}
          >
            <span style={{ fontStyle: "italic", color: C.ember }}>Support</span> Our Tiny Dev Team
          </h2>
          <p
            style={{
              color: C.cream,
              opacity: 0.7,
              fontFamily: "Inter, sans-serif",
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            We're a tiny indie studio pouring every hour and every heart into building something magical.
            Your support — however small — keeps the lights on and the autumn leaves falling. 🍁
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {/* Buy Me a Coffee */}
            <a
              href="https://buy.stripe.com/eVq9AVcnm5pG4ke4qWgQE00"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCoffeeHover(true)}
              onMouseLeave={() => setCoffeeHover(false)}
              style={{
                background: "transparent",
                border: `1.5px solid ${coffeeHover ? C.cream : "rgba(249,246,240,0.35)"}`,
                color: coffeeHover ? C.cream : "rgba(249,246,240,0.75)",
                borderRadius: 10,
                padding: "14px 24px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.22s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: coffeeHover ? `0 0 20px rgba(249,246,240,0.1)` : "none",
                transform: coffeeHover ? "scale(1.03)" : "scale(1)",
              }}
            >
              ☕ Buy Me a Coffee
            </a>

            {/* Support Studio */}
            <a
              href="https://buy.stripe.com/eVq9AVcnm5pG4ke4qWgQE00"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setSupportHover(true)}
              onMouseLeave={() => setSupportHover(false)}
              style={{
                background: supportHover ? "#e0a91e" : C.golden,
                color: C.fortress,
                border: "none",
                borderRadius: 10,
                padding: "14px 24px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.22s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: supportHover
                  ? `0 0 30px rgba(201,168,76,0.4), 0 8px 24px rgba(0,0,0,0.3)`
                  : `0 0 16px rgba(201,168,76,0.2), 0 4px 12px rgba(0,0,0,0.2)`,
                transform: supportHover ? "scale(1.04)" : "scale(1)",
              }}
            >
              🍁 Help Support Our Small Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Nav bar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? `rgba(30,35,42,0.92)` : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MapleLeaf size={26} color={C.ember} />
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: 18,
            color: C.cream,
            letterSpacing: "-0.01em",
          }}
        >
          Super Maple{" "}
          <span
            style={{
              color: C.ember,
            }}
          >
            Studio
          </span>
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {[
          { label: "Game", href: "#game" },
          { label: "Studio", href: "#studio" },
          { label: "Support", href: "#support" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              background: "transparent",
              color: C.cream,
              opacity: 0.7,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
          >
            {label}
          </a>
        ))}
        {/* using <a> instead of <button>: external Steam link */}
        <a
          href="https://store.steampowered.com/app/2862160/Tribal_Towers__Siege_of_the_Shifting_Fortress/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: C.ember,
            border: "none",
            color: C.cream,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 13,
            padding: "8px 18px",
            borderRadius: 8,
            cursor: "pointer",
            letterSpacing: "0.03em",
            boxShadow: `0 0 16px rgba(200,96,30,0.3)`,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Wishlist ★
        </a>
      </div>
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: C.bark,
        borderTop: `1px solid ${C.border}`,
        padding: "40px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <MapleLeaf size={20} color={C.ember} />
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: C.cream,
          }}
        >
          Super Maple Studio
        </span>
      </div>
      <p
        style={{
          color: C.muted,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          letterSpacing: "0.06em",
        }}
      >
        © 2026 Super Maple Studio · All rights reserved · Made with ❤️ and a sprinkle of maple magic
      </p>
    </footer>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [leavesOn, setLeavesOn] = useState(true);

  // Hide default cursor globally
  useEffect(() => {
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.fortress,
        fontFamily: "Inter, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}

      <CustomCursor />
      <NavBar />

      {/* Leaves toggle — fixed top-left */}
      <div
        style={{
          position: "fixed",
          top: 68,
          left: 32,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={() => setLeavesOn((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            background: leavesOn ? "rgba(200,96,30,0.18)" : "rgba(240,235,225,0.08)",
            border: `1px solid ${leavesOn ? C.ember : "rgba(240,235,225,0.25)"}`,
            borderRadius: 6,
            padding: "5px 12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: leavesOn ? `0 0 12px rgba(200,96,30,0.3)` : "none",
          }}
        >
          {/* Mini leaf indicator */}
          <svg width="12" height="12" viewBox="0 0 100 100" fill={leavesOn ? C.ember : C.muted} style={{ flexShrink: 0, transition: "fill 0.2s" }}>
            <path d="M50 4 C50 4 44 18 38 20 C32 22 20 14 20 14 C20 14 26 26 24 32 C22 38 8 40 8 40 C8 40 18 48 18 54 C18 60 10 70 10 70 C10 70 24 66 30 70 C36 74 36 88 36 88 L44 80 L46 96 L50 88 L54 96 L56 80 L64 88 C64 88 64 74 70 70 C76 66 90 70 90 70 C90 70 82 60 82 54 C82 48 92 40 92 40 C92 40 78 38 76 32 C74 26 80 14 80 14 C80 14 68 22 62 20 C56 18 50 4 50 4Z" />
          </svg>
          <span style={{
            fontFamily: C.ui,
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: leavesOn ? C.cream : C.muted,
            transition: "color 0.2s",
          }}>
            Leaves
          </span>
        </button>
      </div>

      {/* ── HERO ── */}
      <section
        id="game"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          overflow: "hidden",
        }}
      >
        {/* ── z:0 Background image ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src={heroBg}
            alt="Tribal Towers game world — fantasy forest town at golden hour"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
            }}
          />
          {/* Dark overlay — heavier on left to make text pop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `rgba(12,11,10,0.52)`,
            }}
          />
        </div>

        {/* ── z:1 Leaves canvas — between image and text ── */}
        {leavesOn && (
          <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
            <MapleTree />
          </div>
        )}

        {/* Content — left-aligned editorial layout */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: 1100,
            padding: "0 48px",
          }}
        >
          <HeroContent />

          {/* Scroll hint */}
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8,
              opacity: 0.45,
            }}
          >
            <p
              style={{
                color: C.cream,
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Scroll to explore
            </p>
            <div
              style={{
                width: 1,
                height: 40,
                background: `linear-gradient(to bottom, ${C.cream}, transparent)`,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── STUDIO VISION ── */}
      <StudioVisionSection />

      {/* ── SUPPORT ── */}
      <SupportSection />

      {/* ── FOOTER ── */}
      <Footer />

      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.fortress}; }
        ::-webkit-scrollbar-thumb { background: ${C.ember}; border-radius: 2px; }
      `}</style>
    </div>
  );
}
