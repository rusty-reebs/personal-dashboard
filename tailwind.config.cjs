/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      one: "#252525",
      two: "#FF0000",
      three: "#AF0404",
      four: "#414141",
      five: "#FFFFFF",
    },
    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
