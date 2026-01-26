/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",      // <--- Scans files in the root (like App.tsx)
    "./src/**/*.{js,ts,jsx,tsx}" // <--- Scans src just in case you create it later
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#800060',
          orange: '#D97706',
          pink:   '#F08080',
          dark:   '#2D1B2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}