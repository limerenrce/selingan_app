/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C6CC6",
        secondary: "#C5C5FE",
        ternary: "#AEE5FF",
        cardOne: "#FFA4D5",
        cardTwo: "#FF7C75",
        cardTri: "#FEE882",
      },
      fontFamily: {
        sans: ["Poppins", "sans"], 
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        }
      }
    },
  },
  plugins: [],
}