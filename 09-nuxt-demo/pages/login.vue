<template>
  <div>
    <h1>login page</h1>
    <input type="text" v-model="user.name" />
    <input type="password" v-model="user.password" />
    <button @click="onLogin">登录</button>
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    onLogin() {
      this.$store.dispatch("user/login", this.user).then((ok) => {
        if (ok) {
          const redirect = this.$route.query.redirect || "/";
          console.log(ok, ">>>>>>>>", redirect);
          this.$router.push(redirect);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>