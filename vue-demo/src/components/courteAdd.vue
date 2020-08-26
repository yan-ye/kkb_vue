<template>
  <div>
    <input @input="oninput" @keydown.enter="addCourte" type="text" ref="inp" :value="value" />
    <button @click="addCourte">添加课程</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    addCourte() {
      //派发一个事件  来通知父组件新增课程
      this.$emit("add-courte9");
    },
    oninput(e) {
      this.$emit("input", e.target.value);
    },
  },
  mounted() {
    this.$refs.inp.focus();
  },
};
</script>

<style scoped>
</style>