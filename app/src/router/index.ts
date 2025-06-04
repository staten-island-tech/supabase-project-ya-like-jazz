import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/loggedin'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
      path: '/testpage',
      name: 'testpage',
      component: () => import('../components/testPage.vue'),
    }, 
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfilePage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('../views/PlayPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/changepfp',
      name: 'changepfp',
      component: () => import('../views/ChangeProfile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/cardprofile/:code',
      name: 'cardprofile',
      component: () => import('../views/CardProfile.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.loggedIn) {
    next('/login')
  } else {
    next()
  }
})
export default router
