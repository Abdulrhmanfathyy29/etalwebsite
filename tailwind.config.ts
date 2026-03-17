import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green:       '#229264',
          'green-dark':'#1a7250',
          'green-light':'#2aad78',
          yellow:      '#FDED1B',
          'yellow-dark':'#e0d200',
          dark:        '#131414',
          'dark-muted':'#1e2020',
          gray:        '#6b7280',
          'gray-light':'#f3f4f6',
          'gray-mid':  '#e5e7eb',
          white:       '#ffffff',
        },
      },
      fontFamily: {
        // --font-primary is set per-locale in [locale]/layout.tsx
        headline: ['var(--font-primary)', 'system-ui', 'sans-serif'],
        body:     ['var(--font-primary)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['8rem',  { lineHeight: '0.9',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['6rem',  { lineHeight: '0.9',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg':  ['4.5rem',{ lineHeight: '0.95', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-md':  ['3.5rem',{ lineHeight: '1',    letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm':  ['2.5rem',{ lineHeight: '1.05', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(34,146,100,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,146,100,0.06) 1px, transparent 1px)",
        'hero-gradient': 'linear-gradient(135deg, #131414 0%, #1a2620 50%, #131414 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'slide-right':'slideRight 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'industrial': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
