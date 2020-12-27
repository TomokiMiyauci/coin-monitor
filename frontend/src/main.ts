import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'
import ky from '/@/plugins/ky'
import { router } from '/@/router'
import firestore from '/@/plugins/firebase'

createApp(App).use(router).use(ky).use(firestore).mount('#app')
