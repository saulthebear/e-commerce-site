/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        brand: ['Vollkorn', 'serif'],
        sans: ['"Baloo 2"', 'sans-serif'],
      },
      spacing: {
        'navbar-height': '64px',
        'adjusted-screen-height': 'calc(100vh - 64px)',
      },
      minHeight: {
        'adjusted-screen-height': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
};
