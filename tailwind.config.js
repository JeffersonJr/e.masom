/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a5568', // neutral gray
          light: '#a0aec0',
        },
        accent: '#2b6cb0', // soft blue accent
        apple: '#0a84ff', // Apple blue accent
        mason: {
          blue: "#4298B5",
          green: "#00C389",
          "green-light": "#00E09D",
          "blue-light": "#58B0CE",
        },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
};
