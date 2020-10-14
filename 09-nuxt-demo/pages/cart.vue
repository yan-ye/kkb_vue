<template>
  <div>
    <h1>cart page</h1>
    <ul>
      <nuxt-link
        v-for="item in fruit"
        :key="item.name"
        :to="{ path: '/detail', query: { name: item.name, price: item.price } }"
      >
        <li>{{ item.name + " : " + item.price }}</li>
      </nuxt-link>
    </ul>
    <button @click="testPlugin111">测试插件</button>
  </div>
</template>

<script>
export default {
   middleware:['auth'],
  data() {
    return {
      fruit: [
        { name: "苹果", price: "3元/kg" },
        { name: "香蕉", price: "2元/kg" },
        { name: "哈密瓜", price: "2元/kg" },
        { name: "橘子", price: "5元/kg" },
        { name: "西瓜", price: "4元/kg" },
      ],
    };
  },
  methods: {
    testPlugin111() {
      this.$testPlugin('test plugin 😆😆😆......')
      console.log(this)
    }
  },
  head() {
    return {
      title: '购物车',
      meta: [
        {
          name: "description",
          hid: "description",
          content: "设置购物车description",
        },
      ],
      link: [{ rel: "favicon", href: "favicon.icom" }],
    };
  },
  async asyncData({$axios, params, error}) {
    const { fruit } = await $axios.$get("/api/cart", {opts:{name:1111}});
    return fruit
  },
};
</script>

<style lang="scss" scoped>
</style>