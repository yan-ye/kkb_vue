import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export const contentRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
]
export const asyncRoutes = [
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta:{
      title:'产品',
      icon:'dongtian',
      roles:['admin', 'editor']
    }
  }

]


export const router =  new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: contentRoutes
})

