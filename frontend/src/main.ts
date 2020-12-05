import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'
import ky from '/@/plugins/ky'

createApp(App).use(ky).mount('#app')
