<template>
    <div>
        <h1 v-if="error.statusCode === 404">页面不存在</h1>
        <h1 v-else>应用发生异常</h1>
        <p>{{error}}</p>
        <nuxt-link to='/'>点击返回首页</nuxt-link>
    </div>
</template>

<script>
    export default {
        props:['error'],
        layout: 'blank'
    }
</script>

<style lang="scss" scoped>


</style>