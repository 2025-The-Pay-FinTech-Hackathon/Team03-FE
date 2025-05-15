/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customIvory: "#FFFEFA",
        customBeige: "#FAF6F6",
        customRed: "#ff5e5e",
        customBrown: "#3B1D1D",
        customYellow: "#FFEB3B",
      },
    },
  },
  plugins: [],
};

export default config;
