import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginWebsite.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterWebsite.vue'),
    },
    {
      path: '/emailverification',
      name: 'emailverification',
      component: () => import('../views/EmailVerification.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfilePage.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsPage.vue'),
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayPage.vue'),
    },
  ],
})

export default router
