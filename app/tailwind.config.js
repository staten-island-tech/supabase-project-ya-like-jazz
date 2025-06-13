/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        1: 'var(--color-1)',
        2: 'var(--color-2)',
        3: 'var(--color-3)',
        4: 'var(--color-4)',
        hover2: 'var(--color-2-hover)',
        hover3: 'var(--color-3-hover)',
        hover4: 'var(--color-4-hover)',
        textcolor: 'var(--text-color)',
        textcolor2: 'var(--text-color2)',
        dark3: 'var(--color-3-dark)',
        /* 'color-1': '#ffffff',
        'color-2': '#222a4c',
        'color-3': '#7e45f1',
        'color-3-hover': '#6236ba',
        'color-4': '#ffbf40',
        'color-4-hover': '#feb420',*/

        /*'color-5': '#302c2c',
        'color-6': '#eaf1ed',
        'color-7': '#a39a9b',
        'color-8': '#603c40',*/
      },
    },
  },
  plugins: [],
}

// 0d122d
