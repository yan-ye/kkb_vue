<template>
  <div v-if="show" class="message-box">
    <!-- 具名卡槽 -->
    <slot name="title"><strong>🎉🎉 恭喜 🎉🎉</strong></slot>
    <!-- 默认卡槽 -->
    <slot></slot>
    <button class="message-btn-close" @click="close">X</button>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    close() {
      this.$emit("update:show", false);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #ddd;
}
.message-box {
  padding: 10px 20px;
}

.message-btn-close {
  float: right;
  margin-right: 20px;
}
</style>