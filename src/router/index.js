import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountLay from '../views/Account.vue'

import * as Utils from '@/utils'
import * as Storage from '@/utils/auth'
import { CheckToken } from '@/api/role'
import { message } from 'ant-design-vue'

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
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Route guard judges token
// router.beforeEach(async (to, from, next) => {
//   if (to.name === 'Login' || to.name === 'Register') {
//     next()
//     return
//   }
//   let token = Storage.getToken()
//   if (!token) {
//     let msg = 'Please log in again!'
//     message.error(msg)
//     next({ name: 'Login' })
//     return
//   }

//   try {
//     let res = await CheckToken({ token })
//     console.log('token res', res)

//     let errorCode = res.error
//     if (errorCode != 0) {
//       let msg = ''
//       switch (errorCode) {
//         case 62002:
//           msg = 'Authentication failed, please log in again!'
//           break
//         case 62003:
//           msg = 'Session expired, please log in again!'
//           break
//         default:
//           msg = 'Please log in again!'
//           break
//       }
//       message.error(msg)
//       next({ name: 'Login' })
//       return false
//     }
//     Storage.setToken(res.result.token)
//     Storage.setNews('ontid', res.result.ontid)
//     Storage.setNews('userName', res.result.userName)
//     next()
//   } catch (error) {
//     Storage.removeToken()
//     next({ name: 'Login' })
//     throw error
//   }
// })
export default router
