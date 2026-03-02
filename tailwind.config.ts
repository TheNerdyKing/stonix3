import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B1220", // dark sections
        foreground: "#0A0A0A", // primary text on light
        primary: "#2563EB", // blue
        accent: "#06B6D4", // cyan
        surface: "#F6F7FB", // off-white for light sections
        muted: "#6B7280", // secondary text
      },
      fontFamily: {
        sans: ["Rubik", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
