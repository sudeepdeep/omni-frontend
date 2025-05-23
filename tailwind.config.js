/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3533cd",
      },
      fontFamily: {
        poppins: ["Poppins"],
        lemon: ["lemon"],
        leagueSpartan: ["League Spartan"],
        bungeeTint: ["Bungee Tint"],
      },
    },
  },
  plugins: [],
};
