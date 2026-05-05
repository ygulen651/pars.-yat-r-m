import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated to match the Beige Editorial Design System
        void: "#f7f4ef",
        "void-2": "#f0ece5",
        "void-3": "#e8e3db",
        surface: "#ede9e1",
        "surface-2": "#e4dfd6",
        gold: "hsl(34, 68%, 42%)",
        "gold-pale": "hsl(36, 58%, 52%)",
        "gold-deep": "hsl(30, 72%, 30%)",
        "gold-bright": "hsl(38, 75%, 55%)",
        ink: "#1c1712",
        "ink-dim": "#5c5245",
        "ink-ghost": "#9c9087",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        sans: ["var(--font-ui)", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 4s ease-in-out infinite",
        float: "float 2.2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "100% center" },
        },
        float: {
          "0%, 100%": { opacity: "0.3", transform: "translateY(0)" },
          "50%": { opacity: "0.75", transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
