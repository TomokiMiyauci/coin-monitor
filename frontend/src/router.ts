import { createRouter, createWebHistory } from 'vue-router'

import Index from '/@/pages/index.vue'
import Zaif from '/@/pages/zaif.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/zaif', component: Zaif },
]
export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes,
})
