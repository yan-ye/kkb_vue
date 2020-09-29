const express = require('express')
const app = express()
const Vue = require('vue')
const { createRenderer } = require('vue-server-renderer')
const render = createRenderer()
app.get('/test', function(req,res){
    const app = new Vue({
        template: `<div>hello word</div>`
    })
    render.renderToString(app).then(html => {
        res.send(html)     
    }).catch(err =>{
        res.status(500)
        res.send('Internal Server Error, 500!')       
    })

})



app.listen(5050,function(){
    console.log('server runing')
})