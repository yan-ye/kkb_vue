<template>
  <div>
    <h1>hello Vue3</h1>
    <p>count:{{ count }} <button @click="add">count add 1</button></p>
    <p>doubleCount: {{ doubleCount }}</p>
    <p>testSum: {{ testSum }} <button @click="addTestSum">testSum add 1</button></p>
    <p>doubleTestSum: {{ doubleTestSum }}</p>
  </div>
</template>

<script>
import { reactive, ref, toRefs,computed } from "vue";

export default {
  setup() {
    const testSum = ref(1);

    const state = reactive({
      count: 1,
      doubleCount: computed(() => state.count * 2),
      doubleTestSum: computed(() => testSum.value * 2)
    });
    function add() {
      state.count += 1;
    }

    function addTestSum() {
        testSum.value++
    }

    return { ...toRefs(state), add, testSum, addTestSum };
  },
};
</script>

<style scoped>
</style>