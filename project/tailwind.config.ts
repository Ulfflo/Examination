import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "shade-24-light": "rgba(241, 240, 236, 0.24)",
        "shade-24-dark": "rgba(53, 49, 49, 0.24)",
      },
    },
  },
  plugins: [],
} satisfies Config;
