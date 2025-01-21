/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: '376px',
        desktop: '769px',
      },
    },
  },
  plugins: [],
};
