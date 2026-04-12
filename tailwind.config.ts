import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        script: ["Pinyon Script", "cursive"],
      },
      colors: {
        brand: {
          light: "#B9B4FB",
          deep: "#8E86F8",
        },
        background: "#0E0E10",
        "card-bg": "rgba(18, 18, 20, 0.5)",
        "border-color": "#1E1E21",
      },
    },
  },
  plugins: [],
};
export default config;
