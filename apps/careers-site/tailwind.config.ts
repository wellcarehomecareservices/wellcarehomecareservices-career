import type { Config } from "tailwindcss";
import sharedPreset from "@wellcare/config/tailwind.config";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/motion/src/**/*.{ts,tsx}",
  ],
  presets: [sharedPreset],
};

export default config;
