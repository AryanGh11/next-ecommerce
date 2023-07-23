/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,tsx}"],
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
  plugins: [require("daisyui")],
}