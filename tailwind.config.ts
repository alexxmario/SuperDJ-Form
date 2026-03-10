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
        // Super DJ Brand Colors - Light theme with pink/green accents
        background: {
          DEFAULT: '#ffffff',
          secondary: '#f9fafb',
          tertiary: '#f3f4f6',
        },
        accent: {
          DEFAULT: '#ee1e45', // Pink
          hover: '#dc1b3f',
          light: '#f43f5e',
          muted: '#fecdd3',
          dark: '#be123c',
        },
        'accent-green': {
          DEFAULT: '#8fb23e', // Green
          hover: '#7da035',
          light: '#a3c45a',
          muted: '#d9f99d',
          dark: '#6b8c2a',
        },
        surface: {
          DEFAULT: '#ffffff',
          hover: '#f9fafb',
          border: '#e5e7eb',
          elevated: '#ffffff',
        },
        text: {
          primary: '#111827',
          secondary: '#4b5563',
          muted: '#9ca3af',
          accent: '#ee1e45',
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
        'gradient-accent': 'linear-gradient(135deg, #ee1e45 0%, #8fb23e 100%)',
        'glow': 'radial-gradient(ellipse at center, rgba(238, 30, 69, 0.08) 0%, transparent 70%)',
        'hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(143, 178, 62, 0.08) 0%, transparent 60%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(238, 30, 69, 0.1)',
        'glow': '0 0 40px rgba(238, 30, 69, 0.15)',
        'glow-lg': '0 0 60px rgba(238, 30, 69, 0.2), 0 0 20px rgba(143, 178, 62, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12), 0 0 30px rgba(238, 30, 69, 0.05)',
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
          '0%': { boxShadow: '0 0 20px rgba(238, 30, 69, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(238, 30, 69, 0.25)' },
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
