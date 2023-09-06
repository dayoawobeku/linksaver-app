/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: '#6C019D',
        900: '#A652CE',
        800: '#D6B0E8',
      },
      white: {
        DEFAULT: '#FFF',
        900: '#f9f9f9',
      },
      black: {
        DEFAULT: '#000',
      },
      grey: {
        DEFAULT: '#1a1a1a',
        950: '#1e1e1e',
        900: '#B3B3B3',
        800: '#CECED2',
        700: '#E5E5E5',
        600: '#F2F2F2',
        500: '#F1F1F1',
      },
      transparent: 'transparent',
      brown: {
        DEFAULT: '#615858',
      },
      green: {
        DEFAULT: '#43584A',
      },
      danger: '#e3342f',
    },
    fontSize: {
      'really-sm': '0.75rem', // 12px
      sm: '0.8125rem', // 13px
      'semi-sm': '0.875rem', // 14px
      base: '1rem', // 16px
      md: '1.5rem', // 24px
      lg: '2rem', // 32px
      xl: '2.5rem', // 40px
    },
  },
  plugins: [],
};
