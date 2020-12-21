import { join } from 'path'
import type { UserConfig } from 'vite'
import svgPlugin from 'vite-plugin-svg'
import { VitePWA } from 'vite-plugin-pwa'
import { name, description } from '../package.json'

const PROJECT_NAME = name
  .split('-')
  .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
  .join(' ')

const config: UserConfig = {
  alias: {
    '/@/': join(__dirname, 'src'),
  },

  plugins: [
    svgPlugin(),
    VitePWA({
      manifest: {
        name: PROJECT_NAME,
        short_name: PROJECT_NAME,
        description,
      },
    }),
  ],

  shouldPreload: () => true,
}

export default config
