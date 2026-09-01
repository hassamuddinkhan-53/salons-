import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--salon-text)",
        paper: "var(--salon-bg)",
        blush: "var(--salon-primary)",
        champagne: "var(--salon-secondary)",
        gold: "var(--salon-accent)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(28, 20, 16, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
