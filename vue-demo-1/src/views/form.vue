<template>
  <div>
    <Kform>
      <Kformitem>
        <Kinput v-model="inputtext"></Kinput>
      </Kformitem>
    </Kform>
  </div>
</template>

<script>
import Kinput from "@/components/form/Kinput.vue";
import Kformitem from "@/components/form/Kformitem.vue";
import Kform from "@/components/form/Kform.vue";
export default {
  data() {
    return {
      inputtext: "form",
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
      userInfo: {
        username: "top",
        password: "",
      },
    };
  },
  components: {
    Kinput,
    Kformitem,
    Kform,
  },
};
</script>

<style lang="scss" scoped>
</style>
