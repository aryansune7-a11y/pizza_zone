/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pizza: {
          crimson: '#D84315',
          orange: '#E65100',
          amber: '#FFB300',
          cream: '#FFFBF7',
          dark: '#1A1A1A',
          muted: '#6B7280',
          vegGreen: '#2E7D32',
          nonVegRed: '#C62828'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'pizza-lg': '0 10px 25px -5px rgba(230, 81, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'pizza-glow': '0 0 20px rgba(230, 81, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
