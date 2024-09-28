import type { Config } from "tailwindcss";
import { DecoratedTorusKnot4a } from "three/examples/jsm/curves/CurveExtras.js";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Thema: "#ffd803",
        LightThema: "#e3f6f5", // Secondary
        DarkThema: "#272343", // Headline and Stroke
        Background: "#fffffe", // Background and Main
        Highlight: "#ffd803", // Highlight
        Paragraph: "#2d334a", // Paragraph
        Tertiary: "#bae8e8", // Tertiary
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      scale: {
        "0": "0",
        "100": "1",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

export default config;
