/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#606c88",
        blue: " #516395 ",
        purple: "#614385",
      },
      backgroundImage: {
        backgr: "url('/backgr2.jpg')",
        backgr1: "url('/anhnnen01.jpg')",
        backgr2: "url('/backgr2.jpg')",
        backgr3: "url('/Backr001.jpg')",
        backgr4: "url('/Backr002.jpg')",
        backgr5: "url('/Back003.jpg')",
      },
    },
  },
  plugins: [],
}
