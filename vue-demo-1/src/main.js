import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './krouter1 '
// import store from './store'
import store from './kstore'
// import proUps from "@/utils/popUps1";
import popUps1 from './utils/popUps1';

Vue.config.productionTip = false
Vue.use(popUps1)
new Vue({
  router,
  store,
  ss:123,
  render: h => h(App)
}).$mount('#app')
 