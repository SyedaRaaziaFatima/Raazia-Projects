/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#a855f7',
      },
      gradients: {
        primary: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      }
    },
  },
  plugins: [],
}
