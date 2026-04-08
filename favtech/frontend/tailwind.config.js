/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',     /* Deep Navy Blue */
        seafoam: '#14b8a6',  /* Teal/Seafoam Accent */
        ice: '#f0f9ff',      /* Ice Blue Background */
        ghost: '#f8fafc',    /* Ghost White */
        white: '#ffffff',
        slate: {
          dark: '#334155'   /* Dark Slate Gray */
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
