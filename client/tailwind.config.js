 /** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],

  theme: {
    extend: {
      fontFamily: {
        sans: ['GoogleSansFlex-Regular', 'system-ui', 'sans-serif'],
      },

      colors: {
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',

        n: {
          2: 'rgb(var(--n-2) / <alpha-value>)',
          3: 'rgb(var(--n-3) / <alpha-value>)',
          8: 'rgb(var(--n-8) / <alpha-value>)',
        },

        brown: {
          60: 'rgb(var(--brown-60) / <alpha-value>)',
          70: 'rgb(var(--brown-70) / <alpha-value>)',
          80: 'rgb(var(--brown-80) / <alpha-value>)',
        },

        dark: {
          '02': 'rgb(var(--dark-02) / <alpha-value>)',
          '03': 'rgb(var(--dark-03) / <alpha-value>)',
          '06': 'rgb(var(--dark-06) / <alpha-value>)',
          '10': 'rgb(var(--dark-10) / <alpha-value>)',
          '12': 'rgb(var(--dark-12) / <alpha-value>)',
          '15': 'rgb(var(--dark-15) / <alpha-value>)',
          '25': 'rgb(var(--dark-25) / <alpha-value>)',
        },

        grey: {
          '10': 'rgb(var(--grey-10) / <alpha-value>)',
          '20': 'rgb(var(--grey-20) / <alpha-value>)',
          '30': 'rgb(var(--grey-30) / <alpha-value>)',
          '40': 'rgb(var(--grey-40) / <alpha-value>)',
          '50': 'rgb(var(--grey-50) / <alpha-value>)',
          '60': 'rgb(var(--grey-60) / <alpha-value>)',
          '70': 'rgb(var(--grey-70) / <alpha-value>)',
          '80': 'rgb(var(--grey-80) / <alpha-value>)',
          '90': 'rgb(var(--grey-90) / <alpha-value>)',
          '100': 'rgb(var(--grey-100) / <alpha-value>)',
        },

        orange: {
          '10': 'rgb(var(--orange-10) / <alpha-value>)',
        },

        c: {
          8: 'rgb(var(--c-8) / <alpha-value>)',
        },

        b: {
          9: 'rgb(var(--b-9) / <alpha-value>)',

          1: {
            DEFAULT: 'rgb(var(--b-1) / <alpha-value>)',
            active: 'rgb(var(--b-1-active) / <alpha-value>)',
          },
        },

        a: {
          3: 'rgb(var(--a-3) / <alpha-value>)',
        },

        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground:
            'rgb(var(--primary-foreground) / <alpha-value>)',
        },

        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground:
            'rgb(var(--secondary-foreground) / <alpha-value>)',
        },

        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground:
            'rgb(var(--destructive-foreground) / <alpha-value>)',
        },

        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground:
            'rgb(var(--muted-foreground) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground:
            'rgb(var(--accent-foreground) / <alpha-value>)',
        },

        popover: {
          DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
          foreground:
            'rgb(var(--popover-foreground) / <alpha-value>)',
        },

        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground:
            'rgb(var(--card-foreground) / <alpha-value>)',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },

        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [require('tailwindcss-animate')],
};