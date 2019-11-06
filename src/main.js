import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'

// normalize css
import 'normalize.css/normalize.css'
import '@/styles/index.less'

import { Button, Input, InputNumber, Dropdown, Icon, Menu } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(Icon)
Vue.use(Menu)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
