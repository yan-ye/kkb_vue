<template>
    <div>
        <h1>detail child page</h1>
        <p>{{$route.query}}</p>
    </div>
</template>

<script>
    export default {
        mounted () {
            console.log(this.$route)
        },
    }
</script>

<style lang="scss" scoped>

</style>