<template>
  <div class="home">
    <img alt="Vue logo" :src="`${publicPath}assets/logo.png`" />
    <login></login>
    <message :show.sync="show" class="success">
      <template v-slot:title></template>
      <template>添加课程成功！</template>
    </message>
    <message :show.sync="showWarning" class="warning">
      <template v-slot:title>
        <strong>警告</strong>
      </template>
      <template>请填写课程</template>
    </message>
    <courte-add v-model="courte" @add-courte9="addCourte"></courte-add>
    <courte-list :courtes="courtes"></courte-list>

    <!-- 嵌套内容出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import courteList from "@/components/courteList.vue";
import courteAdd from "@/components/courteAdd.vue";
import message from "@/components/message.vue";
import login from "@/components/login.vue";
import { getCourtes } from "@/service/getData.js";

export default {
  name: "admin",
  data() {
    return {
      courtes: [],
      courte: "",
      show: false,
      showWarning: false,
      publicPath: process.env.BASE_URL,
    };
  },
  components: {
    courteList,
    courteAdd,
    message,
    login,
  },
  methods: {
    editPrice() {
      this.courtes.forEach((obj) => {
        this.$set(obj, "price", this.price);
      });
    },
    addCourte() {
      if (this.courte) {
        this.courtes.push({ name: this.courte });
        this.courte = "";
        this.show = true;
      } else {
        this.showWarning = true;
      }
    },
    setData(c) {
      this.courtes = c.data;
    },
  },
  async created() {
    //组件实例已创建 未挂载 dom 不存在
    const c = await getCourtes();
    this.courtes = c.data;
    this.editPrice();
  },

  // beforeRouteEnter(to, from, next) {
  //   if (window.isLogin) {
  //     next();
  //   } else {
  //     next("/login?redirect=" + to.fullPath);
  //   }
  // },

  //路由进入前异步获取数据
  // async beforeRouteEnter(to, from, next) {
  //   if (window.isLogin) {
  //     let c = await getCourtes();
  //     next((vm) => {
  //       vm.setData(c);
  //     });
  //   } else {
  //     next("/login?redirect=" + to.fullPath);
  //   }
  // },


  // 路由更新时异步获取数据
  // async beforeRouteUpdate(to, from, next) {
  //   let c = await getCourtes();
  //   this.setData(c)
  //   next()
  // },
};
</script>

<style scoped>
.success {
  background-color: rgb(41, 207, 64);
}
.warning {
  background-color: rgb(255, 3, 90);
}
</style>
