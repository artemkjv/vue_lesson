import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store/index'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Cabinet from '@/views/Cabinet'
import authMiddleware from '@/router/middleware/auth'
import guestMiddleware from '@/router/middleware/guest'
import middlewarePipeline from '@/router/middlewarePipeline'
import CabinetSettings from "@/views/CabinetSettings"
import AppIndex from "@/views/App/Index"
import AppCreate from '@/views/App/Create'
import AppView from '@/views/App/View'
import AppConfig from '@/views/App/Config'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      middleware: [
        guestMiddleware
      ]
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      middleware: [
        guestMiddleware
      ]
    }
  },
  {
    path: '/cabinet',
    name: 'Cabinet',
    component: Cabinet,
    meta: {
      middleware: [
        authMiddleware
      ]
    }
  },
  {
    path: '/app/index',
    name: 'AppIndex',
    component: AppIndex,
    meta: {
      middleware: [
        authMiddleware
      ]
    }
  },
  {
    path: '/app/create',
    name: 'AppCreate',
    component: AppCreate,
    meta: {
      middleware: [
        authMiddleware
      ]
    }
  },
  {
    path: '/app/:internalId',
    name: 'AppView',
    component: AppView,
    meta: {
      middleware: [
          authMiddleware
      ]
    }
  },
  {
    path: '/app/:internalId/config',
    name: 'AppConfig',
    component: AppConfig,
    meta: {
      middleware: [
          authMiddleware
      ]
    }
  },
  {
    path: '/cabinet/settings',
    name: 'CabinetSettings',
    component: CabinetSettings,
    meta: {
      middleware: [
          authMiddleware
      ]
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
