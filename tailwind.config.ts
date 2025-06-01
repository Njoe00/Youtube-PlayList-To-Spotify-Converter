import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxl: "1200px",
        xl: "1024px",
        lg: "900px",
        md: "768px",
        sm: "576px",
        xs: "375px",
      },
      fontFamily: {
        serif: ["var(--sans-serif)"],
        wix: ["Wix MadeforText", "sans-serif"],
      },
      colors: {
        "primary-color": "#9E3FFD",
        "main-text-color": "#16163F",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "square-pattern": "url('/square-pattern.jpg')",
        "wave-pattern": "url('/layered-waves.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
