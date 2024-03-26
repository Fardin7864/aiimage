/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkcolor: {
          100: '#1D262D',
          200: '#2A3742',
          300: '#384857',
          400: '#1D2600',
        },
        creditgreen: {
          100: '#66FFA3'
        },
        primary: {
          100: '#FF165D'
        }
      },
    },
  },
  plugins: [],
};
