/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          600: '#059669',
          700: '#047857',
        }
      }
    },
  },
  plugins: [],
}
