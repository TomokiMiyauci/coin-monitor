import { createApp, Plugin } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'

import ky from 'ky'

const plugin: Plugin = {
  install: (app) => {
    app.provide('$http', ky)
  },
}
createApp(App).use(plugin).mount('#app')
