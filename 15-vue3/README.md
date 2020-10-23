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
- 不需要 $el 选项了

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
### 巴拉巴拉... 
- 据说时间对比快了一半？ 内存消耗小了一半 
- 迁移应该很好搞吧  不过需要相关的库全都跟上来
- 听说Vue的市场份额很小？涨势很猛
- vue2 响应式是使用 Object.defineProperty   vue3使用的是 Proxy
- ie 不支持就降级 还是使用Vue2 ？

### 响应式原理基础实现

    ``` javascript
    const isObject = obj => obj !== null && typeof obj === 'object'
    const toProxy = new WeakMap()
    const toObj = new WeakMap()
    function reactive(obj) {
        if (!isObject(obj)) {
            return obj
        }
        //查找缓存
        if (toProxy.has(obj)) {
            return obj
        }
        if (toObj.has(obj)) {
            return obj
        }
        const observe = new Proxy(obj, {
            get(target, key, receiver) {
                const res = Reflect.get(target, key, receiver)
                console.log(`获取 ${JSON.stringify(key)} ${res}`);
                //收集依赖
                track(target, key)
                return isObject(res) ? reactive(res) : res
            },
            set(target, key, value, receiver) {
                const res = Reflect.set(target, key, value, receiver)
                console.log(`设置 ${JSON.stringify(value)} ${res}`);
                //触发依赖
                trigger(target, key)
                return res
            },
            deleteProperty(target, key) {
                const res = Reflect.deleteProperty(target, key)
                console.log(`删除 ${key} ${res}`);
                //触发依赖
                trigger(target, key)
                return res
            },
        })
        //缓存
        toProxy.set(obj, observe)
        toObj.set(observe, obj)

        return observe
    }
    
    let effectStack = []
    function effect(fn) {
        const rxEffect = function () {
            try {
                //入栈
                effectStack.push(rxEffect)
                return fn()
            } catch (error) {
                console.log(error, '>>>>>');
            } finally {
                //出栈
                effectStack.pop()
            }
        }
        // 默认执行一次响应函数 
        rxEffect()
        // 返回响应函数
        return rxEffect
    }
    let targetMap = new WeakMap()
    function track(target, key) {
        //从堆栈中取出响应函数
        let effec = effectStack[effectStack.length - 1]
        if (effec) {
            //获取target对应的 map 表
            let depsMap = targetMap.get(target)
            if (!depsMap) {
                depsMap = new Map()
                targetMap.set(target, depsMap)
            }
            //获取key 对应的响应函数表
            let deps = depsMap.get(key)
            if (!deps) {
                deps = new Set()
                depsMap.set(key, deps)
            }
            //将响应函数加入对应的集合deps
            if (!deps.has(effec)) {
                deps.add(effec)
            }
        }

    }
    function trigger(target, key) {
        //获取target依赖map
        let depMap = targetMap.get(target)
        if (depMap) {
            //获取key依赖的fn
            let deps = depMap.get(key)
            //执行key依赖的fn
            if (deps) {
                deps.forEach(effect => {
                    effect()
                });
            }
        }
    }
    const obj = { foo: 'foo', bar: { foo: 'foo-bar' }, arr: [1, 2, 3, 4] }
    const state = reactive(obj)
    effect(() => {
        console.log('effect: ', delete state.foo);
    })

    // state.foo
    state.foo = 'foooooo'
    // state.foo
    // state.bar.foo
    // state.bar.foo = { test1: 'test11111' }
    // state.bar.foo.test1
    // state.arr[2]


    // console.log(reactive(state) === state, '>>>>>>')

    ```




