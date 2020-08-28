<template>
  <div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
        type:Object
    },
  },
};
</script>

<style  scoped>
</style>
