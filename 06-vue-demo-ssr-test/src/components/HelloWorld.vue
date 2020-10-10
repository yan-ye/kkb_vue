<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <children1 msg='welcome to your chilren1.vue' ref="gh" @logMsg='logMsg($event)' foo='hello children11111'>
        <template>
        匿名插槽
        </template> 
        <template v-slot:test>具名插槽</template>
        <template v-slot:default='slotProps'>
            来自组件的数据：{{slotProps.foo1}}
          </template>
    </children1>
    <children2 msg='welcome to your chilren22222222.vue' @logMsg='logMsg(arguments)' foo='hello children22222' type="text" placeholder='placeholder' value=123></children2>
    <button @click='goHome'>回家吃饭</button>
    <button @click="notice">弹窗组件测试</button>
  </div>
</template>

<script>
import children1 from "./children1.vue";
import children2 from "./children2.vue";
// import notice11 from "@/components/notice.vue";
// import create from '../utils/create_extend1.js';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    children1,
    children2,
  },
  methods:{
    logMsg(msg) {
      console.log(`来自${JSON.stringify(msg)}--`)
    },
    goHome() {
      // this.$children[0].eat()
      this.$refs.gh.eat()
      console.log(this.$refs.gh)
    },
    notice() {
      // const notice1 = create(notice11,{
      //   title: '测试弹窗',
      //   message: '🇳🇱惺惺惜惺惺想寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻',
      //   duration: 2000
      // })
      // notice1.show()
      this.$notice({
          title: '测试弹窗',
          message: '🇳🇱惺惺惜惺惺想寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻',
          duration: 2000
      }).show()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
