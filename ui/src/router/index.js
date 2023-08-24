import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const routes = [
  { path: '/' },
  { path: '/demo', component: () => import('@/views/DemoView.vue') },
  {
    path: '/app',
    component: () => import('@/layouts/AppLayout.vue'),
    redirect: '/app/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/app/DashboardView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'proCatalog',
        name: 'proCatalog',
        component: () => import('@/views/app/products/ProCatalogView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/app/orders/OrderListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'tempList',
        name: 'tempList',
        component: () => import('@/views/app/templates/TemplateListView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'canvas',
        name: 'canvas',
        component: () => import('@/views/app/library/CanvasView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !useUserStore().isLogin) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/auth/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})
export default router
