/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '48': '12rem',
        '750': '750px'
      },
      width: {
        "600": '600px',
        '750': '750px'
      },
      backgroundImage: {
        'sky': "url(./src/assets/sky.jpg)"
      }

    },
  },
  plugins: [],
}