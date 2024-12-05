/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.js", // Add all paths to your files that use Tailwind
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00765F",
        primary_hover: "#00765F",
      },
    },
  },
  plugins: [],
};
