/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
        "1000": "1000",
        "1001": "1001",
      },
      height: {
        main: "calc(100vh - 4rem)",
        section: "calc(100vh - 8rem)",
      },
      minHeight: {
        main: "calc(100vh - 4rem)",
        section: "calc(100vh - 8rem)",
      },
    },
  },
  plugins: [],
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  
}
