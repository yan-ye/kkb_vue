<template>
    <div>
        <input type="text" name="account" v-model="account">
        <input type="password" name="" v-model="password">
        <button @click="onLogin">登录</button>
    </div>
</template>

<script>
    import '@/store'
    export default {
        data() {
            return {
                account: '',
                password:'',
            }
        },
        methods: {
            onLogin() {
                this.$store
                .dispatch('user/login',{userName: this.account})
                .then(() =>{
                    this.$router.push({
                        path: this.$route.query.redirect || '/'
                    })
                }).catch(err =>{
                    alert(err, '>>>>>')
                })
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>