import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signup
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersListView.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../views/RoomsListView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/CurrentRoom.vue')
    }
  ]
})

export default router
