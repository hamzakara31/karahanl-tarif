/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9800',
          light: '#FFB74D',
          dark: '#F57C00',
        },
        secondary: {
          DEFAULT: '#E64A19',
          light: '#FF7043',
          dark: '#BF360C',
        },
      },
    },
  },
  plugins: [],
}

