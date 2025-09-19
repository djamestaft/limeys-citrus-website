import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        'blue-glow': 'oklch(0.65 0.18 220)',
        'blue-light': 'oklch(0.75 0.15 220)',
        'blue-pale': 'oklch(0.85 0.12 220)',
      },
      boxShadow: {
        'blue-glow': '0 0 20px oklch(0.65 0.18 220 / 0.3)',
        'blue-glow-sm': '0 0 10px oklch(0.65 0.18 220 / 0.2)',
        'blue-glow-md': '0 0 15px oklch(0.65 0.18 220 / 0.4)',
      },
    },
  },
};
export default config;