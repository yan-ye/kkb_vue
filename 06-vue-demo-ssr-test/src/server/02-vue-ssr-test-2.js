const express = require('express')
const app = express()
const path = require('path')


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

//导入渲染器
const {  createRenderer } = require('vue-server-renderer')
const render = createRenderer()



app.get('*',async (req,res) =>{
    try{
        const html = await render.renderToString(vm)
        console.log(html, '>>>>')
        res.send(html)
    }catch(err) {
        res.status(500).send('Internal server Error!')
    }
})


app.listen(3000, ()=>{
    console.log('server runing....')
})








