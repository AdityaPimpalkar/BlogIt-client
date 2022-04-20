const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      teal: "#417D7A",
      tealprimary: "#1D5C63",
      tealsecondary: "#1A3C40",
      white: "#FFF",
      black: "#000",
      peach: "#EDE6DB",
    },
    extend: {
      colors: {
        gray: colors.gray,
        red: colors.red,
        indigo: colors.indigo,
      },
    },
  },
  plugins: [],
};
