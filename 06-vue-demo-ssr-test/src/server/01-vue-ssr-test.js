const express = require('express')
const path = require('path')
const app = express()

//处理一下favicon
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

//导入Vue
const Vue = require('vue');

//等待渲染的vue实例instance
let vm = new Vue({
    data() {
        return {
            title: '测试'
        }
    },
    template:`
        <div>
        <strong>hi Vue SSR</strong>
        </div>
    `,
})



//导入渲染器
const { createRenderer } = require('vue-server-renderer')
const render = createRenderer()
//路由
app.get('*', async (req,res) =>{
    console.log(req.url, ">>>>>>>>")
    try {
        let html = await render.renderToString(vm)
        res.send(html)
    }catch(error) {
        res.status(500).send('Internal server Error, 500')
    }


    
})


app.listen(3000, function() {
    console.log('server runing...');
})
