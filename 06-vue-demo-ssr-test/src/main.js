import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import create from './utils/create_plugin'

Vue.config.productionTip = false

Vue.use(create)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
