import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: {
          50: '#EFFDF5',
          100: '#D9FBE8',
          200: '#B3F5D1',
          300: '#75EDAE',
          400: '#00DC82',
          500: '#00C16A',
          600: '#00A155',
          700: '#007F45',
          800: '#016538',
          900: '#0A5331',
          950: '#052e16'
        },
        pink: {
          50: '#fdf2f7',
          100: '#fce7f1',
          200: '#fbcfe5',
          300: '#f9a8d0',
          400: '#f472b2',
          500: '#ec4899',
          600: '#db2780',
          700: '#be186a',
          800: '#9d1759',
          900: '#83184d',
          950: '#50072b',
        },
        blue: {
          50: '#e4f1ff',
          100: '#cfe4ff',
          200: '#a8ccff',
          300: '#74a9ff',
          400: '#3e73ff',
          500: '#133dff',
          600: '#0027ff',
          700: '#0027ff',
          800: '#0023e4',
          900: '#0015b0',
          950: '#000537',
        },
        gray: {
          10: '#F2F2F2',
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b1bbc8',
          400: '#8695aa',
          500: '#64748b',
          600: '#526077',
          700: '#434e61',
          800: '#3a4252',
          900: '#343a46',
          950: '#23272e',
        }
      }
    }
  }
}
