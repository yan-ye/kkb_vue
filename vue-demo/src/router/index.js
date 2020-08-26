import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'

Vue.use(VueRouter)

//配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: () => import(/* webpackChunkName: "admin" */ '../views/admin.vue'),
  //   meta: {
  //     auth: true
  //   },

  //   children: [
  //     {
  //       path: '/admin/detail/:name',
  //       name: 'adminDetail',
  //       component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue')
  //     }
  //   ],
  //   //路由守卫作用于单个路由
  //   // beforeEnter(to, from, next) {
  //   //   if(window.isLogin) {
  //   //     next()
  //   //   }else {
  //   //     next('/login?redirect='+ to.fullPath)
  //   //   }
  //   // }
  // },
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

//全局守卫
// router.beforeEach((to, from, next) => {
//   //判断是否需要守卫
//   if (to.meta.auth) {
//     if (window.isLogin) {
//       next()
//     } else {
//       next('/login?redirect=' + to.fullPath)
//     }

//   } else {
//     next()
//   }
// });

router.beforeEach( (to, from, next) =>{
  if(window.isLogin) {
    if(to.path === '/login') {
      next('/')
    }else {
      next()
    }
    next()
  }else {
    if(to.path === '/login') {
      next()
    }else {
      next('/login?redirect=' + to.fullPath)
    }
  }
})


export default router
