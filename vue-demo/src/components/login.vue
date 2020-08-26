<template>
    <div>
        <button @click="login" v-if="!isLogin"> 登录 </button>
        <button @click="logout"> 注销 </button>
    </div>
</template>

<script>
    export default {
        methods: {
            login() {
                window.isLogin = true;
                this.$router.push(this.$route.query.redirect)
            },
             logout() {
                window.isLogin = false;
                this.$router.push('/')
            }
        },
        computed: {
            isLogin() {
               return window.isLogin
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>