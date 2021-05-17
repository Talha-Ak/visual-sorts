/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        trueGray: colors.trueGray,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
