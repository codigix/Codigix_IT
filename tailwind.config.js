/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        dark: '#0F1419',
        gray: {
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#CCCCCC',
          400: '#999999',
          500: '#666666',
          600: '#444444',
          700: '#2E2E2E',
          800: '#1F1F1F',
          900: '#0F0F0F',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        admin: ['Roboto', 'Roboto Fallback', 'sans-serif'],
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeInLeft: 'fadeInLeft 0.8s ease-out',
        slideInDown: 'slideInDown 0.5s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
