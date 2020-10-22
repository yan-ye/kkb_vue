# Vue3 初探

### vu3提供的可接口的对象
- 基本都在 vue.global.js中  ==> vue/dist/vue.global.js  最下面 
    ```
    exports.BaseTransition = BaseTransition;
    exports.Comment = Comment;
    exports.Fragment = Fragment;
    exports.KeepAlive = KeepAlive;
    exports.Static = Static;
    exports.Suspense = Suspense;
    ...

    ```

### 源码位置  --> package 文件内

- 编译器
    - compiler-core 核心逻辑
    - compiler-dom 针对浏览器平台的编译逻辑
    - compiler-sfc 单文件组件
    - compiler-ssr 服务端渲染逻辑
- 运行时
    - runtime-core 运行时 核心逻辑
    - runtime-dom  运行时 浏览器平台的逻辑
    - runtime-test 浏览器外完成测试
- reactivity 响应式逻辑
- Vue 代码入口
- server-renderer 服务器渲染
- ... 其他 巴拉巴拉的 

### 使用方式的变化
-  new Vue({})  ==>  Vue.createApp({})
- .$mount('#pp') ==> .mount('#pp')
- 不需要 #el 选项了

### 杀手级的 composition Api
- setup(){}
    - 执行在beforeCreate之前
    - 需要 return 定义的属性 方法等  只要是需要用的都需要明确返回 {state,add, ...}
- 可解构的方法  在 vue/dist/vue.global.js 最下面
    - 如 reactive / toRefs / ref / computed 
- 示例 
    ```
    <script>
        import { reactive, ref, toRefs,computed } from "vue";
        export default {
            setup() {
                //定义单个原始值响应  一般用不到
                const testSum = ref(1);
                // 响应化:接收一个对象，返回一个响应式的代理对象
                const state = reactive({
                    count: 1,
                    doubleCount: computed(() => state.count * 2),
                     // computed()返回一个不可变的响应式引用对象   它封装了getter的返回值   需要写在reactive定义为响应式
                    doubleTestSum: computed(() => testSum.value * 2)
                });
                //方法直接定义同名函数即可
                function add() {
                    state.count += 1;
                }
                //方法直接定义同名函数即可
                function addTestSum() {
                    testSum.value++
                }
                //返回所有需要的用到的东西
                return { ...toRefs(state), add, testSum, addTestSum };
            }
        };
        </script>
    ```    




