<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <span v-if="isLogin">
      {{welcome}}
    </span>
    <button @click="logout">注销</button>

  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  methods: {
    login() {
      // window.isLogin = true;
      //提交mutation
      // this.$store.commit('user/login')
      //action 派发动作 触发action
      // this.$store.dispatch("user/login", "admin").then(() => {
      //   this.$router.push(this.$route.query.redirect);
      // });
      //mapAction
      this['user/login']('admin').then( ()=>{
        console.log(this.$store.getters['user/welcome']);
        // //动态添加路由
        // this.$router.addRoutes([
        //   {
        //     path: "/admin",
        //     name: "admin",
        //     component: () =>
        //       import(/* webpackChunkName: "admin" */ "../views/admin.vue"),
        //     meta: {
        //       auth: true,
        //     },

        //     children: [
        //       {
        //         path: "/admin/detail/:name",
        //         name: "adminDetail",
        //         component: () =>
        //           import(/* webpackChunkName: "detail" */ "../views/detail.vue"),
        //       },
        //     ],
        //     //路由守卫作用于单个路由
        //     // beforeEnter(to, from, next) {
        //     //   if(window.isLogin) {
        //     //     next()
        //     //   }else {
        //     //     next('/login?redirect='+ to.fullPath)
        //     //   }
        //     // }
        //   },
        // ]);
        this.$router.push(this.$route.query.redirect);
      })


      // //动态添加路由
      // this.$router.addRoutes([
      //   {
      //     path: "/admin",
      //     name: "admin",
      //     component: () =>
      //       import(/* webpackChunkName: "admin" */ "../views/admin.vue"),
      //     meta: {
      //       auth: true,
      //     },

      //     children: [
      //       {
      //         path: "/admin/detail/:name",
      //         name: "adminDetail",
      //         component: () =>
      //           import(/* webpackChunkName: "detail" */ "../views/detail.vue"),
      //       },
      //     ],
      //     //路由守卫作用于单个路由
      //     // beforeEnter(to, from, next) {
      //     //   if(window.isLogin) {
      //     //     next()
      //     //   }else {
      //     //     next('/login?redirect='+ to.fullPath)
      //     //   }
      //     // }
      //   },
      // ]);
      // this.$router.push(this.$route.query.redirect);
    },
    logout() {
      // window.isLogin = false;
      //vuex 提交mutation
      this.$store.commit("user/logout");
      this.$router.push("/");
      // this.$router.push("/");
    },
    ...mapActions(['user/login'])
  },
  computed: {
    // isLogin() {
    //   return window.isLogin;
    // },
      ...mapState('user', ['isLogin']),  //键 === ‘isLogin’ 值 === ‘this.$store.state.user.isLogin’
      ...mapGetters('user', ['welcome'])//键 === ‘welcome’ 值 === ‘this.$store.getters['user/welcome']’
  },
  // watch: {
  //  $route: {
  //     immediate: true,
  //     deep: true,
  //     handler() {
  //       console.log('哈哈');
  //     }
  //   }
  // },
};
</script>

<style lang="scss" scoped>
</style>