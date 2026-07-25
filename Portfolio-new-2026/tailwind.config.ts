import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (driven by CSS variables in globals.css)
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        header: "var(--header)",
        text: "var(--text)",
        muted: "var(--muted)",
        line: "var(--border)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        // Fixed brand constants (identical in light & dark)
        espresso: "#0A0A0A",
        cream: "#FFFFFF",
        "cream-soft": "#F0F0F0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: [
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        shell: "1240px",
        content: "1180px",
      },
      boxShadow: {
        hero: "0 34px 72px -34px var(--shadow)",
        card: "0 26px 50px -28px rgba(0,0,0,0.45)",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        scrolldot: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(34px)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1.05s step-end infinite",
        scrolldot: "scrolldot 1.9s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
