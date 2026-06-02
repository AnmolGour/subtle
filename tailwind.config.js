/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand: white surfaces + a single saturated blue (#0B66C3)
        // Token names are kept (ink/bone/azure) so existing class usages work.
        // - ink   = surfaces (page → cards)
        // - bone  = text     (headlines → muted)
        // - azure = primary brand blue
        // - moss  = quiet secondary slate
        white: '#FFFFFF',

        ink: {
          950: '#FFFFFF', // page background
          900: '#F8FAFC', // subtle alt surface
          800: '#E8EDF4', // cards / faint surface
          700: '#D5DCE6', // borders, dividers
          600: '#B5C0CE', // muted borders
        },

        bone: {
          50:  '#070B14', // strongest text (display max)
          100: '#101724', // primary headline
          200: '#3D4757', // body text
          300: '#6A7384', // muted (eyebrows, captions)
        },

        azure: {
          400: '#3284D2', // lighter brand blue (subtle accents)
          500: '#0B66C3', // PRIMARY brand blue
          600: '#094F99', // hover / deeper emphasis
        },

        moss: {
          500: '#94A0B0', // quiet cool slate (secondary accent)
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        snug: '-0.02em',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        // soft brand wash at the top of the hero
        'radial-fade':
          'radial-gradient(ellipse at top, #0B66C32E, transparent 60%)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
