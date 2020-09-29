//创建Vue实例 instance
const Vue = require('vue')
const app = new Vue({
    template: `<div>hello word</div>`
})

//获取渲染器实例
const { createRenderer } = require('vue-server-renderer')
const render = createRenderer()


//用渲染器渲染Vue实例

render.renderToString(app).then(html =>{
    console.log(html, '>>>>')
}).catch(err =>{
    console.error(err, '<<<<<<<<<')
})

