/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        green: {
          100: '#d5f5e3',
          200: '#abebc6',
          300: '#82e0aa',
          400: '#58d68d',
          500: '#2ecc71',
          600: '#25a55b',
          700: '#1c7d44',
          800: '#145a32',
          900: '#0b2e1a',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'type': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};