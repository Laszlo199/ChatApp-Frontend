import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
