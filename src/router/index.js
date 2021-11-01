import {createRouter, createWebHistory} from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
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
    path: '/',
    name: 'GlobalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'YourFeed',
    component: GlobalFeed
  },
  {
    path: '/tags/:slug',
    name: 'Tag',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'CreateArticle',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'Article',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug/edit',
    name: 'EditArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'Settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'UserProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'UserProfileFavorites',
    component: GlobalFeed
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
