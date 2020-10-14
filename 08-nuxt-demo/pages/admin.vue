<template>
  <div>
    <h2>admin page</h2>
    <h3>{{goods}}</h3>
  </div>
</template>

<script>
export default {
  middleware:['auth'],
  data() {
    return {
      goods: []
    }
  },
  head() {
    return {
      title: "test title",
      meta: [
        { name: "description", hid: "description", content: "set page meta" },
      ],
      link: [{ rel: "favicon", href: "favicon.ico" }],
    };
  },
  async asyncData({ $axios,error }) {
    const json = await $axios.$get('/api/goods')
    if(json){
      //此处返回的数据会和data进行合并
      return {
       goods: json
      }
    }
    error({statusCode: 400, message: '数据查询失败'})
  },
};
</script>

<style lang="scss" scoped>
</style>