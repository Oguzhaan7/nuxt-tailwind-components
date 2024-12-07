/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./plugins/**/*.{js,ts,jsx,tsx}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        light: {
          primary: "#4a4ded",
          background: "#f2f2f2",
          accent: "#4F46E5",
          muted: "#E5E7EB",
          text: "#405169",
        },
        dark: {
          primary: "#5d6cfc",
          background: "#22282E",
          accent: "#4F46E5",
          muted: "#374151",
          text: "#AAB8C5",
        },
        "scroll-light": "#E2E8F0",
        "scroll-dark": "#374151",
        "scroll-thumb": "#808080",
      },
    },
  },
  plugins: [],
};
