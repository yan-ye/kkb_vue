<template>
  <div>
    <div class="course-list" v-if="courtes.length > 0">
      <div
        v-for="(item, i) in courtes"
        :key="i"
        :style="{'background-color': selecedCourte === item.name ? '#ddd' : ''}"
        @click="onClick(item.name)"
      >
        <div>
          {{ item.name }} -- ￥{{item.price}}
          <!-- router-link 方法编写路由  转换成 a 标签   添加动态的值需要编程绑定  : -->
          <!-- <router-link :to='`/detail/${item.name}`'>{{ item.name }} -- ￥{{item.price}}</router-link> -->
          <button @click="removeC(this,item, i)">X</button>
        </div>
      </div>
    </div>
    <p v-else>没有任何课程信息</p>
  </div>
</template>

<script>
export default {
  props: {
    courtes: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      selecedCourte: "",
    };
  },
  methods: {
    removeC(e, item, i) {
      this.$emit("remove-c", { obj: item, index: i });
    },
    onClick(name) {
      this.selecedCourte = name;
      // 字符串
      // this.$router.push(`/detail/${name}`)
      //命名的路由
      this.$router.push({
        name: "HomeDetail",
        params: { name: name },
      });
    },
  },
};
</script> 

<style scoped>
</style>