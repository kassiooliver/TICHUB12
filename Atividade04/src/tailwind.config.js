/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,js,html}", // Adicionei html aqui por segurança
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}