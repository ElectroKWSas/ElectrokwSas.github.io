import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0C3C9C",
          dark: "#041C5C",
          light: "#5B8DEF",
        },
        secondary: {
          DEFAULT: "#0A0A0A",
          light: "#1F2937",
        },
        accent: {
          DEFAULT: "#A8492E",
          dark: "#8A3A22",
          light: "#E8C4B5",
        },
        energy: "#12A8EE",
        background: {
          DEFAULT: "#FFFFFF",
          alt: "#F3F6FB",
          dark: "#060A14",
          "alt-dark": "#0D1526",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#10192B",
        },
        text: {
          primary: "#0A0A0A",
          "primary-dark": "#F1F5F9",
          secondary: "#55606E",
          "secondary-dark": "#94A3B8",
        },
        border: {
          DEFAULT: "#DFE4EC",
          dark: "#26324A",
        },
        success: "#1F8A54",
        error: "#C0392B",
        warning: "#D97706",
      },
      fontFamily: {
        heading: ["Lora", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
