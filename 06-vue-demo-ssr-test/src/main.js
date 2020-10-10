// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import create from './utils/create_plugin'

// Vue.config.productionTip = false

// Vue.use(create)

// Vue.prototype.$bus = new Vue()

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router, { createRouter } from './router'
import store from './store'
import create from './utils/create_plugin'

Vue.config.productionTip = false

Vue.use(create)

Vue.prototype.$bus = new Vue()

// 返回工厂函数  每次请求创建一个新的Vue实例
export function createApp(context) {
  //1 穿件路由器
  const router = createRouter
  const app = new Vue({
    router,
    context,  //上下文用于给渲染器传递参数
    render: h => h(App)
  })
  return {router, app}
}



