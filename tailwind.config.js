const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'base': '1170px',
        'lg-xl': '1100px',
        'swiper-sm': '638px',
        'mobile': '335px'
      },
      fontFamily: {
        spectral: ['Spectral', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'primary-white': '#FFFFFF',
        'black': '#000000',
        grey: '#3D3538',
        purple: '#A52390',
        burgundy: '#C4B6B1',
        'light-grey': '#D8D8D8',
        'secondary-grey': '#8E8E93',
        'third-grey': '#5D5D5D',
        'fourth-grey': '#A7A7A7',
        'secondary-white': '#F2F2F2',
        'gray-border': "#EEEDEE"
      },
      boxShadow: {
        "grid": "0 0 0 1px"
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
}
}
