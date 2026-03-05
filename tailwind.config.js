
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pop: { '0%': { transform: 'scale(0.9)', opacity: '0.5' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        confetti: { '0%': { transform: 'translateY(-10vh) rotate(0deg)' }, '100%': { transform: 'translateY(110vh) rotate(360deg)' } }
      },
      animation: {
        pop: 'pop 250ms ease-out',
        confetti: 'confetti 2.8s ease-in forwards'
      }
    }
  },
  plugins: [],
}
