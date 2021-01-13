import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('/@story/index.vue')
const OrderBook = () => import('/@story/order-book/OrderBook.story')
const BaseCard = () => import('/@story/base/BaseCard.stories')

const routes = [
  { path: '/', component: Index },
  { path: '/order-book', component: OrderBook },
  { path: '/base/base-card', component: BaseCard },
]
export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes,
})
