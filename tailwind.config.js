/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f0f5fe',
          '100': '#dde8fc',
          '200': '#c3d8fa',
          '300': '#9ac0f6',
          '400': '#6b9fef',
          '500': '#4077e8',
          '600': '#335fdd',
          '700': '#2a4ccb',
          '800': '#283ea5',
          '900': '#263982',
          '950': '#1b2450',
    },
      }
    },
  },
  plugins: [],
}