/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        baloo: ['Montserrat', 'cursive'],
        sans: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        'navbar-height': '64px',
      },
    },
  },
  plugins: [],
};
