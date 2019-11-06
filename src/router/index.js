import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountLay from '../views/Account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountLay,
    children: [
      {
        path: '/login',
        component: () => import('@/components/Login'),
        name: 'Login'
      },
      {
        path: '/register',
        component: () => import('@/components/Register'),
        name: 'Register'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
