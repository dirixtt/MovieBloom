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
      aspectRatio: {
        '1/1.2': '1 / 1.2',
      },
      container: {
        center: true,
        // padding: '2rem',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '0rem',
        lg: '4rem',
        xl: '2rem',
        '2xl': '6rem',
      },
    },
    plugins: [],
  }
}

