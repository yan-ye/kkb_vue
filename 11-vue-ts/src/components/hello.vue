<template>
  <div>
      <input type="text" placeholder="输入新特性feature" @keyup.enter="addFeature">
      <ul>
          <li v-for="feature in features" :key="feature">{{feature}}</li>
      </ul>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class hello extends Vue {
  features: string[] = ["类型注解", "编译语言"];
  addFeature(e: KeyboardEvent) {
    //e.target 是EventTarget类型  需要断言为 HTMLInputElement
    const inp = e.target as HTMLInputElement
    this.features.push(inp.value)
    inp.value = ''
  }
  created() {
    this.features.push('this is a created push string')
  }

}
</script>

<style lang="scss" scoped>
</style>