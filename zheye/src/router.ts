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

router.beforeEach((to, from, next) => {
  // 需要登录
  console.log(store.state.user)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
    // 已经登录，访问登录页，跳转首页
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
