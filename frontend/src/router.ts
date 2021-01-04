// import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@/pages/index.vue')
const Coincheck = () => import('/@/pages/coincheck.vue')
const Zaif = () => import('/@/pages/zaif.vue')
const Bitbank = () => import('/@/pages/bitbank.vue')
const Bitpoint = () => import('/@/pages/bitpoint.vue')
export const routes = [
  { path: '/', component: Index },
  { path: '/coincheck', component: Coincheck },
  { path: '/zaif', component: Zaif },
  { path: '/bitbank', component: Bitbank },
  { path: '/bitpoint', component: Bitpoint },
]
// export const routerHistory = createWebHistory()
// export const router = createRouter({
//   history: routerHistory,
//   routes,
// })
