import { resolve } from 'path'
import { defineConfig } from 'vite'
import { name, description } from '../package.json'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
const PROJECT_NAME = name
  .split('-')
  .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  .join(' ')

export default defineConfig({
  alias: {
    '/@': resolve(__dirname, 'src'),
  },

  plugins: [
    vue({
      ssr: !!process.env.VITE_SSG,
    }),
    svgLoader(),
  ],

  // terserOptions: {
  //   compress: true,
  //   mangle: true,
  //   output: {
  //     comments: false,
  //   },
  // },
})
