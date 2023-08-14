import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
const routes = [
  { path: '/' },
  {
    path: '/auth',
    redirect: '/auth/login',
    children: [
      { path: '/auth/login', component: LoginView },
      { path: '/auth/register' }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
// router.beforeEach((to, from) => {
//   // 而不是去检查每条路由记录
//   // to.matched.some(record => record.meta.requiresAuth)
//   if (to.meta.requiresAuth && !auth.isLoggedIn()) {
//     // 此路由需要授权，请检查是否已登录
//     // 如果没有，则重定向到登录页面
//     return {
//       path: '/login',
//       // 保存我们所在的位置，以便以后再来
//       query: { redirect: to.fullPath }
//     }
//   }
// })
export default router
