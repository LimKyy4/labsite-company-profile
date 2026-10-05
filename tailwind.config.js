/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF8F5',
          100: '#F5F1EC',
          200: '#EFE9E1',
        },
        espresso: {
          50: '#F5F1EC',
          200: '#E8E2D9',
          300: '#C4A482',
          400: '#B8956F',
          600: '#8B6548',
          700: '#6F4E37',
          800: '#5C3D2E',
          900: '#4A3125',
          950: '#2D1E14',
        },
        taupe: {
          300: '#C9BEB2',
          400: '#A89B90',
          500: '#8B7D70',
          600: '#6E6259',
          700: '#574E47',
        },
        champagne: {
          200: '#E5CFB3',
          300: '#D4B896',
        },
        surface: {
          ink: '#1C1512',
          espresso: '#120E0C',
          raise: '#1C1613',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.6875rem, 0.66rem + 0.14vw, 0.75rem)',
        'fluid-sm': 'clamp(0.8125rem, 0.78rem + 0.16vw, 0.875rem)',
        'fluid-base': 'clamp(0.9375rem, 0.89rem + 0.24vw, 1.0625rem)',
        'fluid-lg': 'clamp(1rem, 0.94rem + 0.3vw, 1.1875rem)',
        'fluid-xl': 'clamp(1.1875rem, 1.06rem + 0.63vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.4375rem, 1.22rem + 1.08vw, 1.9375rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.87vw, 2.75rem)',
        'fluid-4xl': 'clamp(2.5rem, 1.9rem + 3vw, 4rem)',
        'fluid-5xl': 'clamp(2.5rem, 1.75rem + 4vw, 5.5rem)',
        'fluid-6xl': 'clamp(3rem, 2.1rem + 6vw, 8rem)',
      },
      spacing: {
        'gutter': 'clamp(1.25rem, 0.5rem + 3.75vw, 5rem)',
        'section': 'clamp(5rem, 3.5rem + 7.5vw, 11rem)',
        'fluid-xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem)',
        'fluid-sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        'fluid-md': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
        'fluid-2xl': 'clamp(3rem, 2.4rem + 3vw, 4.5rem)',
        'fluid-3xl': 'clamp(4rem, 3.2rem + 4vw, 6rem)',
      },
      maxWidth: {
        ultrawide: '96rem',
        frame: '110rem',
      },
      boxShadow: {
        'hairline': '0 0 0 1px rgb(0 0 0 / 0)',
        'ambient': '0 1px 2px -1px rgb(28 21 18 / 0.05), 0 6px 20px -8px rgb(28 21 18 / 0.10)',
        'lift': '0 2px 6px -2px rgb(28 21 18 / 0.08), 0 18px 48px -18px rgb(28 21 18 / 0.20)',
        'pill': '0 1px 2px -1px rgb(28 21 18 / 0.08), 0 12px 32px -12px rgb(28 21 18 / 0.16)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 48s) linear infinite',
        'ping-slow': 'ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};