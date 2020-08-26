<template>
  <div>
  <h1>This is {{$route.params.name}} details page</h1>
  </div>
</template>

<script>
  export default {
    watch: {
      $route: {
        immediate: true,
        deep: true,
        handler() {
          console.log('发送ajax 请求数据');
        }
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>

