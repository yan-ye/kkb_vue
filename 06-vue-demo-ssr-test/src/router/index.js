import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


export function createRouter() {
  return new VueRouter({
    routes:[
      {
        path: '/',component: Home
      },
      {
        path: '/about',component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  })
} 
