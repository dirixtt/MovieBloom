/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 50px 0px rgba(0, 0, 0, 0.3)',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
    plugins: [],
  }
}

