/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        upa: {
          pink: '#E91E8C',
          pinkdark: '#B31570',
          lightpink: '#FDE6F2',
          ink: '#1B1E2B',
          mint: '#00B894',
          mintdark: '#00815F',
          cream: '#FBF7F5',
        },
        usa: {
          red: '#B22234',
          blue: '#3C3B6B',
          white: '#FFFFFF',
        },
        spain: {
          red: '#AA151B',
          yellow: '#FFC400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(27,30,43,0.04), 0 8px 24px rgba(27,30,43,0.06)',
      },
    },
  },
  plugins: [],
}
