import { resolve } from 'path'
import { UserConfig } from 'vite'
import svgPlugin from 'vite-plugin-svg'
import { name, description } from '../package.json'

const PROJECT_NAME = name
  .split('-')
  .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  .join(' ')

const config: UserConfig = {
  alias: {
    '/@/': resolve(__dirname, 'src'),
    '@story': resolve(__dirname, 'stories'),
  },

  plugins: [svgPlugin()],
  terserOptions: {
    compress: true,
    mangle: true,
    output: {
      comments: false,
    },
  },

  cssCodeSplit: false,

  shouldPreload: () => true,
}

export default config
