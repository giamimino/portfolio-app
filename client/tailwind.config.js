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
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        n: {
          2: 'var(--n-2)',
          3: 'var(--n-3)',
          8: 'var(--n-8)',
        },

        brown: {
          60: 'var(--brown-60)',
          70: 'var(--brown-70)',
          80: 'var(--brown-80)',
        },

        dark: {
          '02': 'var(--dark-02)',
          '03': 'var(--dark-03)',
          '06': 'var(--dark-06)',
          '10': 'var(--dark-10)',
          '12': 'var(--dark-12)',
          '15': 'var(--dark-15)',
          '25': 'var(--dark-25)',
        },

        dark: {
          '10': 'var(--grey-10)',
          '20': 'var(--grey-20)',
          '30': 'var(--grey-30)',
          '40': 'var(--grey-40)',
          '50': 'var(--grey-50)',
          '60': 'var(--grey-60)',
          '70': 'var(--grey-70)',
          '80': 'var(--grey-80)',
          '90': 'var(--grey-90)',
          '100': 'var(--grey-100)',
        },

        orange: {
          '10': 'var(--orange-10)',
        },

        c: {
          8: 'var(--c-8)',
        },
        b: {
          9: 'var(--b-9)',
          1: {
            DEFAULT: 'var(--b-1)',
            'active': 'var(--b-1-active)'
          },
        },
        a: {
          3: 'var(--a-3)',
        },

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },

        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },

        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },

        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },

        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },

        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },

        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
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
