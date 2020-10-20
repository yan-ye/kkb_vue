import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const constantRouters = [
  {
    path:'/',
    name:'home',
    component: Home
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/components/login.vue')
  }

]
const asyncRouters = [
  {
    path:'/about',
    name:'About',
    meta: {
      title: "About",
      icon: "tianqi",
      roles:['admin', 'editor']
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouters
})
console.log(asyncRouters)

