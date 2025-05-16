/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customwhite: "#FFFFFF",
        customRed: "#FF3C3C",
        customYellow: "#FFEB00",
        customBlack: "#1E1E1E",
        customDarkGray: "#333333",
        customGray: "#DEE1E4",
        customLightGray: "#f7f8f8",
      },
    },
  },
  plugins: [],
};

export default config;
