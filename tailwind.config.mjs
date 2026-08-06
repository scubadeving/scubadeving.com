/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        surface: "#0a0a0a",
        "surface-raised": "#111111",
        "surface-border": "#1f1f1f",
        ink: "#f5f5f5",
        "ink-muted": "#737373",
        accent: "#0ea5e9",
      },
    },
  },
};
