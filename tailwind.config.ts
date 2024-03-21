import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bubble: {
          '0%': { bottom: '0%', marginLeft: '2.5rem', marginRight: '0px' },
          '20%': { bottom: '20%', marginLeft: '0px', marginRight: '2.5rem' },
          '40%': { bottom: '40%', marginLeft: '2.5rem', marginRight: '0px' },
          '60%': { bottom: '60%', marginLeft: '0px', marginRight: '2.5rem' },
          '80%': { bottom: '80%', marginLeft: '2.5rem', marginRight: '0px' },
          '100%': { bottom: '100%', marginLeft: '0px', marginRight: '2.5rem', opacity: '0' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
