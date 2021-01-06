// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [join(BASE_DIR, VUE_FILE), join(__dirname, '*.html')],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '5rem',
        20: '6rem',
        24: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
      strokeWidth: {
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
      borderRadius: {
        '5xl': '3rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },

      maxWidth: {
        '9/12': '75%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
