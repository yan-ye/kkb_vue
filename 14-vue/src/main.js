import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import './permission'
import { permission } from "./directives/promission";
Vue.config.productionTip = false

//引入svg图标
import '@/icons'

//注册自定义指令
Vue.directive('role-button', permission)

//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
