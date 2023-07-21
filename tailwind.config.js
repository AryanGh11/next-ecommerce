/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem, 1fr))",
      },
      colors: {
        black_rgba: "rgba(0, 0, 0, .25)"
      }
    },
  },
  plugins: [],
}