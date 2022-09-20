/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: "#FAC41E",
            border: "#FD841F",
            heading: "#191919"
         },
      },
   },
   plugins: [],
};
