import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        primary600: '#F5637C',
        gray500: '95989D',
        gray600: '#76797F',
        gray800: '#404145',
        gray900: '#27282A',
        backgroundInfo: '#1E87FF',
        backgroundError: '#E52030 '
      },
      fontSize: {
        'main-title2': '40px'
      },
      borderColor: {
        gray100: '#F1F2F2',
        gray200: '#E4E5E7',
        gray300: '#D5D6D8',
        gray400: '#B7B9BD',
        gray600: '#76797F',
        primary500: '#FF7A85',
        secondary600: '#49BA43'
      },
      borderRadius: {
        xl: '20px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundColor: {
        gray100: '#F1F2F2',
        gray200: '#e4e5e7',
        pramary100: '#FFF6F2',
        pramary500: '#FF7A85',
        pramary600: '#F5637C',
        btnClose: 'rgba(39, 40, 42, 0.50)',
        default: '#F8FAF8',
        gray75: '#F5F7FA'
      },
      boxShadow: {
        'main-btn': '0px 8px 16px 0px rgba(255, 122, 133, 0.40)',
        'main-btn-hover': 'inset 0px -4px 4px 0px rgba(39, 40, 42, 0.25), 0px 8px 16px 0px rgba(255, 122, 133, 0.40)',
        'my-box': '0px 2px 4px 0px rgba(39, 40, 42, 0.10)'
      },
      height: {
        'main-height': 'calc(100vh - 57px)'
      },
      minHeight: {
        'main-height': 'calc(100vh - 194px)',
        'mobile-main-height': 'calc(100vh - 188px)'
      },
      fontFamily: {
        Pretendard: ['"Pretendard"', 'sans-serif']
      },
      screens: {
        m: { max: '1460px' },
        s: { max: '1044px' },
        xs: { max: '788px' }
      },
      maxWidth: {
        'container-l': '1440px',
        'container-m': '1024px',
        'container-s': '768px',
        'container-xs': '360px'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
