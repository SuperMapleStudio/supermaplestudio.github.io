import React, { useState } from "react";
import { C, MapleLeaf, STEAM_URL } from "../app/brand";
import { CustomCursor } from "../app/components/CustomCursor";

// All press assets live in public/presskit/ so they are served at stable,
// un-hashed URLs that journalists can link to or download directly.
const IMG = "/presskit/images";
const ZIP_URL = "/presskit/TribalTowers_PressKit.zip";
const PRESS_EMAIL = "Office@SuperMapleStudio.com";

const FACTS: { label: string; value: React.ReactNode }[] = [
  { label: "Developer", value: "Super Maple Studio" },
  { label: "Publisher", value: "Super Maple Studio (self-published)" },
  { label: "Release Date", value: "Coming 2026" },
  { label: "Platform", value: "PC (Windows) — Steam" },
  { label: "Genre", value: "Action RPG · Dungeon Runner" },
  { label: "Players", value: "Single-player · 1–8 online co-op" },
  { label: "Languages", value: "English" },
  { label: "Features", value: "Full controller support · Steam Cloud · Family Sharing" },
  { label: "Price", value: "TBA" },
  { label: "Website", value: <a href="https://supermaplestudio.com/">supermaplestudio.com</a> },
  { label: "Steam", value: <a href={STEAM_URL} target="_blank" rel="noopener noreferrer">store.steampowered.com/app/2862160</a> },
  { label: "Press Contact", value: <a href={`mailto:${PRESS_EMAIL}`}>{PRESS_EMAIL}</a> },
];

const FEATURES: { title: string; desc: string }[] = [
  { title: "An ever-shifting fortress", desc: "The wizard's spell of Shifting rearranges the dungeon each time you enter. The castle is always similar, but never the same." },
  { title: "Build your hero your way", desc: "Bow, Sword & Shield, Greatsword, Warhammer or Spear — mix weapons and abilities into close-quarters, long-range or magical builds." },
  { title: "Elemental magic", desc: "Freeze, burn and poison your foes. Shatter frozen enemies with a physical attack for bonus damage." },
  { title: "Synergy abilities", desc: "Raise two skills to a threshold to unlock a combined ability — Ice + Enhancement Magic chills your blade; Fire Magic + Block grants a burning aura." },
  { title: "Rescue the villagers", desc: "Each villager you free joins your cause: a trainer to raise your stats, a blacksmith to upgrade gear, an alchemist to improve potions." },
  { title: "Deep skill system", desc: "Combat, magic and utility skills — from Summoning and Transformation to Scouting, Focus, Dodge and Wind Magic." },
  { title: "Loot every corner", desc: "Search rooms for chests and magical items that boost your stats, skills, or grant unique abilities." },
  { title: "Solo or 8-player co-op", desc: "Play alone or with up to seven friends online. Loot and monster difficulty scale as more players join." },
];

const SCREENSHOTS = Array.from({ length: 8 }, (_, i) => `${IMG}/screenshot-${i + 1}.jpg`);

const ART: { file: string; label: string; size: string; aspect: string }[] = [
  { file: "capsule-main.jpg", label: "Main Capsule", size: "1232 × 706", aspect: "1232 / 706" },
  { file: "header-capsule.jpg", label: "Header Capsule", size: "920 × 430", aspect: "920 / 430" },
  { file: "capsule-vertical.jpg", label: "Vertical Capsule", size: "600 × 900", aspect: "600 / 900" },
  { file: "capsule-hero.jpg", label: "Hero Capsule", size: "748 × 896", aspect: "748 / 896" },
  { file: "key-art-wide.jpg", label: "Wide Key Art (no logo)", size: "3840 × 1240", aspect: "3840 / 1240" },
];

// ── Small building blocks ────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{
        color: C.ember,
        fontFamily: C.ui,
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>{eyebrow}</p>
      <h2 id={id} style={{
        fontFamily: C.serif,
        fontWeight: 700,
        fontSize: "clamp(30px, 4.5vw, 44px)",
        color: C.cream,
        lineHeight: 1.1,
        scrollMarginTop: 80,
      }}>{title}</h2>
    </div>
  );
}

function PrimaryButton({ href, children, download }: { href: string; children: React.ReactNode; download?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#A84E18" : C.ember,
        color: C.cream,
        borderRadius: 4,
        padding: "14px 26px",
        fontFamily: C.ui,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        boxShadow: hovered
          ? `0 0 30px rgba(200,96,30,0.5), 0 8px 24px rgba(0,0,0,0.5)`
          : `0 0 16px rgba(200,96,30,0.25), 0 4px 12px rgba(0,0,0,0.4)`,
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1.5px solid ${hovered ? C.golden : "rgba(201,168,76,0.5)"}`,
        background: hovered ? "rgba(201,168,76,0.12)" : "rgba(12,11,10,0.35)",
        color: C.golden,
        borderRadius: 4,
        padding: "13px 24px",
        fontFamily: C.ui,
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
    >
      {children}
    </a>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M6 11l6 6 6-6M4 21h16" />
    </svg>
  );
}

// Thumbnail that opens the full-resolution file in a new tab.
function AssetTile({ src, alt, aspect, caption }: { src: string; alt: string; aspect: string; caption?: string }) {
  return (
    <figure style={{ margin: 0 }}>
      <a href={src} target="_blank" rel="noopener noreferrer" className="pk-tile" style={{ aspectRatio: aspect }}>
        <img src={src} alt={alt} loading="lazy" />
      </a>
      {caption && (
        <figcaption style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, gap: 8 }}>
          <span style={{ color: C.cream, fontFamily: C.sans, fontSize: 13, opacity: 0.85 }}>{caption}</span>
          <a href={src} download className="pk-dl">
            <DownloadIcon /> Download
          </a>
        </figcaption>
      )}
    </figure>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PressKit() {
  return (
    <div style={{ minHeight: "100vh", background: C.fortress, fontFamily: C.sans, overflowX: "hidden" }}>
      <CustomCursor />

      {/* Top bar */}
      <nav className="pk-nav">
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <MapleLeaf size={26} color={C.ember} />
          <span style={{ fontFamily: C.ui, fontWeight: 900, fontSize: 18, color: C.cream, letterSpacing: "-0.01em" }}>
            Super Maple <span style={{ color: C.ember }}>Studio</span>
          </span>
        </a>
        <div className="pk-nav-links">
          {[
            { label: "Factsheet", href: "#factsheet" },
            { label: "Media", href: "#screenshots" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="pk-nav-link">{label}</a>
          ))}
          <a href="/" className="pk-nav-link">← Main Site</a>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ position: "relative", padding: "140px 24px 90px", overflow: "hidden" }}>
        <img
          src={`${IMG}/key-art-wide.jpg`}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(12,11,10,0.55), rgba(12,11,10,0.75) 70%, #0C0B0A)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <p style={{
            color: C.cream,
            opacity: 0.8,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: C.ui,
            fontWeight: 600,
            marginBottom: 16,
          }}>— Press Kit —</p>
          <h1 style={{
            fontFamily: C.serif,
            fontWeight: 700,
            fontSize: "clamp(40px, 6.5vw, 76px)",
            lineHeight: 1,
            color: C.cream,
            marginBottom: 20,
          }}>
            <span style={{ color: C.golden, fontStyle: "italic", display: "block" }}>Tribal Towers:</span>
            <span style={{ display: "block", fontSize: "0.6em", fontWeight: 400, opacity: 0.9, marginTop: 6 }}>Siege of the Shifting Fortress</span>
          </h1>
          <p style={{ color: C.cream, opacity: 0.85, fontSize: 16, lineHeight: 1.75, maxWidth: 620, marginBottom: 32 }}>
            Fight through the shifting tower, loot powerful gear and gain new skills. Challenge bosses and free your
            villagers to revive your town in this Action-RPG — solo or with up to eight players in online co-op.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <PrimaryButton href={ZIP_URL} download>
              <DownloadIcon /> Download All Assets (.zip)
            </PrimaryButton>
            <SecondaryButton href={STEAM_URL}>View on Steam</SecondaryButton>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Factsheet + Description */}
        <div className="pk-columns">
          <aside id="factsheet" className="pk-card" style={{ scrollMarginTop: 80 }}>
            <p style={{
              color: C.golden,
              fontFamily: C.ui,
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>Factsheet</p>
            <dl style={{ margin: 0 }}>
              {FACTS.map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <dt style={{ color: C.muted, fontFamily: C.ui, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>
                    {label}
                  </dt>
                  <dd className="pk-fact" style={{ margin: 0, color: C.cream, fontSize: 14, lineHeight: 1.5 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <section>
            <SectionHeading eyebrow="About the Game" title="Description" id="description" />
            <div className="pk-prose">
              <p>
                <strong>Tribal Towers: Siege of the Shifting Fortress</strong> is a dungeon runner where you fight back
                against a powerful wizard who has captured a village under his spell.
              </p>
              <p>
                You are a one-man (or co-op) siege of the shifting fortress. Battle the minions. Drag treasures from
                the halls to build your strength. And finally, take the fight to the wizard himself to set the village
                free. The castle is always similar but never the same — can you find the way and complete your siege?
              </p>
            </div>

            <h3 className="pk-subhead">The Story</h3>
            <div className="pk-prose">
              <p>
                The village's magical fountain does more than quench thirst — it saves your progress, revives fallen
                heroes, and even projects resting stations into the dungeon. But when its life-giving properties were
                discovered, the trouble began.
              </p>
              <p>
                A wizard, his body aged and corrupted by dark magic, invaded the village to consume the fountain's
                power — but its life magic repelled him. Stunned and angry, he hid in the castle, breeding monstrous
                creatures through his experiments, and cast a powerful spell of <em>Shifting</em> so the dungeons change
                each time they are entered. Fight your way into his ever-shifting towers and set your village free.
              </p>
            </div>
          </section>
        </div>

        {/* Features */}
        <section style={{ marginTop: 96 }}>
          <SectionHeading eyebrow="Key Features" title="What Makes It Tick" id="features" />
          <div className="pk-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="pk-card" style={{ padding: "24px 22px" }}>
                <h3 style={{ fontFamily: C.serif, fontWeight: 600, fontSize: 21, color: C.cream, marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trailer */}
        <section style={{ marginTop: 96 }}>
          <SectionHeading eyebrow="Video" title="Trailer" id="trailer" />
          <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="pk-tile pk-trailer" style={{ aspectRatio: "600 / 337", maxWidth: 760 }}>
            <img src={`${IMG}/trailer-thumbnail.jpg`} alt="Tribal Towers overview trailer" loading="lazy" />
            <span className="pk-play" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill={C.cream}><path d="M8 5v14l11-7z" /></svg>
            </span>
          </a>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 12 }}>
            Gameplay Overview Trailer — watch on the Steam store page.
          </p>
        </section>

        {/* Screenshots */}
        <section style={{ marginTop: 96 }}>
          <SectionHeading eyebrow="Media" title="Screenshots" id="screenshots" />
          <div className="pk-grid">
            {SCREENSHOTS.map((src, i) => (
              <AssetTile key={src} src={src} alt={`Tribal Towers gameplay screenshot ${i + 1}`} aspect="16 / 9" caption={`Screenshot ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* Logo & Key Art */}
        <section style={{ marginTop: 96 }}>
          <SectionHeading eyebrow="Media" title="Key Art & Capsules" id="art" />
          <div className="pk-grid pk-grid-art">
            {ART.map((a) => (
              <AssetTile
                key={a.file}
                src={`${IMG}/${a.file}`}
                alt={`Tribal Towers ${a.label}`}
                aspect={a.aspect}
                caption={`${a.label} · ${a.size}`}
              />
            ))}
          </div>
        </section>

        {/* About the studio */}
        <section style={{ marginTop: 96 }}>
          <SectionHeading eyebrow="Who We Are" title="About Super Maple Studio" id="studio" />
          <div className="pk-prose" style={{ maxWidth: 760 }}>
            <p>
              Super Maple Studio is a small independent development team driven by a singular mission: to bring joy,
              deep player connection, and positive interaction to a whole new generation of gamers.
              <em> Tribal Towers: Siege of the Shifting Fortress</em> is the studio's debut title.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pk-card" style={{ marginTop: 96, textAlign: "center", padding: "48px 28px", scrollMarginTop: 80 }}>
          <MapleLeaf size={28} color={C.golden} />
          <h2 style={{ fontFamily: C.serif, fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", color: C.cream, margin: "14px 0 12px" }}>
            Press &amp; Business Inquiries
          </h2>
          <p style={{ color: C.cream, opacity: 0.75, fontSize: 15, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 24px" }}>
            Want a review key, an interview, or additional assets? We'd love to hear from you.
          </p>
          <PrimaryButton href={`mailto:${PRESS_EMAIL}`}>Email Us</PrimaryButton>
          <p style={{ marginTop: 14 }}>
            <a href={`mailto:${PRESS_EMAIL}`} style={{ color: C.golden, fontSize: 15, textDecoration: "none", wordBreak: "break-word" }}>
              {PRESS_EMAIL}
            </a>
          </p>
          <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.7, maxWidth: 620, margin: "32px auto 0" }}>
            All assets on this page may be used freely in articles, videos, streams and other coverage of
            Tribal Towers: Siege of the Shifting Fortress.
          </p>
        </section>
      </main>

      <footer style={{ background: C.bark, borderTop: `1px solid ${C.border}`, padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: C.muted, fontSize: 12, letterSpacing: "0.06em" }}>
          © 2026 Super Maple Studio · All rights reserved ·{" "}
          <a href="/" style={{ color: C.golden, textDecoration: "none" }}>supermaplestudio.com</a>
        </p>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.fortress}; }
        ::-webkit-scrollbar-thumb { background: ${C.ember}; border-radius: 2px; }

        .pk-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          height: 64px; padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(12,11,10,0.88); backdrop-filter: blur(16px);
          border-bottom: 1px solid ${C.border};
        }
        .pk-nav-links { display: flex; align-items: center; gap: 4px; }
        .pk-nav-link {
          color: ${C.cream}; opacity: 0.7; font-family: ${C.sans}; font-size: 14px;
          padding: 6px 12px; border-radius: 6px; text-decoration: none; transition: opacity 0.2s;
        }
        .pk-nav-link:hover { opacity: 1; }

        .pk-columns { display: grid; grid-template-columns: 320px 1fr; gap: 56px; align-items: start; }
        .pk-card {
          background: ${C.bark}; border: 1px solid rgba(200,96,30,0.22); border-radius: 14px; padding: 28px 26px;
        }
        .pk-fact a, .pk-prose a { color: ${C.golden}; text-decoration: none; word-break: break-word; }
        .pk-fact a:hover { text-decoration: underline; }
        .pk-prose p { color: ${C.cream}; opacity: 0.85; font-size: 16px; line-height: 1.8; margin-bottom: 18px; }
        .pk-prose strong { color: ${C.golden}; font-weight: 600; }
        .pk-subhead {
          font-family: ${C.serif}; font-weight: 600; font-size: 26px; color: ${C.cream}; margin: 36px 0 14px;
        }

        .pk-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
        .pk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .pk-grid-art { align-items: end; }

        .pk-tile {
          display: block; position: relative; overflow: hidden; border-radius: 10px;
          border: 1px solid rgba(200,96,30,0.22); background: ${C.bark};
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .pk-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pk-tile:hover { border-color: ${C.ember}; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 18px rgba(200,96,30,0.15); }
        .pk-play {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 72px; height: 72px; border-radius: 50%; background: ${C.ember};
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 30px rgba(200,96,30,0.5);
        }
        .pk-dl {
          display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0;
          color: ${C.golden}; font-family: ${C.ui}; font-weight: 700; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
        }
        .pk-dl:hover { color: ${C.cream}; }

        @media (max-width: 820px) {
          .pk-columns { grid-template-columns: 1fr; gap: 48px; }
          .pk-nav { padding: 0 16px; }
          .pk-nav-links .pk-nav-link:not(:last-child) { display: none; }
        }
        @media (max-width: 420px) {
          .pk-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
