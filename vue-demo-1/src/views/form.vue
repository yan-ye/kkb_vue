<template>
  <div>
    <Kform :model='userInfo' :rules='rules' ref='logform'>
      <Kformitem :label="'用户名'" prop='username'>
        <Kinput v-model="userInfo.username"  type='text' :placeholder='rules.username[0].message'></Kinput>
      </Kformitem>

      <Kformitem :label="'密码'" prop='password'>
        <Kinput v-model="userInfo.password" :placeholder='rules.password[0].message' type='password'></Kinput>
      </Kformitem>


       <Kformitem>
       <button @click="validateFrom">校验数据</button>
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
      inputtext: "",
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    Kinput,
    Kformitem,
    Kform,
  },
  methods: {
    validateFrom() {
      this.$refs.logform.validate( valid =>{
        if(valid) {
          alert('submit')
        }else {
          alert('error submit')
          return false
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
