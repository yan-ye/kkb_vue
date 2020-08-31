<template>
  <div>
    <h3>{{title}}</h3>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
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
  methods: {
    show() {
      this.isShow = true;
      setTimeout(() => {
        this.hide();
      }, this.duration);
    },
    hide() {
      this.remove();
    },
    say() {
      console.log("hello popups");
    },
  },
};
</script>

<style scoped>
</style>