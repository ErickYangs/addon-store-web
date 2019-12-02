import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountLay from '../views/Account.vue'
import TestLay from '../views/Test'

import * as Utils from '@/utils'
import * as Storage from '@/utils/auth'
import { CheckToken } from '@/api/role'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/components/dashboard/index'),
        name: 'Dashboard'
      }
    ]
  },
  {
    path: '/plugin',
    component: Home,
    redirect: '/plugin/index',
    name: 'PluginLayout',
    children: [
      {
        path: 'index',
        component: () => import('@/components/plugin/index'),
        name: 'Plugin'
      },
      {
        path: 'edit',
        component: () => import('@/components/plugin/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: 'Plugin' }
      },
      {
        path: 'create',
        component: () => import('@/components/plugin/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', noCache: true, activeMenu: 'Plugin' }
      },
      {
        path: 'addondetail',
        component: () => import('@/components/plugin/AddonDetail'),
        name: 'AddonDetail',
        meta: { title: 'AddonDetail', noCache: true, activeMenu: 'Plugin' }
      }
    ]
  },
  {
    path: '/application',
    component: Home,
    redirect: '/application/index',
    name: 'ApplicationLayout',
    children: [
      {
        path: 'index',
        component: () => import('@/components/application/index'),
        name: 'Application'
      },
      {
        path: 'createapp',
        component: () => import('@/components/application/addApp'),
        name: 'CreateApp',
        meta: {
          title: 'Create Article',
          noCache: true,
          activeMenu: 'Application'
        }
      },
      {
        path: 'applicationDetail',
        component: () => import('@/components/application/appDetail'),
        name: 'ApplicationDetail',
        meta: {
          title: 'applicationDetail',
          noCache: true,
          activeMenu: 'Application'
        }
      }
    ]
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
    path: '/404',
    component: () => import('@/components/errorPage/404'),
    name: 'Error404'
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/test',
    name: 'TestLay',
    component: TestLay,
    children: [
      {
        path: '/form',
        component: () => import('@/components/test/Form'),
        name: 'TestForm'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Route guard judges token
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // if (to.name === 'Login' || to.name === 'Register' || to.name === 'Error404') {
  //   next()
  //   NProgress.done()
  //   return
  // }
  // let token = Storage.getToken()
  // if (!token) {
  //   let msg = 'Please log in again!'
  //   message.error(msg)
  //   next({ name: 'Login' })
  //   NProgress.done()
  //   return
  // }
  // --------------------------------
  next()

  // try {
  //   let res = await CheckToken({ token })
  //   let errorCode = res.error
  //   if (errorCode != 0) {
  //     let msg = ''
  //     switch (errorCode) {
  //       case 62002:
  //         msg = 'Authentication failed, please log in again!'
  //         break
  //       case 62003:
  //         msg = 'Session expired, please log in again!'
  //         break
  //       default:
  //         msg = 'Please log in again!'
  //         break
  //     }
  //     message.error(msg)
  //     Storage.clear()
  //     next({ name: 'Login' })
  //     NProgress.done()
  //     return false
  //   }
  //   Storage.setToken(res.result.token)
  //   next()
  // } catch (error) {
  //   Storage.removeToken()
  //   next({ name: 'Login' })
  //   NProgress.done()
  //   throw error
  // }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default router
