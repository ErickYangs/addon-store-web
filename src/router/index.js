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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Route guard judges token
router.beforeEach(async (to, from, next) => {
  if (to.name === 'Login' || to.name === 'Register') {
    next()
    return
  }
  // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiIiLCJpc3MiOiJkaWQ6b250OkFldE1UdWNxWWpLaHN5d1BRQ0hvVFI0c0Q4NWlmbllETm8iLCJleHAiOjE1NzMxMTgzODYsImlhdCI6MTU3MzExODIwNiwianRpIjoiMTc1MzE1MDkxZDAxNGNhZWFkOThkOTk1MWUwNTlhODIiLCJjb250ZW50Ijp7InR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJvbnRpZCI6ImRpZDpvbnQ6QU5TWUVXdHNtUWo4NmFXTHdzeEJtMWl0UG9GWW5GYUNXQSJ9fQ.MDFlODZiZTI4YzNhZjc1YTBlOTE0YzQ3N2Q2MmJiNWYzZjE2NTI0MzJhNmFkMTE2N2U1ZGRiNmIxNjBmOTE3YmRiODk0ZjNlNGQzYTY3OGZlNTFhMzUzYzE5NDIxYTRiZGM1N2NkODNlNzMzNzU5NjIxM2ExZTc4MTVmMzExMWM1ZA"
  let token = Storage.getToken()
  if (!token) {
    let msg = 'Please log in again!'
    message.error(msg)
    next({ name: 'Login' })
    return
  }

  try {
    let res = await CheckToken({ token })
    console.log('token res', res)

    let errorCode = res.error
    if (errorCode != 0) {
      let msg = ''
      switch (errorCode) {
        case 62002:
          msg = 'Authentication failed, please log in again!'
          break
        case 62003:
          msg = 'Session expired, please log in again!'
          break
        default:
          msg = 'Please log in again!'
          break
      }
      message.error(msg)
      next({ name: 'Login' })
      return false
    }
    Storage.setToken(res.result.token)
    Storage.setNews('ontid', res.result.ontid)
    Storage.setNews('userName', res.result.userName)
    next()
  } catch (error) {
    Storage.removeToken()
    next({ name: 'Login' })
    throw error
  }
})
export default router
