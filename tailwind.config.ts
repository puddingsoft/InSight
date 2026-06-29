import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 中国股市约定：红涨绿跌
        up: { DEFAULT: "#e23b3b", bg: "#fdecec", soft: "#f7c1c1" },
        down: { DEFAULT: "#1d9e75", bg: "#e1f5ee", soft: "#9fe1cb" },
        accent: { DEFAULT: "#3a5bd9", bg: "#eef2ff" },
        amber: { DEFAULT: "#b9770f", bg: "#fdf3e3" },
        ink: { 1: "#1a1d21", 2: "#5f6670", 3: "#9aa1ab" },
        panel: "#ffffff",
        line: "#eceef1",
        page: "#f5f6f8",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
