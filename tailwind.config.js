/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      colors: {
        black_rgba: "rgba(0, 0, 0, .25)"
      },
      fontFamily: {
        lobster: ["var(--font-lobster)"],
        roboto: ["var(--font-roboto)"]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
  }
}