import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue'),
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/CreatePost.vue'),
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('@/views/ColumnDetail.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      let [err, res] = await store.dispatch('fetchCurrentUser')
      if (err) {
        console.log(err)
        localStorage.removeItem('token')
        next('login')
        return
      }
      if (redirectAlreadyLogin) {
        next('/')
      } else {
        next()
      }
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
