import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'

import VueI18n from 'vue-i18n'
import ch from './common/lang/zh'
import en from './common/lang/en'
import ko from './common/lang/ko'
Vue.use(VueI18n)

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
  message,
  LocaleProvider,
  ConfigProvider
} from 'ant-design-vue'
Vue.prototype.$message = message
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(LocaleProvider)
Vue.use(ConfigProvider)


// http api
import http from '@/api'
Vue.prototype.$http = http

// utils
import * as utils from '@/utils'
Vue.prototype.$utils = utils

const yuyan = navigator.language.split('-')[0]
let yuyans
switch (yuyan) {
  case 'zh':
    yuyans = 'ch'
    break
  case 'en':
    yuyans = 'en'
    break
  case 'ko':
    yuyans = 'ko'
    break
  default:
    yuyans = 'en'
}
console.log('yuyans', yuyans)
console.log(localStorage.getItem('user_lang'))
const i18n = new VueI18n({
  locale: localStorage.getItem('user_lang') || yuyans,
  messages: {
    ch: ch,
    en: en,
    ko: ko
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
