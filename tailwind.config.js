/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          secondary: '#1a1a1a',
          accent: '#00ff41',
          text: '#ffffff',
          muted: '#888888',
          border: '#333333',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'terminal-glow': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 65, 0.1), transparent 40%)',
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)' },
          'to': { boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}