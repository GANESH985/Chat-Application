/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        }
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'delay-100': 'bounce 1s infinite 0.1s',
        'delay-200': 'bounce 1s infinite 0.2s',
      }
    },
  },
  plugins: [],
};
