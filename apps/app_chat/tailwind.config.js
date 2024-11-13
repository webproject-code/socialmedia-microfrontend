const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        xs: '0px',
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1920px',
      },
      colors: {
        light: {
          primary: '#FFFFFF',
          secondary: '#3366CC',
          lavender: '#D4BFFF',
          silverSteel: '#6b7280',
          modalColor: '#F4F4F9',
        },
        dark: {
          primary: '#24293C',
          secondary: '#AACCFF',
          lavender: '#E6E6FA',
          silverSteel: '#A7A9AA',
          modalColor: '#0F0E21',
        },
      },
      fontFamily: {
        primary: ['Lato'],
        secondary: ['Montserrat'],
      },
    },
  },
  plugins: [],
};
