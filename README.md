# hello vue

### 准备工作

#### 开发工具
    - vscode
#### vscode 插件
- debug for chrome      ==== *配合 http-server 服务器的方式访问html*====
- vetur     ====*代码高亮*====
- vue vscode snippets    ====*vue代码快捷键 如vbase*====
- serve-favicon    ====*处理图标*====
- body-parser    ====*请求体解析*====

### 生命周期
- beforeCreate *组件实例未创建 常用于插件开发的初始化*
- created   * 组件初始化完成 数据可访问 事件初始化完成  常用于异步数据获取*
- beforeMount * 未执行渲染、更新 DOM未创建 *
- mounted * DOM已创建 初始化结束*
- beforeUpdate * 更新前 可获取更新前的状态 *
- update * 更新后 所有状态已更新 *

### 语法糖
- ```v-model='courtse' ``` <===> ``` :value='courtse' @input="courtse=$event" ```

### vue组件小结
- 浅谈：vue组件是软件工程的践行，即高内聚低耦合
- 定义：可复用的vue实例 具体说来就是 VueComponent的实例
- 优点：复用性，可维护性，测试性 高
- 使用场景：
    - 通用组件 如：按钮组件 输入组件等
    - 业务组件 如：具有一定的业务逻辑的组件 复用性会比通用组件低一点
    - 页面组件 通过路由控制的页面 由多个组件组合成的页面
- 具体使用： 分为全局组件/局部组件
- 分类： 无状态的组件/有状态的组件/抽象组件
- 通信：**常用的** =>( props / $emit)  **耦合性较高适合基础插件开发**（$parent / $children / $root ...）
- 内容分发 <slot> / v-slot / <template>  默认插槽 具名插槽 作用域插槽
- 实质： 
    - 我们所定义的组件 其实是**组件配置**最终目的是转换为**虚拟DOM**
    - 组件配置 =>  VueComponent => render() => 虚拟DOM =>(更新时)DOM
    - 再研究一下


#### 类型  
- 原始类型  或 对象类型   不是原始类型的都是对象类型

#### 类型断言  ！ as

#### 联合类型  |

#### 交叉类型 &

#### 
- 函数 参数一旦声明就要求传递     可选参数放在后面

#### 
- 函数重载 就是以参数个数或类型区分的多个同名函数

#### 类  
- private   protected  public 访问权的控制

#### 接口  interface    别名 type

#### 泛型   
- <T>   interface Resulet<T> {ok: 1 | 2, data T}   function getRsult<T>(data:T):Resulet<T>{ return {ok：1, data}}      getRsult<string>('hi')

### 声明文件  .d.ts 命名的文件

### 装饰器  类装饰器 一个参数 targe 实例 、 方法装饰器 三个参数  target 实例  name 方法名  descriptor  

    
### ssr服务端渲染测试
- [vue-demo-5-ssr-test](https://github.com/yan-ye/kkb_vue/tree/master/vue-demo-5-ssr-test "vue-demo-5-ssr-test")
- [06-vue-demo-ssr-test](https://github.com/yan-ye/kkb_vue/tree/master/06-vue-demo-ssr-test "06-vue-demo-ssr-test")
- [08-nuxt-demo](https://github.com/yan-ye/kkb_vue/tree/master/08-nuxt-demo "08-nuxt-demo")
- [ts环境搭建](https://github.com/yan-ye/kkb_vue/tree/master/10-ts-test-1)



       
