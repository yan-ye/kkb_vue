<template>
    <div>
        <input type="text" name="name" v-model="userInfo.name">
        <input type="password" name="password" v-model="userInfo.password">
        <button @click="onLogin">登录</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    name:'',
                    password: ''
                }
            }
        },
        methods: {
            onLogin() {
                this.$store
                .dispatch('user/login', this.userInfo)
                .then(() =>{
                    this.$router
                    .push({
                        path: this.$route.query.redirect
                    })
                }).catch(err =>{
                    alert(err || 'unknown Error!')
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>