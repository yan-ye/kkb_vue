<template>
  <svg :class="svgClass">
      <use :xlink:href="icon_name"></use>
    </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: ["iconName", "svgClass"],
  computed: {
    icon_name() {
      return "#icon-" + this.iconName;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>