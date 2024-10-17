import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: "#BB86FC",
        darkPurple:"#1F1B24"
      },
      boxShadow: {
        'left-purple': '-4px 0 0px rgba(77, 54, 77, 0.5)', // Adjust values as needed
      },
    },
  },
  plugins: [],
};
export default config;
