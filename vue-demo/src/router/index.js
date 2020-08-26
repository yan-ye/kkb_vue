import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  //配置
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/detail/:name',
        name:'HomeDetail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
      }
    ]
  },
  {
    path: '/detail/:name',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */  '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
