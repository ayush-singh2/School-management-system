import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRD: Deep Blue/Navy primary, Soft Grays secondary
        // Accents: Green (success/attendance), Red (alerts/dues)
        primary: {
          DEFAULT: "#1e3a5f",
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#1e3a5f",
          600: "#162d4a",
          700: "#0f2035",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f8fafc",
          foreground: "#1e293b",
        },
        success: {
          DEFAULT: "#16a34a",
          light: "#dcfce7",
        },
        danger: {
          DEFAULT: "#dc2626",
          light: "#fee2e2",
        },
        warning: {
          DEFAULT: "#d97706",
          light: "#fef3c7",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        border: "#e2e8f0",
        background: "#f8fafc",
        foreground: "#0f172a",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
