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
        // Super DJ Brand Colors - Premium dark with gold accents
        background: {
          DEFAULT: '#09090b',
          secondary: '#0c0c0f',
          tertiary: '#18181b',
        },
        accent: {
          DEFAULT: '#eab308', // Gold
          hover: '#facc15',
          light: '#fcd34d',
          muted: '#854d0e',
          dark: '#713f12',
        },
        surface: {
          DEFAULT: '#18181b',
          hover: '#27272a',
          border: '#3f3f46',
          elevated: '#1c1c1f',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#71717a',
          accent: '#eab308',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #eab308 0%, #fcd34d 50%, #eab308 100%)',
        'glow': 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.12) 0%, transparent 70%)',
        'hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(234, 179, 8, 0.1) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(234, 179, 8, 0.15)',
        'glow': '0 0 40px rgba(234, 179, 8, 0.2)',
        'glow-lg': '0 0 60px rgba(234, 179, 8, 0.25), 0 0 20px rgba(234, 179, 8, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(234, 179, 8, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.4s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(234, 179, 8, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
