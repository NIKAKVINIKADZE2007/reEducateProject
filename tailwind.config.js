/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: '376px',
        desktop: '769px',
      },
      colors: {
        purpleDark: '#7C5DFA',
        mainDark: '#0C0E16',
        lightPurple: '#9277FF',
        blueGray: '#7E88C3',
        lightGray: '#DFE3FA',
        darkGray: '#888EB0',
      },
    },
  },
  plugins: [],
};
