/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFEFA",
        beige: "#FAF6F6",
        red: "#ff5e5e",
        brown: "#3B1D1D",
        yellow: "#FFEB3B",
      },
    },
  },
  plugins: [],
};

export default config;
