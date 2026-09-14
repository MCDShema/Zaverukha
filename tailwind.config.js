/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sacred: {
          dark: '#0e0c24',
          night: '#19163d',
          blue: '#2e2b75',
          indigo: '#3b3691',
          gold: '#c99a2c',
          goldLight: '#f5df7e',
          goldHover: '#dfb03b',
          cream: '#fbf9f5',
          muted: '#8e8ca8',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
