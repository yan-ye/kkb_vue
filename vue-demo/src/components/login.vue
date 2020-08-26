<template>
  <div>
    <button @click="login" v-if="!isLogin">登录</button>
    <button @click="logout">注销</button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      window.isLogin = true;
      //动态添加路由
      this.$router.addRoutes([
        {
          path: "/admin",
          name: "admin",
          component: () =>
            import(/* webpackChunkName: "admin" */ "../views/admin.vue"),
          meta: {
            auth: true,
          },

          children: [
            {
              path: "/admin/detail/:name",
              name: "adminDetail",
              component: () =>
                import(/* webpackChunkName: "detail" */ "../views/detail.vue"),
            },
          ],
          //路由守卫作用于单个路由
          // beforeEnter(to, from, next) {
          //   if(window.isLogin) {
          //     next()
          //   }else {
          //     next('/login?redirect='+ to.fullPath)
          //   }
          // }
        },
      ]);
      this.$router.push(this.$route.query.redirect);
    },
    logout() {
      window.isLogin = false;
      this.$router.push("/");
    },
  },
  computed: {
    isLogin() {
      return window.isLogin;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>