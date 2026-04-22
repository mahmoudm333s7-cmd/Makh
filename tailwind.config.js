/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We'll always use dark for neon theme but support toggling if needed
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        neon: {
          blue: '#00d4ff',
          green: '#39ff14',
        },
        surface: '#111111',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00d4ff, 0 0 20px #00d4ff',
        'neon-green': '0 0 10px #39ff14, 0 0 20px #39ff14',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
