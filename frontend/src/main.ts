import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'

import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'

import App from '/@/App.vue'
import firestore from '/@/plugins/firebase'
import flash from '/@/plugins/flash'
import ky from '/@/plugins/ky'
import { routes } from '/@/router'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, isClient, router }) => {
    app.use(ky).use(firestore)

    if (isClient) {
      app.use(flash)
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)
