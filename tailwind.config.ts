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
      colors: {
        'main-pink': '#fcd1d1',
        'main-blue': '#a3c7e1',
        'main-darkblue': '#284e74',
        'success': '#5ecea8',
        'fail': '#eb5252',
      },
      keyframes: {
        bubble: {
          '0%': { bottom: '0%', marginLeft: '2.5rem', marginRight: '0px' },
          '20%': { bottom: '20%', marginLeft: '0px', marginRight: '2.5rem' },
          '40%': { bottom: '40%', marginLeft: '2.5rem', marginRight: '0px' },
          '60%': { bottom: '60%', marginLeft: '0px', marginRight: '2.5rem' },
          '80%': { bottom: '80%', marginLeft: '2.5rem', marginRight: '0px' },
          '100%': { bottom: '100%', marginLeft: '0px', marginRight: '2.5rem', opacity: '0' },
        },
        showUp: {
          '0%': { bottom: '3%', opacity: 0 },
          '100%': { bottom: '9%', opacity: 1 },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'selector'
};
export default config;
