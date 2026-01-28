import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          400: "#39ff14",
          500: "#22e600",
          600: "#12b000",
        },
        void: "#07090b",
        panel: "#0c1114",
        stroke: "#1b242b",
      },
      boxShadow: {
        glow: "0 0 12px rgba(57, 255, 20, 0.35)",
        glowStrong: "0 0 22px rgba(57, 255, 20, 0.55)",
      },
      fontFamily: {
        monoish: ["var(--font-mono)", "Fira Code", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sansish: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(57,255,20,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.08) 1px, transparent 1px)",
        glow: "radial-gradient(circle at 20% 10%, rgba(57,255,20,0.15), transparent 45%), radial-gradient(circle at 80% 0%, rgba(57,255,20,0.1), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
