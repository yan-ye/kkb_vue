<template>
  <div>
    <template v-if="is_show">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
      return {
          is_show: false
      }
  },
  methods: {
      show() {
        console.log(this.duration, '>>>>>')
          this.is_show = true
          setTimeout(() => {
              this.hide()
          }, this.duration);
      },
      hide() {
          this.is_show = false
          this.remove()
      }

  },
};
</script>

<style lang="scss" scoped>
</style>