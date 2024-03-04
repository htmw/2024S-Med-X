/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#171717',
        secondary: '#1E1E1E',
        customGreen: '#A6FCAF',
        customWhite: '#FFFFFF',
        customPurple: '#B5A7F7',
        customBasewhite: {
          DEFAULT: '#D9D9D9',
          '30': 'rgba(217, 217, 217, 0.3)',
        },
      },
      gradient: {
        'customGradient': 'linear-gradient(45deg, #A6FCAF 0%, #B5A7F7 52%, #585481 100%)',
      },
    },
  },
  plugins: [],
};
