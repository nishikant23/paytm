/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width :{
        'custom-max' : '50px'
      }

    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
    fontSize :{
      'us' : '0.65rem',
      'xl' : '1.2 rem',
      '2xl' : '1.5rem',
      '4xl' : '2.25rem'
    }
  },
  plugins: [],
}

