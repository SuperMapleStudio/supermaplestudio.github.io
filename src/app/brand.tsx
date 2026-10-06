// ── Shared style tokens ──────────────────────────────────────────────────────
export const C = {
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

export const STEAM_URL = "https://store.steampowered.com/app/2862160/Tribal_Towers__Siege_of_the_Shifting_Fortress/";

// ── SVG maple leaf icon (consistent orange, no emoji rendering variance) ─────
// Same path as public/favicon.svg — keep them in sync.
export function MapleLeaf({ size = 20, color = C.ember }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M50 4 C50 4 44 18 38 20 C32 22 20 14 20 14 C20 14 26 26 24 32 C22 38 8 40 8 40 C8 40 18 48 18 54 C18 60 10 70 10 70 C10 70 24 66 30 70 C36 74 36 88 36 88 L44 80 L46 96 L50 88 L54 96 L56 80 L64 88 C64 88 64 74 70 70 C76 66 90 70 90 70 C90 70 82 60 82 54 C82 48 92 40 92 40 C92 40 78 38 76 32 C74 26 80 14 80 14 C80 14 68 22 62 20 C56 18 50 4 50 4Z" />
    </svg>
  );
}
