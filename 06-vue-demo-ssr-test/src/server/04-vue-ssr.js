const express = require('express')
const app = express()
const path = require('path')
const fs = require("fs");


//处理一下favicon
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))


//导入vue
const Vue = require('vue')


//等待渲染的vue 
let vm = new Vue({
    data() {
        return {
            title: 'test'
        }
    },
    template: `
     <div>hello ssr</div>
    `
})
//声明获取绝对路径函数
function resolve(dir) {
    return path.join(__dirname, dir)
}
//静态资源处理
app.use(express.static(resolve('../../dist/client'), {index: false}))

//导入渲染器
const {  createBundleRenderer } = require('vue-server-renderer')
//参数1 服务端的bundle
const bundle = require('../../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext 
    template: fs.readFileSync(resolve('../../public/index.html')), // 宿主文件
    clientManifest: require('../../dist/client/vue-ssr-client-manifest.json') // 客户端清单
})
console.error('>>>>>', renderer)

app.get('*',async (req,res) =>{
    //构造上下文
    const context = {
        title: 'ssr test',
        url: req.url,
    }
    //渲染输出
    try {
        const html = await renderer.renderToString(context)
        res.send(html)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
})


app.listen(3000, ()=>{
    console.log('server runing....')
})








