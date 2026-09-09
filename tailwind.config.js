/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        foreground: '#F8FAFC',
        muted: '#161B26',
        'muted-foreground': '#94A3B8', 
        border: 'rgba(255, 255, 255, 0.08)',
        primary: '#00E5FF',
        secondary: '#38BDF8',
        critical: '#EF4444',
        warning: '#F59E0B',
        safe: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'micro': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em', fontWeight: '500' }],
        'body': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0em', fontWeight: '400' }],
        'heading': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em', fontWeight: '500' }],
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '700' }],
      },
      borderRadius: {
        'outer': '12px',
        'inner': '8px',
        'micro': '4px',
      },
      scale: {
        '98': '0.98',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
