import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@/pages/index.vue')
const Coincheck = () => import('/@/pages/coincheck.vue')
const Zaif = () => import('/@/pages/zaif.vue')
const routes = [
  { path: '/', component: Index },
  { path: '/coincheck', component: Coincheck },
  { path: '/zaif', component: Zaif },
]
export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes,
})
