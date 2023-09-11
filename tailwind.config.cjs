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
        '500': '500px',
        '750': '750px',
        "200": '200px'
      },
      width: {
        "600": '600px',
        '750': '750px',

      },
      backgroundImage: {
        'sky': "url(./src/assets/sky.jpg)"
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%",
          }
        },

      },
      animation: {
        appear: 'fadeIn 2s linear',
        move: 'fadeImg 2s linear',
        typing: "typing 2s steps(20)  alternate "
      }

    },
  },
  plugins: [],
}