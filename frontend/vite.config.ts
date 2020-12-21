import { join } from 'path'
import type { UserConfig } from 'vite'
import svgPlugin from 'vite-plugin-svg'

const config: UserConfig = {
  alias: {
    '/@/': join(__dirname, 'src'),
  },

  plugins: [svgPlugin()],
}

export default config
