import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'
import ky from '/@/plugins/ky'
import { router } from '/@/router'

createApp(App).use(router).use(ky).mount('#app')
