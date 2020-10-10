const express = require('express');
const path = require('path')
const favicon = require('serve-favicon')
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const app = express()
app.use(favicon(path.join(__dirname, '../../public','favicon.ico')))

let vm = new Vue({
    data() {
        return {
            title: 'test title'
        }
    },
    template: `
        <h1 :title=title>{{title}}</h1>
    `
})


let render = createRenderer()


app.get('*', async (req, res) => {
    try {
        let html = await render.renderToString(vm)
        res.send(html)
    }catch (err) {
        console.error(err, '>>>>>>>>>');
        res.status(500)
        res.send('Internal server Error!')
    }

})


app.listen(3000, () => {
    console.log('serve runing....');
})
