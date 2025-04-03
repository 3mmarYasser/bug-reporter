/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
          light: 'rgba(139, 92, 246, 0.2)',
          lighter: 'rgba(139, 92, 246, 0.1)',
        },
        secondary: {
          DEFAULT: '#4f46e5',
          light: 'rgba(79, 70, 229, 0.2)',
        },
        success: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: 'rgba(16, 185, 129, 0.2)',
          lighter: 'rgba(16, 185, 129, 0.1)',
        },
        danger: {
          DEFAULT: '#ef4444',
          hover: '#dc2626',
          light: 'rgba(239, 68, 68, 0.2)',
          lighter: 'rgba(239, 68, 68, 0.1)',
        },
        bg: {
          primary: '#111827',
          secondary: '#1f2937',
          tertiary: '#374151',
        },
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'xl': '0 15px 35px rgba(0, 0, 0, 0.6)',
      },
      zIndex: {
        'tooltip': '50',
        'modal': '100',
      },
      transitionProperty: {
        'fast': 'all',
        'normal': 'all',
        'slow': 'all',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} 