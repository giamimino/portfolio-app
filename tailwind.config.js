/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GoogleSansFlex-Regular'],
        medium: ['GoogleSansFlex-Medium'],
        semibold: ['GoogleSansFlex-SemiBold'],
        bold: ['GoogleSansFlex-Bold'],
      },
    },
  },
  plugins: [],
};