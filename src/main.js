import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'

// normalize css
import 'normalize.css/normalize.css'
import '@/styles/index.less'

import {
  Button,
  Input,
  InputNumber,
  Dropdown,
  Icon,
  Menu,
  message
} from 'ant-design-vue'
Vue.prototype.$message = message
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(Menu)

// http api
import http from '@/api'
Vue.prototype.$http = http

// utils
import * as utils from '@/utils'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
