/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      screens:{
        phone:'320px',
        tablet: '640px',
      }
    },
  },
  plugins: [require("tailwindcss-animation-delay"),require("tailwind-gradient-mask-image")],
}

