import { resolve } from 'path'
import { UserConfig } from 'vite'
import svgPlugin from 'vite-plugin-svg'
import { name, description } from '../package.json'
import vue from '@vitejs/plugin-vue'
const PROJECT_NAME = name
  .split('-')
  .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  .join(' ')

const config: UserConfig = {
  alias: {
    '/@/': resolve(__dirname, 'src'),
    '@story': resolve(__dirname, 'stories'),
  },

  plugins: [
    vue({
      ssr: !!process.env.VITE_SSG,
    }),
    svgPlugin(),
  ],
  terserOptions: {
    compress: true,
    mangle: true,
    output: {
      comments: false,
    },
  },
}

export default config
