/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/aslab/*.{html,js,ejs}",
    "node_modules/preline/dist/*.js,"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0as000',
        secondary: '#00ff00', 
      },

      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },

      spacing: {
        '128': '32rem',
      },

    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

