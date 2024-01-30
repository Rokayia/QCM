import { createRouter, createWebHistory } from 'vue-router'
import QuizzView from '../views/QuizzView.vue'

const routes = [
  {
    path: '/',
    name: 'quizzView',
    component: QuizzView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
