<template>
  <svg :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon-svg',
  props: ['icon', 'svgClass'],
  computed: {
    iconName() {
      return "#icon-" + this.icon;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>