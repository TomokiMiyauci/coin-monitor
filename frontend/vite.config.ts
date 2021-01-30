import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

import { description, name } from '../package.json'
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
    VitePWA({
      manifest: {
        name: PROJECT_NAME,
        short_name: PROJECT_NAME,
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

  // terserOptions: {
  //   compress: true,
  //   mangle: true,
  //   output: {
  //     comments: false,
  //   },
  // },
})
