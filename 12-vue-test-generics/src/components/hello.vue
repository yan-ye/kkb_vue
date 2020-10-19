<template>
  <div>
    <input type="text" />
    <ul>
      <li v-for="feature in features" :key="feature.id">{{ feature.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { get_feature } from "@/api/feature";
@Component
export default class hello extends Vue {
  features = [];
  created() {
    this.features.push({ name: "语言....", id: 1 });
    get_feature().then(res =>{
      this.features = res.data
    }).then(err =>{
      console.log(err, '>>>>>>>>>');
      
    })
  }
}
</script>