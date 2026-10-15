import type { Config } from "tailwindcss";

/**
 * Shared "Warm Teal" design token preset.
 * apps/web extends this preset rather than redefining tokens locally,
 * so packages/ui and packages/motion stay in sync with the brand.
 */
const preset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        teal: {
          900: "#12393A", // Deep Harbor — headlines on light bg, footer bg
          600: "#22787A", // Brand — primary actions, links, icons
          300: "#8FBDB9", // Soft Sage — secondary accents, borders
          50: "#EAF3F2", // Mist — section backgrounds, cards
        },
        sand: {
          50: "#FBF7F0", // Warm Linen — page background
        },
        amber: {
          500: "#D9A441", // Hearth Gold — sparing warm accent
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-general-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "bloom-sm": "0 8px 24px -8px rgb(34 120 122 / 0.08)",
        "bloom-md": "0 16px 40px -12px rgb(34 120 122 / 0.10)",
      },
      keyframes: {
        "presence-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "presence-pulse": "presence-pulse 3.8s ease-in-out infinite",
        "fade-rise": "fade-rise 0.6s ease-out both",
      },
      letterSpacing: {
        "label-wide": "0.08em",
      },
    },
  },
};

export default preset;
