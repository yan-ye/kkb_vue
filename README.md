# hello vue

### 准备工作

#### 开发工具
    - vscode
#### vscode 插件
- debug for chrome      ==== *配合 http-server 服务器的方式访问html*====
- vetur     ====*代码高亮*====
- vue vscode snippets    ====*vue代码快捷键 如vbase*====

### 生命周期
- beforeCreate *组件实例未创建 常用于插件开发的初始化*
- created   * 组件初始化完成 数据可访问 事件初始化完成  常用于异步数据获取*
- beforeMount * 未执行渲染、更新 DOM未创建 *
- mounted * DOM已创建 初始化结束*
- beforeUpdate * 更新前 可获取更新前的状态 *
- update * 更新后 所有状态已更新 *

### 语法糖
- ```v-model='courtse' ``` <===> ``` :value='courtse' @input="courtse=$event" ```
