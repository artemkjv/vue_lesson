import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Cabinet from '@/views/Cabinet'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/cabinet',
    name: 'Cabinet',
    component: Cabinet
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
