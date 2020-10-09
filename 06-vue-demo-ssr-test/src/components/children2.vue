<template>
  <div @click="onClick()">
    {{ msg }}
    {{$attrs.foo}}
    <input v-bind="$attrs">
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  inheritAttrs: false,
  methods: {
    onClick() {
      this.$emit("logMsg", "chilren2222222", "参数1", "参数2", "参数3");
    },
  },
  mounted () {
      this.$bus.$on('foo', (msg)=>{
          console.log('$bus .>>>>>>>', msg)
      })
      this.$parent.$on('parent', (msg) =>{
             console.log('parent .>>>>>>>', msg)
      })
  },
};
</script>

<style lang="scss" scoped>
</style>